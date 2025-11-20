import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoicePDF = async (invoice) => {
  const filePath = `./invoices/${invoice.invoiceId}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(22).text("SocietyGate Maintenance Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Invoice ID: ${invoice.invoiceId}`);
  doc.text(`Resident ID: ${invoice.residentId}`);
  doc.text(`Period: ${invoice.period}`);
  doc.text(`Amount Paid: ₹${invoice.amount}`);
  doc.text(`Status: ${invoice.status}`);
  doc.text(`Generated On: ${new Date().toLocaleString()}`);

  doc.end();

  return filePath;
};
