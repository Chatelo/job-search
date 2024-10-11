import Link from "next/link";
import { Job } from "@prisma/client";

interface RecentJobsProps {
  jobs: Job[];
}

export function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {job.location}
          </p>
        </Link>
      ))}
    </div>
  );
}
