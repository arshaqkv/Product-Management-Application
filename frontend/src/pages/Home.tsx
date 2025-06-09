import Filter from "../components/product/Filter";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCategoryDialog from "../components/product/AddCategoryDialog";
import AddSubcategoryDialog from "../components/product/AddSubCategoryDialog";
import AddProductDialog from "../components/product/AddProductDialog";
import axios from "../api/axiosIntance";
import { config } from "../config/config";

const backend = config.app.BACKEND;

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const [categories, setCategories] = useState<any[]>([]);

  const refetchCategories = async () => {
    try {
      const { data } = await axios.get("/category/all-sub-category");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProducts = async (page: number = 1, limit: number = 10) => {
    let url = `/product?page=${page}&limit=${limit}`;
    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    const { data } = await axios.get(url);
    setProducts(data.products);
    setTotal(data.total);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage || page);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedin") !== "true") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    refetchCategories();
    fetchProducts(currentPage, limit);
  }, [currentPage, limit, query]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const refetchProducts = () => {
    fetchProducts(currentPage, limit);
  };

  return (
    <div>
      <Navbar />
      <div className="flex px-4">
        {/* Sidebar Filter */}
        <Filter categories={categories} />

        {/* Main Content */}
        <div className="w-full px-4">
          {/* Top Buttons */}
          <div className="flex justify-end pt-4 gap-3 items-center">
            <AddCategoryDialog onAddSuccess={refetchCategories} />
            <AddSubcategoryDialog onAddSuccess={refetchCategories}/>
            <AddProductDialog onAddSuccess={refetchProducts} />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
            {products.map((product: any) => (
              <Link to={`product/${product._id}`} key={product._id}>
                <div className="border rounded-xl shadow-sm p-4 hover:shadow-md transition">
                  <img
                    src={`${backend}/${product?.images[0]}`}
                    alt={product.title}
                    className="h-40 w-full object-contain mb-3"
                  />
                  <h2 className="text-blue-900 font-semibold hover:underline cursor-pointer truncate">
                    {product.title}
                  </h2>
                  <p className="text-gray-700 font-semibold mt-1">
                    ${product.variants?.[0]?.price || "N/A"}
                  </p>
                  <div className="flex mt-1">
                    <span className="text-yellow-400">★ ★ ★ ★ ☆</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center px-2 py-4">
            <p className="text-sm text-gray-600">
              {products.length} of {total} items
            </p>

            {/* Page Numbers */}
            <div className="flex gap-1">
              <button
                className="px-2 py-1 text-sm border rounded disabled:opacity-40"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {"<"}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-full text-sm ${
                      page === currentPage
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="px-2 py-1 text-sm border rounded disabled:opacity-40"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {">"}
              </button>
            </div>

            {/* Limit Selector */}
            <div className="flex items-center gap-1">
              <span className="text-sm">Show</span>
              <select
                className="text-sm border rounded px-1 py-0.5"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setCurrentPage(1); // reset to first page
                }}
              >
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
