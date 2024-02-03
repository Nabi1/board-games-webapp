import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { DashboardProvider } from "../../../contexts/DashboardProvider";
import { SideBar } from "../SideBar";
import mockData from "../../../mock/boardGames.json";

fetchMock.enableMocks();

describe("SideBar Component", () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify(mockData)),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });
  function renderSideBar() {
    render(
      <DashboardProvider>
        <SideBar />
      </DashboardProvider>
    );
  }
  describe("Search Input", () => {
    it("should render correctly", () => {
      renderSideBar();
      const searchInput = screen.getByPlaceholderText("Search boardGame");

      expect(searchInput).toBeInTheDocument();
    });
  });

  describe("Category Filters", () => {
    it("should render with correct categories", () => {
      render(
        <DashboardProvider>
          <SideBar />
        </DashboardProvider>
      );

      const abstractCategory = screen.getByText("abstract");
      const familyCategory = screen.getByText("family");
      const partyCategory = screen.getByText("party");
      const cooperativeCategory = screen.getByText("cooperative");
      const strategyCategory = screen.getByText("strategy");

      expect(abstractCategory).toBeInTheDocument();
      expect(familyCategory).toBeInTheDocument();
      expect(cooperativeCategory).toBeInTheDocument();
      expect(partyCategory).toBeInTheDocument();
      expect(strategyCategory).toBeInTheDocument();
    });

    it("should apply active styling on click", () => {
      renderSideBar();
      const button = screen.getByText("strategy");

      fireEvent.click(button);

      expect(button).toHaveClass("bg-blue-500 text-white");
    });
  });
});
