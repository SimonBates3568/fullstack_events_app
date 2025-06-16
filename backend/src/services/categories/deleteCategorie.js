import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/categories.json'), 'utf-8'));

const deleteCategory = (id) => {
    const index = categoryData.categories.findIndex((category) => category.id === id);

    if (index === -1) {
        return null;
    }

    categoryData.categories.splice(index, 1);
    fs.writeFileSync(path.resolve(__dirname, '../../data/categories.json'), JSON.stringify(categoryData, null, 2), 'utf-8');
    return id;
};

export default deleteCategory;