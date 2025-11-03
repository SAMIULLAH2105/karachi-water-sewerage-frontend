
"use client";
import { useState, useEffect } from "react";
import { getPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const postsPerPage = 2;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts(); // getPosts should use ?populate=*
        setPosts(data);

        // Extract unique categories & tags for filter dropdowns
        const cats = [];
        const tgs = [];

        data.forEach((post) => {
          // category is directly in post.category
          if (post.category?.name) {
            cats.push(post.category.name);
          }

          // tags is an array directly in post.tags
          if (post.tags?.length) {
            post.tags.forEach((t) => tgs.push(t.name));
          }
        });

        setCategories([...new Set(cats)]);
        setTags([...new Set(tgs)]);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [selectedCategory, selectedTag]);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const categoryMatch =
      !selectedCategory || post.category?.name === selectedCategory;
    const tagMatch =
      !selectedTag || post.tags?.some((t) => t.name === selectedTag);
    return categoryMatch && tagMatch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Tags</option>
          {tags.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {currentPosts.map((post) => {
          return (
            <BlogCard
              key={post.id}
              post={post}
              baseUrl="http://localhost:1337"
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </main>
  );
}
