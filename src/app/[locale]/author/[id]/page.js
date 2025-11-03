"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import BlogCard from "@/components/BlogCard";

export default function AuthorDetailPage() {
  const { id } = useParams(); // gets the dynamic author id from URL
  const [author, setAuthor] = useState(null);
  const [posts, setposts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthor() {
      try {
        const res = await fetchAPI(`authors/${id}?populate=profile_image`);
        setAuthor(res.data || null);

        const res2 = await fetchAPI(
          `posts?filters[author][documentId][$eq]=${id}&populate=*`
        );
        setposts(res2.data || null);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAuthor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading author...
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Author not found.
      </div>
    );
  }

  const profileImageUrl = author.profile_image
    ? `http://localhost:1337${author.profile_image.url}`
    : null;

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto bg-[#1a1a2e] rounded-xl p-8 shadow-lg border border-white/10">
        <div className="flex flex-col items-center">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover mb-6"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-4xl font-bold mb-6">
              {author.name?.charAt(0)}
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
          <p className="text-gray-300 text-center mb-4">
            {author.bio || "No bio available."}
          </p>

          {author.social_links ? (
            <a
              href={author.social_links}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 text-sm hover:underline"
            >
              Connect
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No social links</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {posts && posts.length > 0
            ? posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  baseUrl={"http://localhost:1337"}
                />
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
