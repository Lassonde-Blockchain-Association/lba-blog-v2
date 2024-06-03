import { Dispatch, SetStateAction } from "react";
import CategorySelector from "./CategorySelector";

interface DateCategorySectionProps {
  formData: {
    title: string;
    slug: string;
    description: string;
    author: string;
    category: string[];
    date: string;
  };
  handleInputChange: (event: any) => void;
  handleCategoryInputChange: (event: any) => void;
  categories: string[];
  dateError: boolean;
  setDateError: Dispatch<SetStateAction<boolean>>;
  categoryError: boolean;
  SetCategoryError: Dispatch<SetStateAction<boolean>>;
}

const DateCategorySection = ({
  formData,
  handleInputChange,
  handleCategoryInputChange,
  categories,
  dateError,
  setDateError,
  categoryError,
  SetCategoryError,
}: DateCategorySectionProps) => {
  return (
    <div className="flex flex-row justify-between space-x-56 h-[3.5rem]">
      {/* <div className="mt-4 flex-grow">
        <input
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Date"
          className="border w-full placeholder-white-500 rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black focus:outline-none focus:shadow-outline"
          onFocusCapture={() => setDateError(false)}
        />
        {/* </div> */}
      {/* {dateError && (
          <div className="text-red-600">The Date Field is Empty!</div>
        )}
      </div> */}

      {/* Category */}
      <div className="mt-4 flex-grow rounded-xl z-50">
        <CategorySelector
          formDataCategories={formData.category}
          handleCategoryInputChange={handleCategoryInputChange}
          categories={categories}
        />
        {/*
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryInputChange}
          className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-200 dark:bg-slate-800 dark:border-0 dark:border-opacity-100 border-opacity-50 border-black focus:outline-none focus:shadow-outline"
          onFocus={() => SetCategoryError(false)}
          multiple
        >
          <option value="" disabled>
            Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
          */}
        {categoryError && (
          <div className="text-red-600">Invalid Input for Category</div>
        )}
      </div>
    </div>
  );
};
export default DateCategorySection;
