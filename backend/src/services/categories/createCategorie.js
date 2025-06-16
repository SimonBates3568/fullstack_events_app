import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/categories.json'), 'utf-8'));

const createCategory = (name) => {
    const newCategory = {
        id: uuid(),
        name
    };

    categoryData.categories.push(newCategory);
    fs.writeFileSync(path.resolve(__dirname, '../../data/categories.json'), JSON.stringify(categoryData, null, 2), 'utf-8');
    return newCategory;
}

export default createCategory;