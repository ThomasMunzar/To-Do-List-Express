const router = require('express').Router()
const path = require("path");



// Express route definition : will send user to ./public/notes.html file when end point is http://localhost.3001/notes
// the res.sendFile is an express method used to send a file in the RESPONSE (res = response) the file being sent is mentioned above.
router.get("/notes", (req, res) =>
   res.sendFile(path.join(__dirname, "../public/notes.html"))
);



router.get("*", (req, res) =>
   res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = router