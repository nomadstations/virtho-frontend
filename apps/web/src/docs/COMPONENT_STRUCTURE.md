# Component Structure & Refactoring Documentation

## Overview
This document outlines the architectural patterns, state management strategies, and component hierarchies for the Virtho Foundation platform.

## Key Changes
1. **Extracted Hooks**: Consolidated state management into reusable hooks (`useFilters`, `useViewMode`, `useSearch`).
2. **Extracted Constants & Helpers**: Placed magic numbers, messages, and configuration objects into `src/utils/`.
3. **Limitation Note**: Due to system constraints preventing file deletion, files could not be cleanly moved into subdirectories (`/components/Projects/`, etc.) because the old files would remain and cause duplication issues. The structure remains flat in `src/components/`, but the code has been modularized and cleaned.

## Custom Hooks
- **`useFilters(initialFilters)`**: Manages filter state across list pages. Returns `{ filters, setFilters, updateFilter, clearFilters }`.
- **`useViewMode(storageKey, defaultMode)`**: Manages and persists grid/list view preferences in `localStorage`.
- **`useSearch(initialQuery)`**: Manages search input state and provides a `clearSearch` utility.
- **`useCart()`**: Manages cart state via Context API, persisted to `localStorage`.
- **`useAuth()`**: Manages authentication state via Context API.

## Utilities
- **`src/utils/config.js`**: Contains `PAGINATION_LIMITS`, `ROUTE_PATHS`, `ANIMATION_VARIANTS`.
- **`src/utils/constants.js`**: Contains `UI_CONSTANTS`, `ERROR_MESSAGES`, `SUCCESS_MESSAGES`.
- **`src/utils/helpers.js`**: Contains formatting and optimization utilities (`formatDate`, `truncateText`, `debounce`, `throttle`).
- **`src/utils/validators.js`**: Contains input validation rules (email, password, sanitization).

## State Management Patterns
The application utilizes a hybrid state management approach:
1. **Local State**: Managed via `useState` / `useReducer` for component-specific UI state (e.g., modals, form inputs).
2. **Context API**: For global features required across the app (`AuthContext`, `CartProvider`).
3. **Custom Hooks**: Used to share logic (not necessarily global state) between similar pages (e.g., `useFilters` for listing pages).
4. **LocalStorage**: Used to persist non-sensitive user preferences (e.g., `viewMode`) and mock database data for prototyping (`virtho_projects`, `virtho_users`).

## Data Flow (List Pages)
1. **Input**: User interacts with `SearchBar` or `Filter` components.
2. **State Update**: `useSearch` or `useFilters` updates local state.
3. **Processing**: `useMemo` hooks recalculate the derived `filteredItems` array based on the current state.
4. **Render**: The `AnimatePresence` and `motion` components map over `filteredItems` to render `<Card>` or `<ListView>` components based on the `viewMode` state.