const { exec } = require('child_process');

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

var handshake = process.argv[2]

app.use(morgan('combined'))

function handle_post(loc, callback) {
    app.post("/servup/"+loc+":handshake&:media", (req, res) => {
        if (req.params.handshake == handshake)
        {
            callback(req.params.media);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send('OK!');
        }
        else
        {
            console.log("POST denied");

            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Access Denied');
        }
    });
}

handle_post("play", (url) => {
    console.log("Serving Up " + url);
    exec("./scripts/play.sh \"" + url + "\"");
    sleep(2000);
    exec("./scripts/keypress.sh F");
});

handle_post("pause", (url) => {
    console.log("Toggle Pause");
    exec("./scripts/keypress.sh space");
});

handle_post("next", (url) => {
    console.log("Next Video");
    exec("./scripts/keypress.sh shift+N");
});

handle_post("previous", (url) => {
    console.log("Previous Video");
    exec("./scripts/keypress.sh shift+P");
});

handle_post("forward", (url) => {
    console.log("Go Forward");
    exec("./scripts/keypress.sh Right");
});

handle_post("back", (url) => {
    console.log("Go Back");
    exec("./scripts/keypress.sh Left");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
