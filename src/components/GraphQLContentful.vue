<template>
  <div>
    <h1 class="text-4xl font-extrabold mb-8">
      {{ document.title }}
    </h1>
    <RichTextRenderer
      :document="document.content.json"
      :node-renderers="renderNodes(document.content.links, videos)"
      :mark-renderers="renderMarks()"
    />
  </div>
</template>
<script>
import { onMounted, ref, watch } from "vue";
import { getNews, getNewsById } from "../composables/news/index.js";
import { getVideos } from "../composables/video/index.js";
import { renderMarks, renderNodes } from "../composables/richText/index.js";

import RichTextRenderer from "contentful-rich-text-vue-renderer";

export default {
  components: {
    RichTextRenderer,
  },
  setup() {
    const news = ref([]);
    const videos = ref([]);
    const embeddedEntryBlockList = ref([]);
    const document = ref({
      nodeType: "document",
      content: [],
    });

    onMounted(async () => {
      news.value = await getNewsById();
    });

    watch(news, async () => {
      document.value = news.value[0];
      videos.value = await getVideos();
    });

    return { news, document, renderMarks, renderNodes, videos };
  },
};
</script>
