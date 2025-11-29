const fs = require('fs');
const path = require('path');
const { MENU_ITEMS } = require('../components/sidebar/SidebarData');

MENU_ITEMS.forEach(item => {
    const folder = item.path.replace('/dashboard/', '');
    const dir = path.join('app/dashboard', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    // The endpoint is the folder name (e.g., hf_model_ingest)
    const endpoint = folder;
    
    const content = \`import UniversalPage from "../../../components/templates/UniversalPage";
export default function P() { return <UniversalPage title="\${item.name}" category="\${item.cat}" endpoint="\${endpoint}" />; }\`;
    
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
