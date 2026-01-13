import { j as jsxRuntimeExports } from "./index-CZQwUtkl.js";
const defaultBillLayout = {
  paper: {
    size: "A4",
    width: "210mm",
    height: "297mm",
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    orientation: "portrait"
  },
  global: {
    fontFamily: "Inter, sans-serif",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#000000"
  },
  header: {
    show: true,
    minHeight: 30,
    gap: 5,
    border: {
      show: false,
      width: 1,
      radius: 0,
      style: "solid",
      color: "#000000",
      padding: 0
    },
    logo: {
      show: true,
      url: "",
      width: 25,
      align: "left"
    },
    companyInfo: {
      showName: true,
      nameStyle: { fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: "bold", align: "left", color: "#000000", lineHeight: 1.2 },
      showTagline: true,
      taglineStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#666666" },
      showAddress: true,
      addressStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#000000" },
      showContact: true,
      contactStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#000000" },
      showTaxId: true,
      taxIdStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#000000" },
      showEmail: true,
      align: "left"
    }
  },
  strip: {
    show: true,
    gap: 5,
    fillColor: "#f3f4f6",
    border: { show: false, width: 0, radius: 0, style: "none", color: "#000000", padding: 5 },
    style: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#000000" },
    elements: [
      { id: "billNo", type: "text", label: "Bill No:", value: "billNo", show: true, order: 1 },
      { id: "date", type: "text", label: "Date:", value: "date", show: true, order: 2 },
      { id: "time", type: "text", label: "Time:", value: "time", show: true, order: 3 },
      // Added
      { id: "customer", type: "text", label: "Customer:", value: "customer", show: true, order: 4 },
      { id: "orderName", type: "text", label: "Order:", value: "orderName", show: false, order: 5 }
      // Added
    ]
  },
  body: {
    gap: 5,
    border: {
      show: false,
      width: 0,
      radius: 0,
      style: "none",
      color: "#000000",
      padding: 0
    },
    groupByCategory: true,
    table: {
      headerStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "bold", align: "left", color: "#000000", backgroundColor: "#e5e7eb" },
      rowStyle: { fontFamily: "inherit", fontSize: 10, fontWeight: "normal", align: "left", color: "#000000", density: "normal", striped: false },
      categoryRowStyle: {
        backgroundColor: "#ffffff",
        fontFamily: "inherit",
        fontSize: 10,
        fontWeight: "bold",
        align: "left",
        color: "#000000"
      },
      columns: [
        { id: "sno", label: "S.No", width: 8, show: true, align: "center" },
        { id: "name", label: "Item Name", width: 42, show: true, align: "left" },
        { id: "qty", label: "Qty", width: 10, show: true, align: "center" },
        { id: "price", label: "Price", width: 20, show: true, align: "right" },
        { id: "total", label: "Total", width: 20, show: true, align: "right" }
      ],
      gridLines: {
        show: true,
        color: "#e5e7eb",
        width: 1
      }
    },
    totals: {
      show: true,
      align: "right",
      style: { fontFamily: "inherit", fontSize: 12, fontWeight: "bold", align: "right", color: "#000000" },
      labels: {
        subtotal: "Subtotal",
        discount: "Discount",
        tax: "Tax",
        total: "Total"
      }
    },
    footer: {
      show: true,
      content: "Thank you for your business!",
      style: { fontFamily: "inherit", fontSize: 9, fontWeight: "normal", align: "center", color: "#666666", marginTop: 10 },
      signatures: {
        show: true,
        marginTop: 20,
        sellerLabel: "Authorized Signatory",
        buyerLabel: "Customer Signature",
        style: { fontFamily: "inherit", fontSize: 10, fontWeight: "bold", align: "center", color: "#000000" },
        showOnEveryPage: false
      }
    }
  }
};
const formatCurrency = (amount) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (value === void 0 || value === null || isNaN(value)) return "Rs. 0.00";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value).replace("LKR", "Rs.");
};
const groupItems = (items, groupByCategory) => {
  if (!items) return { "Items": [] };
  if (!groupByCategory) return { "Items": items };
  const groups = {};
  items.forEach((item) => {
    const cat = item.category || "Uncategorized";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });
  return groups;
};
const getTextStyle = (style) => {
  if (!style) return {};
  return {
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}pt`,
    fontWeight: style.fontWeight,
    textAlign: style.align,
    color: style.color,
    letterSpacing: style.letterSpacing ? `${style.letterSpacing}px` : void 0,
    lineHeight: style.lineHeight,
    marginTop: style.marginTop ? `${style.marginTop}mm` : void 0,
    marginBottom: style.marginBottom ? `${style.marginBottom}mm` : void 0,
    textTransform: style.case || "none"
  };
};
const BillPreview = ({ config, data, items = [], scale = 1, className = "", id }) => {
  var _a, _b, _c;
  if (!config) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No Config" });
  const styles = {
    container: {
      width: "100%",
      // If explicit height set, use it, else A4 default for pages
      minHeight: config.paper.height ? `${config.paper.height}mm` : "297mm",
      // DYNAMIC MARGINS from Settings
      paddingTop: `${config.paper.margins.top}mm`,
      paddingBottom: `${config.paper.margins.bottom}mm`,
      paddingLeft: `${config.paper.margins.left}mm`,
      paddingRight: `${config.paper.margins.right}mm`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontFamily: config.global.fontFamily,
      fontSize: `${config.global.fontSize}pt`,
      lineHeight: config.global.lineHeight,
      color: config.global.color,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      transform: `scale(${scale})`,
      transformOrigin: "top center",
      backgroundColor: "#fff"
    },
    headerContainer: {
      border: config.header.border.show ? `${config.header.border.width}px ${config.header.border.style} ${config.header.border.color}` : "none",
      borderRadius: `${config.header.border.radius}px`,
      padding: `${config.header.border.padding}px`,
      minHeight: `${config.header.minHeight}mm`,
      marginBottom: `${config.header.gap}mm`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    stripContainer: {
      border: ((_a = config.strip.border) == null ? void 0 : _a.show) ? `${config.strip.border.width}px ${config.strip.border.style} ${config.strip.border.color}` : "none",
      borderRadius: `${(_b = config.strip.border) == null ? void 0 : _b.radius}px`,
      padding: `${(_c = config.strip.border) == null ? void 0 : _c.padding}px`,
      marginBottom: `${config.body.gap}mm`,
      backgroundColor: config.strip.fillColor || "transparent",
      borderBottom: "1px solid #000",
      paddingBottom: "5px",
      ...getTextStyle(config.strip.style)
    }
  };
  const company = {
    name: data.storeName || "Store Name",
    tagline: data.tagline || "Best Quality Products",
    address: data.address || "123 Main St, City, Country",
    contact: data.contact || "Tel: 0123456789",
    email: data.email || "email@example.com",
    // Added Email
    taxId: data.taxId || "VAT: 123456789"
  };
  const renderHeader = () => {
    if (!config.header.show) return null;
    const h = config.header;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: h.companyInfo.align === "center" ? "center" : h.companyInfo.align === "right" ? "flex-end" : "flex-start" }, children: [
      h.logo.show && h.logo.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: h.logo.url,
          style: {
            width: `${h.logo.width}mm`,
            marginRight: "10px",
            objectFit: "contain"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: h.companyInfo.align, flex: 1 }, children: [
        h.companyInfo.showName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.nameStyle), children: company.name }),
        h.companyInfo.showTagline && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.taglineStyle), children: company.tagline }),
        h.companyInfo.showAddress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.addressStyle), children: company.address }),
        h.companyInfo.showContact && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.contactStyle), children: company.contact }),
        (h.companyInfo.showEmail ?? true) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.contactStyle), children: company.email }),
        h.companyInfo.showTaxId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getTextStyle(h.companyInfo.taxIdStyle), children: company.taxId })
      ] })
    ] }) });
  };
  const renderStrip = () => {
    if (!config.strip.show) return null;
    const elements = [...config.strip.elements].sort((a, b) => a.order - b.order);
    const getValue = (id2) => {
      var _a2;
      switch (id2) {
        case "date":
          return data.date ? new Date(data.date).toLocaleDateString() : (/* @__PURE__ */ new Date()).toLocaleDateString();
        case "time":
          return data.date ? new Date(data.date).toLocaleTimeString() : (/* @__PURE__ */ new Date()).toLocaleTimeString();
        case "billNo":
          return data.billNo || "0000";
        case "customer":
          return ((_a2 = data.customer) == null ? void 0 : _a2.name) || data.customerName || "Walk-in";
        case "orderName":
          return data.orderName || "";
        default:
          return "";
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stripContainer, className: "flex flex-wrap justify-between", children: elements.filter((e) => e.show).map((el) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginRight: "15px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: "normal" }, children: [
        el.label,
        " "
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getValue(el.id) })
    ] }, el.id)) });
  };
  const renderTable = (groupedItems) => {
    const t = config.body.table;
    const columns = t.columns.filter((c) => c.show);
    const headerRowStyle = {
      display: "flex",
      borderBottom: `${t.gridLines.width}px solid ${t.gridLines.color}`,
      backgroundColor: t.headerStyle.backgroundColor || "transparent",
      ...getTextStyle(t.headerStyle)
    };
    const getHeaderCellStyle = (col) => ({
      flex: col.width,
      textAlign: "center",
      padding: "4px 2px",
      borderRight: t.gridLines.show ? `${t.gridLines.width}px solid ${t.gridLines.color}` : "none"
    });
    const getRowStyle = (isEven) => ({
      display: "flex",
      backgroundColor: t.rowStyle.striped && !isEven ? "#f9fafb" : "transparent",
      padding: t.rowStyle.density === "compact" ? "2px 0" : t.rowStyle.density === "relaxed" ? "8px 0" : "4px 0",
      borderBottom: t.gridLines.show ? `${t.gridLines.width}px solid ${t.gridLines.color}` : "none",
      ...getTextStyle(t.rowStyle)
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", marginBottom: `${config.body.gap}mm` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: headerRowStyle, children: columns.map((col, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...getHeaderCellStyle(col), borderRight: idx === columns.length - 1 ? "none" : getHeaderCellStyle(col).borderRight }, children: col.label }, col.id)) }),
      Object.entries(groupedItems).map(([category, catItems]) => {
        var _a2;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          config.body.groupByCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            ...getTextStyle(t.categoryRowStyle),
            backgroundColor: (_a2 = t.categoryRowStyle) == null ? void 0 : _a2.backgroundColor,
            padding: "4px",
            borderBottom: t.gridLines.show ? `1px solid ${t.gridLines.color}` : "none"
          }, children: [
            "— ",
            category,
            " —"
          ] }),
          catItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: getRowStyle(idx % 2 === 0), children: columns.map((col, cIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            flex: col.width,
            textAlign: col.align,
            padding: "0 2px",
            borderRight: t.gridLines.show && cIdx !== columns.length - 1 ? `${t.gridLines.width}px solid ${t.gridLines.color}` : "none"
          }, children: [
            col.id === "sno" && idx + 1,
            col.id === "itemNo" && (item.item_number || item.itemNo || "-"),
            col.id === "name" && item.name,
            col.id === "qty" && (item.quantity !== void 0 ? item.quantity : item.qty !== void 0 ? item.qty : 1),
            col.id === "price" && formatCurrency(item.price),
            col.id === "total" && formatCurrency((item.price || 0) * (item.quantity !== void 0 ? item.quantity : item.qty !== void 0 ? item.qty : 1)),
            !["sno", "name", "qty", "price", "total", "itemNo"].includes(col.id) && "-"
          ] }, col.id)) }, item.id || idx))
        ] }, category);
      })
    ] });
  };
  const renderTotals = () => {
    if (!config.body.totals.show) return null;
    const s = config.body.totals.style;
    const l = config.body.totals.labels;
    const subtotal = data.subtotal || items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = data.discount || 0;
    const tax = data.tax || 0;
    const total = data.total || subtotal - discount + tax;
    const rowStyle = {
      display: "flex",
      justifyContent: config.body.totals.align === "right" ? "flex-end" : "flex-start",
      alignItems: "center",
      ...getTextStyle(s),
      marginTop: "2px"
    };
    const labelStyle = {
      width: "100px",
      textAlign: "right",
      marginRight: "10px"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginTop: "10px",
      borderTop: config.body.border.show ? `1px solid ${config.body.border.color}` : "none",
      paddingTop: "10px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: rowStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: labelStyle, children: [
          l.subtotal || "Subtotal",
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(subtotal) })
      ] }),
      discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: rowStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: labelStyle, children: [
          l.discount || "Discount",
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "- ",
          formatCurrency(discount)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...rowStyle, justifyContent: "flex-end", fontSize: `${s.fontSize + 4}pt`, marginTop: "5px", fontWeight: "bold" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: labelStyle, children: [
          l.total || "Total",
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(total) })
      ] })
    ] });
  };
  const renderFooter = () => {
    const f = config.body.footer;
    const showFooter = f.show ?? true;
    if (!showFooter) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { paddingTop: `${f.style.marginTop}mm` }, children: [
      f.signatures.show !== false && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginTop: `${f.signatures.marginTop}mm`,
        display: "flex",
        justifyContent: "space-between",
        ...getTextStyle(f.signatures.style)
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderTop: "1px solid black", width: "30%", paddingTop: "5px", textAlign: "center" }, children: f.signatures.sellerLabel || "Seller Signature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderTop: "1px solid black", width: "30%", paddingTop: "5px", textAlign: "center" }, children: f.signatures.buyerLabel || "Buyer Signature" })
      ] }),
      f.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "5mm", ...getTextStyle(f.style) }, children: f.content })
    ] });
  };
  const ITEMS_PER_PAGE = 25;
  const pages = [];
  if (items.length === 0) {
    pages.push([]);
  } else {
    for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
      pages.push(items.slice(i, i + ITEMS_PER_PAGE));
    }
  }
  const totalPages = pages.length;
  const renderPage = (pageItems, pageIndex) => {
    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === totalPages - 1;
    const pageGroupedItems = groupItems(pageItems, config.body.groupByCategory);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bill-page-renderer mx-auto bg-white ${className}`,
        style: {
          ...styles.container,
          marginBottom: "20px",
          // Visual gap between pages in preview
          position: "relative",
          pageBreakAfter: isLastPage ? "auto" : "always",
          height: "auto"
          // Allow it to hold content, minHeight ensures paper size
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
            isFirstPage && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              renderHeader(),
              renderStrip()
            ] }),
            renderTable(pageGroupedItems),
            isLastPage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "auto" }, children: [
              renderTotals(),
              renderFooter()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            position: "absolute",
            bottom: `${config.paper.margins.bottom ? config.paper.margins.bottom / 3 : 5}mm`,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "8pt",
            color: "#666"
          }, children: [
            "Page ",
            pageIndex + 1,
            " of ",
            totalPages
          ] })
        ]
      },
      pageIndex
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id, className: `bill-preview-wrapper flex flex-col items-center ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                @media print {
                    /* Page break logic via global CSS mostly */
                    .bill-page-renderer {
                        margin: 0 !important;
                        box-shadow: none !important;
                        page-break-after: always;
                        width: 100% !important;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                        overflow: visible !important;
                    }
                    .bill-page-renderer:last-child {
                        page-break-after: auto;
                    }
                }
            ` }),
    pages.map((chunk, idx) => renderPage(chunk, idx))
  ] });
};
export {
  BillPreview as B,
  defaultBillLayout as d
};
