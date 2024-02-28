import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Item } from "../Item";
import { BroadGameType } from "../../../../types";
import mockData from "../../../../mock/boardGames.json";

describe("Item", () => {
  const boardGame = mockData[0] as BroadGameType;

  function renderItem() {
    render(
      <Item
        key={boardGame.id}
        item={boardGame}
        setSelectedBoardGame={() => {}}
        setOpenModalId={() => {}}
      />
    );
  }

  it("should render the item name", () => {
    renderItem();
    const name = screen.getByText(boardGame.name);

    expect(name).toBeInTheDocument();
  });

  it("should render the correct number of category list items", () => {
    renderItem();

    const categoryListContainer = screen.getByTestId("category-list-container");
    const categoryItems = categoryListContainer.querySelectorAll("li");

    expect(categoryItems.length).toEqual(
      boardGame.manifest.tags.categories.length
    );
  });

  it("should render the correct remaining time before next launch", () => {
    renderItem();

    const expectedTime = boardGame.nextPartyIn?.toString() as string;

    const remainingTime = screen.queryByText(new RegExp(expectedTime, "i"));

    expect(remainingTime).toBeInTheDocument();
  });
});
