"use server"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSession, deleteSession } from "../lib/session";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs"; 


const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function signup(prevState, formData) {
    const result = signupSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;


    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        // return { error: { email: ["User already exists. Please login."] } };
        redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword, 
        },
      });

    // await createSession(newUser.id)

    // console.log(testUser.email, testUser.password) 

    redirect("/login");

}

// export async function logout() {
//     await deleteSession();
//     redirect("/login");
// }