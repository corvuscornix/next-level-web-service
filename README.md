# Next-level-web-service
Experimentation on implementing a web service using Next.js on Zeit serverless platform. App has both UI and API implementation.

## UI
The app has a simple UI but utilizes some advanced web technologies such as code splitting, server side rendering and CSS-in-JS.
It also uses some of the latest React features like hooks and integrates with material-ui library.

## API
API implementation queries data from NASA API, processes that data into some key figures and returns that to the client.
API is easily extendable and you can introduce a new endpoint by just adding a new js files under /api folder.
This project also contains couple of tests for current API endpoints.

## Run locally
1) Download and install [Now CLI](https://zeit.co/download)
2) Run `yarn install` or `npm install`
3) Run `now dev`

## Deploy to cloud
1) Register a free account at [Zeit.co](https://zeit.co)
2) Run `now` at the root of the project folder and fill in the user credentials if asked

You can configure automatic deployment on every GitHub commit from the zeit.co website.
