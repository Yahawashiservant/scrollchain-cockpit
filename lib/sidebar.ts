import dashboardManifest from "../app/config/dashboardManifest";

export function getSidebarItems(): string[] {
  if (!dashboardManifest?.panels) return [];
  return dashboardManifest.panels;
}
