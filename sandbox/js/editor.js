import { transform } from "@babel/standalone";
import monaco from "./monaco";

function save(src) {
  localStorage.setItem("editorContent", src);
}
function getSaved() {
  return localStorage.getItem("editorContent");
}

export default function liveEditor(defaultSrc, el, cb) {
  getSourceCode(monaco(el), defaultSrc, cb);
}

function getSourceCode(editor, defaultCode, callback) {
  let process = val => compile(val, callback);

  editor.onDidChangeModelContent(debounce(() => process(editor.getValue())));

  const saved = getSaved();
  if (!saved || !saved.trim()) {
    editor.setValue(defaultCode);
    process(defaultCode);
  } else {
    editor.setValue(saved);
    process(saved);
  }
}

function compile(src, cb) {
  try {
    save(src);
    const cleaned = addWindowWrapping(saveMetadata(removeExport(src)));
    const res = transform(cleaned, {
      presets: ["es2015"]
    });

    eval(res.code);
    cb(null, __innerFunc(), src);
  } catch (ex) {
    cb(ex);
  }
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

function debounce(func, delay = 1000) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}
