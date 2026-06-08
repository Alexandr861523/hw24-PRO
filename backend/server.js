const express = require('express');
const cors = require('cors');

const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/todos', todosRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});