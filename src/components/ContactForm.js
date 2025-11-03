"use client";

import { Mail, Phone, Clock } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function ContactForm() {
  const { locale, messages } = useLocale();
  const t = messages.contact;

  return (
    <section
      className={`bg-gradient-to-r from-[#2b2d61] to-[#3b3a8f] px-6 md:px-16 lg:px-24 py-12 ${
        locale === "ur" ? "text-right" : "text-left"
      }`}
      dir={locale === "ur" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info */}
        <div>
          <div className={`flex ${locale === "ur" ? "justify-end" : ""}`}>
            <div className="w-[4px] h-[23px] bg-amber-300"></div>
            <span className="h-[23px] inline-block px-2 py-1 bg-white/35 text-black text-xs font-semibold mb-4">
              {t.label}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-3 text-amber-50">
            {t.heading}
          </h2>

          <p className="text-sm text-gray-200 mb-6 max-w-md">{t.address}</p>

          <ul className="space-y-4 text-gray-200">
            {/* Email */}
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#151633] flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-300">{t.emailLabel}</div>
                <div className="text-sm">{t.email}</div>
              </div>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#151633] flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-300">{t.phoneLabel}</div>
                <div className="text-sm">{t.phone}</div>
              </div>
            </li>

            {/* Working Hours */}
            <li className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#151633] flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-300">{t.hoursLabel}</div>
                <div className="text-sm">{t.hours}</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <form className="space-y-4 p-6 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t.form.name}
                className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="text"
                placeholder={t.form.lastName}
                className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="tel"
                placeholder={t.form.phone}
                className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
              />
              <input
                type="email"
                placeholder={t.form.email}
                className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <textarea
              placeholder={t.form.message}
              className="w-full bg-transparent border border-white/30 px-3 py-3 text-white placeholder-gray-300 min-h-[120px] focus:outline-none focus:border-yellow-400"
            />

            <div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FFB629] to-[#FFDA56] text-black font-semibold px-5 py-2 rounded shadow-sm hover:bg-yellow-300"
              >
                {t.form.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
