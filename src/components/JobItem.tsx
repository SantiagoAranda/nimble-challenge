import { useState } from "react";
import type { Job } from "../api/nimbleApi";
import { applyToJob } from "../api/nimbleApi";

type Props = {
  job: Job;
  uuid: string;
  candidateId: string;
  applicationId: string;
};

export default function JobItem({ job, uuid, candidateId, applicationId }: Props) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleApply() {
    setStatus("loading");
    setMessage("");

    try {
        await applyToJob({
            uuid,
            candidateId,
            applicationId,
            jobId: job.id,
            repoUrl,
        });;

      setStatus("success");
      setMessage("Application sent!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
      <h3>{job.title}</h3>

      <input
        type="text"
        placeholder="https://github.com/tuusuario/turepo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <button onClick={handleApply} disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit"}
      </button>

      {status === "success" && <p style={{ color: "green" }}>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}