const fs = require('fs');
const path = require('path');
const { MENU_ITEMS } = require('../components/sidebar/SidebarData');

console.log("Hydrating " + MENU_ITEMS.length + " modules...");

MENU_ITEMS.forEach(item => {
    const folder = item.path.replace('/dashboard/', '');
    const dir = path.join('app/dashboard', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const pageCode = 'import RouteDispatcher from "../../../components/templates/RouteDispatcher";\n' +
                     'export default function P() { return <RouteDispatcher title="' + item.name + '" category="' + item.cat + '" />; }';
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageCode);
});
console.log("Restoration Complete.");
