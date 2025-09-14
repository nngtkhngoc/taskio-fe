import type { FilterType } from "@/types";

import { Search } from "lucide-react";

interface FilterBarProps {
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
  ];

  const filterColors: Record<FilterType, string> = {
    all: "bg-gray-200 hover:bg-gray-300 border-2 border-gray-800",
    active: "bg-green-200 hover:bg-green-300 border-2 border-green-800",
    completed: "bg-sky-200 hover:bg-sky-300 border-2 border-sky-800",
    today: "bg-pink-200  hover:bg-pink-300 border-2 border-pink-800",
    week: "bg-violet-200  hover:bg-violet-300 border-2 border-violet-800",
  };

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row sm:gap-4 gap-0  items-center justify-between px-4 py-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-black">
        {/* Filter tabs */}
        <div className="flex justify-center sm:justify-start items-center space-x-2 py-2 pl-1  overflow-x-auto scrollbar-hide w-full md:w-2/3">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className={`px-3 py-2 text-sm font-bold rounded-md  transition-transform duration-200 cursor-pointer 
              ${
                filterType === key
                  ? `${filterColors[key]} scale-105`
                  : "bg-white text-gray-700 hover:scale-105 border-2 border-blac k"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search box */}
        <div className="relative flex-1 max-w-xs">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-black rounded-md  focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
};
