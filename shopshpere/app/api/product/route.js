import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { p_name, p_desc, p_price, images, p_cat, p_subcat, sizes, bestseller } = await req.json();

        if (!p_name || !p_desc || !p_price || images.length === 0 || sizes.length === 0) {
            return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
        }

        // Generate unique productId
        const productId = `PROD-${Date.now()}`;

        const newProduct = await prisma.product.create({
            data: {
                productId,
                name: p_name,
                description: p_desc,
                price: parseFloat(p_price),
                image: images,
                category: p_cat,
                subCategory: p_subcat,
                sizes: sizes,
                bestseller: bestseller || false,
            },
        });

        return NextResponse.json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ message: "Something went wrong!" });
    }
}

export async function GET() {
    try {
        console.log("✅ GET Request received at /api/product");
        const products = await prisma.product.findMany();

        return NextResponse.json(products, { status: 200 });
    }
    catch (error) {
        console.error("❌ Error in GET request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
