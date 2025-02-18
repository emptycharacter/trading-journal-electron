import { app } from "electron";
import Database from "better-sqlite3"; // ✅ Corrected import
import bcrypt from "bcrypt";

const db = new Database("trading-journal.db"); // ✅ Correct instantiation

export function handleLogin(email: string, password: string) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as { password: string } | undefined;
  if (!user) return { success: false, message: "User not found" };

  const isValid = bcrypt.compareSync(password, user.password);
  return isValid ? { success: true } : { success: false, message: "Invalid credentials" };
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
