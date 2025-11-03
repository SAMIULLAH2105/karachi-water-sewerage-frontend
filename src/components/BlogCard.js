import Link from "next/link";

const BlogCard = ({ post, baseUrl }) => {
  const {
    title,
    content,
    published_date,
    meta_title,
    meta_description,
    canonical_url,
    post_status,
    slug,
  } = post;

  const coverImage = post.cover_image;
  const imageUrl = coverImage ? `${baseUrl}${coverImage.url}` : null;

  const author = post.author?.name || "Unknown Author";
  const category = post.category?.name || "Uncategorized";
  const tags = post.tags?.length
    ? post.tags.map((t) => t.name).join(", ")
    : "No tags";

  return (
    <Link href={`/blog/${slug}`}>
      <div className="p-4 border rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow h-[620px] flex flex-col justify-between">
        {/* Image */}

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={coverImage?.alternativeText || title}
            className="rounded-lg w-full h-64 object-cover mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <h2 className="text-sm font-extrabold mb-2 line-clamp-2">
            {title
              ? title
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              : "No Title"}
          </h2>

          <p className="text-gray-600 mb-3 line-clamp-3">
            {content || "No Content"}
          </p>

          <p className="text-sm text-gray-500">
            <strong>Author:</strong> {author}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Tags:</strong> {tags}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            <strong>Status:</strong> {post_status || "Unknown"} <br />
            <strong>Published:</strong>{" "}
            {published_date
              ? new Date(published_date).toLocaleDateString()
              : "Unknown"}
          </p>

          {meta_title && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-1">
              <strong>Meta Title:</strong> {meta_title}
            </p>
          )}
          {meta_description && (
            <p className="text-sm text-gray-500 line-clamp-1">
              <strong>Meta Description:</strong> {meta_description}
            </p>
          )}
          {canonical_url && (
            <p className="text-sm text-gray-500 line-clamp-1">
              <strong>Canonical URL:</strong> {canonical_url}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
