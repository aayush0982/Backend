"use server"
import { prisma } from "../lib/prisma";

export async function TripDetails(userEmail, tripId) {
    try {
        if (!userEmail || !tripId) {
            throw new Error("Missing required fields");
        }

        const existingTrip = await prisma.trip.findFirst({
            where: {
                userEmail: userEmail,  
                id: tripId,            
            },
        });

        if (!existingTrip) {
            throw new Error("Trip not found");
        }

        return existingTrip;
    }
    catch (error) {
        console.error("Error retrieving trip:", error);
        throw new Error("Failed to retrieve trip");
    }
}

export async function OldTrips(userEmail) {
    try {
        if (!userEmail) {
            throw new Error("Missing required fields");
        }

        const oldTrip = await prisma.trip.findMany({
            where: {
                userEmail: userEmail,            
            },
        });

        if (oldTrip.length === 0) {
            throw new Error("No trips found");
        }

        return oldTrip;
    }
    catch (error) {
        console.error("Error retrieving trip:", error);
        throw new Error("Failed to retrieve trip");
    }
    
}