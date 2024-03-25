import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { TiArrowSortedDown } from "react-icons/ti";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface CategorySelectorProps {
  formDataCategories: string[];
  handleCategoryInputChange: (event: any) => void;
  categories: string[];
}

const CategorySelector = ({
  formDataCategories,
  handleCategoryInputChange,
  categories,
}: CategorySelectorProps) => {
  const [checkedList, setCheckedList] = useState<Checked[]>([]);

  useEffect(() => {
    const initialCheckList: boolean[] = Array<boolean>(categories.length).fill(
      false
    );
    setCheckedList(initialCheckList);
  }, []);

  const handleClickedCategory = (index: number, value: string) => {
    console.log(index);
    var newCheckedList = checkedList;
    console.log(newCheckedList[index]);
    newCheckedList[index] = !newCheckedList[index];
    console.log(newCheckedList[index]);
    setCheckedList(newCheckedList);
    handleCategoryInputChange(value);
  };

  return (
    <div className="w-full z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border rounded-xl pl-[10px] pr-2 py-2 overflow-y-auto bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black flex justify-between items-center">
            <p>
              {formDataCategories.length == 0
                ? "Select Categories"
                : formDataCategories.toString()}
            </p>
            <TiArrowSortedDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category, index) => (
            <DropdownMenuCheckboxItem
              checked={checkedList[index]}
              key={index}
              onClick={() => handleClickedCategory(index, category)}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategorySelector;
