import { PDFDocument } from "pdf-lib";
import van from "vanjs-core";

import { uploaderInputId } from "utils/constants";

const { button, div, input } = van.tags;

export const Uploader = () => {
  const mergePDFs = async () => {
    const pdfDocs = [];
    const pdfInput = document.getElementById(uploaderInputId)! as HTMLInputElement;
    const files = pdfInput.files;
    console.log(files);

    if (!files) {
      return;
    }

    // Load the PDFs into PDFDocument instances
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      pdfDocs.push(pdfDoc);
    }

    // Create a new PDFDocument
    const mergedPdf = await PDFDocument.create();

    // Copy pages from the loaded PDFs into the new PDF
    for (const pdfDoc of pdfDocs) {
      const pageCount = pdfDoc.getPageCount();
      for (let i = 0; i < pageCount; i++) {
        const [page] = await mergedPdf.copyPages(pdfDoc, [i]);
        mergedPdf.addPage(page);
      }
    }

    // Serialize the merged PDF to bytes and provide it for download
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();
  };

  return div(
    {
      class: "uploader",
    },
    input({
      id: uploaderInputId,
      type: "file",
      multiple: true,
    }),
    button(
      {
        onclick: mergePDFs,
      },
      "Merge PDFs",
    ),
  );
};
