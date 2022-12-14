#!/bin/bash

export DISPLAY=:0
pkill -f chromium
chromium $1 --window-size=1920,1080 --start-fullscreen --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null --password-store=basic --autoplay-policy=no-user-gesture-required
