Steam Game Collection
================
This will determine which games you have in common with your selected friends and return a list of games. Simply click on one of the games to launch it in steam.

How to run
==========
1. Get an API key from Steam and put it in a new Secrets.js file.
2. Download an extension for Chrome/Firefox that allows cross-origin calls. This will be fixed in a future revision.
3. Run `npm start`

Todo
======
- Clean up the mess of promises from line 133 to 161.
- Move the fetch calls out into Flux actions.
- Add Flux stores and a dispatcher to handle store events.
- Add OAuth support to consistently get the users Steam ID. Resolving vanity URLs doesn't always work.
- Add more pizazz the UI.
