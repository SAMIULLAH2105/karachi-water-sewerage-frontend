"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/api";
import { useLocale } from "@/context/LocaleContext";
import { translateText } from "@/lib/translate";

export default function CurrentProjects() {
  const { locale } = useLocale(); // 'en' or 'ur'
  const [projects, setProjects] = useState([]);
  const [translatedProjects, setTranslatedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch latest 2 projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const posts = await getPosts();

        const sorted = posts?.data
          ?.sort(
            (a, b) =>
              new Date(b.published_date || b.publishedAt) -
              new Date(a.published_date || a.publishedAt)
          )
          .slice(0, 2);

        setProjects(sorted || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Translate when locale = ur
  useEffect(() => {
    const translateProjects = async () => {
      if (locale === "ur") {
        const translated = await Promise.all(
          projects.map(async (proj) => ({
            ...proj,
            title: await translateText(proj.title, "ur"),
            content: await translateText(proj.content, "ur"),
          }))
        );
        setTranslatedProjects(translated);
      } else {
        setTranslatedProjects(projects);
      }
    };
    translateProjects();
  }, [locale, projects]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (translatedProjects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % translatedProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [translatedProjects]);

  if (translatedProjects.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        {locale === "ur"
          ? "کوئی منصوبے دستیاب نہیں ہیں۔"
          : "No projects available."}
      </div>
    );
  }

  const baseUrl = "http://localhost:1337";

  return (
    <section
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`bg-white py-15 px-4 sm:px-6 lg:px-30 border-t border-[#DCDCDC] ${
        locale === "ur" ? "font-[Noto Nastaliq Urdu] text-right" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="flex justify-center">
            <div className="w-[4px] h-[23px] bg-amber-300"></div>
            <span className="h-[23px] inline-block px-2 bg-white/35 text-black text-xs font-semibold mb-4">
              {locale === "ur" ? "ہمارا اثر" : "Our Impact"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C1F35] mt-1 tracking-tight">
            {locale === "ur" ? "ہمارے موجودہ منصوبے" : "Our Current Projects"}
          </h1>
        </div>

        {/* Sliding Container */}
        <div className="relative w-[80%] mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-[3000ms] ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {translatedProjects.map((project, index) => {
              const title = project?.title || "Untitled Project";
              const excerpt = project?.content || "No description available.";
              const imageUrl = project?.cover_image?.url
                ? `${baseUrl}${project.cover_image.url}`
                : "/assets/hero.jpg";

              const publishedDate =
                project?.published_date || project?.attributes?.publishedAt;
              const formattedDate = publishedDate
                ? new Date(publishedDate).toLocaleDateString(
                    locale === "ur" ? "ur-PK" : "en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : locale === "ur"
                ? "نامعلوم تاریخ"
                : "Unknown Date";

              return (
                <div
                  key={index}
                  className="min-w-full flex flex-col lg:flex-row gap-6 items-stretch bg-white p-6 sm:p-8 lg:p-10 rounded-xl"
                >
                  {/* Image Column */}
                  <div className="lg:w-1/3 h-full">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Calendar Column */}
                  <div className="flex flex-col items-center justify-center lg:w-1/6">
                    <img
                      src="/assets/calender.png"
                      alt="Calendar Icon"
                      className="w-12 h-12"
                    />
                    <span className="text-sm font-semibold text-gray-700 mt-2 text-center">
                      {formattedDate}
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="lg:w-1/2 flex flex-col justify-start h-full border-l-2 border-gray-200 pl-4">
                    <h2 className="text-xl font-bold text-[#1C1F35] mb-4">
                      {title}
                    </h2>
                    <p className="flex-1 overflow-hidden text-gray-900 text-justify text-sm line-clamp-4">
                      {excerpt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="flex flex-wrap justify-center gap-10 sm:gap-16 mt-20 pt-10 pb-10 border-t border-gray-200 border-b">
          <div className="flex items-center pr-6 border-r border-gray-300">
            <span className=" text-2xl lg:text-3xl sm:text-5xl font-bold text-gray-900 mr-2">
              {locale === "ur" ? "۱۴۵M +" : "150M+"}
            </span>
            <span className="h-[17px] w-[17px] bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] mx-2"></span>
            <span className="text-base sm:text-lg text-gray-600">
              {locale === "ur" ? "مکمل شدہ منصوبے" : "Completed Projects"}
            </span>
          </div>

          <div className="flex items-center pl-6">
            <span className="text-2xl lg:text-3xl sm:text-5xl font-bold text-gray-900 mr-2">
              {locale === "ur" ? "۲۵M +" : "25M +"}
            </span>
            <span className="h-[17px] w-[17px] bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] mx-2"></span>
            <span className="text-base sm:text-lg text-gray-600">
              {locale === "ur"
                ? "لوگوں کو خدمات فراہم کی گئیں"
                : "People Served"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
