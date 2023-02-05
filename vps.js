const express = require("express");

const port = process.env.PORT || 2023;

const app = express();

require('./handler')(app);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(err);
});
