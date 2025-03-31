"use server"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSession, deleteSession } from "../lib/session";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { removeUserEmail, setUserEmail } from "../utility/userEmail";


/**
 * @file loginaction.js
 * @description Handles user authentication logic, including login and signup functionality.
 */

/**
 * Mock user data storage.
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */

/**
 * Schema for validating login form data.
 * @typedef {Object} LoginSchema
 * @property {string} email - Valid email address.
 * @property {string} password - Minimum 8 characters password.
 */

/**
 * Handles user login and signup logic.
 * - If no user exists, stores new credentials and prompts signup mode.
 * - If credentials are incorrect, returns an error message.
 * - If successful, redirects the user to the dashboard.
 * 
 * @async
 * @function login
 * @param {Object} prevState - Previous state of the login form.
 * @param {FormData} formData - Submitted login form data.
 * @returns {Promise<Object|void>} - Returns an error object if validation fails, 
 * or redirects on successful login.
 */

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function login(prevState, formData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            error: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;


    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        redirect("/signup");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return { error: { email: ["Invalid email or password"] } };
    }


    await createSession(existingUser.id)

    return { success: true, email };

}

export async function logout() {
    await deleteSession();
    redirect("/login");
}