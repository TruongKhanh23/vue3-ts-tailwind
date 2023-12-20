export async function getNews() {
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
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    console.log("news.value", response.data.newsCollection.items);
    return response.data.newsCollection.items;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Could not receive the data from Contentful!");
  }
}
