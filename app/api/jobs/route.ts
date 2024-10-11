import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: query || "", mode: "insensitive" } },
        { company: { contains: query || "", mode: "insensitive" } },
        { location: { contains: query || "", mode: "insensitive" } },
        { jobType: { equals: category || undefined } },
      ],
    },
    orderBy: { postedAt: "desc" },
    take: 20,
  });

  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const job = await prisma.job.create({
    data: {
      ...data,
      postedById: session.user.id,
    },
  });

  return NextResponse.json(job);
}
