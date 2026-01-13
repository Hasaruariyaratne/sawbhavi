import { c as createLucideIcon, i as useInventory, r as reactExports, j as jsxRuntimeExports, t as Search, P as Package, I as User, o as Trash2, m as api } from "./index-huoNlmn5.js";
import { A as AddStockModal } from "./AddStockModal-BxOQ-0WF.js";
import { D as Download } from "./download-B2pbNhyi.js";
import { P as Plus } from "./plus-BaFcR-HJ.js";
import { C as CircleAlert } from "./circle-alert-DfWmleQ0.js";
import { P as Pen } from "./pen-CGnAqqs4.js";
import "./dollar-sign-CTSDeEeT.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const Purchases = () => {
  const { products, refreshProducts } = useInventory();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [expandedProducts, setExpandedProducts] = reactExports.useState(/* @__PURE__ */ new Set());
  const [isAddStockModalOpen, setIsAddStockModalOpen] = reactExports.useState(false);
  const [selectedProductForStock, setSelectedProductForStock] = reactExports.useState(null);
  const [editingBatch, setEditingBatch] = reactExports.useState(null);
  const getEffectivePrice = (product) => {
    if (!product.stock || product.stock <= 0) return product.price;
    if (product && product.batches && product.batches.length > 0) {
      const sortedBatches = [...product.batches].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
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
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id && product.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const nA = a.item_number || "";
    const nB = b.item_number || "";
    return nA.localeCompare(nB, void 0, { numeric: true, sensitivity: "base" });
  });
  const groupedProducts = {
    "Milk Items": [],
    "Seeds": [],
    "Spices": [],
    "Grocery Items": [],
    "Dry Fish": [],
    "Other": []
  };
  filteredProducts.forEach((product) => {
    const cat = (product.category || "").toLowerCase();
    if (cat.includes("milk")) groupedProducts["Milk Items"].push(product);
    else if (cat.includes("seed")) groupedProducts["Seeds"].push(product);
    else if (cat.includes("spice")) groupedProducts["Spices"].push(product);
    else if (cat.includes("grocery")) groupedProducts["Grocery Items"].push(product);
    else if (cat.includes("dry fish") || cat.includes("dried fish")) groupedProducts["Dry Fish"].push(product);
    else groupedProducts["Other"].push(product);
  });
  const categories = ["Milk Items", "Seeds", "Spices", "Grocery Items", "Dry Fish", "Other"];
  const toggleExpand = (productId) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };
  const handleOpenAddStock = (product) => {
    setSelectedProductForStock(product);
    setIsAddStockModalOpen(true);
  };
  const handleStockAdded = async () => {
    await refreshProducts();
    if (selectedProductForStock) {
      const newExpanded = new Set(expandedProducts);
      newExpanded.add(selectedProductForStock.id);
      setExpandedProducts(newExpanded);
    }
  };
  const handleDeleteBatch = async (product, batchId) => {
    if (!window.confirm("Are you sure you want to delete this batch? This will reduce the stock count.")) return;
    try {
      await api.deleteBatch(product.id, batchId);
      await refreshProducts();
    } catch (error) {
      console.error("Failed to delete batch", error);
      alert("Failed to delete batch");
    }
  };
  const [expandedCategories, setExpandedCategories] = reactExports.useState(/* @__PURE__ */ new Set());
  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddStockModal,
      {
        isOpen: isAddStockModalOpen,
        onClose: () => {
          setIsAddStockModalOpen(false);
          setEditingBatch(null);
        },
        product: selectedProductForStock,
        onSuccess: handleStockAdded,
        editingBatch
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-gray-800 tracking-tight", children: "Purchases & Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "Manage inventory batches and supplier deliveries" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 20 }),
        "Export Report"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft border border-gray-100 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 border-b border-gray-100 flex gap-4 bg-gray-50/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search products by name, code...",
            className: "w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all font-medium shadow-sm",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-100", children: categories.map((category) => {
        const categoryProducts = groupedProducts[category];
        if (categoryProducts.length === 0) return null;
        const isCategoryExpanded = expandedCategories.has(category);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-100 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => toggleCategory(category),
              className: "w-full bg-gray-50/50 hover:bg-gray-100/80 px-6 py-4 flex items-center justify-between transition-colors group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2.5 h-2.5 rounded-full transition-colors ${isCategoryExpanded ? "bg-primary" : "bg-gray-400 group-hover:bg-gray-500"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold uppercase tracking-wider text-sm transition-colors ${isCategoryExpanded ? "text-primary" : "text-gray-600"}`, children: category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-white px-2 py-0.5 rounded-md text-xs font-bold text-gray-500 border border-gray-200 shadow-sm", children: [
                    categoryProducts.length,
                    " items"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-gray-400 transition-transform duration-300 ${isCategoryExpanded ? "rotate-180 text-primary" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 20 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `overflow-hidden transition-all duration-300 ease-in-out ${isCategoryExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`, children: categoryProducts.map((product) => {
            const isExpanded = expandedProducts.has(product.id);
            const batches = product.batches || [];
            const totalBatches = batches.length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hover:bg-primary/5 transition-colors border-b border-gray-100 last:border-0 group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-white p-1 border border-gray-100 shadow-sm flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image || "https://via.placeholder.com/150", alt: product.name, className: "w-full h-full object-contain rounded-lg" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg text-gray-800", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gray-100 px-2 py-0.5 rounded text-xs", children: product.id.slice(0, 8) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: product.category })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase", children: "Selling Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-black text-gray-800 text-lg", children: [
                    "LKR ",
                    getEffectivePrice(product)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right min-w-[100px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase", children: "Total Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${product.stock <= 10 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14 }),
                    product.stock
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pl-4 border-l border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => handleOpenAddStock(product),
                      className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, strokeWidth: 3 }),
                        "Add Stock"
                      ]
                    }
                  ),
                  totalBatches > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => toggleExpand(product.id),
                      className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isExpanded ? "bg-primary/10 text-primary border-primary/20" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`,
                      children: [
                        isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }),
                        totalBatches,
                        " Batches"
                      ]
                    }
                  )
                ] })
              ] }),
              isExpanded && totalBatches > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 pt-2 bg-gray-50/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50/80 px-5 py-3 grid grid-cols-8 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Batch #" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1", children: "Supplier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right col-span-1", children: "Buy Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right col-span-1", children: "Sell Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center col-span-1", children: "Initial Qty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center col-span-1", children: "Remaining" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center col-span-1", children: "Actions" })
                ] }),
                batches.map((batch, index) => {
                  const isExpired = batch.expiryDate && new Date(batch.expiryDate) < /* @__PURE__ */ new Date();
                  const remaining = batch.remainingQuantity !== void 0 ? batch.remainingQuantity : batch.quantity;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-5 py-4 grid grid-cols-8 gap-4 text-sm items-center hover:bg-primary/5 transition-colors ${index !== batches.length - 1 ? "border-b border-gray-100" : ""}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 font-mono font-bold text-gray-600 flex items-center gap-2", children: [
                      batch.batchNumber || batch.batch_number || "N/A",
                      isExpired && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14, className: "text-red-500" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-gray-600 font-medium", children: new Date(batch.date || batch.created_at).toLocaleDateString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-1 text-gray-600 font-medium flex items-center gap-1.5", children: batch.supplier ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "text-gray-400" }),
                      batch.supplier
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 italic", children: "No Supplier" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right col-span-1 font-medium text-gray-600", children: [
                      "LKR ",
                      batch.cost_price || batch.buyingPrice || batch.buying_price
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right col-span-1 font-bold text-gray-800", children: [
                      "LKR ",
                      batch.sellingPrice || batch.selling_price || product.price
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center col-span-1 text-gray-500 font-medium", children: batch.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${remaining > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-gray-100 text-gray-500 border border-gray-200"}`, children: [
                      remaining,
                      " Left"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center col-span-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => {
                            setEditingBatch(batch);
                            setSelectedProductForStock(product);
                            setIsAddStockModalOpen(true);
                          },
                          className: "p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20",
                          title: "Edit Batch",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => handleDeleteBatch(product, batch.id),
                          className: "p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 ml-1",
                          title: "Delete Batch",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
                        }
                      )
                    ] })
                  ] }, batch.id || index);
                })
              ] }) })
            ] }, product.id);
          }) })
        ] }, category);
      }) })
    ] })
  ] });
};
export {
  Purchases as default
};
