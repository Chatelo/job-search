import { SearchBar } from "@/components/SearchBar";
import { JobList } from "@/components/JobList";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import prisma from "@/lib/prisma";

async function searchJobs(filters: any) {
  const { query, category, jobType, salaryMin, salaryMax, location } = filters;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        {
          OR: [
            { title: { contains: query || "", mode: "insensitive" } },
            { company: { contains: query || "", mode: "insensitive" } },
            { description: { contains: query || "", mode: "insensitive" } },
          ],
        },
        { jobType: category ? { equals: category } : undefined },
        { jobType: jobType ? { equals: jobType } : undefined },
        {
          location: location
            ? { contains: location, mode: "insensitive" }
            : undefined,
        },
        {
          AND: [
            { salary: { gte: salaryMin ? parseInt(salaryMin) : undefined } },
            { salary: { lte: salaryMax ? parseInt(salaryMax) : undefined } },
          ],
        },
      ],
    },
    orderBy: { postedAt: "desc" },
    take: 20,
  });

  return jobs;
}

export default async function JobSearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const jobs = await searchJobs(searchParams);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Job Search</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <AdvancedFilters initialFilters={searchParams} />
        </aside>
        <div className="md:col-span-3">
          <SearchBar initialQuery={searchParams.query} />
          <JobList jobs={jobs} />
        </div>
      </div>
    </main>
  );
}
