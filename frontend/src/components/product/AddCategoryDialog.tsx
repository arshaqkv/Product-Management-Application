import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axiosIntance";

interface AddCategoryDialogProps {
  onAddSuccess?: () => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  onAddSuccess,
}) => {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      if (category === "") {
        toast.error("Category can't be empty ");
        return;
      }
      const response = await axios.post("/category", { name: category });
      setCategory("");
      setOpen(false);
      toast.success(response.data.message);
      if (onAddSuccess) onAddSuccess();
    } catch (error: any) {
      setCategory("");
      toast.error(error.response?.data?.message || "Adding category failed");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setCategory(""); // Clear input on close
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-amber-500 rounded-xl hover:bg-amber-400 cursor-pointer">
          Add category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Add Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

export default AddCategoryDialog;
