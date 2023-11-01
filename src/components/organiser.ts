import Sortable from "sortablejs";
import van from "vanjs-core";

import { sortableFilesListId } from "utils/constants";
import { appState } from "utils/state";

const { div, ul, li } = van.tags;

let sortable: Sortable | undefined;

export const Organiser = () => {
  /**
   * re-order the files as per the user's drag and drop selection
   */
  const handleUpdate = () => {
    const sortableEl = document.getElementById(sortableFilesListId) as HTMLUListElement;
    const options = Array.from(sortableEl.querySelectorAll("li")).map((li) => li.textContent);
    const newFiles: File[] = [];
    for (const option of options) {
      const file = Array.from(appState.uploadedFiles.val ?? []).find((file) => file.name === option);
      if (!file) {
        continue;
      }
      newFiles.push(file);
    }
    appState.uploadedFiles.val = newFiles as unknown as FileList;
  };

  const createSortableList = async () => {
    const sortableEl = document.getElementById(sortableFilesListId) as HTMLUListElement | undefined;
    if (!sortableEl) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      createSortableList();
      return;
    }

    sortableEl.innerHTML = "";
    // filthy hack as doing this in the returned value seems to cause problems 😈
    Array.from(appState.uploadedFiles.val ?? []).forEach((file) => {
      sortableEl.appendChild(
        li({
          textContent: file.name,
        }),
      );
    });

    sortable = Sortable.create(sortableEl, {
      group: sortableFilesListId,
      animation: 150,
      onUpdate: handleUpdate,
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
        //     textContent: file.name,
        //   });
        // }),
      ),
  );
};
