"use server"
import { prisma } from "../lib/prisma";

export async function AddTrip(userEmail, tripDetails) {
    try {
        if (!userEmail || !tripDetails) {
            throw new Error("Missing required fields");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        const newTrip = await prisma.trip.create({
            data: {
                userEmail: existingUser.email,
                response: tripDetails,
            },
        });

        return newTrip;
    }
    catch (error) {
        console.error("Error adding trip:", error);
        throw new Error("Failed to add trip");
    }
}