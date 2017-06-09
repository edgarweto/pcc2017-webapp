## Privalia Code Challenge debugger webapp

Here you have a simple (yet unfinished) project that can help you visualize and understand what
your code challenge API is doing.

## Use it

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

1. npm install
2. npm start 

## Config

Inside src folder, edit the file config.json:

- baseUrl: the url of your API
- list: the endpoint that returns the list of games currently hold in your server(s)
- game: the endpoint that returns the state of a concrete game instance
- pollingDelay: timelapse for automatic polling for updates, in milliseconds


## Endpoint list ("/games", for example)

Expects a json with a 'games' array. Example:

```
{
  "games": [
    {
      "id": "c42fac1c-9d51-555y-888c-64103b39e67b",
      "state": "running",
      "explored": "6.56",
      "index": 1,
      "date": {
        "date": "8-6-2017",
        "hour": "23:9:49"
      }
    }
  ]
}
```

Here, state is a string, explored a float indicating the percentage of the maze that has been discovered, and index is
an integer (used for sorting the game instances).

## Endpoint game ("/game", for example)

The webapp will call "/game/c42fac1c-9d51-555y-888c-64103b39e67b" in the example and will expect a json like this:

```
{
  "game": {
    "id": "c42fac1c-9d51-4c08-888c-64103b39e67b",
    "steps": 630,
    "state": "running",
    "index": 1,
    "explored": "6.56",
    "position": {
      "x": 2,
      "y": 1
    },
    "date": {
      "date": "8-6-2017",
      "hour": "23:9:49"
    },
    "maze": {
      "initialized": true,
      "width": 50,
      "height": 25,
      "matrix": [
        1,
        1,
        ...
        0,
        0
      ]
    }
  },
  "context": {
    "logs": [
    ]
  }
}
```

