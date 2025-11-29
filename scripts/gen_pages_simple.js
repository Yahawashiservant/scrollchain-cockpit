const fs = require('fs');
const path = require('path');
const { MENU_ITEMS } = require('../components/sidebar/SidebarData'); // Use require since we are in node

// We need to manually read the file because SidebarData uses "export const" (ESM) which node REPL hates.
// So we just parse it with regex from the file on disk to be safe.
const content = fs.readFileSync('components/sidebar/SidebarData.ts', 'utf8');
const regex = /path: "([^"]+)",.*cat: "([^"]+)"/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const fullPath = match[1]; // /dashboard/overview
    const cat = match[2];
    if (fullPath.startsWith('/dashboard/')) {
        const folder = fullPath.replace('/dashboard/', '');
        const dir = path.join('app/dashboard', folder);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        const pageName = folder.replace(/-/g, ' ').toUpperCase();
        const pageContent = \`import RouteDispatcher from "../../../components/templates/RouteDispatcher";
export default function P(){return <RouteDispatcher title="\${pageName}" category="\${cat}" />}\`;
        
        fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
    }
}
console.log("Pages generated.");
