# Spreadsheet Application

## Overview

This is a frontend spreadsheet application built with Next.js, Tailwind CSS, and Zustand for state management. The application includes features such as cell formatting, data validation, search and filter functionality, pagination, undo/redo functionality, and persistent data storage.

## Setup

To get started with this project, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```
### Install Dependencies
Install the project dependencies using npm or yarn:
```bash
npm install
# or
yarn install

```

### Running the Project
To start the development server, run:
```bash
npm run dev
# or
yarn dev

```
### Usage
# Features
1.Cell Formatting

- Text Alignment: Select cells and adjust text alignment (left, center, right) from the formatting panel.
- Text Size: Adjust text size using the dropdown in the formatting panel.
- Error Handling: A warning message is displayed if no cells are selected when attempting to apply formatting.

2. Data Validation: Ensure that cell data adheres to the specified format.

3. Search and Filter: Use the search bar to filter available widgets based on the search query.

4. Undo/Redo Functionality: Use the undo/redo buttons to revert or reapply changes made to the cells. The buttons are conditionally displayed based on whether changes have been made.

5. Pagination/Infinite Scrolling: Navigate through large datasets using pagination controls or infinite scrolling.

6. Persistent Data Storage: Data changes are saved to localStorage to maintain state across page reloads.

# How to Use
1.Applying Cell Formatting

- Select one or more cells.
- Use the formatting panel to adjust text alignment and size.
- If no cells are selected, a warning will be displayed.
2.Search for Widgets

- Enter text in the search bar to filter widgets.
- The search results will update based on the query.
3. Undo/Redo Changes

- Click the "Undo" button to revert the last change.
- Click the "Redo" button to reapply the last undone change.
- The buttons will only be visible if there are changes to undo or redo.
4.Navigating Data

- Use pagination controls or scroll down to load more data as you navigate through the spreadsheet.


