<p align="center">
  <img  height="200" src="https://github.com/dewana-dewan/googly/blob/master/images/image.png" />
</p>

## An investment portfolio management software. Built in python with SQLite3 over Google App Engine.

### Installation
- First install Google App Engine, head [here](https://cloud.google.com/appengine/docs/standard/python/quickstart) for details.
```
dev_appserver.py ./
```
- The local development server is now running and listening for requests on port 8080
- If you wish to run this app on another port use
```
dev_appserver.py --port 8000 ./
```
Google App Engine doesn't support SQLite3 as of now, so we have to use a work around.
You add SQLite3 in the list of allowed modules in the sandbox.py.(head [here](http://stackoverflow.com/questions/16757013/os-x-appengine-importerror-no-module-named-sqlite3) for details)

### Screenshots

#### Home Page
![screen1](https://github.com/dewana-dewan/googly/blob/master/images/screen1.png?raw=true "Home Page")

#### A stock's page
![screen2](https://github.com/dewana-dewan/googly/blob/master/images/screen2.png?raw=true "Stock Page")
