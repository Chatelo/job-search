import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { JobList } from "@/components/JobList";

async function getUserApplications(userId: string) {
  return prisma.application.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { appliedAt: "desc" },
  });
}

async function getRecommendedJobs(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { applications: { include: { job: true } } },
  });

  if (!user || user.applications.length === 0) {
    return prisma.job.findMany({
      take: 5,
      orderBy: { postedAt: "desc" },
    });
  }

  const appliedJobTypes = user.applications.map((app) => app.job.jobType);
  const mostCommonJobType = appliedJobTypes
    .sort(
      (a, b) =>
        appliedJobTypes.filter((v) => v === a).length -
        appliedJobTypes.filter((v) => v === b).length
    )
    .pop();

  return prisma.job.findMany({
    where: {
      jobType: mostCommonJobType,
      id: { notIn: user.applications.map((app) => app.jobId) },
    },
    take: 5,
    orderBy: { postedAt: "desc" },
  });
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const [applications, recommendedJobs] = await Promise.all([
    getUserApplications(session.user.id),
    getRecommendedJobs(session.user.id),
  ]);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Job Applications</h2>
        {applications.length === 0 ? (
          <p>You haven&apos;t applied to any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((application) => (
              <li
                key={application.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              >
                <Link
                  href={`/jobs/${application.job.id}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {application.job.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-300">
                  {application.job.company}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Applied on: {application.appliedAt.toLocaleDateString()}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Status: {application.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>
        <JobList jobs={recommendedJobs} />
      </section>
    </main>
  );
}
