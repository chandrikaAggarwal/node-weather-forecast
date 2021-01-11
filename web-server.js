const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('Hello Express!');
})


// Start server
app.listen(8080, () => {
    console.log('Server is running');
})