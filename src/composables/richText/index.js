import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { h } from "vue";

export function renderMarks() {
  return {
    [MARKS.BOLD]: (children, key) => h("strong", { key }, children),
    [MARKS.ITALIC]: (children, key) => h("em", { key }, children),
    [MARKS.UNDERLINE]: (children, key) => h("u", { key }, children),
    [MARKS.CODE]: (children, key) => h("code", { key }, children),
    [MARKS.SUPERSCRIPT]: (children, key) => h("sup", { key }, children),
    [MARKS.SUBSCRIPT]: (children, key) => h("sub", { key }, children),
  };
}

export function renderNodes(links, videos) {
  return {
    [BLOCKS.PARAGRAPH]: customParagraph,
    [BLOCKS.HEADING_1]: customHeading1,
    [BLOCKS.HEADING_2]: customHeading2,
    [BLOCKS.HEADING_3]: customHeading3,
    [BLOCKS.HEADING_4]: customHeading4,
    [BLOCKS.HEADING_5]: customHeading5,
    [BLOCKS.HEADING_6]: customHeading6,
    [BLOCKS.EMBEDDED_ENTRY]: (node, key, next) =>
      customEmbeddedEntryBlock(node, key, next, videos),
    [BLOCKS.EMBEDDED_ASSET]: (node, key, next) =>
      customEmbededAssets(node, key, next, links),
    [INLINES.ASSET_HYPERLINK]: (node, key) =>
      defaultInline(INLINES.ASSET_HYPERLINK, node, key),
    [INLINES.ENTRY_HYPERLINK]: (node, key) =>
      defaultInline(INLINES.ENTRY_HYPERLINK, node, key),
    [INLINES.HYPERLINK]: customInlinesHyperlink,
  };
}
function customInlinesHyperlink(node, key, next) {
  return h(
    "a",
    {
      key,
      href: node.data.uri,
      class: ["underline"],
      style: {
        color: "blue",
      },
    },
    next(node.content, key, next),
  );
}

function customEmbededAssets(node, key, next, links) {
  const { id } = node.data.target.sys;
  const { block: assetList } = links.assets;
  const asset = assetList.find((item) => (item.sys.id = id));
  const { url: imageUrl } = asset;
  return h("img", { key, src: imageUrl }, next(node.content, key, next));
}

function customEmbeddedEntryBlock(node, key, next, videos) {
  const { id } = node.data.target.sys;
  const video = videos.find((item) => item.sys.id === id);
  const iframeUrl = video.url;
  return h(
    "iframe",
    {
      key,
      width: "560",
      height: "315",
      src: iframeUrl,
      title: "YouTube video player",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: true,
    },
    next(node.content, key, next),
  );
}

function customHeading1(node, key, next) {
  return h(
    "h1",
    { key, class: ["text-4xl font-extrabold"] },
    next(node.content, key, next),
  );
}

function customHeading2(node, key, next) {
  return h(
    "h2",
    { key, class: ["text-3xl font-extrabold"] },
    next(node.content, key, next),
  );
}

function customHeading3(node, key, next) {
  return h(
    "h3",
    { key, class: ["text-2xl font-bold"] },
    next(node.content, key, next),
  );
}

function customHeading4(node, key, next) {
  return h(
    "h4",
    { key, class: ["text-xl font-bold"] },
    next(node.content, key, next),
  );
}

function customHeading5(node, key, next) {
  return h(
    "h5",
    { key, class: ["text-lg font-bold"] },
    next(node.content, key, next),
  );
}

function customHeading6(node, key, next) {
  return h(
    "h6",
    { key, class: ["text-base font-bold"] },
    next(node.content, key, next),
  );
}

function customParagraph(node, key, next) {
  return h(
    "p",
    {
      key,
      class: ["my-6"],
      style: {
        "font-size": "15px",
        "line-height": "26px",
      },
    },
    next(node.content, key, next),
  );
}

const defaultInline = (type, node, key) => {
  return h(
    "span",
    {
      key,
      style: {
        margin: "0px 5px",
        padding: "0 .25rem 0 .75rem",
        border: "10px solid #d3dce0",
        fontFamily: "monospace",
      },
    },
    `inline: ${type}, sys.id: ${node.data.target.sys.id}`,
  );
};
