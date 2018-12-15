const baseLink =
  "https://github.com/Krakels/variant-vjay/new/master/sandbox/js/visuals?filename=99.js";

export default function createAddLink(container) {
  const link = document.createElement("a");
  link.title = "Send PR to Variant";
  link.className = "sendLink";
  link.target = "_blank";
  link.textContent = "Send PR";
  container.appendChild(link);

  updateLink();

  return updateLink;

  function updateLink(src) {
    link.href = createUrl(src);
  }
}

function createUrl(src) {
  return baseLink + "&value=" + encodeURIComponent(src);
}
