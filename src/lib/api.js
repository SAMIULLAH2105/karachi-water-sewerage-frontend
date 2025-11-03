const STRAPI_URL = "http://localhost:1337/api";

export async function fetchAPI(endpoint) {
  const url = `${STRAPI_URL}/${endpoint}`;
  console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Strapi API Error:", res.status, res.statusText);
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return res.json();
}

// ✅ Populate all related fields (cover_image, author, category, tags)
export async function getPosts() {
  return fetchAPI("posts?populate=*");
}

export async function getSinglePost(slug) {
  return fetchAPI(`posts?filters[slug][$eq]=${slug}&populate=*`);
}

export async function getAuthor(id) {
  return fetchAPI(`authors/${id}?populate=posts`);
}

export async function getCategories() {
  return fetchAPI("categories");
}
export async function getChairman() {
  return fetchAPI("chairmen");
}
