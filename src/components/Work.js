"use client";

import { useLocale } from "@/context/LocaleContext";
import {
  Video,
  Droplets,
  HelpCircle,
  Bell,
  Droplet,
  LifeBuoy,
} from "lucide-react";

export default function Work() {
  const { locale, messages } = useLocale();
  const t = messages?.work;

  return (
    <section className="bg-white py-10 sm:py-15 px-4 sm:px-6 lg:px-0 border-t border-[#DCDCDC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-7 text-center">
          <div className="flex justify-center items-center">
            <div className="w-[4px] h-[23px] bg-amber-300"></div>
            <span className="h-[23px] inline-block px-2 bg-white/35 text-black text-xs font-semibold mb-4">
              {t?.subheading || "How We Work"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1F35] mt-1 tracking-tight">
            {t?.heading || "Our Project Videos"}
          </h1>
        </div>

        {/* Project Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch  gap-4 lg:gap-0">
          {/* Left Column (Image) */}
          <div className="bg-[#091242] w-full flex items-center justify-center px-4 sm:px-10 relative h-[300px] sm:h-[400px] lg:h-[470px]">
            <img
              src="/assets/work.gif"
              alt="Work animation"
              className="h-full w-auto object-contain"
            />
            <div className="bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] absolute text-black text-xs sm:text-sm font-semibold p-1 sm:p-2 lg:p-2
              bottom-4 sm:bottom-6 lg:bottom-20
              left-4 sm:left-6 lg:left-10
              text-center sm:text-left
            ">
              {locale === "ur" ? (
                <>
                  77ویں یوم آزادی پاکستان <br />
                  کراچی کے کارساز آفس میں جشن
                </>
              ) : (
                <>
                  77th Pakistan Independence <br />
                  Celebration at Karsaz Office
                </>
              )}
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="bg-[#F4F4F4] w-full flex flex-col p-6 sm:p-10 lg:p-20">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl pb-2">
              {t?.watchTitle || "Watch Project Videos"}
            </h1>
            <p className="text-sm sm:text-base">
              {t?.description || "Find out the latest updates on planned projects."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Left List */}
              <div>
                <ul className="list-none p-0 space-y-3">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.projectVideos || "Project Videos"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.waterWise || "Water Wise Programs"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.faq || "FAQs"}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Right List */}
              <div>
                <ul className="list-none p-0 space-y-3">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.updates || "Latest Updates"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.saveWater || "Save Water Tips"}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-800 hover:text-blue-600 no-underline"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-[#FFB629] to-[#FFD7A6] rounded-full flex items-center justify-center">
                        <LifeBuoy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                      {t?.links?.support || "Support"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
