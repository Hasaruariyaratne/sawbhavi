import { a0 as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, J as CircleCheckBig } from "./index-9gESouBv.js";
import { C as Card, a as CardContent } from "./card-BsaGVppT.js";
import { T as Truck } from "./truck-DjDYOU34.js";
import { C as Clock } from "./clock-CxfLusHn.js";
import { M as MapPin } from "./map-pin-HLL7arn_.js";
const MOCK_TASKS = [
  {
    id: "ORD-001",
    customer: "John Doe",
    address: "123 Main St, Batticaloa",
    status: "pending",
    // pending, delivered
    items: "Rice 5kg, Sugar 1kg",
    total: 5400
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    address: "45 Lake Rd, Kattankudy",
    status: "delivered",
    items: "Milk Powder, Tea Leaves",
    total: 2100
  }
];
const RiderDashboard = () => {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = reactExports.useState(MOCK_TASKS);
  const toggleStatus = (taskId) => {
    setTasks((prev) => prev.map(
      (t) => t.id === taskId ? { ...t, status: t.status === "pending" ? "delivered" : "pending" } : t
    ));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-100 p-2 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "text-primary-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-lg text-gray-900", children: "Rider Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
            "Welcome, ",
            user == null ? void 0 : user.email
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: signOut, children: "Sign Out" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-blue-50 border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-blue-700 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase", children: "Pending" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-900", children: tasks.filter((t) => t.status === "pending").length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-green-50 border-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-700 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase", children: "Delivered" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-900", children: tasks.filter((t) => t.status === "delivered").length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-gray-800 mb-3 ml-1", children: "Today's Tasks" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: tasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-l-4 ${task.status === "pending" ? "border-l-blue-500" : "border-l-green-500"} shadow-sm`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900", children: task.customer }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600", children: task.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold px-2 py-1 rounded-full ${task.status === "pending" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`, children: task.status.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "mt-0.5 shrink-0 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: task.address })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-6 text-xs text-gray-500", children: [
          "Items: ",
          task.items
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: `w-full ${task.status === "pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          onClick: () => toggleStatus(task.id),
          children: task.status === "pending" ? "Mark Delivered" : "Mark Pending"
        }
      )
    ] }) }, task.id)) })
  ] });
};
export {
  RiderDashboard as default
};
