import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/events.json'), 'utf-8'));

const deleteEvent = (id) => {
    const index = eventData.events.findIndex((e) => e.id === id);

    if (index === -1) {
        throw new Error(`Event with id ${id} was not found!`);
    }

    eventData.events.splice(index, 1);
    fs.writeFileSync(path.resolve(__dirname, '../../data/events.json'), JSON.stringify(eventData, null, 2), 'utf-8');
    return id;
};

export default deleteEvent;