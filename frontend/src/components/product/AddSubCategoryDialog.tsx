import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axiosIntance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface AddSubcategoryDialogProps {
  onAddSuccess?: () => void;
}

const AddSubcategoryDialog: React.FC<AddSubcategoryDialogProps> = ({
  onAddSuccess,
}) => {
  const [subcategory, setSubcategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  // ✅ Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category");
        setCategories(res.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (subcategory === "" || categoryId === "") {
        toast.error("Both fields are required");
        return;
      }
      const response = await axios.post("/category/sub-category", {
        name: subcategory,
        category: categoryId,
      });
      setSubcategory("");
      setCategoryId("");
      setOpen(false);
      toast.success(response.data.message);
      if (onAddSuccess) onAddSuccess();
    } catch (error: any) {
      setSubcategory("");
      setCategoryId("");
      toast.error(error.response?.data?.message || "Failed to add subcategory");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 rounded-xl hover:bg-amber-400 cursor-pointer">
          Add sub category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            Add Sub Category
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter subcategory name"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-400 w-full"
          >
            ADD
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcategoryDialog;
