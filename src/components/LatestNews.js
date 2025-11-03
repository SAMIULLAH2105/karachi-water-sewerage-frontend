// "use client";
// import { useEffect, useState } from "react";
// import { getPosts } from "@/lib/api";
// import { MoveUpRight } from "lucide-react";

// export default function LatestNews() {
//   const [monthlyPosts, setMonthlyPosts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const posts = await getPosts();

//         const now = new Date();
//         const currentMonth = now.getMonth();
//         const currentYear = now.getFullYear();

//         const filtered =
//           posts?.data?.filter((post) => {
//             const date = new Date(
//               post.published_date ||
//                 post.publishedAt ||
//                 post.attributes?.publishedAt
//             );
//             return (
//               date.getMonth() === currentMonth &&
//               date.getFullYear() === currentYear
//             );
//           }) || [];

//         const sorted = filtered.sort(
//           (a, b) =>
//             new Date(b.published_date || b.publishedAt) -
//             new Date(a.published_date || a.publishedAt)
//         );

//         setMonthlyPosts(sorted);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Auto-slide every 4 seconds with smooth transition
//   useEffect(() => {
//     if (monthlyPosts.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) =>
//         prev === monthlyPosts.length - 1 ? 0 : prev + 1
//       );
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [monthlyPosts]);

//   if (monthlyPosts.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No news for this month.
//       </div>
//     );
//   }

//   const baseUrl = "http://localhost:1337";

//   return (
//     <div className="max-w-7xl mx-auto  overflow-hidden bg-white relative">
//       {/* Header */}
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-stretch text-white text-sm font-medium bg-indigo-700 overflow-hidden">
//         <div className="bg-gradient-to-r from-[#101077] to-[#7474D8] lg:w-[200px] px-4 sm:px-6 py-3 flex-shrink-0 flex items-center justify-center md:justify-start m-auto">
//           Our Latest News
//         </div>

//         {/* Sliding header part */}
//         <div className="relative flex-1 overflow-hidden bg-white border-t md:border-t-0 md:border-l border-indigo-600/50 text-black">
//           <div
//             className="flex transition-transform duration-[4000ms] ease-in-out"
//             style={{
//               transform: `translateX(-${currentIndex * 100}%)`,
//             }}
//           >
//             {monthlyPosts.map((post, index) => {
//               const publishedDate =
//                 post?.published_date || post?.attributes?.publishedAt;
//               const formattedDate = publishedDate
//                 ? new Date(publishedDate).toLocaleDateString("en-US", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })
//                 : "Unknown Date";
//               const title = post?.title || "Untitled Post";

//               return (
//                 <div
//                   key={index}
//                   className="min-w-full flex items-center space-x-2 px-4 sm:px-6 py-3"
//                 >
//                   <span className="font-semibold">{formattedDate}</span>
//                   <span className="opacity-70 hidden sm:inline">|</span>
//                   <span className="truncate font-medium">{title}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Sliding Container */}
//       <div className="relative w-[70%] overflow-hidden mx-auto">
//         <div
//           className="flex transition-transform duration-[4000ms] ease-in-out"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//           }}
//         >
//           {monthlyPosts.map((post, index) => {
//             const title = post?.title || "Untitled Post";
//             const excerpt =
//               post?.content || "No summary available for this post.";
//             const source = post.attributes?.source || "Source Unknown";
//             const publishedDate =
//               post?.published_date || post.attributes?.publishedAt;
//             const formattedDate = publishedDate
//               ? new Date(publishedDate).toLocaleDateString()
//               : "Unknown Date";

//             const imageUrl = post?.cover_image?.url
//               ? `${baseUrl}${post.cover_image.url}`
//               : "/assets/placeholder.jpg";

//             return (
//               <div
//                 key={index}
//                 className="min-w-full flex flex-col lg:flex-row items-start gap-10 bg-white p-10 sm:p-14 md:p-20"
//               >
//                 {/* Text */}
//                 <div className="flex-1 order-2 lg:order-1">
//                   <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center space-x-1">
//                     <div className="flex">
//                       <div className="w-[4px] h-[23px] bg-amber-300"></div>
//                       <span className=" h-[23px] inline-block px-2 py-1 bg-gray-400/20 text-black text-xs font-semibold  mb-4">
//                         Contact
//                       </span>
//                     </div>
//                   </div>

//                   <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-2 line-clamp-2">
//                     {title}
//                   </h2>

//                   <p className="mt-4 sm:mt-6 text-gray-600 leading-relaxed text-base sm:text-lg line-clamp-6">
//                     {excerpt}
//                   </p>

//                   <a
//                     href="#"
//                     className="inline-flex items-center font-semibold mt-6 transition duration-300 hover:text-amber-700 hover:underline"
//                   >
//                     <div className="h-11 w-11 rounded-full bg-amber-300 mr-2 flex items-center justify-center">
//                       <MoveUpRight />
//                     </div>
//                     See More
//                   </a>
//                 </div>

//                 {/* Image */}
//                 <div className="order-1 lg:order-2 flex-shrink-0 w-full lg:w-[45%] overflow-hidden">
//                   <img
//                     src={imageUrl}
//                     alt={title}
//                     className="w-full h-72 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/api";
import { MoveUpRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext"; // your context
import { translateText } from "@/lib/translate"; // from step 2

export default function LatestNews() {
  const { locale } = useLocale(); // 'en' or 'ur'
  const [monthlyPosts, setMonthlyPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Step 1: Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const filtered =
          posts?.data?.filter((post) => {
            const date = new Date(
              post.published_date ||
                post.publishedAt ||
                post.attributes?.publishedAt
            );
            return (
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear
            );
          }) || [];

        const sorted = filtered.sort(
          (a, b) =>
            new Date(b.published_date || b.publishedAt) -
            new Date(a.published_date || a.publishedAt)
        );

        setMonthlyPosts(sorted);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Step 2: Translate dynamically if Urdu selected
  useEffect(() => {
    const doTranslation = async () => {
      if (locale === "ur") {
        const translated = await Promise.all(
          monthlyPosts.map(async (post) => ({
            ...post,
            title: await translateText(post.title, "ur"),
            content: await translateText(post.content, "ur"),
          }))
        );
        setTranslatedPosts(translated);
      } else {
        setTranslatedPosts(monthlyPosts);
      }
    };

    doTranslation();
  }, [locale, monthlyPosts]);

  // Step 3: Auto-slide effect
  useEffect(() => {
    if (translatedPosts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === translatedPosts.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [translatedPosts]);

  if (translatedPosts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No news for this month.
      </div>
    );
  }

  const baseUrl = "http://localhost:1337";

  return (
    <div
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`max-w-7xl mx-auto overflow-hidden bg-white relative ${
        locale === "ur" ? "text-right font-[Noto Nastaliq Urdu]" : "text-left"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-stretch text-white text-sm font-medium bg-indigo-700 overflow-hidden">
        <div className="bg-gradient-to-r from-[#101077] to-[#7474D8] lg:w-[200px] px-4 sm:px-6 py-3 flex-shrink-0 flex items-center justify-center md:justify-start m-auto">
          {locale === "ur" ? "تازہ ترین خبریں" : "Our Latest News"}
        </div>

        {/* Sliding header part */}
        <div className="relative flex-1 overflow-hidden bg-white border-t md:border-t-0 md:border-l border-indigo-600/50 text-black">
          <div
            className="flex transition-transform duration-[4000ms] ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {translatedPosts.map((post, index) => {
              const date = post?.published_date || post?.attributes?.publishedAt;
              const formattedDate = new Date(date).toLocaleDateString("ur-PK");
              return (
                <div
                  key={index}
                  className="min-w-full flex items-center space-x-2 px-4 sm:px-6 py-3"
                >
                  <span className="font-semibold">{formattedDate}</span>
                  <span className="opacity-70 hidden sm:inline">|</span>
                  <span className="truncate font-medium">{post.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-[70%] overflow-hidden mx-auto">
        <div
          className="flex transition-transform duration-[4000ms] ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {translatedPosts.map((post, index) => {
            const imageUrl = post?.cover_image?.url
              ? `${baseUrl}${post.cover_image.url}`
              : "/assets/placeholder.jpg";
            return (
              <div
                key={index}
                className="min-w-full flex flex-col lg:flex-row items-start gap-10 bg-white p-10 sm:p-14 md:p-20"
              >
                <div className="flex-1 order-2 lg:order-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mt-2">
                    {post.title}
                  </h2>
                  <p className="mt-4 sm:mt-6 text-gray-600 leading-relaxed text-base sm:text-lg line-clamp-6">
                    {post.content}
                  </p>
                </div>

                <div className="order-1 lg:order-2 flex-shrink-0 w-full lg:w-[45%] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-72 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
