import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import axios from "../../api/axiosIntance";
import { config } from "../../config/config";

interface Props {
  product: any;
  onUpdate?: () => void;
}

const backend = config.app.BACKEND;

const EditProductDialog = ({ product, onUpdate }: Props) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [subcategories, setSubcategories] = useState<any>([]);
  const [subCategory, setSubCategory] = useState(product.subCategory);
  const [variants, setVariants] = useState<any[]>(product.variants);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    product.images || []
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const result = (await axios.get("/category/all-sub-category")).data;
      setSubcategories(result);
    };
    fetchSubCategories();
  }, []);

  const handleAddVariant = () => {
    setVariants([...variants, { ram: "", price: "", quantity: 1 }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  const removeExistingImage = (imgPath: string) => {
    setExistingImages(existingImages.filter((img) => img !== imgPath));
  };

  const handleSubmit = async () => {
    try {
      if (!title || !subCategory || variants.length === 0) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subCategory", subCategory);
      formData.append("variants", JSON.stringify(variants));
      formData.append("existingImages", JSON.stringify(existingImages));

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.put(`/product/${product._id}`, formData);
      toast.success(res.data.message || "Product updated successfully!");
      setOpen(false);
      if (onUpdate) onUpdate();
      document.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-400 rounded-full cursor-pointer">
          Edit product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-4">
          {/* Title */}
          <div>
            <label className="font-medium">Title :</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Variants */}
          <div>
            <label className="font-medium">Variants :</label>
            {variants.map((variant, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Ram"
                  value={variant.ram}
                  className="w-24"
                  onChange={(e) =>
                    handleVariantChange(index, "ram", e.target.value)
                  }
                />
                <Input
                  placeholder="Price"
                  value={variant.price}
                  className="w-32"
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                />
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    onClick={() =>
                      handleVariantChange(
                        index,
                        "quantity",
                        Math.max(1, variant.quantity - 1)
                      )
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-2">{variant.quantity}</span>
                  <Button
                    size="icon"
                    onClick={() =>
                      handleVariantChange(
                        index,
                        "quantity",
                        variant.quantity + 1
                      )
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {variants.length > 1 && (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              className="bg-neutral-800 text-white mt-3 hover:bg-neutral-700"
              onClick={handleAddVariant}
            >
              Add variant
            </Button>
          </div>

          {/* Subcategory */}
          <div>
            <label className="font-medium">Sub category :</label>
            <Select value={subCategory} onValueChange={setSubCategory}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories?.map((subCat: any) => (
                  <SelectItem key={subCat._id} value={subCat._id}>
                    {subCat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description :</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write product description"
            />
          </div>

          {/* Image Section */}
          <div>
            <label className="font-medium">Images :</label>
            <div className="flex gap-3 flex-wrap mt-2">
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <img
                    src={`${backend}/${img}`}
                    alt="existing"
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-white bg-black bg-opacity-50 p-1 rounded-full"
                    onClick={() => removeExistingImage(img)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.map((img, idx) => (
                <img
                  key={`new-${idx}`}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
              <label className="w-24 h-24 border-dashed border-2 rounded flex items-center justify-center cursor-pointer text-gray-400">
                <span>📁</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              className="bg-amber-500 hover:bg-amber-400"
              onClick={handleSubmit}
            >
              UPDATE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
