const app = require("./app");

// Start the server
const port = process.env.PORT || 8080;
app.listen(process.env.PORT || 3000);
console.log(`Server listening at ${port}`);
