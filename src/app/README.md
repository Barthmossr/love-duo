# App Directory (Expo Router)

This folder uses Expo Router's file-based routing system.

## Current Structure

- **`_layout.tsx`** - Root layout that loads fonts and wraps all screens
- **`index.tsx`** - Home/landing screen

## Routing Conventions

- `_layout.tsx` - Layout files wrap their children
- `index.tsx` - Default route for a directory
- `[id].tsx` - Dynamic route segments
- `(group)/` - Route groups (don't affect URL)
- `_component.tsx` - Non-route files (underscore prefix)

## Planned Structure

```
app/
├── _layout.tsx          # Root layout with fonts
├── index.tsx            # Landing/home screen
├── (auth)/              # Auth group
│   ├── _layout.tsx      # Auth layout
│   ├── login.tsx        # Login screen
│   └── register.tsx     # Register screen
└── (tabs)/              # Main app tabs
    ├── _layout.tsx      # Tab layout
    ├── gallery.tsx      # Gallery tab
    ├── dates.tsx        # Dates tab
    └── profile.tsx      # Profile tab
```
