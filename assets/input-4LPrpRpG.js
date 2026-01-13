import { r as reactExports, j as jsxRuntimeExports, H as cn } from "./index-CbpJklZT.js";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 focus-visible:border-primary-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm hover:border-gray-300",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
export {
  Input as I
};
