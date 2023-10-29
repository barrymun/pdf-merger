import van from "vanjs-core";

import { Uploader } from "components/uploader";

import "assets/style.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, Uploader());

const handleLoad = () => {
  console.log("load");
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
