import { c as createLucideIcon, r as reactExports, n as useCart, i as useInventory, h as useSales, k as useSearch, j as jsxRuntimeExports, U as Users, o as Trash2, S as ShoppingBag, X, d as reactDomExports, m as api } from "./index-fHUEKpF0.js";
import { d as defaultBillLayout, B as BillPreview } from "./BillPreview-JTJTApZ1.js";
import { B as Briefcase } from "./briefcase-7mYwQTWw.js";
import { P as Plus } from "./plus-BRdCdj-o.js";
import { M as Minus } from "./minus-CCjNhHDl.js";
import { S as Save } from "./save-CY2f5nfM.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$1);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
];
const ScanLine = createLucideIcon("scan-line", __iconNode);
const categories = [
  "Seeds",
  "Spices",
  "Grocery Items",
  "Milk Items",
  "Dry Fish",
  "Vegetables",
  "Fruits",
  "Beverages",
  "Other"
];
const getEffectivePrice = (product, isSpecialCustomer, customerPrices) => {
  if (isSpecialCustomer && customerPrices.has(product.id)) {
    return customerPrices.get(product.id);
  }
  if (!product.stock || product.stock <= 0) return product.price;
  if (product.batches && product.batches.length > 0) {
    const sortedBatches = [...product.batches].sort((a, b) => {
      const dateA = new Date(a.created_at || a.date || 0).getTime();
      const dateB = new Date(b.created_at || b.date || 0).getTime();
      return dateA - dateB;
    });
    const totalRecordedBatchQty = sortedBatches.reduce((acc, b) => {
      const q = b.remaining_quantity !== void 0 ? b.remaining_quantity : b.remainingQuantity !== void 0 ? b.remainingQuantity : b.quantity;
      return acc + (q || 0);
    }, 0);
    let ghostQty = Math.max(0, totalRecordedBatchQty - product.stock);
    for (const batch of sortedBatches) {
      let batchQty = batch.remaining_quantity !== void 0 ? batch.remaining_quantity : batch.remainingQuantity !== void 0 ? batch.remainingQuantity : batch.quantity;
      batchQty = batchQty || 0;
      if (batchQty > ghostQty) {
        const batchPrice = batch.selling_price || batch.sellingPrice;
        if (batchPrice) return batchPrice;
      }
      ghostQty -= batchQty;
    }
  }
  return product.price;
};
const calculateTransactionFinancials = (cart, products) => {
  let totalCost = 0;
  let totalRevenue = 0;
  const itemsWithCost = [];
  const stockUpdates = [];
  for (const item of cart) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      throw new Error(`Product "${item.name}" not found in inventory`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`);
    }
    let remainingQtyToProcess = item.quantity;
    let itemCost = 0;
    const updatedBatches = product.batches ? [...product.batches] : [];
    updatedBatches.sort((a, b) => {
      const dateA = new Date(a.created_at || a.date || 0).getTime();
      const dateB = new Date(b.created_at || b.date || 0).getTime();
      return dateA - dateB;
    });
    let totalBatchedQty = updatedBatches.reduce((acc, b) => {
      const q = b.remaining_quantity !== void 0 ? b.remaining_quantity : b.remainingQuantity !== void 0 ? b.remainingQuantity : b.quantity;
      return acc + (q || 0);
    }, 0);
    let ghostQtyToSkip = Math.max(0, totalBatchedQty - (product.stock || 0));
    for (let i = 0; i < updatedBatches.length && remainingQtyToProcess > 0; i++) {
      const batch = updatedBatches[i];
      let currentRemaining = batch.remainingQuantity;
      if (currentRemaining === void 0) currentRemaining = batch.remaining_quantity;
      if (currentRemaining === void 0) currentRemaining = batch.quantity;
      if (ghostQtyToSkip > 0) {
        const skipAmount = Math.min(currentRemaining, ghostQtyToSkip);
        currentRemaining -= skipAmount;
        ghostQtyToSkip -= skipAmount;
        batch.remainingQuantity = currentRemaining;
        batch.remaining_quantity = currentRemaining;
      }
      if (currentRemaining > 0 && remainingQtyToProcess > 0) {
        const qtyFromBatch = Math.min(currentRemaining, remainingQtyToProcess);
        const buyPrice = batch.buyingPrice || batch.buying_price || batch.cost_price || product.cost || 0;
        itemCost += qtyFromBatch * buyPrice;
        const newRemaining = currentRemaining - qtyFromBatch;
        batch.remainingQuantity = newRemaining;
        batch.remaining_quantity = newRemaining;
        batch._deducted_qty = (batch._deducted_qty || 0) + qtyFromBatch;
        remainingQtyToProcess -= qtyFromBatch;
      }
    }
    if (remainingQtyToProcess > 0) {
      const defaultCost = product.cost || 0;
      itemCost += remainingQtyToProcess * defaultCost;
    }
    stockUpdates.push({
      id: item.id,
      qty: item.quantity,
      batches: updatedBatches.filter((b) => (b._deducted_qty || 0) > 0).map((b) => {
        const val = b.remainingQuantity !== void 0 ? b.remainingQuantity : b.remaining_quantity !== void 0 ? b.remaining_quantity : b.quantity;
        return {
          ...b,
          remainingQuantity: val,
          remaining_quantity: val,
          deducted_qty: b._deducted_qty
          // Send explicitly to backend
        };
      })
    });
    const lineTotal = item.price * item.quantity;
    totalCost += itemCost;
    totalRevenue += lineTotal;
    itemsWithCost.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      cost: item.quantity > 0 ? itemCost / item.quantity : 0,
      // Weighted Average Unit Cost
      total: lineTotal,
      category: product.category,
      item_number: product.item_number
    });
  }
  return { itemsWithCost, stockUpdates, totalCost, totalRevenue };
};
const QuantityInput = ({ value, onChange, id }) => {
  const [inputValue, setInputValue] = reactExports.useState(value.toString());
  const [originalValue, setOriginalValue] = reactExports.useState(value);
  reactExports.useEffect(() => {
    if (parseFloat(inputValue) !== value) {
      setInputValue(value.toString());
    }
  }, [value]);
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "") return;
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      onChange(num);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      onChange(originalValue);
      setInputValue(originalValue.toString());
      e.currentTarget.blur();
    }
  };
  const handleFocus = (e) => {
    setOriginalValue(value);
    e.target.select();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      id,
      type: "number",
      step: "any",
      value: inputValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onClick: (e) => e.stopPropagation(),
      onBlur: () => {
        if (parseFloat(inputValue) === 0 || inputValue === "") {
          if (value === 0) setInputValue("0.5");
          else setInputValue(value.toString());
        }
      },
      className: "w-14 text-center text-lg font-bold bg-gray-50 border-none rounded-xl py-1 focus:ring-2 focus:ring-primary-400 focus:outline-none text-gray-800"
    }
  );
};
const POS = () => {
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All Items");
  const { cart, addToCart: addToCartContext, removeFromCart, updateQuantity, total, subtotal, tax, clearCart } = useCart();
  const { products, refreshProducts } = useInventory();
  const { refreshSales } = useSales();
  const { searchQuery } = useSearch();
  const [focusTargetId, setFocusTargetId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (focusTargetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`qty-input-${focusTargetId}`);
        if (el) {
          el.focus();
          setFocusTargetId(null);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [focusTargetId, cart]);
  const [posMode, setPosMode] = reactExports.useState(() => {
    return localStorage.getItem("pos_mode") || "local";
  });
  const [specialCustomers, setSpecialCustomers] = reactExports.useState([]);
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  reactExports.useEffect(() => {
    localStorage.setItem("pos_mode", posMode);
  }, [posMode]);
  const [customerPrices, setCustomerPrices] = reactExports.useState(/* @__PURE__ */ new Map());
  const [isOrderNameModalOpen, setIsOrderNameModalOpen] = reactExports.useState(false);
  const [orderName, setOrderName] = reactExports.useState("");
  const [pendingAction, setPendingAction] = reactExports.useState(null);
  const [nextBillNo, setNextBillNo] = reactExports.useState("...");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = reactExports.useState(false);
  const [customerSearch, setCustomerSearch] = reactExports.useState("");
  const [pendingProduct, setPendingProduct] = reactExports.useState(null);
  const bottomRef = reactExports.useRef(null);
  const prevCartLength = reactExports.useRef(cart.length);
  reactExports.useEffect(() => {
    if (cart.length > prevCartLength.current) {
      setTimeout(() => {
        var _a;
        (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
    prevCartLength.current = cart.length;
  }, [cart.length]);
  reactExports.useEffect(() => {
    const loadSpecial = async () => {
      const all = await api.getCustomers();
      if (all) setSpecialCustomers(all);
    };
    loadSpecial();
  }, []);
  const handleCustomerSelect = async (e) => {
    const custId = typeof e === "string" ? e : e.target.value;
    if (!custId) {
      setSelectedCustomer(null);
      setCustomerPrices(/* @__PURE__ */ new Map());
      localStorage.removeItem("pos_selected_customer_id");
      return /* @__PURE__ */ new Map();
    }
    const cust = specialCustomers.find((c) => c.id === custId);
    if (!cust) return;
    setSelectedCustomer(cust);
    localStorage.setItem("pos_selected_customer_id", custId);
    try {
      const priceList = await api.getCustomerPrices(custId);
      const map = /* @__PURE__ */ new Map();
      if (priceList) {
        priceList.forEach((p) => map.set(p.product_id, p.special_price));
      }
      setCustomerPrices(map);
      return map;
    } catch (err) {
      console.error("Error fetching customer prices:", err);
      return /* @__PURE__ */ new Map();
    }
    return /* @__PURE__ */ new Map();
  };
  reactExports.useEffect(() => {
    const savedCustId = localStorage.getItem("pos_selected_customer_id");
    if (savedCustId && specialCustomers.length > 0 && !selectedCustomer && posMode === "special") {
      handleCustomerSelect(savedCustId);
    }
  }, [specialCustomers, posMode]);
  const lastClickTimeRef = reactExports.useRef(0);
  const handleAddToCart = (product, forcedValues) => {
    const now = Date.now();
    if (!forcedValues && now - lastClickTimeRef.current < 100) {
      return;
    }
    lastClickTimeRef.current = now;
    if (cart.length === 0 && !forcedValues) {
      setPendingProduct(product);
      setIsCustomerModalOpen(true);
      return;
    }
    const effectiveMode = forcedValues ? forcedValues.posMode : posMode;
    const effectivePrices = forcedValues ? forcedValues.prices : customerPrices;
    const finalPrice = getEffectivePrice(
      product,
      effectiveMode === "special",
      effectivePrices
    );
    const productWithPrice = {
      ...product,
      price: finalPrice,
      // Add a flag so we know if this price is dynamic
      isDynamicPrice: finalPrice !== product.price
    };
    addToCartContext(productWithPrice);
    setFocusTargetId(product.id);
    setPendingProduct(null);
  };
  const [showPreview, setShowPreview] = reactExports.useState(false);
  const [billConfig, setBillConfig] = reactExports.useState(defaultBillLayout);
  const [storeInfo, setStoreInfo] = reactExports.useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    tagline: ""
  });
  reactExports.useEffect(() => {
    const loadBillNo = async () => {
      const customerId = posMode === "special" && selectedCustomer ? selectedCustomer.id : void 0;
      try {
        const nextVal = await api.peekNextBillNumber(customerId);
        setNextBillNo(String(nextVal).padStart(4, "0"));
      } catch (e) {
        setNextBillNo("000?");
      }
    };
    loadBillNo();
  }, [posMode, selectedCustomer, showPreview]);
  reactExports.useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await api.getSetting("bill_layout");
        if (savedConfig) {
          setBillConfig({ ...defaultBillLayout, ...savedConfig });
        }
        const savedStore = await api.getSetting("storeInfo");
        if (savedStore) {
          setStoreInfo(savedStore);
        }
      } catch (err) {
        console.error("Failed to load bill layout:", err);
      }
    };
    loadConfig();
  }, [showPreview]);
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Items" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id && product.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const nA = a.item_number || "";
    const nB = b.item_number || "";
    return nA.localeCompare(nB, void 0, { numeric: true, sensitivity: "base" });
  });
  const groupedProducts = {
    "Seeds": [],
    "Spices": [],
    "Grocery Items": [],
    "Milk Items": [],
    "Dry Fish": [],
    "Vegetables": [],
    "Fruits": [],
    "Beverages": [],
    "Other": []
  };
  if (selectedCategory === "All Items") {
    filteredProducts.forEach((product) => {
      const cat = product.category ? product.category.toLowerCase() : "";
      if (cat.includes("seed")) groupedProducts["Seeds"].push(product);
      else if (cat.includes("spice")) groupedProducts["Spices"].push(product);
      else if (cat.includes("grocery")) groupedProducts["Grocery Items"].push(product);
      else if (cat.includes("milk")) groupedProducts["Milk Items"].push(product);
      else if (cat.includes("dry fish") || cat.includes("dried fish")) groupedProducts["Dry Fish"].push(product);
      else if (cat.includes("veg")) groupedProducts["Vegetables"].push(product);
      else if (cat.includes("fruit")) groupedProducts["Fruits"].push(product);
      else if (cat.includes("beverage")) groupedProducts["Beverages"].push(product);
      else groupedProducts["Other"].push(product);
    });
  }
  const displayGroups = selectedCategory === "All Items" ? ["Seeds", "Spices", "Grocery Items", "Milk Items", "Dry Fish", "Vegetables", "Fruits", "Beverages", "Other"].map((cat) => ({
    title: cat,
    items: groupedProducts[cat]
  })).filter((g) => g.items.length > 0) : [{ title: "", items: filteredProducts }];
  const categoryOrder = ["Seeds", "Spices", "Grocery Items", "Milk Items", "Dry Fish"];
  const sortedCart = [...cart].sort((a, b) => {
    const catA = a.category || "Other";
    const catB = b.category || "Other";
    const indexA = categoryOrder.indexOf(catA);
    const indexB = categoryOrder.indexOf(catB);
    const orderA = indexA === -1 ? 999 : indexA;
    const orderB = indexB === -1 ? 999 : indexB;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    if (indexA === -1 && indexB === -1 && catA !== catB) {
      return catA.localeCompare(catB);
    }
    const nA = a.item_number || "";
    const nB = b.item_number || "";
    return nA.localeCompare(nB, void 0, { numeric: true, sensitivity: "base" });
  });
  const processSale = async () => {
    try {
      const { itemsWithCost, stockUpdates, totalCost } = calculateTransactionFinancials(
        cart.map((c) => ({ ...c })),
        // Pass copy to avoid mutation issues if any
        products
      );
      const profit = total - totalCost;
      await api.processSaleTransaction(
        {
          total,
          subtotal,
          tax,
          paymentMethod: "Cash",
          customerId: posMode === "special" && selectedCustomer ? selectedCustomer.id : void 0,
          order_name: orderName || void 0,
          profit,
          cost: totalCost
        },
        itemsWithCost,
        stockUpdates
      );
      await refreshProducts();
      await refreshSales();
      await refreshCustomers();
      clearCart();
      setOrderName("");
    } catch (error) {
      console.error("Failed to process sale:", error);
      alert(`Failed to process sale: ${error.message || error}`);
    }
  };
  const refreshCustomers = async () => {
    try {
      const all = await api.getCustomers();
      if (all) {
        setSpecialCustomers(all);
        if (selectedCustomer) {
          const updated = all.find((c) => c.id === selectedCustomer.id);
          if (updated) {
            setSelectedCustomer(updated);
          }
        }
      }
    } catch (e) {
      console.error("Failed to refresh customers", e);
    }
  };
  reactExports.useEffect(() => {
    refreshCustomers();
  }, []);
  const handlePrintRequest = () => {
    setPendingAction("print");
    setIsOrderNameModalOpen(true);
  };
  const handleSaleWithoutPrint = () => {
    setPendingAction("save");
    setIsOrderNameModalOpen(true);
  };
  const handleOrderNameSubmit = () => {
    if (!orderName.trim()) {
      alert("Please enter an Order Name to proceed.");
      return;
    }
    setIsOrderNameModalOpen(false);
    if (pendingAction === "print") {
      setShowPreview(true);
    } else if (pendingAction === "save") {
      if (window.confirm(`Save order "${orderName}" without printing?`)) {
        processSale();
      }
    }
    setPendingAction(null);
  };
  const handleConfirmPrint = () => {
    window.print();
    processSale();
    setShowPreview(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex h-[calc(100vh-6rem)] gap-6 animate-in fade-in duration-500 no-print`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-6 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setIsCustomerModalOpen(true),
            className: `w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all group hover:shadow-md ${posMode === "special" && selectedCustomer ? "bg-indigo-50/50 border-indigo-200" : "bg-white border-gray-100 hover:border-gray-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm ${posMode === "special" && selectedCustomer ? "bg-indigo-600 text-white" : "bg-emerald-100 text-emerald-600"}`, children: posMode === "special" && selectedCustomer ? /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5", children: "Billing To" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-lg font-bold leading-tight ${posMode === "special" && selectedCustomer ? "text-indigo-900" : "text-gray-900"}`, children: posMode === "special" && selectedCustomer ? selectedCustomer.name : "Normal Customer" }),
                    posMode === "special" && selectedCustomer && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold", children: "SPECIAL" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 font-medium truncate max-w-[200px]", children: posMode === "special" && selectedCustomer ? selectedCustomer.phone || selectedCustomer.address || "Special Pricing Applied" : "Standard Pricing • Local Sale" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2.5 bg-white text-gray-700 rounded-xl text-sm font-bold shadow-sm border border-gray-200 group-hover:scale-105 transition-transform flex items-center gap-2", children: [
                "Change ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 14, className: "opacity-50" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 backdrop-blur-xl p-3 rounded-3xl shadow-soft border border-gray-100 flex items-center justify-between gap-4 sticky top-0 z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedCategory(cat),
              className: `px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat ? "bg-primary-600 text-white shadow-lg shadow-primary-200 scale-105" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100 hover:text-gray-900"}`,
              children: cat
            },
            cat
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-2 hidden xl:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 text-gray-400 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors", title: "Scan Barcode", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 20 }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pr-2 scrollbar-hide pb-20", children: displayGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 last:mb-0", children: [
          group.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg text-gray-800 mb-4 px-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-6 bg-primary-400 rounded-full" }),
            group.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-1", children: group.items.map((product) => {
            const effectivePrice = getEffectivePrice(
              product,
              posMode === "special",
              customerPrices
            );
            const isSpecialPrice = effectivePrice !== product.price;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => handleAddToCart(product),
                className: `bg-white rounded-3xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 group relative overflow-hidden ${isSpecialPrice ? "border-primary/20 ring-2 ring-primary/10" : "border-gray-100 hover:border-primary-200"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-gray-50 relative p-4 group-hover:bg-gray-100 transition-colors", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.image || "https://via.placeholder.com/150",
                        alt: product.name,
                        className: "w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                      }
                    ),
                    product.stock < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm", children: [
                      product.stock,
                      " LEFT"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, strokeWidth: 3 }) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 text-sm mb-1 line-clamp-2 leading-tight h-10", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `font-extrabold text-lg ${isSpecialPrice ? "text-primary" : "text-black"}`, children: [
                        "LKR ",
                        effectivePrice
                      ] }),
                      isSpecialPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold", children: "SPECIAL" })
                    ] })
                  ] })
                ]
              },
              product.id
            );
          }) })
        ] }, group.title || "single")) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[420px] bg-white rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col h-full overflow-hidden shrink-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-gray-900 tracking-tight", children: "Current Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-medium mt-1", children: [
              cart.length,
              " items"
            ] })
          ] }),
          cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: clearCart,
              className: "bg-red-50 text-red-500 p-2 rounded-xl hover:bg-red-100 transition-colors group",
              title: "Clear Order",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "group-hover:scale-110 transition-transform" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-200", children: [
          cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-gray-400 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShoppingBag,
              {
                size: 48,
                className: "text-gray-300"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg text-gray-500", children: "Cart is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Select items to start an order" })
            ] })
          ] }) : sortedCart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-3 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-sm transition-all group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-white p-1 border border-gray-100 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image || "https://via.placeholder.com/150", alt: item.name, className: "w-full h-full object-contain rounded-lg" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800 text-sm line-clamp-2 leading-tight", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900 text-sm whitespace-nowrap", children: (item.price * item.quantity).toFixed(0) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      },
                      className: "text-red-400 hover:text-red-600 p-1 -mr-2 mt-1",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-medium", children: [
                  "LKR ",
                  item.price
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white rounded-lg p-0.5 border border-gray-200 shadow-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, item.quantity - 1);
                      },
                      className: "w-7 h-7 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, strokeWidth: 2.5 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    QuantityInput,
                    {
                      id: `qty-input-${item.id}`,
                      value: item.quantity,
                      onChange: (val) => updateQuantity(item.id, val)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        updateQuantity(item.id, item.quantity + 1);
                      },
                      className: "w-7 h-7 rounded-md bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 shadow-sm transition-colors active:scale-95",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 2.5 })
                    }
                  )
                ] })
              ] })
            ] })
          ] }, item.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] rounded-t-3xl z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-medium text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "LKR ",
                subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-medium text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax (0%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "LKR ",
                tax.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end pt-4 border-t border-dashed border-gray-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-800 font-bold text-lg", children: "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black text-primary-700 tracking-tight", children: [
                "LKR ",
                total.toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleSaleWithoutPrint,
                disabled: cart.length === 0,
                className: "col-span-2 flex flex-col items-center justify-center gap-1 bg-gray-100 border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 20 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Save" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handlePrintRequest,
                disabled: cart.length === 0,
                style: { background: "linear-gradient(to right, var(--menu-active), var(--menu-hover))" },
                className: "col-span-3 flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 hover:-translate-y-0.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 24 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Pay & Print" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    isOrderNameModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md transform transition-all scale-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Enter Order Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-6", children: "Please provide a name for this order to continue." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          autoFocus: true,
          placeholder: "e.g. Wedding Order, Table 5, Morning Batch...",
          className: "w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all mb-6 font-medium",
          value: orderName,
          onChange: (e) => setOrderName(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleOrderNameSubmit()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsOrderNameModalOpen(false),
            className: "flex-1 py-3.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleOrderNameSubmit,
            className: "flex-1 py-3.5 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-95",
            children: "Continue"
          }
        )
      ] })
    ] }) }),
    showPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm no-print-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-8 shadow-2xl w-[90vw] h-[90vh] flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Check Bill Layout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowPreview(false), className: "p-2 hover:bg-gray-100 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-gray-100 rounded-2xl p-8 overflow-auto flex justify-center items-start", children: (() => {
        const mappedItems = cart.map((item) => {
          var _a;
          return {
            name: item.name,
            qty: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
            category: (_a = products.find((p) => p.id === item.id)) == null ? void 0 : _a.category,
            item_number: item.item_number
          };
        }).sort((a, b) => {
          const nA = a.item_number || "";
          const nB = b.item_number || "";
          return nA.localeCompare(nB, void 0, { numeric: true, sensitivity: "base" });
        });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BillPreview,
            {
              config: billConfig,
              items: mappedItems,
              data: {
                billNo: nextBillNo,
                date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
                time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
                customer: {
                  name: posMode === "special" && selectedCustomer ? selectedCustomer.name : "NORMAL CUS"
                },
                orderName,
                items: mappedItems,
                subtotal,
                tax,
                discount: 0,
                total,
                companyName: storeInfo.name,
                tagline: storeInfo.tagline,
                address: storeInfo.address,
                phone: storeInfo.phone,
                email: storeInfo.email,
                storeName: storeInfo.name
              }
            }
          ),
          reactDomExports.createPortal(
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BillPreview,
              {
                config: billConfig,
                items: mappedItems,
                id: "bill-print-container",
                data: {
                  billNo: nextBillNo,
                  date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
                  time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
                  customer: {
                    name: posMode === "special" && selectedCustomer ? selectedCustomer.name : "NORMAL CUS"
                  },
                  orderName,
                  items: mappedItems,
                  subtotal,
                  tax,
                  discount: 0,
                  total,
                  companyName: storeInfo.name,
                  tagline: storeInfo.tagline,
                  address: storeInfo.address,
                  phone: storeInfo.phone,
                  email: storeInfo.email,
                  storeName: storeInfo.name
                }
              }
            ),
            document.body
          )
        ] });
      })() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowPreview(false),
            className: "px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl",
            children: "Edit / Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleConfirmPrint,
            className: "px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 20 }),
              "Confirm & Print"
            ]
          }
        )
      ] })
    ] }) }),
    isCustomerModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Select Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "Choose who is purchasing these items" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsCustomerModalOpen(false),
            className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24, className: "text-gray-400" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white border-b border-gray-100 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search customers by name...",
          value: customerSearch,
          onChange: (e) => setCustomerSearch(e.target.value),
          autoFocus: true,
          className: "w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-50 font-bold transition-all"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setPosMode("local");
              setSelectedCustomer(null);
              setCustomerPrices(/* @__PURE__ */ new Map());
              localStorage.removeItem("pos_selected_customer_id");
              setIsCustomerModalOpen(false);
              if (pendingProduct) {
                handleAddToCart(pendingProduct, { posMode: "local", prices: /* @__PURE__ */ new Map() });
              }
            },
            className: `w-full p-4 rounded-xl flex items-center gap-4 transition-all group text-left border-2 ${posMode === "local" ? "bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100" : "bg-white border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center ${posMode === "local" ? "bg-emerald-500 text-white shadow-lg" : "bg-gray-100 text-gray-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-bold text-lg ${posMode === "local" ? "text-emerald-900" : "text-gray-700"}`, children: "Normal Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Standard pricing, no tracking" })
              ] }),
              posMode === "local" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md", children: "SELECTED" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gray-100 my-2" }),
        specialCustomers.filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase())).map((customer) => {
          const isSelected = posMode === "special" && (selectedCustomer == null ? void 0 : selectedCustomer.id) === customer.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: async () => {
                const prices = await handleCustomerSelect(customer.id);
                setPosMode("special");
                setIsCustomerModalOpen(false);
                if (pendingProduct) {
                  handleAddToCart(pendingProduct, { posMode: "special", prices: prices || /* @__PURE__ */ new Map() });
                }
              },
              className: `w-full p-4 rounded-xl flex items-center gap-4 transition-all group text-left border-2 ${isSelected ? "bg-indigo-50 border-indigo-500 ring-4 ring-indigo-100" : "bg-white border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-100 text-gray-400"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 24 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-bold text-lg ${isSelected ? "text-indigo-900" : "text-gray-700"}`, children: customer.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 flex gap-3", children: [
                    customer.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📞 ",
                      customer.phone
                    ] }),
                    customer.type === "special" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-500 font-bold", children: "★ Special" })
                  ] })
                ] }),
                isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md", children: "SELECTED" })
              ]
            },
            customer.id
          );
        }),
        specialCustomers.filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase())).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          'No customers found matching "',
          customerSearch,
          '"'
        ] }) })
      ] })
    ] }) })
  ] });
};
export {
  POS as default
};
