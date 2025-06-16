import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/categories.json'), 'utf-8'));

const updateCategoryById = (id, name) => {
    const category = categoryData.categories.find(category => category.id === id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }
   
    category.name = name ?? category.name;

    fs.writeFileSync(
        path.resolve(__dirname, '../../data/categories.json'),
        JSON.stringify(categoryData, null, 2),
        'utf-8'
    );

    return category;
}

export default updateCategoryById;
