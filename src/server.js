const app = require("./app");

const PORT = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "127.0.0.1";

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
