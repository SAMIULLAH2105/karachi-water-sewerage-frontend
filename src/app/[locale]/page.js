import { getPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import HeroSection from "@/components/HeroSection";
import CustomerService from "@/components/CustomerService";
import LatestNews from "@/components/LatestNews";
import CurrentProjects from "@/components/CurrentProjects";
import Work from "@/components/Work";
import Officials from "@/components/Officials";

export default async function Home() {
  let posts = [];

  try {
    // Fetch all posts with populate for images, relations, etc.
    posts = await getPosts();
  } catch (error) {
    console.error("Error loading posts:", error.message);
  }

  const baseUrl = "http://localhost:1337";

  // Sort by published date descending
  const latestPosts = posts?.data
    ?.sort(
      (a, b) =>
        new Date(b.published_date || b.publishedAt) -
        new Date(a.published_date || a.publishedAt)
    )
    .slice(0, 8); // only 8 latest

  // Filter featured posts (assuming you have a field `is_featured`)
  const featuredPosts = posts?.data?.filter((post) => post.Featured);

  return (
    <>
      <HeroSection />
      <CustomerService />
      <LatestNews />
      <CurrentProjects />
      <Officials />
      <Work />
     
    </>
  );
}
