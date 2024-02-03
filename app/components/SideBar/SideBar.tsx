import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Suspense,
} from "react";

import { DashboardContext } from "../../contexts/DashboardProvider";

export function SideBar() {
  const { state, dispatch } = useContext(DashboardContext);
  const [inputValue, setInputValue] = useState(state.searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          state.boardGames.flatMap(
            (boardGame) => boardGame.manifest.tags.categories
          )
        )
      ),
    [state.boardGames]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    dispatch({ type: "SET_SEARCH_TERM", payload: newValue });
  };

  const updateUrlCategory = (category: string) => {
    const newUrl = new URL(window.location.href);
    if (selectedCategory === category) {
      newUrl.searchParams.delete("category");
    } else {
      newUrl.searchParams.set("category", category);
    }
    window.history.pushState({}, "", newUrl.toString());
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
    updateUrlCategory(category);
  };

  const setCategoryFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    setSelectedCategory(categoryParam || "");
  };

  useEffect(setCategoryFromUrl, []);

  return (
    <Suspense>
      <div className=" w-full md:w-1/4 h-full flex flex-col gap-8 ">
        <h2 className="font-bold text-lg">Search</h2>
        <input
          className="rounded-xl p-2 w-full"
          type="text"
          placeholder="Search boardGame"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex w-full flex-col gap-2">
          <h2 className="font-bold text-lg">Category</h2>
          <div className="flex overflow-x-auto md:flex-col gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-xl p-2 mt-2 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white border-2 text-black"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                {selectedCategory === category ? " ✅" : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
