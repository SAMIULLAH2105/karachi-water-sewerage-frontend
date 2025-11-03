"use client";
import React from "react";
import { useLocale } from "../context/LocaleContext";

export default function Footer() {
  const { locale, messages } = useLocale();

  const t = (key) => messages?.footer?.[key] || key;
  const isUrdu = locale === "ur";

  return (
    <footer
      className={`text-white ${isUrdu ? "text-right font-[Noto Nastaliq Urdu]" : "text-left"}`}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {/* Image above footer */}
      <div className="w-full">
        <img
          src="/assets/footer-image.png"
          alt="footer cover"
          className="w-full h-[200px] md:h-[220px] object-cover"
        />
      </div>

      <div className="bg-gradient-to-b from-[#414198] to-[#151532] px-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-200">
          {/* Column 1 - Explore */}
          <div>
            <h4 className="font-semibold mb-3 text-sm inline-block border-b-2 border-yellow-400 pb-1">
              {t("exploreTitle")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t("home")}</li>
              <li>{t("blogPosts")}</li>
              <li>{t("categories")}</li>
              <li>{t("about")}</li>
              <li>{t("contact")}</li>
            </ul>
          </div>

          {/* Column 2 - Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-sm inline-block border-b-2 border-yellow-400 pb-1">
              {t("resourcesTitle")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t("webDevelopment")}</li>
              <li>{t("jsGuides")}</li>
              <li>{t("mernProjects")}</li>
              <li>{t("careerAdvice")}</li>
              <li>{t("openSource")}</li>
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-sm inline-block border-b-2 border-yellow-400 pb-1">
              {t("newsletterTitle")}
            </h4>
            <p className="text-sm text-gray-300 mb-3">{t("newsletterDesc")}</p>

            <form className="flex items-center gap-3">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full px-3 py-2 bg-transparent border border-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
              <button className="px-3 py-2 bg-yellow-400 text-black font-semibold">
                {t("subscribe")}
              </button>
            </form>

            <div
              className={`flex items-center gap-4 mt-4 text-gray-300 ${
                isUrdu ? "justify-end" : ""
              }`}
            >
              <a
                href="https://linkedin.com/in/shaikhsamiullah"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                {t("linkedin")}
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                {t("twitter")}
              </a>
              <a
                href="https://github.com/SAMIULLAH2105"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                {t("github")}
              </a>
            </div>
          </div>
        </div>

        {/* thin gradient divider */}
        <div className="h-[2px] bg-gradient-to-r from-[#a7b3ff] to-[#2d2e57]"></div>

        {/* bottom copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 text-gray-300 text-sm text-center">
          © {new Date().getFullYear()} {t("rights")}
          <span className="font-semibold text-white"> Code Chronicles</span>
        </div>
      </div>
    </footer>
  );
}
