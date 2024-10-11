import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ApplyButton } from "@/components/ApplyButton";

async function getJob(id: string) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: { postedBy: true },
  });
  if (!job) notFound();
  return job;
}

export default async function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
        {job.company}
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{job.location}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Job Type: {job.jobType}
      </p>
      {job.salary && (
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Salary: {job.salary}
        </p>
      )}
      <div className="prose dark:prose-invert mt-8 mb-8">
        <h2>Job Description</h2>
        <p>{job.description}</p>
      </div>
      <ApplyButton jobId={job.id} />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        Posted by: {job.postedBy.name} on {job.postedAt.toLocaleDateString()}
      </p>
    </main>
  );
}
