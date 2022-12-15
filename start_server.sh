#!/bin/bash

echo Starting Servup Server...

echo Enter a secret handshake: 
read handshake

cd server
forever start servup_node.js $handshake
