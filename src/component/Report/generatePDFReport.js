
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDFReport = (selectedComponents) => {
  const doc = new jsPDF();

  // Centered Title
  doc.setFontSize(18);
  doc.text("PC Builder Report", doc.internal.pageSize.getWidth() / 2, 15, {
    align: "center",
  });

  // Prepare Table Rows
  const rows = [];
  let serial = 1;
  let totalAmount = 0;

  for (const category in selectedComponents) {
    selectedComponents[category]?.forEach((item) => {
      const price = Number(item.price) || 0;
      totalAmount += price;

      rows.push([
        serial++,
        item.productName || item.name || "N/A",
        item.status || "N/A",
        item.category || category,
        price.toFixed(2),
      ]);
    });
  }

  // Table with headers
autoTable(doc, {
  startY: 25,
  head: [["SL", "Name", "Status", "Category", "Price"]],
  body: rows,
  foot: [[
    { content: "Total Amount", colSpan: 4, styles: { halign: "right", fontStyle: "bold" } },
    { content: totalAmount.toFixed(2), styles: { halign: "center", fontStyle: "bold" } },
  ]],
  styles: {
    lineWidth: 0.5,
    lineColor: [0, 0, 0],
    textColor: [0, 0, 0],
  },
  headStyles: {
    fillColor: [220, 220, 220],
    textColor: [0, 0, 0],
    fontStyle: "bold",
    halign: "center",
  },
    footStyles: {
    fillColor: [220, 220, 220], // Same as header
    textColor: [0, 0, 0],
    fontStyle: "bold",
    halign: "center",
  },
  columnStyles: {
    0: { halign: "center" },
    1: { halign: "center" },
    2: { halign: "center" },
    3: { halign: "center" },
    4: { halign: "center" },
  },
});
   const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - 40,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  doc.save("pc-builder-report.pdf");
};