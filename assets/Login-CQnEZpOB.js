import { c as createLucideIcon, r as reactExports, a0 as useAuth, f as useNavigate, j as jsxRuntimeExports } from "./index-xaK5Affb.js";
import { C as CircleAlert } from "./circle-alert-gLh52tnv.js";
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
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode);
const logo = "" + new URL("logo-CynP7xgr.png", import.meta.url).href;
const Login = () => {
  const [isSignUp, setIsSignUp] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("admin@pos.com");
  const [password] = reactExports.useState("admin123");
  const [role, setRole] = reactExports.useState("admin");
  const [error, setError] = reactExports.useState("");
  const { login, signUp } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let success;
    if (isSignUp) {
      success = await signUp(email, password, role);
      if (success) {
        navigate("/");
      } else {
        setError("Sign up failed. Try again.");
      }
    } else {
      success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Login failed. Please check system logs.");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center border-b border-gray-100 bg-gray-50/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Logo", className: "w-full h-full object-contain" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800", children: isSignUp ? "Create Account" : "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: isSignUp ? "Register to access the system" : "Ready to start Sawbhavi POS" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 20 }),
          error
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700 ml-1", children: "User Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-medium text-gray-600",
                placeholder: "Enter your email"
              }
            )
          ] }),
          isSignUp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700 ml-1", children: "Select Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: role,
                onChange: (e) => setRole(e.target.value),
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Super Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manager", children: "Shop Manager" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "accountant", children: "Accountant" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rider", children: "Delivery Rider" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            className: "w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group text-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isSignUp ? "Create Account" : "Enter POS System" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 20, className: "fill-current" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setIsSignUp(!isSignUp);
            setError("");
          },
          className: "text-sm text-primary font-semibold hover:text-primary/80 transition-colors",
          children: isSignUp ? "Back to Login" : "Register New User"
        }
      ) })
    ] })
  ] }) });
};
export {
  Login as default
};
