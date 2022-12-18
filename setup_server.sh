#!/bin/bash

npm install --global forever
chmod +x start_server.sh

cd server
npm install express morgan body-parser
chmod +x scripts/keypress.sh scripts/play.sh
