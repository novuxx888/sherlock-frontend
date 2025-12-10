import { useAuth } from "../AuthContext";
import { useState } from "react";
import { auth } from "../firebase";

const BACKEND_URL = "https://sherlock-backend-production.up.railway.app";

async function sendSecureCommand(command) {
  const token = await auth.currentUser.getIdToken();

  const res = await fetch(`${BACKEND_URL}/send-command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ command, token }),
  });

  return res.json();
}

export default function PiControl() {
  const { user, login, logout } = useAuth();
  const [response, setResponse] = useState("");

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Pi Control</h1>
        <button onClick={login}>Login with Google</button>
      </div>
    );
  }

  const send = async (cmd) => {
    const r = await sendSecureCommand(cmd);
    setResponse(JSON.stringify(r));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pi Control Dashboard</h1>
      <p>Logged in as <b>{user.email}</b></p>
      <button onClick={logout}>Logout</button>

      <br/><br/>

      <button onClick={() => send("open-camera")}>Open Camera</button>
      <button onClick={() => send("capture-image")}>Capture Image</button>
      <button onClick={() => send("close-camera")}>Close Camera</button>

      <pre>{response}</pre>
    </div>
  );
}
