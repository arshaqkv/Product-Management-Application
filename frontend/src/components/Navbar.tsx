import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../api/axiosIntance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WishlistPanel from "./product/Wishlist";

const Navbar = () => {
  const isLoggedin = localStorage.getItem("isLoggedin");
  const navigate = useNavigate();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout");
      toast.success(response.data.message);
      localStorage.removeItem("isLoggedin");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
  
  };

  return (
    <>
      {/* Backdrop when panel is open */}
      {wishlistOpen && (
        <div
          onClick={() => setWishlistOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        ></div>
      )}

      <div className="bg-blue-950 h-[100px] flex justify-center items-center relative z-50">
        <div className="w-1/2">
          <form onSubmit={handleSearch} className="w-sm relative">
            <input
              type="text"
              placeholder="Search any thing"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 bg-white border-gray-300 py-3 rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 bg-amber-500 text-white px-10 py-3 rounded-full shadow-md hover:bg-amber-400 transition"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex text-white gap-4">
          {/* Wishlist */}
          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => setWishlistOpen(true)}
          >
            <div className="flex items-center justify-center gap-1">
              <Heart />
              
            </div>
            <p className="hover:underline">Wishlist</p>
          </div>

          {/* Cart */}
          <div className="flex gap-1 cursor-pointer">
            <div className="flex items-center justify-center gap-1">
              <ShoppingCart />
              <p className="bg-amber-500 rounded-full w-4 h-4 text-xs font-bold text-center">
                0
              </p>
            </div>
            <p>Cart</p>
          </div>

          {/* Login/Logout */}
          {isLoggedin ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer hover:underline"
            >
              Logout
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>

      {/* Slide-in Wishlist Panel */}
      <WishlistPanel
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  );
};

export default Navbar;
