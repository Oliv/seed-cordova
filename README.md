# Seed cordova project

Cordova and brunch seed project

## Usage

Clone/Download the project

Install cordova globally if needed `npm install -g cordova`

Install android studio and build tools if needed

Run `cordova create cordova com.seed.seedproject SeedProject` in the base folder of the project (replace seedproject stuff with yours, but not cordova)

Go to app subfolder, run `npm start`. Brunch will install modules, listen app folder and compile code, and put it in cordova project

Go to cordova subfolder, run `cordova platform add android`

To compile and run app, go to cordova subfolder and run `cordova run`