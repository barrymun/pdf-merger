import { PDFDocument } from "pdf-lib";
import { State } from "vanjs-core";

export interface AppState {
  uploadedFiles: State<FileList | null>;
  mergedPdf: State<PDFDocument | undefined>;
}
