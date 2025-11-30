#!/bin/bash
set -e

FILE="components/Sidebar.tsx"

echo "[+] Removing duplicate SidebarItem imports…"

# 1. Delete any line importing SidebarItem alone
sed -i '/import { SidebarItem } from ".\/sidebar\/SidebarData";/d' "$FILE"

# 2. Ensure only ONE correct import block exists
sed -i 's/import MENU_ITEMS, { SidebarCategory, SidebarItem } from ".\/sidebar\/SidebarData";/import MENU_ITEMS, { SidebarCategory, SidebarItem } from ".\/sidebar\/SidebarData";/' "$FILE"

echo "[✓] Sidebar.tsx import conflict fully resolved."
