<template>
  <div>
    <div
      v-for="item in news"
      :key="item"
    >
      <h1 class="font-bold text-2xl">
        {{ item.title }}
      </h1>
      <div
        v-for="content in item.content.json"
        :key="content"
      >
        <div
          v-for="subContent in content"
          :key="subContent"
        >
          <div
            v-for="item in subContent"
            :key="item"
          >
            <p v-if="item[0]?.value">
              {{ item[0].value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
// App.vue
<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const news = ref([]);

    async function getNews() {
      const query = `{
        newsCollection {
          items {
            sys {
              id
            }
            title
            content {
              json
            }
          }
        }
      }`;

      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
        import.meta.env.VITE_CONTENTFUL_SPACE_ID
      }`;

      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json(),
        );
        return response.data.newsCollection.items;
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
        throw new Error("Could not receive the data from Contentful!");
      }
    }

    onMounted(async () => {
      news.value = await getNews();
      console.log("news.value", news.value);
    });

    return { news };
  },
};
</script>
