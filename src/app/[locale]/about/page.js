export const metadata = {
  title: "About Us",
  description: "Learn more about the founder and the purpose of this website.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffff] text-black py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-12">
        About <span className="text-yellow-400">Us</span>
      </h1>

      <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-xl p-8 shadow-lg border border-[#1a1a2e]/30 flex flex-col md:flex-row items-center gap-8">
        {/* Founder Image */}
        <div className="flex-shrink-0">
          <img
            src="/assets/about.jpg"
            alt="Founder"
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        {/* About Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Samiullah</h2>
          <p className="text-[#1a1a2e] mb-4">
            Hello! I'm Samiullah, the founder of this website. This platform is
            built to showcase projects, blogs, and authors in an interactive and
            user-friendly way.
          </p>
          <p className="text[#1a1a2e]">
            Our website is built using the Next.js and Strapi as a backend CMS.
            It aims to provide clean, responsive, and fast web experiences for
            all users.
          </p>
        </div>
      </div>
    </main>
  );
}
