// import fs from "fs";
// import path from "path";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ContactForm from "@/components/ContactForm";
// import { LocaleProvider } from "@/context/LocaleContext";

// export default async function RootLayout({ children, params }) {
//   const { locale } = await params;

//   const filePath = path.join(process.cwd(), "src/locales", `${locale}.json`);
//   const messages = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//   return (
//     // <html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>
//     <html lang={locale}>
//       <body>
//         <LocaleProvider locale={locale} messages={messages}>
//           <Navbar  />
//           {children}
//           <ContactForm />
//           <Footer />
//         </LocaleProvider>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { LocaleProvider } from "@/context/LocaleContext";

import enMessages from "@/locales/en.json";
import urMessages from "@/locales/ur.json";

const messagesMap = { en: enMessages, ur: urMessages };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = messagesMap[locale] || messagesMap["en"];

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <ContactForm />
      <Footer />
    </LocaleProvider>
  );
}
