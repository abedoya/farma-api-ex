const express = require('express');
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static('public'))

app.get('/api/message', (req, res) => {
    res.json({ message: 
            'Hello GEEKS FOR GEEKS Folks from the Express server!' });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
