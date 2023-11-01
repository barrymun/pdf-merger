import van from "vanjs-core";

import { Merger } from "components/merger";
import { Organiser } from "components/organiser";
import { Uploader } from "components/uploader";

import "assets/style.css";

const dom = document.body as HTMLBodyElement;

van.add(dom, Uploader());
van.add(dom, Organiser());
van.add(dom, Merger());

const handleLoad = () => {
  // console.log("load");
};

const handleUnload = () => {
  window.removeEventListener("load", handleLoad);
  window.removeEventListener("unload", handleUnload);
};

window.addEventListener("load", handleLoad);
window.addEventListener("unload", handleUnload);
