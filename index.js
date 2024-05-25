// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // app.post('/webhook', (req, res) => {
// app.post('/', (req, res) => {
//     const token = req.headers['arkham-webhook-token'];

//     // Validate the token
//     // if (token !== 'uLGQYDFFsnpUDl') {
//     if (token !== 'KVmTrMKekNvvFa') {
//         return res.status(401).send('Invalid token');
//     }

//     // Log the entire request headers and body
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);

//     // Send a response back to acknowledge receipt
//     res.status(200).send('Webhook received');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<html><body><h1>Waiting...</h1></body></html>');
});

app.post('/', (req, res) => {
    // const token = req.headers['arkham-webhook-token'];
    const token = req.headers['Arkham-Webhook-Token'];

    // if (token !== 'uLGQYDFFsnpUDl') {
    if (token !== 'VnGCovJ6L7n9PQ') {
        return res.status(401).send('Invalid token');
    }

    const data = req.body;
    const transfer = data.transfer;

    if (!transfer) {
        return res.status(400).send('Invalid JSON payload');
    }

    const fromAddress = transfer.fromAddress.address;
    const toAddress = transfer.toAddress.address;
    const value = transfer.unitValue;
    const network = transfer.chain;
    const timestamp = transfer.blockTimestamp;

    const responseHtml = `
        <html>
            <body>
                <ul>
                    <li><strong>From:</strong> ${fromAddress}</li>
                    <li><strong>To:</strong> ${toAddress}</li>
                    <li><strong>Value:</strong> ${value}</li>
                    <li><strong>Network:</strong> ${network}</li>
                    <li><strong>Time:</strong> ${timestamp}</li>
                </ul>
            </body>
        </html>
    `;

    res.status(200).send(responseHtml);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
