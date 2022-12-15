const { exec } = require('child_process');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

var handshake = process.argv[2]

var jsonParser = bodyParser.text()

function handle_post(loc, callback) {
    app.post(loc, jsonParser, (req, res) => {
        let body = JSON.parse(req.body);

        if (body.handshake == handshake)
        {
            callback(body.url);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send('OK!');
        }
        else
        {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Access Denied');
            console.log("POST denied");
        }
    });
}

handle_post("/servup/play", (url) => {
    console.log("Serving Up " + body.url);
    exec("./scripts/play.sh \"" + body.url + "\"");
});

handle_post("/servup/pause", (url) => {
    console.log("Toggle Pause");
    exec("./scripts/keypress.sh space");
});

handle_post("/servup/next", (url) => {
    console.log("Next Video");
    exec("./scripts/keypress.sh shift+N");
});

handle_post("/servup/previous", (url) => {
    console.log("Previous Video");
    exec("./scripts/keypress.sh shift+P");
});

handle_post("/servup/forward", (url) => {
    console.log("Go Forward");
    exec("./scripts/keypress.sh Right");
});

handle_post("/servup/back", (url) => {
    console.log("Go Back");
    exec("./scripts/keypress.sh Left");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
