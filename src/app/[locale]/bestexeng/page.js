"use client";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Star, StarHalf, StarOff } from "lucide-react";
import { useLocale } from "@/context/LocaleContext"; // ✅ use your locale context

export default function BestExEngPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [engineer, setEngineer] = useState({});
  const { locale, messages } = useLocale(); // ✅ for translations

  useEffect(() => {
    setHasMounted(true);

    const fetchEngineer = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/engineers?populate=*");
        const data = await res.json();
        const engineerData = data?.data?.[0] || {};
        setEngineer(engineerData);
      } catch (error) {
        console.error("Error fetching engineer:", error);
      }
    };

    fetchEngineer();
  }, []);

  const getImageUrl = () => {
    const baseUrl = "http://localhost:1337";
    const imageUrl = engineer?.profile?.formats?.medium?.url || engineer?.profile?.url;
    return imageUrl ? `${baseUrl}${imageUrl}` : "/assets/default-engineer.png";
  };

  const contentClasses = `
    transition-all duration-1000 ease-out 
    ${hasMounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
  `;

  const imageClasses = `
    transition-all duration-1000 ease-out 
    ${hasMounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
  `;

  const t = messages.bestexeng; // ✅ shorthand for cleaner access

  return (
    <>
      <div className={`mt-7 text-center border-b-2 border-gray-300 ${locale === "ur" ? "font-[Noto Nastaliq Urdu] direction-rtl" : ""}`}>
        <div className="flex justify-center">
          <div className="w-[4px] h-[23px] bg-amber-300"></div>
          <span className="h-[23px] inline-block px-2 bg-white/115 text-black text-xs font-semibold mb-4">
            {t.trustedExpertise}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1C1F35] mt-1 tracking-tight pb-8">
          {t.customerServices}
        </h1>
      </div>

      {/* Engineer Section */}
      <div className={`flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-6xl mx-auto my-12 overflow-hidden ${locale === "ur" ? "text-right" : ""}`}>
        {/* Left Content */}
        <div className={`lg:w-2/3 p-10 flex flex-col justify-center ${contentClasses}`}>
          <div className="text-7xl font-serif text-gray-400 opacity-75 mb-4 leading-none">
            "
          </div>

          <div className="w-fit">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3 border-b-2 border-gray-300">
              {engineer?.name || "Loading..."}
            </h2>
          </div>

          <p className="text-xl text-black font-medium mb-1">
            {engineer?.date
              ? new Date(engineer.date).toLocaleDateString(locale === "ur" ? "ur-PK" : "en-US", {
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>

          <p className="mb-5">{t.currentMonth}</p>

          <p className="text-gray-700 leading-relaxed text-lg max-w-lg italic">
            {t.publicRating}
          </p>

          <p className="text-lg text-yellow-600 font-semibold flex items-center">
            {engineer?.rating ? (
              <>
                {Math.round(engineer.rating * 2) / 2}
                <span className="ml-2 flex">
                  {Array.from({ length: 5 }, (_, i) => {
                    const ratingValue = Math.round(engineer.rating * 2) / 2;
                    if (ratingValue >= i + 1) {
                      return <Star key={i} className="text-yellow-500 w-5 h-5 fill-yellow-500" />;
                    } else if (ratingValue >= i + 0.5) {
                      return <StarHalf key={i} className="text-yellow-500 w-5 h-5 fill-yellow-500" />;
                    } else {
                      return <StarOff key={i} className="text-yellow-400 w-5 h-5" />;
                    }
                  })}
                </span>
              </>
            ) : (
              t.noRating
            )}
          </p>
        </div>

        {/* Right Image */}
        <div className={`lg:w-1/3 relative overflow-hidden rounded-r-xl lg:rounded-l-none ${imageClasses}`}>
          <img
            src={getImageUrl()}
            alt={engineer?.name || "Engineer"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col items-center z-10">
            <h3 className="text-3xl font-bold mb-1 text-white">
              {engineer?.name || "Engineer"}
            </h3>
            <p className="text-lg opacity-90 mb-6 text-white">
              {engineer?.designation || ""}
            </p>

            <div className="flex space-x-4">
              <a href="#" className="bg-yellow-500 p-3 rounded-full hover:bg-yellow-600 transition-colors shadow-lg">
                <FaInstagram className="w-6 h-6 text-blue-900" />
              </a>
              <a href="#" className="bg-yellow-500 p-3 rounded-full hover:bg-yellow-600 transition-colors shadow-lg">
                <FaFacebookF className="w-6 h-6 text-blue-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
