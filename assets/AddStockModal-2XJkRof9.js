import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, P as Package, C as Calendar, I as User, m as api } from "./index-n6ph3slq.js";
import { D as DollarSign } from "./dollar-sign-DROSe9ZI.js";
import { C as CircleAlert } from "./circle-alert-BuHMIsZf.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode);
const AddStockModal = ({ isOpen, onClose, product, onSuccess, editingBatch }) => {
  var _a;
  const [formData, setFormData] = reactExports.useState({
    batchNumber: "",
    quantity: "",
    buyingPrice: "",
    sellingPrice: "",
    supplier: "",
    mfdDate: "",
    expiryDate: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    var _a2;
    if (isOpen && product) {
      if (editingBatch) {
        setFormData({
          batchNumber: editingBatch.batchNumber || editingBatch.batch_number,
          quantity: ((_a2 = editingBatch.quantity) == null ? void 0 : _a2.toString()) || "",
          buyingPrice: (editingBatch.buyingPrice || editingBatch.cost_price || "").toString(),
          sellingPrice: (editingBatch.sellingPrice || product.price || "").toString(),
          supplier: editingBatch.supplier || "",
          mfdDate: editingBatch.mfdDate || editingBatch.mfd_date || "",
          expiryDate: editingBatch.expiryDate || editingBatch.expiry_date || "",
          date: (editingBatch.date || editingBatch.created_at || (/* @__PURE__ */ new Date()).toISOString()).split("T")[0]
        });
      } else {
        let nextBatchNum = "01";
        if (product.batches && product.batches.length > 0) {
          const numericBatches = product.batches.map((b) => parseInt(b.batchNumber || b.batch_number)).filter((n) => !isNaN(n) && n > 0);
          if (numericBatches.length > 0) {
            const maxBatch = Math.max(...numericBatches);
            nextBatchNum = (maxBatch + 1).toString().padStart(2, "0");
          }
        }
        setFormData({
          batchNumber: nextBatchNum,
          quantity: "",
          buyingPrice: product.cost ? product.cost.toString() : "",
          sellingPrice: product.price ? product.price.toString() : "",
          supplier: "",
          mfdDate: "",
          expiryDate: "",
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        });
      }
    }
  }, [isOpen, product, editingBatch]);
  if (!isOpen || !product) return null;
  const handleSubmit = async () => {
    if (!formData.quantity || !formData.buyingPrice || !formData.batchNumber) {
      alert("Quantity, Buying Price, and Batch Number are required.");
      return;
    }
    setIsSaving(true);
    try {
      const batchData = {
        batch_number: formData.batchNumber,
        quantity: parseFloat(formData.quantity),
        cost_price: parseFloat(formData.buyingPrice),
        selling_price: formData.sellingPrice ? parseFloat(formData.sellingPrice) : null,
        supplier: formData.supplier,
        mfd_date: formData.mfdDate || null,
        expiry_date: formData.expiryDate || null,
        created_at: new Date(formData.date).toISOString()
      };
      if (editingBatch) {
        const oldInitial = editingBatch.quantity || 0;
        const newInitial = batchData.quantity;
        let updates = { ...batchData };
        if (newInitial !== oldInitial) {
          const diff = newInitial - oldInitial;
          const oldRemaining = editingBatch.remainingQuantity !== void 0 ? editingBatch.remainingQuantity : editingBatch.remaining_quantity !== void 0 ? editingBatch.remaining_quantity : oldInitial;
          const newRemaining = oldRemaining + diff;
          if (newRemaining < 0) {
            alert(`Cannot reduce quantity below what has already been sold. Sold count: ${oldInitial - oldRemaining}`);
            setIsSaving(false);
            return;
          }
          updates.remaining_quantity = newRemaining;
        }
        await api.updateBatch(product.id, editingBatch.id, updates);
      } else {
        const newBatch = {
          ...batchData,
          id: crypto.randomUUID(),
          remaining_quantity: batchData.quantity
          // Initial remaining = total
        };
        await api.addBatch(product.id, newBatch);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save stock:", error);
      alert(`Failed to save stock: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800", children: editingBatch ? "Edit Stock Batch" : "Add New Stock Batch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 font-medium", children: product.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 12 }),
          " Batch Number"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium text-gray-700 bg-gray-50",
            value: formData.batchNumber,
            onChange: (e) => setFormData({ ...formData, batchNumber: e.target.value })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 12 }),
            " Quantity",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-gray-800",
              placeholder: "0",
              value: formData.quantity,
              onChange: (e) => setFormData({ ...formData, quantity: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 12 }),
            " Buying Price",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-gray-800",
              placeholder: "0.00",
              value: formData.buyingPrice,
              onChange: (e) => setFormData({ ...formData, buyingPrice: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
            " Purchase Date"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-gray-700",
              value: formData.date,
              onChange: (e) => setFormData({ ...formData, date: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
            " Supplier"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-gray-700",
              placeholder: "Optional",
              value: formData.supplier,
              onChange: (e) => setFormData({ ...formData, supplier: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 p-4 rounded-xl border border-primary/20 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
          " Optional Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5", children: "Selling Price (Batch)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                className: "w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white font-medium",
                placeholder: (_a = product.price) == null ? void 0 : _a.toString(),
                value: formData.sellingPrice,
                onChange: (e) => setFormData({ ...formData, sellingPrice: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5", children: "Expiry Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "date",
                className: "w-full px-3 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white font-medium",
                value: formData.expiryDate,
                onChange: (e) => setFormData({ ...formData, expiryDate: e.target.value })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSubmit,
          disabled: isSaving,
          className: "bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
          children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Saving..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18 }),
            " ",
            editingBatch ? "Update Batch" : "Add Stock"
          ] })
        }
      )
    ] })
  ] }) });
};
export {
  AddStockModal as A
};
