import { r as reactExports, z as SupabaseService, j as jsxRuntimeExports, o as Trash2, e as Tag, J as CircleCheckBig } from "./index-fHUEKpF0.js";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-C8PLS3lv.js";
import { P as Plus } from "./plus-BRdCdj-o.js";
import { C as CircleX } from "./circle-x-BF3D4Cs2.js";
import "./index-DfJaa3UI.js";
const Promotions = () => {
  const [promotions, setPromotions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [newPromo, setNewPromo] = reactExports.useState({
    code: "",
    description: "",
    type: "percentage",
    value: 0,
    min_order_value: 0,
    is_active: true
  });
  reactExports.useEffect(() => {
    fetchPromotions();
  }, []);
  const fetchPromotions = async () => {
    setLoading(true);
    const data = await SupabaseService.getPromotions();
    setPromotions(data || []);
    setLoading(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const success = await SupabaseService.savePromotion(newPromo);
    if (success) {
      setIsDialogOpen(false);
      fetchPromotions();
      setNewPromo({ code: "", description: "", type: "percentage", value: 0, min_order_value: 0, is_active: true });
    } else {
      alert("Failed to save promotion");
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      await SupabaseService.deletePromotion(id);
      fetchPromotions();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Promotions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage discount codes and offers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20 }),
          " New Promotion"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Promotion" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Code (e.g., WELCOME10)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  required: true,
                  type: "text",
                  value: newPromo.code,
                  onChange: (e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() }),
                  className: "w-full px-3 py-2 border rounded-lg uppercase"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: newPromo.type,
                  onChange: (e) => setNewPromo({ ...newPromo, type: e.target.value }),
                  className: "w-full px-3 py-2 border rounded-lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "percentage", children: "Percentage (%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fixed", children: "Fixed Amount (LKR)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Value" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    required: true,
                    value: newPromo.value,
                    onChange: (e) => setNewPromo({ ...newPromo, value: parseFloat(e.target.value) }),
                    className: "w-full px-3 py-2 border rounded-lg"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Min Order Value" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    value: newPromo.min_order_value,
                    onChange: (e) => setNewPromo({ ...newPromo, min_order_value: parseFloat(e.target.value) }),
                    className: "w-full px-3 py-2 border rounded-lg"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: newPromo.description,
                  onChange: (e) => setNewPromo({ ...newPromo, description: e.target.value }),
                  className: "w-full px-3 py-2 border rounded-lg",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90", children: "Save Promotion" })
          ] })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: promotions.map((promo) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleDelete(promo.id),
          className: "absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl text-gray-900", children: promo.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: promo.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10 }),
            " Active"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-red-600 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 10 }),
            " Inactive"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900", children: promo.type === "percentage" ? `${promo.value}%` : `LKR ${promo.value}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Min Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [
            "LKR ",
            promo.min_order_value
          ] })
        ] }),
        promo.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded border border-gray-100", children: promo.description })
      ] })
    ] }, promo.id)) })
  ] });
};
export {
  Promotions as default
};
