import { FilterButtonIconProps } from "../types";

const FilterButtonIcon = ({ title, toggleFilter }: FilterButtonIconProps) => {
  return (
    <>
      <button onClick={toggleFilter} type="button" className="flex items-center gap-2 text-black dark:text-white bg-white hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border me-2 dark:bg-slate-900 dark:border-slate-500 dark:hover:bg-slate-800 dark:focus:ring-slate-800">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
      </svg>
      Filter by {title}
      </button>
    </>
  );
}

type FilterButtonProps = { filter: boolean, toggleFilter: () => void }

const FilterButton = ({ filter, toggleFilter }: FilterButtonProps) => {
  return (
    <div className="flex justify-end w-full mb-6">
      {filter ? <FilterButtonIcon toggleFilter={toggleFilter} title="User" /> : <FilterButtonIcon toggleFilter={toggleFilter} title="Post" />}
    </div>)
}

export default FilterButton;
