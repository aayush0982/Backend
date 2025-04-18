import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);


export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });

}

export async function deleteSession() {
    cookies().delete("session");
}

export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  if (!session) return null; 

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session:", error.message);
    return null;
  }
}
