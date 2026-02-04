import type { Metadata, Viewport } from "next";
import ProjectsClient from "./ProjectsClient";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export const metadata: Metadata = {
  title: "Projects - Contribase",
  description: "Discover, track, and contribute to ongoing initiatives.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function ProjectPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* offset for fixed header */}
      <div className="pt-20">
        <ProjectsClient />
      </div>
      <Footer />
    </main>
  );
}
