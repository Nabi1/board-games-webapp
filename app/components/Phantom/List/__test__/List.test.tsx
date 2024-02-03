import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { List } from "../List";
import { DashboardProvider } from "../../../../contexts/DashboardProvider";
import fetchMock from "jest-fetch-mock";

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

jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return new URLSearchParams("category=");
  },
}));

describe("List component should display :", () => {
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
        <List />
      </DashboardProvider>
    );
  });

  mockData.forEach((item, index) => {
    describe(`Item with name ${item.name}`, () => {
      it(`should display name`, () => {
        const name = screen.getByText(item.name).closest("p");

        expect(name).toBeInTheDocument();
      });
      if (item?.repeatedLaunchTimes?.simplePreset && item.nextLaunchIn) {
        it(`should display next launch info`, () => {
          expect(
            screen.getByText(new RegExp(item.nextLaunchIn.toString(), "i"))
          ).toBeInTheDocument();
        });
      }
    });
  });
});
