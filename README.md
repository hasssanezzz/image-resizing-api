# Image processing api

## Endpoints

* `GET /resize`, it takes 3 query parameters, `filename`, `width` and `height`, height and width must be at least 100

Pictures to resize must be in the `images/input` folder.

Example: `/resize?filename=profile.png&width=500&height=500`

## Installation

1. `npm i` to install all required deps
2. `npm start` to start the server on default port: 5000

