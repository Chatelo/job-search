import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { JobCategories } from "@/components/JobCategories";
import { RecentJobs } from "@/components/RecentJobs";
import prisma from "@/lib/prisma";

async function getRecentJobs() {
  const jobs = await prisma.job.findMany({
    take: 4,
    orderBy: { postedAt: "desc" },
  });
  return jobs;
}

export default async function Home() {
  const recentJobs = await getRecentJobs();
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl mb-8">
            Search thousands of job listings from top companies
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Featured Job Categories
          </h2>
          <JobCategories />
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Recent Job Listings
          </h2>
          <RecentJobs jobs={recentJobs} />
        </div>
      </section>

      <section className="py-16 bg-blue-100 dark:bg-blue-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Start Your Job Search?
          </h2>
          <p className="text-xl mb-8">
            Create an account to save jobs, track applications, and more.
          </p>
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </section>
    </main>
  );
}
