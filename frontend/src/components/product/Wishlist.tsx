import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "../../api/axiosIntance";
import { config } from "../../config/config";
import toast from "react-hot-toast";
const backend = config.app.BACKEND;

const WishlistPanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchWishlist();
    }
  }, [isOpen]);

  const fetchWishlist = async () => {
    const wishlist = await (await axios.get("/product/wishlist")).data
    setItems(wishlist);
  };

  const removeFromWishlist = async (id: string) => {
    try {
      const response = await axios.patch("/product/wishlist/remove", {
        prodId: id,
      });
      toast.success(response.data.message)
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
    fetchWishlist();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Items</h2>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
        {items.map((item: any) => (
          <div key={item._id} className="flex items-start gap-3 border-b pb-3">
            <img
              src={`${backend}/${item?.images[0]}`}
              alt=""
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-sm text-gray-600">${item.variants[0]?.price}</p>
              <p className="text-yellow-500 text-xs">★ ★ ★ ★ ☆</p>
            </div>
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPanel;
