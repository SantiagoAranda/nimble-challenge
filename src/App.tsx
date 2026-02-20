import { useState } from "react";
import EmailForm from "./components/EmailForm";
import type { Candidate } from "./api/nimbleApi";
import { getCandidateByEmail } from "./api/nimbleApi";
import JobsList from "./components/JobList";

export default function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleEmail(email: string) {
    setError(null);

    try {
      const data = await getCandidateByEmail(email);
      setCandidate(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (!candidate) {
    return (
      <div style={{ padding: 40 }}>
        <EmailForm onSubmit={handleEmail} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome {candidate.firstName}</h1>
      <JobsList
        uuid={candidate.uuid}
        candidateId={candidate.candidateId}
        applicationId={candidate.applicationId}
      />
    </div>
  );
}