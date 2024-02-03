# Project README

[Live Demo of the App](https://phantom-dashboard.vercel.app/)  🚀

The application has been deployed and is live.

# PhantomBuster Front-end Software Engineer Technical Test 👻

This project is a technical test for the Front-end Software Engineer position at PhantomBuster. The goal is to create a page that meets the following requirements:

## Requirements

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

6. **Additional Features**: Feel free to implement any additional features that come to your mind and could improve the user experience or the overall quality of the application.

## Prerequisites

- Node.js version v18.17.0 or higher.

  If you don't have this version, you can install it using:

  ```bash
  $ nvm install v18.17.0
  $ nvm use v18.17.0
  ```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install

```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
