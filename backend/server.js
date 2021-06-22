// Modules
const express = require('express');
const app = express();

// Routers
const accountservice = require('./routes/accountservice');
const jobservice = require('./routes/jobservice');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('This is the homepage and the Server is up and running');
});

app.use('/api/accountservice', accountservice);
app.use('/api/jobservice', jobservice);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
