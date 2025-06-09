import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader className="w-12 h-12 text-amber-400 animate-spin" />
    </div>
  );
};

export default Loading;
