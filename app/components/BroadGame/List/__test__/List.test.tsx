import React from "react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";

import { List } from "../List";
import { DashboardProvider } from "../../../../contexts/DashboardProvider";
import mockData from "../../../../mock/boardGames.json";

fetchMock.enableMocks();

jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return new URLSearchParams("category=");
  },
}));

function renderComponent() {
  render(
    <DashboardProvider>
      <List />
    </DashboardProvider>
  );
}

describe("List component should display :", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(mockData)),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  it("should have the correct number of children", () => {
    renderComponent();
    const listElement = screen.getByTestId("boardGame-list");
    expect(listElement.children.length).toEqual(mockData.length);
  });

  it.each(mockData.map((item) => [item.name]))(
    "Item with name %s should display name",
    (name) => {
      renderComponent();
      const nameElement = screen.getByText(name);
      expect(nameElement).toBeInTheDocument();
    }
  );
});
