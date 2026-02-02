import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectPage() {
  const session = await getServerSession(authOptions as any);

  if (!session) {
    redirect("/signin");
  }

  return <ProjectsClient />;
}
