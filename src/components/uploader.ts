import pluralize from "pluralize";
import van from "vanjs-core";

import { uploaderInputId } from "utils/constants";
import { appState } from "utils/state";

const { div, input, label, span } = van.tags;

export const Uploader = () => {
  const handleChange = (_event: Event) => {
    const pdfInput = document.getElementById(uploaderInputId)! as HTMLInputElement;
    const files = pdfInput.files;
    appState.uploadedFiles.val = files;
  };

  return div(
    {
      class: "uploader",
    },
    label(
      {
        for: uploaderInputId,
      },
      "Choose PDFs to merge",
    ),
    input({
      id: uploaderInputId,
      type: "file",
      multiple: true,
      accept: "application/pdf",
      onchange: handleChange,
    }),
    span(
      () =>
        `${
          (appState.uploadedFiles.val ?? []).length > 0 ? (appState.uploadedFiles.val ?? []).length.toString() : "No"
        } ${pluralize("file", (appState.uploadedFiles.val ?? []).length)} chosen`,
    ),
  );
};
