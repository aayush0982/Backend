"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) => {
    const serialize = { ...obj };
    if (obj.balance) {
        serialize.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialize.amount = obj.amount.toNumber();
    }
    return serialize;
};

export async function createAccount(data) {

    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const user = await db.user.findFirst({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance funds");
        }

        const existAccount = await db.account.findFirst({
            where: { userId },
        });

        const defaultAccount = existAccount === null ? true : data.isDefault;

        if (defaultAccount) {
            await db.account.updateMany({
                where: {
                    userId: user.id,
                    isDefault: true,
                },
                data: {
                    isDefault: false,
                },
            });
        }        

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: defaultAccount,
            },
        });

        const serializeAccount = serializeTransaction(account);
        revalidatePath("/dashboard");
        return { success: true, data: serializeAccount };
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts() {
    try {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }

        const user = await db.user.findFirst({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const accounts = await db.account.findMany({
            where: {userId : user.id},
            orderBy: {createdAt : "desc"},
            include:{
                _count:{
                    select:{
                        transactions: true,
                    },
                },
            },
        });

        const serializedAccount = accounts.map(serializeTransaction);
        return serializedAccount;

    } catch (error) {

    }
}