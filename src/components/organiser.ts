import Sortable from "sortablejs";
import van from "vanjs-core";

import { sortableFilesListId } from "utils/constants";
import { appState } from "utils/state";

const { div, ul, li } = van.tags;

let sortable: Sortable | undefined;

export const Organiser = () => {
  const createSortableList = async () => {
    const sortableEl = document.getElementById(sortableFilesListId) as HTMLUListElement | undefined;
    if (!sortableEl) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      createSortableList();
      return;
    }

    sortableEl.innerHTML = "";
    Array.from(appState.uploadedFiles.val ?? []).forEach((file) => {
      sortableEl.appendChild(
        li({
          class: "file",
          textContent: file.name,
        }),
      );
    });

    sortable = Sortable.create(sortableEl, {
      group: sortableFilesListId,
      animation: 150,
    });
  };

  van.derive(() => {
    if (sortable) {
      sortable.destroy();
      sortable = undefined;
    }
    if ((appState.uploadedFiles.val ?? []).length === 0) {
      return;
    }
    createSortableList();
  });

  return div(
    {
      class: "organiser",
    },
    () =>
      ul(
        { id: sortableFilesListId },
        // Array.from(appState.uploadedFiles.val ?? []).map((file) => {
        //   return li({
        //     // class: "file",
        //     textContent: file.name,
        //   });
        // }),
      ),
  );
};
