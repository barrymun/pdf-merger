import van from "vanjs-core";

import { AppState } from "utils/types";

// modelled off https://vanjs.org/advanced#state-granularity
export const appState: AppState = {
  uploadedFiles: van.state(null),
  mergedPdf: van.state(undefined),
};
