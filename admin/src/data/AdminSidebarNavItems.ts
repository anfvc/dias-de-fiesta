export const adminSidebarNavItems = [
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/dashboard`,
    name: "Dashboard",
  },
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/events`,
    name: "Create Event",
  },
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/uploads`,
    name: "Photo Uploads",
  },
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/users`,
    name: "Users",
  },
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/testimonials`,
    name: "Testimonials",
  },
  {
    to: `${import.meta.env.VITE_SECRET_PREFIX}/settings`,
    name: "Settings",
  },
];
