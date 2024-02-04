import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { DashboardProvider } from "../../../contexts/DashboardProvider";
import { SideBar } from "../SideBar";
import mockData from "../../../api/mock/phantoms.json";

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
  beforeEach(() => {
    render(
      <DashboardProvider>
        <SideBar />
      </DashboardProvider>
    );
  });

  describe("Search Input", () => {
    it("should render correctly", () => {
      const searchInput = screen.getByPlaceholderText("Search phantom");

      expect(searchInput).toBeInTheDocument();
    });
  });

  describe("Category Filters", () => {
    it("should render with correct categories", () => {
      const instagramCategory = screen.getByText("instagram");
      const mailCategory = screen.getByText("mail");
      const workflowCategory = screen.getByText("workflow");

      expect(instagramCategory).toBeInTheDocument();
      expect(mailCategory).toBeInTheDocument();
      expect(workflowCategory).toBeInTheDocument();
    });

    it("should apply active styling on click", () => {
      const button = screen.getByText("instagram");

      fireEvent.click(button);

      expect(button).toHaveClass("bg-blue-500 text-white");
    });
  });
});
