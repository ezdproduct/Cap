import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

interface MobileFilterButtonProps {
  filters: any;
  selectedFilters: any;
  onFilterChange: (type: any, value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center lg:hidden mb-6">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-xs p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex justify-between items-center">
            Bộ lọc khóa học
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-60px)] overflow-y-auto">
          <FilterSidebar
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onApply={handleApply}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterButton;