import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosIntance";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import { config } from "../config/config";
import EditProductDialog from "../components/product/EditProductDialog";
import toast from "react-hot-toast";

const backend = config.app.BACKEND;

const ProductOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { product, isWishlisted } = await (
        await axios.get(`/product/${id}`)
      ).data;
      setProduct(product);
      setMainImage(`${backend}/${product.images[0]}`);
      setIsWishlisted(isWishlisted);
    };
    fetchProduct();
  }, [id, isWishlisted]);

  const handleAddtoWishlist = async () => {
    try {
      const response = await axios.patch("/product/wishlist/add", {
        prodId: id,
      });
      toast.success(response.data.message);
      setIsWishlisted(true)
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const response = await axios.patch("/product/wishlist/remove", {
        prodId: id,
      });
      toast.success(response.data.message)
      setIsWishlisted(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  if (!product) {
    return <div className="text-center p-10">Loading product details...</div>;
  }

  const variant = product.variants[selectedVariantIndex];

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <Card className="flex items-center justify-center h-80">
            <img
              src={mainImage}
              alt="Main"
              className="max-h-full object-contain"
            />
          </Card>
          <div className="flex gap-4 mt-4">
            {product.images.map((img: string, idx: number) => (
              <Card
                key={idx}
                onClick={() => setMainImage(`${backend}/${img}`)}
                className={`w-20 h-20 cursor-pointer border ${
                  mainImage === `${backend}/${img}`
                    ? "ring-2 ring-yellow-500"
                    : ""
                }`}
              >
                <img
                  src={`${backend}/${img}`}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-contain"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold">${variant.price.toFixed(2)}</p>
          <p className="text-green-600">Availability: In stock</p>
          <p className="text-sm text-gray-600">
            Hurry up! Only {variant.quantity} product
            {variant.quantity > 1 && "s"} left in stock.
          </p>

          {/* RAM selection */}
          <div>
            <p className="font-medium">RAM:</p>
            <div className="flex gap-2 mt-2">
              {product.variants.map((v: any, idx: number) => (
                <Button
                  key={idx}
                  variant={selectedVariantIndex === idx ? "default" : "outline"}
                  onClick={() => {
                    setSelectedVariantIndex(idx);
                    setQuantity(1);
                  }}
                >
                  {v.ram}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center gap-4 mt-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(variant.qty, quantity + 1))}
              >
                <Plus />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <EditProductDialog product={product} />
            <Button
              variant="default"
              className="bg-amber-500 hover:bg-amber-400 rounded-full"
            >
              Buy it now
            </Button>
            {isWishlisted ? (
              <Button
                variant={"outline"}
                className="rounded-full cursor-pointer"
                onClick={handleRemoveFromWishlist}
              >
                <Heart className="fill-red-500" />
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className="rounded-full cursor-pointer"
                onClick={handleAddtoWishlist}
              >
                <Heart />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
