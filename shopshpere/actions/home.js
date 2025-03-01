"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return null;
        }

        const loggedUser = await db.user.findMany({
            where: { clerkUserId: user.id },
        });
        if (loggedUser) {
            return loggedUser;
        }
        const name = `${user.firstName}+${user.lastName}`

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name,
                cartData: {},
            },
        });
        return newUser

    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
