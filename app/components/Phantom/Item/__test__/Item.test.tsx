import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Item } from "../Item";
import { IPhantom } from "../../../../types";
import mockData from "../../../../../public/api/mock/phantoms.json";

describe("Item", () => {
  const phantom = mockData[0] as IPhantom;

  beforeEach(() => {
    render(
      <Item
        key={phantom.id}
        item={phantom}
        setSelectedPhantom={() => {}}
        setOpenModalId={() => {}}
      />
    );
  });

  it("should render the item name", () => {
    const name = screen.getByText(phantom.name);

    expect(name).toBeInTheDocument();
  });

  it("should render the script name", () => {
    const scriptName = screen.getByText(phantom.script);

    expect(scriptName).toBeInTheDocument();
  });

  it("should render the correct number of list items", () => {
    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toEqual(phantom.manifest.tags.categories.length);
  });

  it("should render the correct remaining time before next launch", () => {
    const expectedTime = phantom.nextLaunchIn?.toString() as string;

    const remainingTime = screen.queryByText(new RegExp(expectedTime, "i"));

    expect(remainingTime).toBeInTheDocument();
  });
});
