import { useState } from "react";

type Props = {
  onSubmit: (email: string) => void;
};

export default function EmailForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h2>Enter your email</h2>

      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={() => onSubmit(email)}>Continue</button>
    </div>
  );
}