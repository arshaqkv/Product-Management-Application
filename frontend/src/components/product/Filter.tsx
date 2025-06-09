import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

interface FilterProps {
  categories: any[];
}

const Filter: React.FC<FilterProps> = ({ categories }) => {
  return (
    <div className="w-full md:w-[30%] mt-14">
      <div className="flex flex-col items-center justify-between">
        <h1 className="mb-3 text-md font-semibold md:text-lg text-blue-950">
          Categories
        </h1>
        <Accordion type="single" collapsible>
          {categories?.map((category) => (
            <AccordionItem key={category._id} value={category._id}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent className="pl-4">
                {category?.subCategories?.map((sub: any) => (
                  <div
                    key={sub._id}
                    className="flex items-center space-x-2 py-1"
                  >
                    <Checkbox id={sub._id} />
                    <label htmlFor={sub._id} className="text-sm text-gray-700">
                      {sub?.name}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
