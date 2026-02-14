# TurfLink

## Overview

TurfLink is a frontend-only web application that connects players and turf providers. Users can discover nearby turfs, book slots, and find or join players for games—all through a single React-based interface.

## Features

- **Landing page** — Hero, How it works, Features, About, and Footer
- **Player dashboard** — Browse turfs, view slots, create “Need Players” requests
- **Provider dashboard** — Manage turfs and slot availability
- **Turf details** — View and book slots for a specific turf
- **Activity feed** — See bookings and activity from your network
- **Profile** — View player profiles and follow others
- **Multi-role access** — Switch between Player and Provider views

## Tech Stack

- **React 18** — UI
- **Vite** — Build and dev server
- **React Router** — Client-side routing
- **Tailwind CSS** — Styling

## Folder Structure

```
TurfLink/
  src/
    assets/
      logo.png
    components/
    pages/
      Landing.jsx
      PlayerDashboard.jsx
      ProviderDashboard.jsx
      TurfDetails.jsx
      CreateRequest.jsx
      ActivityFeed.jsx
      PlayerProfile.jsx
    App.jsx
    main.jsx
  index.html
  package.json
  tailwind.config.js
  vite.config.js
```

## How to Run Locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

Build for production:

```bash
npm run build
```

## Future Improvements

- Backend API for real bookings and user data
- Authentication and user accounts
- Real-time slot availability updates
- Notifications and reminders
- Mobile app or PWA support
