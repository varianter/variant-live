import { transform } from "@babel/standalone";
import monaco from "./monaco";

let noop = () => {};

function save(src) {
  localStorage.setItem("editorContent", src);
}
function getSaved() {
  return localStorage.getItem("editorContent");
}

function getQueryData() {
  let urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("content")) return "";
  return decodeURIComponent(urlParams.get("content"));
}

function valueSet(val) {
  return val && val !== null && val.trim();
}

export default function liveEditor(defaultSrc, el, cb) {
  getSourceCode(monaco(el), defaultSrc, cb);
}

function getSourceCode(editor, defaultCode, callback) {
  let process = val => compile(val, callback);

  editor.onDidChangeModelContent(debounce(() => process(editor.getValue())));

  const saved = getSaved();
  const param = getQueryData();

  if (valueSet(param)) {
    editor.setValue(param);
    process(param);
  } else if (valueSet(saved)) {
    editor.setValue(saved);
    process(saved);
  } else {
    editor.setValue(defaultCode);
    process(defaultCode);
  }
}

function compile(src, cb) {
  let res;
  try {
    save(src);
    const caller = compose(
      addWindowWrapping,
      saveMetadata,
      savePreload,
      saveSetup,
      removeExport
    );
    const cleaned = caller(src);
    res = transform(cleaned, {
      presets: ["es2015"]
    });
  } catch (ex) {
    return cb(ex);
  }

  try {
    eval(res.code);
  } catch (ex) {
    return cb(ex);
  }

  cb(
    null,
    __innerFunc(),
    window.__metadata || {},
    window.__preload || noop,
    window.__setup || noop,
    src
  );
}

function addWindowWrapping(src) {
  return `window.__innerFunc = function __innerFunc() { 'use strict'; ${src} }`;
}

function removeExport(src) {
  let res = src.replace(/^\s*export default/gm, "return ");
  return res;
}

function saveMetadata(src) {
  let res = src.replace(/^\s*export const Metadata /gm, "window.__metadata ");
  return res;
}

function savePreload(src) {
  let res = src.replace(
    /^\s*export function preload\s*/gm,
    "window.__preload = function preload"
  );
  return res;
}

function saveSetup(src) {
  let res = src.replace(
    /^\s*export function setup\s*/gm,
    "window.__setup = function setup"
  );
  return res;
}

function debounce(func, delay = 1000) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

function compose(...fns) {
  return function innerComposed(arg) {
    return fns.reduceRight(function(val, fn) {
      return fn(val);
    }, arg);
  };
}
