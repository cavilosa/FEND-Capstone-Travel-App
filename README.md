# Travel App

The app uses these APIs: <a href="https://www.weatherbit.io/account/create">Weatherbit</a>, <a href="http://www.geonames.org/export/web-services.html">Geonames</a> and <a href="https://pixabay.com/api/docs/">Pixabay</a>.

#### ABOUT:
This is a travel application, which pulls multiple types of data (weather forecast,
picture of the destination or country of destination, geo location information) from
different sources and weather forecast requires data from geo location api. Application
uses local storage to store trip and its notes.

### INPUT:
In order to create a trip, a user needs to add **_destination_, _departure_ and _return dates_**. All 3 should be present and not empty. The app will give a hint if the input is incorrect: either dates are incorrect or there is a mistype in the city name.

The trip will show a **photo of a city or a country of destination**, including a **countdown** to the departure day.


### SETTING UP VIRTUAL ENVIRONMENT:

1. First, let's install Node.js virtual environment - <a href="https://pypi.org/project/nodeenv/">nodeenv</a>:

    pip install nodeenv

    Create virtual environment:

        nodeenv env

    <a href="https://pypi.org/project/nodeenv/">It’s much faster to install from the prebuilt package than Install & compile node.js from source:</a>

        nodeenv --prebuilt env

    Activate virtual environment:

        . env/bin/activate

    To deactivate:

        deactivate_node

###  INSTALLING DEPENDENCIES:

    npm install

### Start the application in development mode:

    npm run build-dev

### Start the application in production mode:

    npm run build-prod

### Starting Node.js server:

    npm start

For development server you will need to start the dev-server and node in separate
console windows, as dev-server and node server will be activated on different ports at once.
Production mode can be run in the same one. First, the dist folder will be generated and then you can start the node.js server.

Production mode equipped with **service workers** that allow offline access if the server can not be reached, by creating a cached version of the website.


### TESTING
To run jest tests:

    npm run test

### STANDOUT FEATURES:

There is fresh **16 day weather forecast** available, when clicking on the weather button, displays forecast starting from the current date.

There is a button to **print** a page with all the travel information.

Remove trip button will **delete current trip**, that is located on the localStorage.

There is additional **clear input** button, to clear input fields if desired.


#### Lodging and Notes additional fields:

After creating the trip, a user can **add lodging info or/and notes**, that added to localStorage as well.
Lodging and notes can be added only to existing trip, so first a trip has to be created.

#### The Footer
Shows links to all APIs used in the app.
