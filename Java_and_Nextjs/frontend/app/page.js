import Navbar from "@/components/ui/navbar";
import ProductList from "@/components/productlist";
import Footer from "@/components/footer";

async function getProducts() {
    const response = await fetch(
        "http://localhost:8088/getAll",
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export default async function Home() {
    const products = await getProducts();

    return (
        <div className="flex min-h-screen flex-col bg-black text-white">

            <Navbar />

            <ProductList initialProducts={products} />

            <div className="mt-auto">
                <Footer />
            </div>

        </div>
    );
}
