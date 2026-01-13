import { i as useInventory, r as reactExports, m as api, j as jsxRuntimeExports, t as Search, X, o as Trash2, U as Users, Q as v4 } from "./index-CZQwUtkl.js";
import { S as Save } from "./save-ByZhh5_i.js";
import { P as Pen } from "./pen-jWCvYi8W.js";
import { P as Plus } from "./plus-DxZcEr1c.js";
import { B as Briefcase } from "./briefcase-B30tvsz9.js";
import { P as Phone } from "./phone-xRBc77Kb.js";
import { M as MapPin } from "./map-pin-gd6EF11M.js";
import { D as DollarSign } from "./dollar-sign-BhYwTCj-.js";
const Customers = () => {
  const { products } = useInventory();
  const [customers, setCustomers] = reactExports.useState([]);
  const [view, setView] = reactExports.useState("list");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "local"
    // 'local' | 'special'
  });
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(null);
  const [customerPrices, setCustomerPrices] = reactExports.useState([]);
  const [priceSearch, setPriceSearch] = reactExports.useState("");
  const [editingPrice, setEditingPrice] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    const data = await api.getCustomers();
    setCustomers(data || []);
  };
  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    const id = editingCustomer ? editingCustomer.id : v4();
    const customer = {
      id,
      ...formData,
      created_at: editingCustomer ? editingCustomer.created_at : (/* @__PURE__ */ new Date()).toISOString()
    };
    const success = await api.addCustomer(customer);
    if (success) {
      await fetchCustomers();
      setShowForm(false);
      setEditingCustomer(null);
      setFormData({ name: "", phone: "", email: "", address: "", type: "local" });
    }
  };
  const handleDeleteCustomer = async (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await api.deleteCustomer(id);
      await fetchCustomers();
    }
  };
  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      type: customer.type || "local"
    });
    setShowForm(true);
  };
  const handleManagePrices = async (customer) => {
    setSelectedCustomer(customer);
    const prices = await api.getCustomerPrices(customer.id);
    setCustomerPrices(prices || []);
    setView("prices");
  };
  const handleSetPrice = async (productId, price) => {
    if (isNaN(Number(price))) return;
    await api.saveCustomerPrice({
      customer_id: selectedCustomer.id,
      product_id: productId,
      special_price: Number(price)
    });
    const updated = await api.getCustomerPrices(selectedCustomer.id);
    setCustomerPrices(updated || []);
    setEditingPrice(null);
  };
  const handleRemovePrice = async (priceId) => {
    await api.deleteCustomerPrice(priceId);
    const updated = await api.getCustomerPrices(selectedCustomer.id);
    setCustomerPrices(updated || []);
  };
  const getPriceOverride = (productId) => {
    return customerPrices.find((cp) => cp.product_id === productId);
  };
  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(priceSearch.toLowerCase()) || p.id && p.id.toLowerCase().includes(priceSearch.toLowerCase())
  );
  if (view === "prices") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setView("list"),
            className: "text-gray-500 hover:text-gray-900 font-bold text-sm flex items-center gap-2 mb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "←" }),
              " Back to Customers"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-black text-gray-900 tracking-tight", children: [
          "Manage Prices: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-600", children: selectedCustomer == null ? void 0 : selectedCustomer.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium", children: "Set special pricing overrides for this customer." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl shadow-sm border border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-3.5 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search products to set special price...",
              value: priceSearch,
              onChange: (e) => setPriceSearch(e.target.value),
              className: "w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 font-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-gray-100 max-h-[60vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs font-bold text-gray-500 uppercase sticky top-0 z-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 bg-gray-50", children: "Product Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-right bg-gray-50", children: "Standard Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-right bg-gray-50", children: "Special Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-center bg-gray-50", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-100", children: filteredProducts.map((product) => {
            const override = getPriceOverride(product.id);
            const isEditing = (editingPrice == null ? void 0 : editingPrice.id) === product.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `hover:bg-gray-50 transition-colors ${override ? "bg-primary/5" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-bold text-gray-700", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 text-right text-gray-500", children: [
                "LKR ",
                product.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right font-bold", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  autoFocus: true,
                  type: "number",
                  value: editingPrice == null ? void 0 : editingPrice.price,
                  onChange: (e) => setEditingPrice({ id: product.id, price: e.target.value }),
                  className: "w-24 p-1 text-right border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: override ? "text-primary" : "text-gray-400", children: override ? `LKR ${override.special_price}` : "-" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-center", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => handleSetPrice(product.id, (editingPrice == null ? void 0 : editingPrice.price) || "0"),
                    className: "text-green-600 hover:bg-green-50 p-1 rounded",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setEditingPrice(null),
                    className: "text-gray-400 hover:bg-gray-100 p-1 rounded",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setEditingPrice({ id: product.id, price: override ? override.special_price.toString() : product.price.toString() }),
                    className: "text-primary hover:bg-primary/10 p-1 rounded transition-colors",
                    title: "Edit Price",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 })
                  }
                ),
                override && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => handleRemovePrice(override.id),
                    className: "text-red-400 hover:bg-red-50 p-1 rounded transition-colors",
                    title: "Remove Special Price",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
                  }
                )
              ] }) })
            ] }, product.id);
          }) })
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "Customer Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium mt-1", children: "Manage Local and Special pricing customers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setEditingCustomer(null);
            setFormData({ name: "", phone: "", email: "", address: "", type: "local" });
            setShowForm(true);
          },
          className: "flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20, strokeWidth: 2.5 }),
            " Add Customer"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-900", children: editingCustomer ? "Edit Customer" : "New Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "p-2 hover:bg-gray-100 rounded-full text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveCustomer, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Customer Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500", placeholder: "Enter name" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formData.type, onChange: (e) => setFormData({ ...formData, type: e.target.value }), className: "w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "local", children: "Local Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "special", children: "Special Customer" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), className: "w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500", placeholder: "07..." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.address, onChange: (e) => setFormData({ ...formData, address: e.target.value }), className: "w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500", placeholder: "Optional location" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:opacity-90 mt-4",
            children: editingCustomer ? "Update Customer" : "Create Customer"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-6", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-6", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-6", children: "Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-6 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-100", children: [
        customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50/80 transition-colors group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-sm ${c.type === "special" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"}`, children: c.name.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900 text-lg", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-medium", children: [
                "ID: ",
                c.id.slice(0, 8)
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${c.type === "special" ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary"}`, children: [
            c.type === "special" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
            c.type || "Local"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-6 text-sm text-gray-500 space-y-1", children: [
            c.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
              " ",
              c.phone
            ] }),
            c.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
              " ",
              c.address
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end items-center gap-2", children: [
            c.type === "special" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleManagePrices(c),
                className: "flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors mr-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 14 }),
                  " Manage Prices"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(c), className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteCustomer(c.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }) })
          ] }) })
        ] }, c.id)),
        customers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-12 text-center text-gray-400 font-medium", children: "No customers found. Add one to get started." }) })
      ] })
    ] }) })
  ] });
};
export {
  Customers as default
};
