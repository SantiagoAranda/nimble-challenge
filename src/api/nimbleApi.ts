const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

  export type Candidate = {
    uuid: string;
    candidateId: string;
    applicationId: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  export type Job = {
    id: string;
    title: string;
  };

  export async function getCandidateByEmail(email: string): Promise<Candidate> {
    const res = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error getting candidate: ${text}`);
    }

    return res.json();
    }

    export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

export async function applyToJob(data: {
  uuid: string;
  candidateId: string;
  jobId: string;
  repoUrl: string;
}) {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.message || "Application failed");
  }

  return body;
}