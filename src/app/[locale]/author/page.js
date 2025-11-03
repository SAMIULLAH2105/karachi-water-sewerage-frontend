"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthors() {
      try {
        const res = await fetchAPI("authors?populate=profile_image");
        setAuthors(res.data || []);

      } catch (error) {
        console.error("Error fetching authors:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAuthors();
  }, []);

  return (
    <main className="min-h-screen bg-[#ffffff] text-black py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        Meet Our <span className="text-yellow-400">Authors</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading authors...</p>
      ) : authors.length === 0 ? (
        <p className="text-center text-gray-400">No authors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => {
            const profileImageUrl = author.profile_image
              ? `http://localhost:1337${author.profile_image.url}`
              : null;

            return (
              <Link
                key={author.documentId}
                href={`/author/${author.documentId}`}
                className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg border border-white/10 hover:border-yellow-400 transition hover:cursor-pointer"
              >
                {/* Author Image or Placeholder */}
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={author.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {author.name?.charAt(0)}
                  </div>
                )}

                <h2 className="text-xl text-yellow-100 font-semibold text-center mb-2">
                  {author.name}
                </h2>
                <p className="text-gray-300 text-center text-sm mb-3">
                  {author.bio || "No bio available."}
                </p>

                {author.social_links ? (
                  <div className="text-center">
                    <a
                      href={author.social_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 text-sm hover:underline"
                      onClick={(e) => e.stopPropagation()} // prevent navigation when clicking social link
                    >
                      Connect
                    </a>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm">
                    No social links
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
