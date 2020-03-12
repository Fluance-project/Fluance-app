# Ritmic Platform
Real-time et predictive maintenance &amp; platform for industry & lab.
Ritmic give you the ability to configure your own maintenance plaform. 

## Requirements

- Node.js 10.x or later

## Architecture

Ritmic Platform centralize and merge data collected through multiples Ritmic modules agnostically. The platform itself is composed by a Ritmic Server (Node.js Backend) that manage user credentials, websocket, data collect, and persistance into mongoDB. It provide a in/out API that provide the ability to manage modules data managment (alerts threshold, regression, predictive params etc...). The Ritmic app is a Vue.JS view for the platform that implement API Ritmic server's logics.

The Ritmic IoT Module is the generic abstraction of the data collector. For the moment Ritmic provides a *Basic Measurement Module* compatible with Ubuntu Core based on GPIO API of the SenseHat's Raspberry Pi 4 Module. Get it on the dedicated git repository here.

[![](https://lh3.googleusercontent.com/goDif8qWkk-Oud0O3gnQGky65GAz1zV86WLJNsyZIop2InY7fAgjskNpAhf4i9VcH5VgljN_PIBWuKHUFbWT=w2880-h1428)](https://lh3.googleusercontent.com/goDif8qWkk-Oud0O3gnQGky65GAz1zV86WLJNsyZIop2InY7fAgjskNpAhf4i9VcH5VgljN_PIBWuKHUFbWT=w2880-h1428)

## Getting Started

The project Ritmic Platform is using resources specified on the package.json. First install it with following command.

    yarn install

Ritmic platform provide a ready-to-use docker-compose file for MongoDB. if you want to use it, type `docker-compose up -d` in the root folder. 

Go to */app* and type ``yarn start`` to start a local instance for debug/dev, or type ``yarn build`` to build the production app.

Go to */server* and type ``yarn start`` to start a local instance for debug/dev of the Ritmic server, or type ``yarn build`` to build the production server.

For more information about the **app** or the **server** go to specifics readme inside of dedicated folders. 

## Credits & contributors
- Wladimir Delenclos - Digital Engineer