const fs = require('fs');
const path = require('path');
const { MENU_ITEMS } = require('../components/sidebar/SidebarData');

MENU_ITEMS.forEach(item => {
    const folder = item.path.replace('/dashboard/', '');
    const dir = path.join('app/dashboard', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const content = `import UniversalPage from "../../../components/templates/UniversalPage";
export default function P() { return <UniversalPage title="${item.name}" category="${item.cat}" />; }`;
    
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
console.log("Rooms Generated.");
