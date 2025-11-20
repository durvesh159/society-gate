// src/utils/generateInvoice.js
// Uses html2canvas if available to create an image and download it.
// Fallback is window.print() which prints the invoice DOM element.

export async function downloadInvoice(invoiceElementId, filename = "invoice.png") {
  const el = document.getElementById(invoiceElementId);
  if (!el) return alert("Invoice element not found");

  // try html2canvas if available (recommended)
  if (window.html2canvas) {
    try {
      const canvas = await window.html2canvas(el, { scale: 2, useCORS: true });
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    } catch (e) {
      console.warn("html2canvas failed, falling back to print", e);
    }
  }

  // fallback to print
  const printWindow = window.open("", "_blank", "width=800,height=800");
  printWindow.document.write(`<html><head><title>Invoice</title></head><body>${el.innerHTML}</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
