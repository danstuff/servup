# Servup - open-source media casting software
A lightweight Node.JS app and browser extension setup that allows you to right-click and send a web video to a local linux server. Works best with YouTube.

## Requirements
 - A client that has Google Chrome, Chromium, or Firefox installed. 
 - A linux server that has:
    - A display connected.
    - A (preferably lightweight) desktop environment. For example, you can install xserver on an Ubuntu server via: `sudo apt-get install xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils`
    - Chromium.
    - NodeJS Version 19 or greater.

## Setup
 1. Clone this repository to the server. 
 2. Run `sudo setup_server.sh` to install the reuqired npm packages.
 2. Run `start_server.sh`. Enter a handshake phrase to sync with clients.
 3. On the client, install the servup extension in your browser. You can either install it from this repository or from the [Firefox Addons Store](https://addons.mozilla.org/en-US/firefox/addon/servup/). Coming soon: On Android, download the app from the Google Play Store, which adds an option to the share menu.
 4. Enter the local IP address of your server into the servup extension/app, as well as the handshake you entered before.
 5. Enjoy! Right clicking on a link in the client's browser and selecting "Cast to Servup Server" should allow you to immediately open it on the display connected to the server.
