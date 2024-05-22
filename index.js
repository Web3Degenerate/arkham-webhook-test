const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const token = req.headers['arkham-webhook-token'];

    // Validate the token
    if (token !== 'uLGQYDFFsnpUDl') {
        return res.status(401).send('Invalid token');
    }

    // Log the entire request headers and body
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    // Send a response back to acknowledge receipt
    res.status(200).send('Webhook received');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});