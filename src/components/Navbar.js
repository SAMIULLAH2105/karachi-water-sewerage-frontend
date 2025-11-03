"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Undo2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext"; // ✅ using LocaleContext

export default function Navbar() {
  const { locale, messages } = useLocale(); // ✅ get locale and messages from context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [logoMode, setLogoMode] = useState("light");
  const isUrdu = locale === "ur";
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeather(data);
    }
    fetchWeather();
  }, []);

  useEffect(() => {
    if (!weather?.weather?.[0]?.main) return;
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) setLogoMode("dark");
    else setLogoMode("light");
  }, [weather]);

  const getWeatherBg = (condition = "") => {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "bg-[url('/assets/sunny.jpg')]";
    if (cond.includes("cloud")) return "bg-[url('/assets/cloudy.png')]";
    if (cond.includes("rain") || cond.includes("drizzle"))
      return "bg-[url('/assets/rain.png')]";
    if (cond.includes("fog") || cond.includes("mist") || cond.includes("haze"))
      return "bg-[url('/assets/noon.jpg')]";
    if (cond.includes("night")) return "bg-[url('/assets/moonlight.png')]";
    return "bg-[url('/assets/sunny.jpg')]";
  };

  const localTime =
    weather && weather.dt && weather.timezone
      ? new Date((weather.dt + weather.timezone) * 1000)
      : null;
  const formattedTime = localTime
    ? localTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  // ✅ Language Switcher function
  const switchLang = (targetLocale) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale; // replace locale segment
    router.push(segments.join("/"));
  };

  // ✅ Dynamic text color based on logo mode
  const textColor = logoMode === "light" ? "text-white" : "text-black";

  return (
    <nav
      className={`${getWeatherBg(
        weather?.weather?.[0]?.main
      )} bg-cover bg-top shadow-md h-[270px] md:h-[140px] lg:h-[150px] border-b border-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 lg:p-15">
          {/* ===== Logo + Title ===== */}
          <div className="flex flex-row items-center">
            <a href="/" className="text-2xl font-bold">
              <Image
                src={
                  logoMode === "dark"
                    ? "/assets/dark_logo.png"
                    : "/assets/light_logo.png"
                }
                alt="Logo"
                height={40}
                width={90}
              />
            </a>
            <span className={` lg:ml-4 text-sm font-bold ${textColor}`}>
              {isUrdu ? (
                <>
                  کراچی واٹر اینڈ <br /> سیوریج کارپوریشن
                </>
              ) : (
                <>
                  KARACHI WATER & <br /> SEWERAGE CORPORATION
                </>
              )}
            </span>
          </div>

          {/* ===== Weather Icon ===== */}
          <div className="absolute top-0 right-0 animate-slideIn">
            <Image
              src={
                logoMode === "light" ? "/assets/sun.png" : "/assets/moon.png"
              }
              alt="Weather Mode"
              width={140}
              height={140}
              className="drop-shadow-lg"
            />
          </div>

          {/* ===== Right Section ===== */}
          <div className="flex flex-row items-end">
            <div>
              <div className="flex flex-row mt-2 mb-0 py-0">
                {/* Weather Info */}
                <div
                  className={`flex items-center lg:px-4 py-2 max-w-sm mx-auto space-x-4 ${textColor}`}
                >
                  <span className="h-[36px] w-[36px] flex items-center justify-center flex-shrink-0 border border-white/60 p-1.5">
                    <Image
                      src="/assets/weather.png"
                      alt="time logo"
                      height={24}
                      width={24}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h4 className=" text-[11px]  lg:text-lg font-semibold leading-tight">
                      {messages.weather}
                    </h4>
                    <p className=" text-[11px] lg:text-sm font-medium opacity-90">
                      {weather?.weather?.[0]?.description}
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div
                  className={`flex items-center lg:px-4 py-2 max-w-sm mx-auto space-x-4 ${textColor}`}
                >
                  <span className="h-[36px] w-[36px] flex items-center justify-center flex-shrink-0 border border-white/50 p-1.5">
                    <Image
                      src="/assets/timeicon_dark.png"
                      alt="time logo"
                      height={24}
                      width={24}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h4 className=" text-[11px] lg:text-sm font-bold leading-tight">
                      {messages.openingHours}
                    </h4>
                    <p className="text-[11px] lg:text-sm font-medium opacity-90">
                      {messages.monFri}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== Language + Menu Section ===== */}
              <div className="flex flex-col items-end space-y-2">
                <div className={`flex items-center space-x-3 ${textColor}`}>
                  <div
                    className={`flex items-center space-x-2 text-sm font-semibold lg:px-33 ${textColor}`}
                  >
                    <button
                      onClick={() => switchLang("en")}
                      className={`pr-6 ${
                        locale === "en"
                          ? "text-green-600"
                          : `${textColor} opacity-90`
                      }`}
                    >
                      Eng
                    </button>
                    <span
                      className={`h-6 w-px ${
                        logoMode === "light"
                          ? "bg-white/70"
                          : "bg-black/70"
                      }`}
                    ></span>
                    <button
                      onClick={() => switchLang("ur")}
                      className={`pl-6 ${
                        locale === "ur"
                          ? "text-green-600"
                          : `${textColor} opacity-90`
                      }`}
                    >
                      اردو
                    </button>
                  </div>

                  {/* Hamburger */}
                  <button
                    type="button"
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    className={`${textColor} hover:opacity-80 focus:outline-none mr-7`}
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  {/* ===== Mega Menu ===== */}
                  {megaMenuOpen && (
                    <div className="absolute left-0 lg:top-[120px] top-[70] lg:m-20 bg-gradient-to-b from-[#1F2A7C] to-[#A7C7E7] text-white shadow-lg p-0 z-50">
                      <button
                        className="absolute lg:bg-white top-4 right-4 text-black text:sm lg:text-xl font-bold hover:text-gray-300 rounded-full lg:p-1"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        <Undo2 />
                      </button>

                      <div className="flex flex-row items-center px-15 border-b border-white/30 mt-8 mb-4 lg:mb-0 lg:mt-4 lg:p-4">
                        <a href="/" className="text-2xl font-bold">
                          <Image
                            src={
                              logoMode === "dark"
                                ? "/assets/dark_logo.png"
                                : "/assets/light_logo.png"
                            }
                            alt="Logo"
                            height={40}
                            width={90}
                          />
                        </a>
                        <span className="ml-4 text-sm font-bold text-white">
                          KARACHI WATER & <br />
                          SEWERAGE CORPORATION
                        </span>
                      </div>

                      <div className="grid grid-cols-6 bg-[#1F2A7C] text-white lg:text-lg font-semibold rounded-t-md text-[7px]">
                        <h2 className="p-3 text-center">{messages.aboutUs}</h2>
                        <h2 className="p-3 text-center">
                          {messages.ourProjects}
                        </h2>
                        <h2 className="p-3 text-center">
                          {messages.workWithUs}
                        </h2>
                        <h2 className="p-3 text-center">{messages.careers}</h2>
                        <h2 className="p-1 text-center">{messages.rti}</h2>
                        <h2 className="p-3 text-center">{messages.news}</h2>
                      </div>

                      <div className="grid grid-cols-6 gap-2 lg:gap-8 mt-6 lg:text-sm lg:m-14 text-[7px] px-2 text-black">
                        <ul className="space-y-2">
                          <li>{messages.history}</li>
                          <li>{messages.vision}</li>
                          <li>{messages.sdg}</li>
                          <li>{messages.board}</li>
                          <li>{messages.management}</li>
                        </ul>
                        <ul className="space-y-2">
                          <li>{messages.psdp}</li>
                          <li>{messages.ppp}</li>
                          <li>{messages.foreign}</li>
                          <li>{messages.initiatives}</li>
                        </ul>
                        <ul className="space-y-2 lg:ml-3">
                          <li>{messages.tenders}</li>
                          <li>{messages.licenses}</li>
                          <li>{messages.collaborations}</li>
                          <li>{messages.investments}</li>
                        </ul>
                        <ul className="space-y-2 lg:ml-12">
                          <li>{messages.recruitment}</li>
                          <li>{messages.graduate}</li>
                          <li>{messages.consultancies}</li>
                        </ul>
                        <ul className="space-y-2 lg:ml-3">
                          <li>{messages.licenseForm}</li>
                          <li>{messages.regulations}</li>
                          <li>{messages.employee}</li>
                          <li>{messages.budget}</li>
                          <li>{messages.coc}</li>
                        </ul>
                        <ul className="space-y-2 lg:ml-9">
                          <li>{messages.latest}</li>
                          <li>{messages.press}</li>
                          <li>{messages.gallery}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* ===== Buttons ===== */}
                <div className="flex space-x-3 mr-8">
                  <button
                    className={`w-[114px] px-3 py-1.5 ${textColor} text-sm font-medium bg-green-600 hover:bg-green-700 transition shadow-md border border-white/80`}
                    onClick={() => router.push(`/${locale}/bestexeng`)}
                  >
                    {messages.bestEng}
                  </button>

                  <button
                    className={`w-[114px] px-3 py-1.5 ${textColor} text-sm font-medium bg-green-600 hover:bg-green-700 transition shadow-md border border-white/80`}
                  >
                    {messages.alert}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/assets/govt_dark.png"
                alt="govt logo"
                height={60}
                width={70}
              />
            </div>
          </div>

          {/* ===== Mobile Menu ===== */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed top-7 right-10 w-[40%] z-20 flex flex-col space-y-6 bg-[#1a1a2e7e] p-6 shadow-lg border-l border-white/10 transition-transform duration-300">
              <a href="/" className="hover:text-yellow-400">
                {messages.home}
              </a>
              <a href="/blog" className="hover:text-yellow-400">
                {messages.blog}
              </a>
              <a href="/about" className="hover:text-yellow-400">
                {messages.aboutUs}
              </a>
              <a href="/contact" className="hover:text-yellow-400">
                {messages.contact}
              </a>
              <a href="/author" className="hover:text-yellow-400">
                {messages.author}
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
