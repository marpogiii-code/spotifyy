import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "spotifyy-secret-key-change-in-production"
);

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

const users: Map<string, StoredUser> = new Map();

export function getUsers(): Map<string, StoredUser> {
  return users;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const entries = Array.from(users.values());
  return entries.find((user) => user.email === email);
}

export function createUser(user: StoredUser): void {
  users.set(user.id, user);
}

export async function generateToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<{ userId: string; email: string; name: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; email: string; name: string };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const user = users.get(payload.userId);
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
    };
  }

  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name,
    createdAt: new Date().toISOString(),
  };
}
