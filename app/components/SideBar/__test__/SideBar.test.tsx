import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { DashboardProvider } from "../../../contexts/DashboardProvider";
import { SideBar } from "../SideBar";

fetchMock.enableMocks();

const mockData = [
  {
    id: "6941466533774460",
    name: "Grow Your LinkedIn Network",
    script: "Grow Your LinkedIn Network.js",
    manifest: {
      tags: {
        categories: ["workflow", "linkedin", "salesNavigator"],
      },
    },
    launchType: "repeatedly",
    repeatedLaunchTimes: {
      simplePreset: "Once per day",
    },
    nextLaunchIn: 3654,
  },
  {
    id: "1936902841792005",
    name: "LinkedIn Contacts Email Finder Workflow",
    script: "LinkedIn Contacts to Emails.js",
    manifest: {
      tags: {
        categories: ["workflow", "linkedin", "mail"],
      },
    },
    launchType: "repeatedly",
    repeatedLaunchTimes: {
      simplePreset: "Twice per day",
    },
    nextLaunchIn: 6842,
  },
  {
    id: "5728802186298527",
    name: "LinkedIn Profile Scraper",
    script: "LinkedIn Profile Scraper.js",
    manifest: {
      tags: {
        categories: ["linkedin", "mail"],
      },
    },
    launchType: "manually",
  },
  {
    id: "8937174725125918",
    name: "Instagram Notifications Extractor",
    script: "Instagram Notifications Extractor.js",
    manifest: {
      tags: {
        categories: ["instagram"],
      },
    },
    launchType: "manually",
  },
  {
    id: "891500502819788",
    name: "LinkedIn Event Inviter",
    script: "LinkedIn Event Inviter.js",
    manifest: {
      tags: {
        categories: ["linkedin"],
      },
    },
    launchType: "manually",
  },
];

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
      expect(screen.getByPlaceholderText("Search phantom")).toBeInTheDocument();
    });
  });

  describe("Category Filters", () => {
    it("should render with correct categories", () => {
      expect(screen.getByText("instagram")).toBeInTheDocument();
      expect(screen.getByText("mail")).toBeInTheDocument();
      expect(screen.getByText("workflow")).toBeInTheDocument();
    });

    it("should apply active styling on click", () => {
      const button = screen.getByText("instagram");
      fireEvent.click(button);
      expect(button).toHaveClass("bg-blue-500 text-white");
    });
  });
});
