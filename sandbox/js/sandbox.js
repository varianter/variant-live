import createP5Env from "../../common/p5-env";
import fs from "fs";

import createMusic from "./audio-player";
import createAddLink from "./add-link";
import editor from "./editor";

const example = fs.readFileSync(__dirname + "/example.template").toString();

const editorContainer = document.getElementById("editor");
const updateLink = createAddLink(editorContainer.parentElement);

const opts = {
  preload(_, p5) {
    return createMusic(p5);
  }
};

const { updateValues } = createP5Env(
  opts,
  {},
  document.getElementById("canvas")
);

editor(example, editorContainer, function replaceSource(
  error,
  fn,
  attribution,
  src
) {
  if (error) {
    return console.error(error);
  }

  updateLink(src);
  updateValues({
    render: fn,
    metadata: attribution
  });
});
