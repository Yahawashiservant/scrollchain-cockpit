const fs = require('fs');
const path = require('path');

// Read the Sidebar data manually
const content = fs.readFileSync('components/sidebar/SidebarData.ts', 'utf8');
const regex = /cat:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const cat = match[1];
    const name = match[2];
    const fullPath = match[3];
    
    if (fullPath.startsWith('/dashboard/')) {
        const folder = fullPath.replace('/dashboard/', '');
        const dir = path.join('app/dashboard', folder);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        // SAFE CONTENT GENERATION (Concatenation)
        const pageContent = 'import RouteDispatcher from "../../../components/templates/RouteDispatcher";\n' +
                            'export default function P(){return <RouteDispatcher title="' + name + '" category="' + cat + '" />}';
        
        fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
    }
}
console.log("All pages re-wired successfully.");
