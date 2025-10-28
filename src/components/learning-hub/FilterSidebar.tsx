import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: {
    categories: string[];
    tags: string[];
    levels: string[];
    prices: string[];
  };
  selectedFilters: {
    categories: string[];
    tags: string[];
    levels: string[];
    prices: string[];
  };
  onFilterChange: (type: any, value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onApply?: () => void; 
}

const FilterGroup: React.FC<{
  title: string;
  type: keyof FilterSidebarProps['selectedFilters'];
  options: string[];
  selected: string[];
  onChange: (type: any, value: string) => void;
}> = ({ title, type, options, selected, onChange }) => (
  <div>
    <h3 className="text-h4 font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(type, option)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm transition-colors focus:outline-none border-none",
            selected.includes(option)
              ? "bg-cap-sky-blue text-white hover:bg-cap-sky-blue/90"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onApply,
}) => {
  return (
    <aside className="h-full space-y-8 p-4 lg:p-0 lg:sticky lg:top-24">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <FilterGroup
        title="Lĩnh vực"
        type="categories"
        options={filters.categories}
        selected={selectedFilters.categories}
        onChange={onFilterChange}
      />
      <FilterGroup
        title="Từ khoá"
        type="tags"
        options={filters.tags}
        selected={selectedFilters.tags}
        onChange={onFilterChange}
      />
      <FilterGroup
        title="Mức độ"
        type="levels"
        options={filters.levels}
        selected={selectedFilters.levels}
        onChange={onFilterChange}
      />
      <FilterGroup
        title="Giá"
        type="prices"
        options={filters.prices}
        selected={selectedFilters.prices}
        onChange={onFilterChange}
      />
      
      {onApply && (
        <div className="pt-4 border-t lg:hidden">
          <Button onClick={onApply} className="w-full bg-cap-purple hover:bg-cap-purple/90">
            Áp dụng bộ lọc
          </Button>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;