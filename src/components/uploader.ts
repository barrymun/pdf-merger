import van from "vanjs-core";

import { uploaderInputId } from "utils/constants";

const { button, div, input } = van.tags;

export const Uploader = () => {
  const handleClick = (event: Event) => {
    console.log(event);
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
        onclick: handleClick,
      },
      "Merge PDFs",
    ),
  );
};
