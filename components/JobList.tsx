import Link from "next/link";
import { Job } from "@prisma/client";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  return (
    <div className="mt-8 space-y-4">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400">{job.location}</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{job.jobType}</p>
          {job.salary && (
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Salary: {job.salary}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
