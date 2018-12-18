const baseLink =
  "https://github.com/varianter/variant-live/new/master/sandbox/js/visuals?filename=99.js";

export default function(container) {
  const div = document.createElement("div");
  div.className = "sendLink";

  const copy = createCopyLink(div);
  const save = createAddLink(div);

  container.appendChild(div);

  return function updateLinks(src) {
    copy(src);
    save(src);
  };
}

function createCopyLink(container) {
  return createAddLink(container, createCopyUrl, {
    title: "Right click to copy and send code",
    text: "Copy link"
  });
}

function createAddLink(
  container,
  createFn = createUrl,
  { title = "Send PR to Variant", text = "Send PR" } = {}
) {
  const link = document.createElement("a");
  link.title = title;
  link.target = "_blank";
  link.textContent = text;
  container.appendChild(link);

  updateLink();

  return updateLink;

  function updateLink(src) {
    link.href = createFn(src);
  }
}

function createUrl(src) {
  return baseLink + "&value=" + encodeURIComponent(src);
}

function createCopyUrl(src) {
  return location.href + "?content=" + encodeURIComponent(src);
}
