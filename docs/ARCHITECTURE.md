# Project code map

The project is split by responsibility so a feature can be traced from its page to its smaller UI pieces, data, and API.

## Client

- `client/src/main.jsx` selects the customer storefront or admin console from the URL.
- `client/src/App.jsx` coordinates customer state and passes it into customer components.
- `client/src/AdminApp.jsx` coordinates admin navigation and preview state.
- `client/src/components/customer/` contains the storefront header, hero, benefits, catalog, product card, product detail, bag, checkout, and footer.
- `client/src/components/admin/` contains one file per admin page plus shared table/status primitives.
- `client/src/components/debug/` contains the development-only diagnostics panel and React error boundary.
- `client/src/utils/debugErrors.js` stores captured development errors and the panel preference for opening on errors.
- `client/src/data/` contains the sample product catalog and admin preview records.
- `client/src/utils/format.js` contains shared formatting and image URL helpers.
- `client/src/services/customerApi.js` contains the customer-facing API request functions.
- `client/src/styles/main.scss` is the single Sass entry point; it loads Bootstrap, shared tokens, and the customer/admin style partials with Sass modules.
- `client/src/styles/_tokens.scss`, `_component-kit.scss`, and `_debug.scss` define shared design values, reusable `nw-*` classes, and diagnostics styling. See [STYLING.md](STYLING.md) for the class guide.

## Server

- `server/src/server.js` loads environment configuration and starts the HTTP listener.
- `server/src/app.js` configures Express middleware and mounts route groups.
- `server/src/routes/apiRoutes.js` maps API paths to controllers.
- `server/src/controllers/` contains one controller per API responsibility: health, service zones, and catalog.
- `server/src/config/db.js` owns the MySQL connection pool.
- `server/schema.sql` defines the database tables.

## Debugging path

For a UI issue, start with the relevant component under `client/src/components/`, then follow the props back to `App.jsx` or `AdminApp.jsx`. For an API issue, follow the URL from `routes/apiRoutes.js` to its controller, then to the database pool in `config/db.js`.

The client and admin screens still use sample data for most workflows. API functions are prepared, but the storefront has not yet been switched from its sample catalog to live API data.
