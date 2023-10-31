import { PDFDocument } from "pdf-lib";
import van from "vanjs-core";

import { mergerIframeId, uploaderInputId } from "utils/constants";
import { appState } from "utils/state";

const { button, div, iframe } = van.tags;

export const Merger = () => {
  const mergePDFs = async () => {
    const pdfDocs = [];
    const pdfInput = document.getElementById(uploaderInputId)! as HTMLInputElement;
    const files = pdfInput.files;

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

    // save the merged PDF to appState
    appState.mergedPdf.val = mergedPdf;

    showPreview();
  };

  const showPreview = async () => {
    if (!appState.mergedPdf.val) {
      return;
    }

    // Assume mergedPdf is your PDFDocument instance
    const base64String = await appState.mergedPdf.val.saveAsBase64();
    const src = `data:application/pdf;base64,${base64String}`;
    const iframe = document.getElementById(mergerIframeId)! as HTMLIFrameElement;
    iframe.src = src;
  };

  const download = async () => {
    if (!appState.mergedPdf.val) {
      return;
    }

    // Serialize the merged PDF to bytes and provide it for download
    const mergedPdfBytes = await appState.mergedPdf.val.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();
  };

  van.derive(() => {
    if ((appState.uploadedFiles.val ?? []).length === 0) {
      const iframe = document.getElementById(mergerIframeId) as HTMLIFrameElement | undefined;
      if (!iframe) {
        return;
      }
      iframe.src = "";
      return;
    }

    mergePDFs();
  });

  return div(
    {
      class: "merger",
    },
    div(
      iframe({
        id: mergerIframeId,
        type: "application/pdf",
        width: "100%",
        height: () => ((appState.uploadedFiles.val ?? []).length > 0 ? "100%" : 0),
      }),
    ),
    () =>
      div(
        {
          class: "download-btn-cntr",
        },
        (appState.uploadedFiles.val ?? []).length > 0
          ? button(
              {
                onclick: download,
              },
              "Merge PDFs",
            )
          : null,
      ),
  );
};
