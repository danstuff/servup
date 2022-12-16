#!/bin/bash

npm install --global forever
chmod +x start_server.sh

cd server
npm install
chmod +x scripts/keypress.sh scripts/play.sh
