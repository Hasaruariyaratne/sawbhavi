import { c as createLucideIcon, j as jsxRuntimeExports, T as TriangleAlert, r as reactExports, i as useInventory, X, p as Sparkles, m as api, P as Package, q as useSearchParams, o as Trash2, t as Search } from "./index-xaK5Affb.js";
import { A as AddStockModal } from "./AddStockModal-CLGptNQt.js";
import { C as CircleAlert } from "./circle-alert-gLh52tnv.js";
import { P as Plus } from "./plus-CktjfNR7.js";
import { S as SquarePen } from "./square-pen-CSBdzx9n.js";
import "./dollar-sign-DzKJ0W85.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
const DuplicateAlertModal = ({ isOpen, onClose, onUpdateStock, duplicateReason, existingProduct }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform transition-all scale-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 32 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: "Duplicate Item Detected" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 mb-6", children: [
      "An item with the same ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-amber-600", children: duplicateReason === "name" ? "name" : "photo" }),
      " already exists in your inventory.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm mt-2 block bg-gray-50 p-2 rounded-lg border border-gray-100", children: [
        "Match: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: existingProduct.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onUpdateStock(existingProduct),
          className: "w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-200 transition-all transform active:scale-95",
          children: "Update Existing Stock"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all",
          children: "Cancel"
        }
      )
    ] })
  ] }) }) });
};
const CATEGORIES = ["Vegetables", "Fruits", "Seeds", "Meat & Fish", "Milk Items", "Grocery Items", "Beverages", "Spices", "Dry Fish", "Other"];
const AddItemModal = ({ isOpen, onClose, productToEdit }) => {
  const [step, setStep] = reactExports.useState(1);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [dragActive, setDragActive] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    itemNumber: "",
    category: "",
    price: "",
    cost: "",
    stock: "",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"
  });
  const { addProduct, updateProduct } = useInventory();
  const fileInputRef = reactExports.useRef(null);
  const [imageHash, setImageHash] = reactExports.useState(null);
  const [duplicateData, setDuplicateData] = reactExports.useState(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = reactExports.useState(false);
  const [showAddStockModal, setShowAddStockModal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (productToEdit) {
      const batch = productToEdit.batches && productToEdit.batches.length > 0 ? productToEdit.batches[productToEdit.batches.length - 1] : null;
      setFormData({
        name: productToEdit.name || "",
        itemNumber: productToEdit.item_number || "",
        category: productToEdit.category || "",
        price: String(productToEdit.price || ""),
        cost: String(productToEdit.cost || ""),
        stock: String(productToEdit.stock || ""),
        image: productToEdit.image || productToEdit.image_url || "",
        description: productToEdit.description || "",
        show_online: productToEdit.show_online !== void 0 ? productToEdit.show_online : true,
        batchNumber: (batch == null ? void 0 : batch.batch_number) || "",
        mfdDate: (batch == null ? void 0 : batch.mfd_date) || "",
        expiryDate: (batch == null ? void 0 : batch.expiry_date) || ""
      });
      setImageHash(productToEdit.image_hash || null);
    } else {
      setFormData({
        name: "",
        itemNumber: "",
        category: "",
        price: "",
        cost: "",
        stock: "",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200",
        description: "",
        show_online: true,
        batchNumber: "",
        mfdDate: "",
        expiryDate: ""
      });
      setImageHash(null);
    }
  }, [productToEdit, isOpen]);
  const computeImageHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setFormData((prev) => ({ ...prev, name: "Detected Item", category: "Grocery" }));
      alert("AI Detected: Fresh Milk 1L (Confidence: 98%)");
    }, 2e3);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleFileSelect = async (file) => {
    try {
      const hash = await computeImageHash(file);
      setImageHash(hash);
      const savedPath = await api.saveImage({
        filePath: file.path || file.name,
        type: "image",
        file
        // <--- CRITICAL FIX: Pass the file object
      });
      if (savedPath) {
        const imageUrl = savedPath.startsWith("http") ? savedPath : `media://${savedPath}`;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } else {
        alert("Failed to get image URL from server.");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image");
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const isSavingRef = reactExports.useRef(false);
  const handleSave = async () => {
    var _a;
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    try {
      const duplicateResult = await api.checkDuplicate(formData.name.trim(), imageHash || void 0);
      if (duplicateResult.found && duplicateResult.product) {
        const isSelf = productToEdit && duplicateResult.product.id === productToEdit.id;
        if (!isSelf) {
          setDuplicateData(duplicateResult);
          setShowDuplicateAlert(true);
          setIsSaving(false);
          isSavingRef.current = false;
          return;
        }
      }
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        cost: Number(formData.cost),
        image: formData.image,
        image_hash: imageHash || void 0,
        item_number: formData.itemNumber,
        description: formData.description,
        show_online: formData.show_online,
        batches: [{
          id: (productToEdit == null ? void 0 : productToEdit.batches) && ((_a = productToEdit.batches[0]) == null ? void 0 : _a.id) || Date.now().toString(),
          // Reuse ID if editing? Or replace? 
          // Supabase addProduct deletes all and re-inserts. New ID is fine. 
          quantity: Number(formData.stock),
          buyingPrice: Number(formData.cost),
          date: (/* @__PURE__ */ new Date()).toISOString(),
          batchNumber: formData.batchNumber || `BATCH-${Date.now()}`,
          mfdDate: formData.mfdDate,
          expiryDate: formData.expiryDate
        }]
      };
      if (productToEdit) {
        await updateProduct({ ...payload, id: productToEdit.id });
        alert("Product updated successfully!");
      } else {
        await addProduct(payload);
      }
      onClose();
      setStep(1);
      setStep(1);
      setFormData({ name: "", itemNumber: "", category: "", price: "", cost: "", stock: "", image: "" });
      setImageHash(null);
    } catch (error) {
      alert(`Failed to save item: ${error.message || "Unknown error"}. Check your connection.`);
    } finally {
      setIsSaving(false);
      isSavingRef.current = false;
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DuplicateAlertModal,
      {
        isOpen: showDuplicateAlert,
        onClose: () => setShowDuplicateAlert(false),
        duplicateReason: duplicateData == null ? void 0 : duplicateData.reason,
        existingProduct: duplicateData == null ? void 0 : duplicateData.product,
        onUpdateStock: (product) => {
          setShowDuplicateAlert(false);
          setDuplicateData({ product });
          setShowAddStockModal(true);
        }
      }
    ),
    showAddStockModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddStockModal,
      {
        isOpen: showAddStockModal,
        onClose: () => {
          setShowAddStockModal(false);
          onClose();
        },
        product: duplicateData == null ? void 0 : duplicateData.product,
        onSuccess: () => {
          setShowAddStockModal(false);
          onClose();
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800", children: productToEdit ? "Edit Item" : "Add New Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
            "Step ",
            step,
            " of 2"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer group relative overflow-hidden ${dragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}`,
            onDragEnter: handleDrag,
            onDragLeave: handleDrag,
            onDragOver: handleDrag,
            onDrop: handleDrop,
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: handleFileInput, accept: "image/*" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4", children: isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "animate-spin", size: 32 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 32 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800 mb-1", children: "Upload Product Photo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Drag & drop or click to upload" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      handleAnalyze();
                    },
                    className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors",
                    children: isAnalyzing ? "Analyzing..." : "Auto-Detect with AI"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Product Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                placeholder: "e.g. Fresh Milk",
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Item Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                placeholder: "e.g. 001",
                value: formData.itemNumber || "",
                onChange: (e) => setFormData({ ...formData, itemNumber: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white",
                value: formData.category || "",
                onChange: (e) => setFormData({ ...formData, category: e.target.value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Category" }),
                  CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
                ]
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Cost Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                placeholder: "0.00",
                value: formData.cost,
                onChange: (e) => setFormData({ ...formData, cost: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Selling Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                placeholder: "0.00",
                value: formData.price,
                onChange: (e) => setFormData({ ...formData, price: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-800 mb-3", children: "Initial Batch Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Batch Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                  placeholder: "e.g. BATCH-001",
                  value: formData.batchNumber || "",
                  onChange: (e) => setFormData({ ...formData, batchNumber: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                  placeholder: "0",
                  value: formData.stock,
                  onChange: (e) => setFormData({ ...formData, stock: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Manufactured Date (MFD)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                  value: formData.mfdDate || "",
                  onChange: (e) => setFormData({ ...formData, mfdDate: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Expiry Date (EXP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "date",
                  className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                  value: formData.expiryDate || "",
                  onChange: (e) => setFormData({ ...formData, expiryDate: e.target.value })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-800 mb-3", children: "Online Store Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Product Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none",
                  placeholder: "Describe your product for online customers...",
                  rows: 2,
                  value: formData.description || "",
                  onChange: (e) => setFormData({ ...formData, description: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  id: "show_online",
                  className: "w-5 h-5 text-primary rounded focus:ring-primary border-gray-300",
                  checked: formData.show_online !== false,
                  onChange: (e) => setFormData({ ...formData, show_online: e.target.checked })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "show_online", className: "text-sm font-medium text-gray-700 select-none cursor-pointer", children: "Show in Online Store" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50", children: [
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setStep(1),
            className: "px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors",
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: isSaving,
            onClick: () => step === 1 ? setStep(2) : handleSave(),
            className: `bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-colors shadow-lg shadow-primary/20 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`,
            children: step === 1 ? "Next Step" : isSaving ? "Saving..." : productToEdit ? "Update Item" : "Save Item"
          }
        )
      ] })
    ] }) })
  ] });
};
const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;
  const batches = product.batches || [];
  const totalBatches = batches.length;
  const sortedBatches = [...batches].sort((a, b) => {
    if (a.expiryDate && b.expiryDate) return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    return new Date(b.date || b.created_at).getTime() - new Date(a.date || a.created_at).getTime();
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-xl bg-white border border-gray-200 p-1 shadow-sm flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image || "https://via.placeholder.com/150", alt: product.name, className: "w-full h-full object-contain rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide", children: product.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs font-mono", children: product.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-gray-800 leading-tight mb-1", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm font-medium line-clamp-2", children: product.description || "No description available for this product." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 bg-white flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1", children: "Total Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-black ${product.stock <= 5 ? "text-red-500" : "text-gray-800"}`, children: product.stock })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1", children: "Batch Count" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black text-primary", children: totalBatches })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1", children: "Avg Cost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-black text-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-gray-400 font-normal", children: "LKR" }),
          " ",
          product.cost || "0"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1", children: "Selling Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-black text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-gray-400 font-normal", children: "LKR" }),
          " ",
          product.price
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-auto bg-gray-50/50 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center gap-2", children: [
        "Batch History",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full", children: "Sorted by Expiry/Date" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sortedBatches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 48, className: "mx-auto mb-3 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No batch history found for this product." })
      ] }) : sortedBatches.map((batch, index) => {
        const remaining = batch.remainingQuantity !== void 0 ? batch.remainingQuantity : batch.quantity;
        const isExpired = batch.expiryDate && new Date(batch.expiryDate) < /* @__PURE__ */ new Date();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${remaining > 0 ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`, children: [
            "#",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase mb-0.5", children: "Batch Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-gray-700 flex items-center gap-2", children: [
                batch.batchNumber || batch.batch_number || "N/A",
                isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500 text-xs flex items-center gap-1 bg-red-50 px-1.5 rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 10 }),
                  " Expired"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase mb-0.5", children: "Dates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-gray-700", children: [
                "In: ",
                new Date(batch.date || batch.created_at).toLocaleDateString()
              ] }),
              batch.expiryDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 font-medium", children: [
                "Exp: ",
                new Date(batch.expiryDate).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase mb-0.5", children: "Pricing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                  "Buy: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-700", children: batch.buyingPrice || batch.buying_price || batch.cost_price })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                  "Sell: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: batch.sellingPrice || batch.selling_price || product.price })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase mb-0.5", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-gray-800", children: [
                  remaining,
                  " / ",
                  batch.quantity
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full ${remaining > 0 ? "bg-primary" : "bg-gray-400"}`,
                    style: { width: `${remaining / batch.quantity * 100}%` }
                  }
                ) })
              ] })
            ] })
          ] })
        ] }, batch.id || index);
      }) })
    ] })
  ] }) });
};
const Inventory = () => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const { products, deleteProduct } = useInventory();
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [searchParams] = useSearchParams();
  const [selectedProductForDetails, setSelectedProductForDetails] = reactExports.useState(null);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const categories = ["All", "Low Stock", "Milk Items", "Seeds", "Spices", "Grocery Items", "Dry Fish", "Other"];
  reactExports.useEffect(() => {
    if (searchParams.get("filter") === "low_stock") {
      setSelectedCategory("Low Stock");
    }
  }, [searchParams]);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || (selectedCategory === "Low Stock" ? (product.stock || 0) <= (product.minStock || 5) : selectedCategory === "Other" ? !["Milk Items", "Seeds", "Spices", "Grocery Items", "Dry Fish"].some((c) => (product.category || "").toLowerCase().includes(c.toLowerCase())) : (product.category || "").toLowerCase().includes(selectedCategory.toLowerCase().replace(" items", "")));
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const nA = a.item_number || "";
    const nB = b.item_number || "";
    return nA.localeCompare(nB, void 0, { numeric: true, sensitivity: "base" });
  });
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState({ isOpen: false, productId: null });
  const handleDeleteClick = (product) => {
    setDeleteConfirm({ isOpen: true, productId: product.id, productName: product.name });
  };
  const confirmDelete = async () => {
    if (deleteConfirm.productId) {
      try {
        await deleteProduct(deleteConfirm.productId);
        setDeleteConfirm({ isOpen: false, productId: null });
      } catch (error) {
        alert(`Cannot delete product: ${error.message}`);
        setDeleteConfirm({ isOpen: false, productId: null });
      }
    }
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in duration-500 pb-20", children: [
    deleteConfirm.isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden transform transition-all scale-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 32 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: "Delete Product?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 mb-6", children: [
        "Are you sure you want to delete ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: deleteConfirm.productName }),
        "?",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-500 mt-2 block", children: "This will delete all stock batches and cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDeleteConfirm({ isOpen: false, productId: null }),
            className: "flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: confirmDelete,
            className: "flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-colors",
            children: "Yes, Delete"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddItemModal,
      {
        isOpen: isModalOpen,
        onClose: () => {
          setIsModalOpen(false);
          setEditingProduct(null);
        },
        productToEdit: editingProduct
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductDetailsModal,
      {
        isOpen: !!selectedProductForDetails,
        onClose: () => setSelectedProductForDetails(null),
        product: selectedProductForDetails
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/70 backdrop-blur-xl p-3 rounded-2xl shadow-soft border border-gray-100 flex flex-col lg:flex-row gap-3 sticky top-0 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search by name, SKU, or category...",
            className: "w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all font-medium text-sm",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:pb-0", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setSelectedCategory(cat),
          className: `px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-transparent text-gray-500 hover:bg-gray-100"}`,
          children: cat
        },
        cat
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18, strokeWidth: 3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Item" })
          ]
        }
      )
    ] }),
    filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 flex flex-col items-center justify-center opacity-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 p-6 rounded-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 48, className: "text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-600", children: "No products found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Try adjusting your search or filters" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4", children: filteredProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.image || "https://via.placeholder.com/150",
            alt: product.name,
            className: "w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 line-clamp-2 leading-tight mb-0.5 text-sm", children: product.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider", children: product.category || "Uncategorized" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 font-medium mb-0", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-black text-black", children: [
              "LKR ",
              getEffectivePrice(product)
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-gray-50 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${product.stock < 10 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${product.stock < 10 ? "bg-red-500" : "bg-green-500"}` }),
          parseFloat(Number(product.stock || 0).toFixed(3)),
          " Units"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedProductForDetails(product),
              className: "p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors",
              title: "View Details",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors",
              title: "Edit",
              onClick: () => {
                setEditingProduct(product);
                setIsModalOpen(true);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleDeleteClick(product),
              className: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
              title: "Delete",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
            }
          )
        ] })
      ] })
    ] }, product.id)) })
  ] });
};
export {
  Inventory as default
};
