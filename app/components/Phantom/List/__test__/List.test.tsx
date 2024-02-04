import React from "react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";

import { List } from "../List";
import { DashboardProvider } from "../../../../contexts/DashboardProvider";
import mockData from "../../../../api/mock/phantoms.json";

fetchMock.enableMocks();

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

  it("should have the correct number of children", () => {
    const listElement = screen.getByTestId("phantom-list");
    expect(listElement.children.length).toEqual(mockData.length);
  });

  mockData.forEach((item) => {
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
