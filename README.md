# Project README

[Live Demo of the App](https://phantom-dashboard.vercel.app/) 🚀

The application has been deployed and is live. Yu can access the live demo by clicking the link above.

# PhantomBuster Front-end Software Engineer Technical Test 👻

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Folder Structure](#folder-structure)
4. [Unit Testing](#unit-testing)
5. [Search Functionality](#search-functionality)
6. [React Hooks location](#react-hooks-location)
7. [Prerequisites](#prerequisites)
8. [Getting Started](#getting-started)

### Introduction

This project is a technical test for the Front-end Software Engineer position at PhantomBuster. The goal is to create a page that meets specific requirements.

### Requirements 👷‍♀️

The page must contain:

1. **List of Phantoms**: Display a list of Phantoms with the following details:

- Name of the Phantom
- A drop-down menu with options “rename,” “duplicate,” and “delete”
- Launch frequency
- Time remaining before the next auto-launch

2. **Categories Filter**: Implement a filter by category. The filter should:

- Show only the category name, no icon
- Allow filtering by only one category at once
- Persist the filter by URL when the page is refreshed

3. **Phantom Details**: Provide a path that links to a detailed view of each Phantom, and a very basic view of the Phantom.

4. **Search Functionality**: Implement a search functionality to find Phantoms.

5. **Countdown Timer**: Display a countdown of the time remaining before the next auto-launch.

- **Additional Features**: Any additional features that could enhance the user experience or the application's quality are welcome.

### Folder Structure 🏢

The project follows a modular folder structure, with each module containing its own components, tests and types.

### Unit Testing

In this project, unit tests adhere to the Arrange, Act, Assert (AAA) principle, ensuring consistency and readability. Element selection for testing follows the query priority guide recommended by Testing Library [Testing Library Query Priority](https://testing-library.com/docs/queries/about/#priority).

### Search Functionality 🔍

The search input launches a search query when the user types in the input field. The search query filters the list of Phantoms by name and scrip's name, and the filtered list is displayed in the UI. The search query is case-insensitive.

### React Hooks location ⚓️

In case you are searching for the location of the React hooks used in the project, here is a table that shows the location of each hook

| useState                                       | useEffect                                      | useContext                                     | useReducer                           | useRef                                         | useCallback                              |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ------------------------------------ | ---------------------------------------------- | ---------------------------------------- |
| ./app/components/SideBar/SideBar.tsx           | ./app/contexts/DashboardProvider.tsx           | ./app/components/SideBar/SideBar.tsx           | ./app/contexts/DashboardProvider.tsx | ./app/components/hooks/useCountdown.tsx        | ./app/components/Phantom/List/List.tsx   |
| ./app/components/ResetButton.tsx               | ./app/components/SideBar/SideBar.tsx           | ./app/components/ResetButton.tsx               |                                      | ./app/components/Phantom/Dropdown/Dropdown.tsx | ./app/components/Phantom/Modal/Modal.tsx |
| ./app/components/hooks/useCountdown.tsx        | ./app/components/hooks/useCountdown.tsx        | ./app/components/Phantom/Dropdown/Dropdown.tsx |                                      | ./app/components/Phantom/Modal/Modal.tsx       |                                          |
| ./app/components/Phantom/Dropdown/Dropdown.tsx | ./app/components/Phantom/Dropdown/Dropdown.tsx | ./app/components/Phantom/List/List.tsx         |                                      |                                                |                                          |
| ./app/components/Phantom/List/List.tsx         | ./app/components/Phantom/Modal/Modal.tsx       | ./app/components/Phantom/Modal/Modal.tsx       |                                      |                                                |                                          |
| ./app/components/Phantom/Modal/Modal.tsx       | ./app/phantom/[slug]/page.tsx                  |                                                |                                      |                                                |                                          |
| ./app/phantom/[slug]/page.tsx                  |                                                |                                                |                                      |                                                |                                          |

## Prerequisites

Requires Node.js version v18.17.0 or higher. Use nvm to install if needed:

```bash
$ nvm install v18.17.0
$ nvm use v18.17.0
```

## Getting Started

First, install the dependencies:

```bash
$ npm install
# or
$ yarn
# or
$ pnpm install

```

Second, run the development server:

```bash
$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
```

Open http://localhost:3000 with your browser to see the result.
