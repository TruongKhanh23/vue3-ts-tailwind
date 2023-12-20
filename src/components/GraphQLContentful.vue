<template>
  <div>
    <h1 class="font-bold text-3xl mb-8">
      {{ document.title }}
    </h1>
    <RichTextRenderer
      :document="document.content.json"
      :node-renderers="renderNodes()"
      :mark-renderers="renderMarks()"
    />
  </div>
</template>
<script>
import { onMounted, ref, watch } from "vue";
import { getNews } from "../composables/news/index.js";
import { renderMarks, renderNodes } from "../composables/richText/index.js"

import RichTextRenderer from "contentful-rich-text-vue-renderer";

export default {
  components: {
    RichTextRenderer,
  },
  setup() {
    const news = ref([]);
    const document = ref({
      nodeType: "document",
      content: [],
    });

    onMounted(async () => {
      news.value = await getNews();
    });

    watch(news, async () => {
      document.value = news.value[0];
    });

    return { news, document, renderMarks, renderNodes };
  },
};
</script>
