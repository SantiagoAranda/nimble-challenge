import { useEffect, useState } from "react";
import type { Job } from "../api/nimbleApi";
import { getJobs } from "../api/nimbleApi";
import JobItem from "./JobItem";

type Props = {
  uuid: string;
  candidateId: string;
  applicationId: string;
};

export default function JobsList({ uuid, candidateId, applicationId }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Open positions</h2>
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          uuid={uuid}
          candidateId={candidateId}
          applicationId={applicationId}
        />
      ))}
    </div>
  );
}