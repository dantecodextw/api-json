import express from "express"
import fs from "fs"
import path from "path"

const __dirname = import.meta.dirname

const app = express();
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

function readData() {
    try {
        if (!fs.existsSync(dataFilePath)) {
            fs.writeFileSync(dataFilePath, JSON.stringify([]));
            return [];
        }
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        if (!fileData) {
            return [];
        }
        return JSON.parse(fileData);
    } catch (err) {
        throw new Error('Error reading data file');
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        throw new Error('Error writing data file');
    }
}

app.get('/items', (req, res) => {
    try {
        const items = readData();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/items/:id', (req, res) => {
    try {
        const items = readData();
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const item = items.find(i => i.id === id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/items', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Missing required field: name' });
        }
        const items = readData();
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const newItem = { id: newId, name };
        items.push(newItem);
        writeData(items);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/items/:id', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Missing required field: name' });
        }
        const items = readData();
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const index = items.findIndex(i => i.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }
        items[index].name = name;
        writeData(items);
        res.json(items[index]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/items/:id', (req, res) => {
    try {
        const items = readData();
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const index = items.findIndex(i => i.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const removedItem = items.splice(index, 1);
        writeData(items);
        res.json({ message: 'Item deleted successfully', item: removedItem[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
