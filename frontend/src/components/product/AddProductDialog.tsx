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

interface AddProductDialogProps {
  onAddSuccess?: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  onAddSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subcategories, setSubcategories] = useState<any>([]);
  const [subCategory, setSubCategory] = useState("");
  const [variants, setVariants] = useState([
    { ram: "", price: "", quantity: 1 },
  ]);
  const [images, setImages] = useState<File[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const result = (await axios.get("/category/sub-category")).data;
      setSubcategories(result);
    };
    fetchSubCategories();
  }, [onAddSuccess]);

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

  const handleSubmit = async () => {
    try {
      if (
        !title ||
        !subCategory ||
        variants.length === 0 ||
        images.length === 0
      ) {
        toast.error("Please fill in all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subCategory", subCategory);

      // Convert variants array to JSON string
      formData.append("variants", JSON.stringify(variants));

      // Append images one by one
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post("/product", formData);
      setOpen(false);
      setDescription("");
      setTitle("");
      setImages([]);
      setVariants([{ ram: "", price: "", quantity: 1 }]);
      toast.success(res.data.message || "Product added successfully!");
      if (onAddSuccess) onAddSuccess();
    } catch (error: any) {
      setDescription("");
      setTitle("");
      setImages([]);
      setVariants([{ ram: "", price: "", quantity: 1 }]);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setTitle("");
          setDescription("");
          setImages([]);
          setVariants([{ ram: "", price: "", quantity: 1 }]);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-amber-500 rounded-xl hover:bg-amber-400 cursor-pointer">
          Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Add Product</DialogTitle>
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
              Add variants
            </Button>
          </div>

          {/* Subcategory */}
          <div>
            <label className="font-medium">Sub category :</label>
            <Select onValueChange={setSubCategory}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories?.map((subCategory: any) => (
                  <SelectItem key={subCategory._id} value={subCategory?._id}>
                    {subCategory?.name}
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

          {/* Upload Image */}
          <div>
            <label className="font-medium">Upload image :</label>
            <div className="flex gap-3 flex-wrap mt-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
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

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              className="bg-amber-500 hover:bg-amber-400"
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
