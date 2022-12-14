# Servup - Open-source media casting software
## Requirements
 - A phone, laptop, or any other client that has Google Chrome, Chromium, or Firefox installed. 
 - A linux server that has:
    - A display connected.
    - A (preferably lightweight) desktop environment. For example, you can install xserver on an Ubuntu server via:
```
    sudo apt-get install xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils
```
    - Chromium.
    - NodeJS Version 19 or greater, with these NPM packages installed:
        - `express`
        - `body-parser`
        - `forever`
## Setup
 1. Clone this repository to the server. 
 2. Run `start_server.sh`.
 3. On the client, install the servup extension in your browser. You can either install it from this repository or from your browser's web store (Chrome coming soon):
        - [Chrome/Chromium]()
        - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/servup/)
 4. Enter the local IP address of your server into the servup extension.
 5. Enjoy! Right clicking on a link in the client's browser and selecting "Cast to Servup Server" should allow you to immediately open it on the display connected to the server.
