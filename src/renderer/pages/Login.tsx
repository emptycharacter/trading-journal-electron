import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.electron || !window.electron.ipcRenderer) {
      alert("Electron IPC not available");
      return;
    }

    const response = await window.electron.ipcRenderer.invoke("login", email, password);

    if (response.success) {
      alert("Login Successful!");
      window.location.href = "/dashboard";
    } else {
      alert(response.message || "Login failed.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
          Login
        </button>
      </form>
    </main>
  );
}
