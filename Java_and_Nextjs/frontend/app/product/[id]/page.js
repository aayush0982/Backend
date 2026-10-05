import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Navbar from "@/components/ui/navbar";
import ProductCard from "@/components/productcard";
import AddToCartButton from "@/components/addtocartbutton";

export default async function ProductPage({ params }) {
  const { id } = await params;

  // =========================================================
  // GET CURRENT PRODUCT
  // =========================================================

  const response = await fetch(
    `http://localhost:8088/getById?productId=${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  // =========================================================
  // GET RECOMMENDED PRODUCTS
  // =========================================================

  let recommendations = [];

  try {
    const recommendationResponse = await fetch(
      `http://localhost:8090/recommendation/getRecommendationByCategory?categoryName=${encodeURIComponent(
        product.productCategory
      )}`,
      {
        cache: "no-store",
      }
    );

    if (recommendationResponse.ok) {
      const recommendationData = await recommendationResponse.json();

      if (Array.isArray(recommendationData)) {
        recommendations = recommendationData;
      } else {
        recommendations =
          recommendationData.products ||
          recommendationData.recommendations ||
          recommendationData.data ||
          [];
      }
    } else {
      console.error(
        "Recommendation API failed:",
        recommendationResponse.status
      );
    }
  } catch (error) {
    console.error("Recommendation API error:", error);
  }

  // =========================================================
  // REMOVE CURRENTLY OPENED PRODUCT
  // =========================================================

  recommendations = recommendations.filter(
    (recommendedProduct) =>
      Number(recommendedProduct.productId) !== Number(product.productId)
  );

  // =========================================================
  // ADD PRODUCT QUANTITY FOR PRODUCT CARD
  // =========================================================

  recommendations = recommendations.map((recommendedProduct) => ({
    ...recommendedProduct,
    productQuantity: 1,
  }));

  // =========================================================
  // PRODUCT IMAGES
  // =========================================================

  const images = [
    "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/317428_0_XS8ROj-5Z.png?updatedAt=1757574404191",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo8rztBhCJgIWIxAn1slZwTJjKFanTTQQ2sQmsquIypIgSDTcJoIXt9r0&s=10",
    "https://9to5mac.com/wp-content/uploads/sites/6/2025/10/iphone-17-pro-cosmic-orange-fernando.jpg?quality=82&strip=all&resize=1200,628",
    "https://www.lifewire.com/thmb/s0B4T9c6-tjwNej2a59W8XjG9Rc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/iphone-17-pro-d7ae6571d5b147ab8312e83b4d30a5a9.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">

      {/* Navbar */}
      <div className="mb-8">
        <Navbar />
      </div>

      {/* =====================================================
          MAIN PRODUCT
      ====================================================== */}

      <div className="max-w-6xl mx-auto w-full px-8 flex flex-col md:flex-row items-center gap-16">

        {/* Product Images */}
        <div className="w-full md:w-1/2 flex justify-center">

          <Carousel className="w-full max-w-md">

            <CarouselContent>

              {images.map((image, index) => (

                <CarouselItem key={index}>

                  <div className="p-1">

                    <div className="overflow-hidden rounded-xl bg-gray-900">

                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full object-cover aspect-square"
                      />

                    </div>

                  </div>

                </CarouselItem>

              ))}

            </CarouselContent>

            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />

          </Carousel>

        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">

          <h1 className="text-3xl font-bold">
            {product.productName}
          </h1>

          <p className="mt-4 text-gray-400 leading-7">
            Experience a product designed to combine style, quality, and
            everyday practicality. Built with carefully selected materials
            and a clean modern design, it offers reliable performance while
            fitting naturally into your daily routine. Whether you’re using
            it at home, at work, or while travelling, this product is made
            to provide convenience without compromising on appearance. Its
            thoughtful design and durable construction make it a dependable
            choice for anyone looking for something simple, functional, and
            easy to use.
          </p>

          <p className="mt-6 text-2xl font-bold">
            ₹{product.productPrice}
          </p>

          <div className="flex gap-4 mt-8">

            <AddToCartButton productId={product.productId} />

            <Button className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-8 py-5">
              Buy Now
            </Button>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECOMMENDED PRODUCTS
      ====================================================== */}

      {recommendations.length > 0 && (

        <section className="mt-8 mb-16 border-t border-gray-800 pt-12">

          <div className="max-w-6xl mx-auto px-8">

            {/* Section Header */}
            <div className="mb-8">

              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Recommended for you
              </p>

            </div>

            {/* =================================================
                MEDIUM-SIZED RECOMMENDATION CARDS
            ================================================= */}

            <div className="flex flex-wrap gap-8">

              {recommendations.map((recommendedProduct) => (

                <div
                  key={recommendedProduct.productId}
                  className="
                    w-full
                    sm:w-[280px]
                    md:w-[290px]
                    lg:w-[300px]
                    transition-transform
                    duration-200
                    hover:-translate-y-1
                  "
                >

                  <ProductCard
                    product={recommendedProduct}
                  />

                </div>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>

    </div>
  );
}