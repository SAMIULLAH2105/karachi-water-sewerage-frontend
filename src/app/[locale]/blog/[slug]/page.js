// app/blog/[slug]/page.js
import { getSinglePost } from "@/lib/api";
import BlogCard from "@/components/BlogCard";

const STRAPI_URL = "http://localhost:1337";

// Server-side metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  let post = null;

  try {
    const res = await getSinglePost(slug);
    post = res.data[0];
  } catch (error) {
    console.error("Failed to fetch post metadata:", error);
  }

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || "Read this amazing post!",
    alternates: { canonical: post.canonical_url || `${STRAPI_URL}/blog/${slug}` },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || "Read this amazing post!",
      url: post.canonical_url || `${STRAPI_URL}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogSingle({ params }) {
  const { slug } = params;
  let post = null;

  try {
    const res = await getSinglePost(slug);
    post = res.data[0];
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
        <p>The post you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="max-w-fit mx-auto px-4 py-10">
      <BlogCard post={post} baseUrl={STRAPI_URL} />
    </main>
  );
}
