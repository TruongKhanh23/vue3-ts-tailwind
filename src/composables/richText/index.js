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

export function renderNodes(links) {
  return {
    [BLOCKS.PARAGRAPH]: customRenderParagraph,
    [BLOCKS.EMBEDDED_ENTRY]: (node, key, next) =>
      h("div", { key }, next(node.content, key, next)),
    [BLOCKS.EMBEDDED_ASSET]: (node, key, next) => {
      const { id } = node.data.target.sys;
      const { block: assetList } = links.assets;
      const asset = assetList.find((item) => (item.sys.id = id));
      const { url: imageUrl } = asset;
      return h("img", { key, src: imageUrl }, next(node.content, key, next));
    },
    [BLOCKS.HEADING_2]: customHeading2,
    [INLINES.ASSET_HYPERLINK]: (node, key) =>
      defaultInline(INLINES.ASSET_HYPERLINK, node, key),
    [INLINES.ENTRY_HYPERLINK]: (node, key) =>
      defaultInline(INLINES.ENTRY_HYPERLINK, node, key),
    [INLINES.HYPERLINK]: (node, key, next) => {
      return h(
        "a",
        {
          key,
          href: node.data.uri,
          class: ["underline text-[blue]"],
        },
        next(node.content, key, next),
      );
    },
  };
}

function customHeading2(node, key, next) {
  return h(
    "h2",
    { key, class: ["font-bold text-xl"] },
    next(node.content, key, next),
  );
}

function customRenderParagraph(node, key, next) {
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
