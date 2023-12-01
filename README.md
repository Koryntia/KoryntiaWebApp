# Koryntia App

Revolutionizing Financial Inclusion: Koryntia's Mission to Empower 2 Billion People with Borderless Credit Access

# Background

This project is built on Next.js 13.5 and is organized as a single application within a standalone repository. This approach allows us to focus on delivering a cohesive and optimized DeFi experience.

# Prerequisites

To run this project locally, the following tools are required on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### 1. Installation

Clone the project:

```sh
git clone https://github.com/Koryntia/KoryntiaWebApp.git
```

Navigate into the project directory and install its dependencies:

```
cd KoryntiaWebApp/
```

# Project Setup Guides

## Install Dependencies

Before setting up a project, install dependencies for the Project:

```sh
npm install
```

### Run

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Local Routes

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
-http://localhost:3000 --> if you wanna test Metamask connection page
-http://localhost:3000/landing --> for the langing page

### CRUD Operations

#### Loans

To test:

- Make sure you have [MongoDB Compass](https://www.mongodb.com/products/tools/compass) up and running.
- Copy the content of`.env.example` and save it in `.env.local` file.

- visit: http://localhost:3000/loans

Note:

- The `loans` route is only for testing purposes. Might/will be deleted later.

## Deployment

N/A

### Stack

List of libraries in building the Koryntia web app

- [Tailwindcss](https://tailwindcss.com/docs/installation/)
- [Formik](https://formik.org/docs/)
- [Yup](https://github.com/jquense/yup/)
- [React Router DOM V6](https://reactrouter.com/en/main/)
- [Sweetalert2](https://sweetalert2.github.io/)
- [Socket io](https://socket.io/)
- [next-intl](https://next-intl-docs.vercel.app/docs/getting-started/)
- [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started/)
- [Axios](https://axios-http.com/docs/intro/)
- etc

## Architecture

N/A

### File Structure

N/A

### IU Components

List of common reusable components.

Components

- Card
- Button

### Application state

N/A
