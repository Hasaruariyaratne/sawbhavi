import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, o as Trash2, X, m as api, P as Package } from "./index-huoNlmn5.js";
import { P as Plus } from "./plus-BaFcR-HJ.js";
import { P as Phone } from "./phone-2H2HldOs.js";
import { M as MapPin } from "./map-pin-rey_McIX.js";
import { S as SquarePen } from "./square-pen-DN6028O1.js";
import { S as Save } from "./save-DaO2Sp2n.js";
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
const CATEGORIES = ["Seeds", "Spices", "Grocery Items", "Milk Items", "Dry Fish", "Other"];
const Suppliers = () => {
  const [suppliers, setSuppliers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const loadSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await api.getSuppliers();
      setSuppliers(data || []);
    } catch (error) {
      console.error("Failed to load suppliers", error);
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadSuppliers();
  }, []);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [currentSupplier, setCurrentSupplier] = reactExports.useState(null);
  const [viewingSupplier, setViewingSupplier] = reactExports.useState(null);
  const [products, setProducts] = reactExports.useState([]);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    category: "",
    phone: "",
    email: "",
    address: "",
    documents: [],
    supplied_items: []
  });
  reactExports.useEffect(() => {
    const fetchProducts = async () => {
      const p = await api.getProducts();
      setProducts(p || []);
    };
    fetchProducts();
  }, []);
  const handleOpenModal = (supplier) => {
    if (supplier) {
      setCurrentSupplier(supplier);
      setFormData({
        name: supplier.name,
        category: supplier.category,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
        documents: supplier.documents || []
      });
    } else {
      setCurrentSupplier(null);
      setFormData({
        name: "",
        category: "",
        phone: "",
        email: "",
        address: "",
        documents: [],
        supplied_items: []
      });
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSupplier(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplierData = {
        id: currentSupplier ? currentSupplier.id : void 0,
        ...formData
      };
      await api.addSupplier(supplierData);
      await loadSuppliers();
      handleCloseModal();
    } catch (e2) {
      console.error("Save failed:", e2);
      alert("Failed to save supplier: " + (e2.message || "Unknown error"));
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      await api.deleteSupplier(id);
      await loadSuppliers();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Supplier Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleOpenModal(),
          className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20 }),
            "Add Supplier"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 font-medium", children: "Loading Suppliers..." }) }) : suppliers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "No suppliers found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Add your first supplier to get started." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: suppliers.map((supplier) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 text-lg", children: supplier.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary", children: supplier.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-bold text-primary", children: supplier.name && supplier.name.substring(0, 2).toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-3 text-sm text-gray-600 cursor-pointer",
          onClick: () => setViewingSupplier(supplier),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16, className: "text-gray-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: supplier.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "text-gray-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: supplier.email || "No email" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-gray-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: supplier.address || "No address" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleOpenModal(supplier),
            className: "flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-lg text-primary hover:bg-primary/10 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 16 }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleDelete(supplier.id),
            className: "flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }),
              "Delete"
            ]
          }
        )
      ] })
    ] }, supplier.id)) }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800", children: currentSupplier ? "Edit Supplier" : "Add New Supplier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCloseModal, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Supplier Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              required: true,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
              placeholder: "e.g. Fresh Farms Ltd"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              required: true,
              value: formData.category,
              onChange: (e) => {
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                  supplied_items: []
                  // Clear items on category change? Or keep? Usually clear or filter.
                  // Let's keep them but maybe warn? No, better to clear for consistency with "choose category... then choose items" flow.
                }));
              },
              className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Category" }),
                CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
              ]
            }
          )
        ] }),
        formData.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700", children: [
            "Select Items (",
            formData.category,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-gray-200 rounded-xl max-h-48 overflow-y-auto p-2 bg-gray-50/50", children: products.filter((p) => (p.category || "").toLowerCase() === formData.category.toLowerCase() || formData.category === "Other" && !CATEGORIES.slice(0, 5).some((c) => (p.category || "").toLowerCase().includes(c.toLowerCase()))).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 text-center py-2", children: "No items found in this category." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: products.filter((p) => {
            if (!p.category) return false;
            const pCat = p.category.toLowerCase();
            const reqCat = formData.category.toLowerCase();
            if (reqCat === "other") return !CATEGORIES.slice(0, 5).some((c) => pCat.includes(c.toLowerCase()));
            return pCat.includes(reqCat.replace(" items", "").replace("es", ""));
          }).map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 hover:border-primary/50 cursor-pointer transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-gray-300 text-primary focus:ring-primary",
                checked: (formData.supplied_items || []).includes(product.id),
                onChange: (e) => {
                  const isChecked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    supplied_items: isChecked ? [...prev.supplied_items || [], product.id] : (prev.supplied_items || []).filter((id) => id !== product.id)
                  }));
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-700 truncate", children: product.name })
          ] }, product.id)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
            "Selected: ",
            (formData.supplied_items || []).length,
            " items"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "tel",
              required: true,
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
              placeholder: "e.g. +94 77 123 4567"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
            "Email ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-normal", children: "(Optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
              placeholder: "e.g. orders@freshfarms.lk"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
            "Address ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 font-normal", children: "(Optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: formData.address,
              onChange: (e) => setFormData({ ...formData, address: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
              placeholder: "e.g. Colombo 03, Sri Lanka",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100",
              onChange: async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const filePath = file.path;
                  const savedPath = await api.saveImage({ filePath, type: "image", file });
                  if (savedPath) {
                    setFormData((prev) => ({ ...prev, documents: [...prev.documents || [], savedPath] }));
                  }
                }
              }
            }
          ) }),
          formData.documents && formData.documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: formData.documents.map((doc, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs bg-gray-50 p-2 rounded", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px]", children: doc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFormData((prev) => {
                  var _a;
                  return { ...prev, documents: (_a = prev.documents) == null ? void 0 : _a.filter((_, i) => i !== index) };
                }),
                className: "text-red-500 hover:text-red-700",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
              }
            )
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCloseModal,
              className: "flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 20 }),
                "Save Supplier"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    viewingSupplier && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-primary-foreground p-6 flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold", children: viewingSupplier.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm", children: viewingSupplier.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
            " ",
            viewingSupplier.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setViewingSupplier(null),
            className: "bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 overflow-y-auto space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-gray-400 uppercase block mb-1", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-gray-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "text-primary" }),
              viewingSupplier.email || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 italic", children: "Not provided" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-gray-400 uppercase block mb-1", children: "Physical Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-gray-800 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-primary" }),
              viewingSupplier.address || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 italic", children: "Not provided" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-6 bg-primary rounded-full" }),
            "Supplied Items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-200 rounded-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50/50 px-6 py-3 border-b border-gray-200 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-6", children: "Item Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Cost Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-right", children: "Current Stock" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-100 bg-white", children: !viewingSupplier.supplied_items || viewingSupplier.supplied_items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-gray-400 text-sm", children: "No specific items linked to this supplier yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              viewingSupplier.supplied_items.map((itemId) => {
                const product = products.find((p) => p.id === itemId);
                if (!product) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 grid grid-cols-12 gap-4 text-sm items-center hover:bg-gray-50 transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-6 font-bold text-gray-800 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-8 h-8 rounded-lg bg-gray-100 p-0.5 border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden", children: [
                      product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: product.image,
                          className: "w-full h-full object-contain rounded-md",
                          alt: product.name,
                          onError: (e) => {
                            var _a;
                            e.target.style.display = "none";
                            (_a = e.target.nextElementSibling) == null ? void 0 : _a.classList.remove("hidden");
                          }
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-gray-400" }),
                      product.image && /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-gray-400 hidden" })
                    ] }),
                    product.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 text-right font-medium text-gray-600", children: [
                    "LKR ",
                    (product.cost || 0).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 text-right font-bold text-gray-900", children: [
                    product.stock,
                    " ",
                    product.unit || "Units"
                  ] })
                ] }, itemId);
              }),
              viewingSupplier.supplied_items.length > 0 && viewingSupplier.supplied_items.every((id) => !products.find((p) => p.id === id)) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-gray-400 italic", children: "Review: Linked items may have been deleted from inventory." })
            ] }) })
          ] })
        ] }),
        viewingSupplier.documents && viewingSupplier.documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-6 bg-blue-500 rounded-full" }),
            "Documents"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: viewingSupplier.documents.map((doc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: doc,
              target: "_blank",
              rel: "noreferrer",
              className: "px-4 py-2 border border-blue-100 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors",
              children: [
                "View Document ",
                i + 1
              ]
            },
            i
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              handleOpenModal(viewingSupplier);
              setViewingSupplier(null);
            },
            className: "flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 16 }),
              " Edit Details"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setViewingSupplier(null),
            className: "px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20",
            children: "Close"
          }
        )
      ] })
    ] }) })
  ] });
};
export {
  Suppliers as default
};
