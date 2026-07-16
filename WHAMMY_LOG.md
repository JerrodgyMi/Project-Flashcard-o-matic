# Whammy Log – Flashcard-o-matic

## Bug 1: Missing module imports breaking the app

### Problem
When running tests and starting the app, I received errors like:
- "Cannot find module '../Cards/AddCard'"
- "Cannot find module './Deck/Deck'"
- "Cannot find module './Layout/Layout'"

The app would fail to compile and routes would not load.

### Cause
The import paths in `App.js` and `Layout/index.js` did not match the actual folder structure in the project. Some files were imported from incorrect directories (e.g., `Card` vs `Cards`, or missing `Layout/Layout` file).

### Solution
I corrected all import paths so they matched the real folder structure:
- Updated incorrect folder names (`Card` → `Cards`)
- Fixed incorrect component paths in `App.js`
- Removed or corrected imports that referenced non-existent files
- Ensured each component file existed before importing it

## Bug 2: Router nesting error causing test failures and blank app

### Problem
The app failed with:
> "You cannot render a <Router> inside another <Router>"

Tests also failed and the browser showed a blank screen.

### Cause
There were multiple Router components being rendered at the same time:
- One in `index.js`
- Another inside `App.js` or test environment

React Router only allows a single Router at the top level.

### Solution
I removed the extra Router wrapper and ensured:
- `index.js` contains the single `<BrowserRouter>`
- `App.js` only contains routes, not another Router

Thankfully this resolved both test failures.
