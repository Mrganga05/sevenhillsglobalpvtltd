import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const adminDir = './src/admin';

// Replaces ../../ imports with ../ since directory depth decreased by 1
function fixPath(dir) {
    fs.readdirSync(dir).forEach(file => {
        if (!file.endsWith('.tsx')) return;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content.replace(/\.\.\/\.\.\//g, '../');
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${filePath}`);
        }
    });
}

fixPath(pagesDir);
fixPath(adminDir);
