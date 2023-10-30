import pluralize from "pluralize";
import van from "vanjs-core";

import { uploaderInputId } from "utils/constants";

const { div, input, label, span } = van.tags;

export const Uploader = () => {
  const filesChosen = van.state<number>(0);
  console.log(filesChosen.val);

  const handleChange = (_event: Event) => {
    const pdfInput = document.getElementById(uploaderInputId)! as HTMLInputElement;
    const files = pdfInput.files;

    if (!files) {
      return;
    }

    filesChosen.val = files.length;
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
      {},
      () => `${filesChosen.val > 0 ? filesChosen.val.toString() : "No"} ${pluralize("file", filesChosen.val)} chosen`,
    ),
  );
};
