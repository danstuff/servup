#!/bin/bash

echo Starting Servup Server...

cd server
forever start servup_server.js
