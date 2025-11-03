import translate from "translate";

translate.engine = "google"; // Uses free Google web translate
translate.key = null; // No API key needed for this engine

export async function translateText(text, targetLang = "ur") {
  try {
    if (!text) return text;
    const translated = await translate(text, { to: targetLang });
    return translated;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // fallback to English
  }
}
