"use client";
import React, { useEffect, useState } from "react";
import { translateText } from "@/lib/translate";
import { useLocale } from "@/context/LocaleContext";

export default function Officials() {
  const { locale } = useLocale();
  const [officials, setOfficials] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const fetchOfficials = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/leadership-teams?populate=*");
        const data = await res.json();
        let fetchedOfficials = data?.data || [];

        // 🔹 If Urdu selected, translate relevant fields
        if (locale === "ur") {
          fetchedOfficials = await Promise.all(
            fetchedOfficials.map(async (official) => ({
              ...official,
              name: await translateText(official.name, "ur"),
              designation: await translateText(official.designation, "ur"),
              message: await translateText(official.message, "ur"),
            }))
          );
        }

        setOfficials(fetchedOfficials);
      } catch (error) {
        console.error("Error fetching leadership team:", error);
      }
    };

    fetchOfficials();
  }, [locale]);

  const contentClasses = `
    transition-all duration-1000 ease-out 
    ${hasMounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
  `;

  const imageClasses = `
    transition-all duration-1000 ease-out 
    ${hasMounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
  `;

  return (
    <>
      {officials.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {locale === "ur" ? "لوڈ ہو رہا ہے..." : "Loading..."}
        </div>
      ) : (
        officials.map((official, index) => {
          const isEven = index % 2 === 0;
          const imageUrl = official?.profile?.url
            ? `http://localhost:1337${official.profile.url}`
            : "/assets/default.png";

          return (
            <div
              key={official.id}
              className={`flex flex-col lg:flex-row ${
                isEven
                  ? "bg-white text-gray-900"
                  : "bg-gradient-to-b from-[#404299] to-[#091242] text-white"
              } rounded-xl shadow-2xl max-w-6xl mx-auto my-12 overflow-hidden`}
            >
              {/* Left Section (Text) */}
              {isEven ? (
                <>
                  <div
                    className={`lg:w-2/3 p-10 flex flex-col justify-center ${contentClasses}`}
                  >
                    <div className="text-7xl font-serif opacity-40 mb-4 leading-none">
                      "
                    </div>

                    <h2 className="text-4xl font-extrabold mb-1">
                      {official.name}
                    </h2>
                    <p className="text-xl text-yellow-600 font-medium mb-8">
                      {official.designation}
                    </p>

                    <p
                      className={`leading-relaxed text-lg max-w-lg border-l-4 border-yellow-500 pl-4 italic ${
                        isEven ? "text-gray-700" : "text-white"
                      }`}
                    >
                      “{official.message}”
                    </p>

                    <div className="text-6xl font-serif text-yellow-500 self-start mt-6 ml-4 leading-none">
                      "
                    </div>
                  </div>

                  {/* Right Section (Image) */}
                  <div
                    className={`lg:w-1/3 relative overflow-hidden ${imageClasses}`}
                  >
                    <img
                      src={imageUrl}
                      alt={official.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col items-center z-10">
                      <h3 className="text-3xl font-bold mb-1 text-white">
                        {official.name}
                      </h3>
                      <p className="text-lg opacity-90 mb-6 text-white">
                        {official.designation}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Image First for Odd Rows */}
                  <div
                    className={`lg:w-1/3 relative overflow-hidden ${imageClasses}`}
                  >
                    <img
                      src={imageUrl}
                      alt={official.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col items-center z-10">
                      <h3 className="text-3xl font-bold mb-1 text-white">
                        {official.name}
                      </h3>
                      <p className="text-lg opacity-90 mb-6 text-white">
                        {official.designation}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`lg:w-2/3 p-10 flex flex-col justify-center ${contentClasses}`}
                  >
                    <div className="text-7xl font-serif opacity-40 mb-4 leading-none">
                      "
                    </div>

                    <h2 className="text-4xl font-extrabold mb-1">
                      {official.name}
                    </h2>
                    <p className="text-xl text-yellow-600 font-medium mb-8">
                      {official.designation}
                    </p>

                    <p
                      className={`leading-relaxed text-lg max-w-lg border-l-4 border-yellow-500 pl-4 italic ${
                        isEven ? "text-gray-700" : "text-white"
                      }`}
                    >
                      “{official.message}”
                    </p>

                    <div className="text-6xl font-serif text-yellow-500 self-start mt-6 ml-4 leading-none">
                      "
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </>
  );
}
