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
  // const [showCategoryList, setShowCategoryList] = useState(false);
  const [checkedList, setCheckedList] = useState<Checked[]>([]);
  // const handleCategoryButton = () => {
  //   setShowCategoryList(!showCategoryList);
  // };

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
          <div className="border rounded-xl pl-[7px] py-2 overflow-y-auto bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black">
            Categories
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category, index) => (
            <DropdownMenuCheckboxItem checked={checkedList[index]} key={index}>
              <div onClick={(event) => handleClickedCategory(index, category)}>
                {category}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategorySelector;
