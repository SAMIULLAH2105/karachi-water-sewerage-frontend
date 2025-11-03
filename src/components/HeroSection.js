"use client";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";

export default function HeroSection() {
  const { locale, messages } = useLocale();

  const isUrdu = locale === "ur";

  return (
    <section
      dir={isUrdu ? "rtl" : "ltr"}
      className={`relative h-[90vh] bg-[url('/assets/hero.gif')] bg-cover bg-right-top lg:bg-center flex items-center ${
        isUrdu ? "font-[Noto Nastaliq Urdu] text-right" : "text-left"
      }`}
    >
      {/* 🔹 Top Bar Overlay */}
      <div className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto py-2 md:py-3 lg:bg-black/50 bg-black/80 text-white text-sm md:text-base px-4 sm:px-6 md:px-[8%] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          {/* Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 items-center text-center md:text-left">
            {[
              messages.hero.home,
              messages.hero.customerService,
              messages.hero.rightToInfo,
              messages.hero.aboutUs,
            ].map((item, i) => (
              <li key={i} className="flex items-center text-[10px] lg:text-sm">
                {i > 0 && (
                  <span className="opacity-50 mx-1 hidden sm:inline">|</span>
                )}
                <a href="/" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Social + Contact */}
          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-3">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="text-pink-500 hover:text-pink-400"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  className="text-blue-600 hover:text-blue-500"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  className="text-blue-400 hover:text-blue-300"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube
                  className="text-red-600 hover:text-red-500"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="bg-white text-black font-semibold py-1 px-3 hover:bg-gray-200"
              >
                {messages.hero.contactUs}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* 🔹 Main Hero Content */}
      <div
        className={`relative z-10 text-white px-6 md:px-12 lg:px-20 max-w-4xl mx-auto md:mx-0 ${
          isUrdu ? "text-right ms-auto" : "text-left"
        }`}
      >
        <h1 className=" text-2xl lg:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight mt-20 lg:mt-0">
          {messages.hero.title}
        </h1>

        <p className=" text-sm md:text-xl mb-8 max-w-xl leading-relaxed">
          {messages.hero.description}
        </p>

        <button className="bg-[url('/assets/btn-bg.png')] bg-cover text-white font-semibold lg:py-3 lg:px-8  px-6 py 1 shadow-lg hover:shadow-xl ">
          {messages.hero.getStarted}
        </button>
      </div>

      {/* 🔹 Right Vertical Social Navbar */}
      <div className="absolute right-0  top-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 lg:space-y-3 z-20 bg-white/70 lg:py-4 lg:px-3 py-1 px-1 rounded-tl-xl rounded-bl-xl shadow-md backdrop-blur-sm">
        {[
          {
            src: "/assets/hero/bills.png",
            name: messages.hero.bills,
            link: "/bills",
          },
          {
            src: "/assets/hero/tender.png",
            name: messages.hero.tender,
            link: "/tender",
          },
          {
            src: "/assets/hero/truck.png",
            name: messages.hero.truck,
            link: "/truck",
          },
          {
            src: "/assets/hero/connection.png",
            name: messages.hero.connection,
            link: "/connection",
          },
          {
            src: "/assets/hero/complain.png",
            name: messages.hero.complain,
            link: "/complain",
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex flex-col items-center group"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-6 h-6 mb-0.5 transition-transform group-hover:scale-110 brightness-0"
            />
            <p className="text-[10px] font-medium text-gray-700 group-hover:text-blue-600">
              {item.name}
            </p>
            <div className="w-5 border-b border-gray-300 mt-0.5 group-hover:border-blue-500 transition-all"></div>
          </a>
        ))}
      </div>
    </section>
  );
}
