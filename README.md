# Employee Happiness

## Setup the project

To start the project you need to have nodejs installed.

## Create a .env file with the following parameters.

You can change the variables to match your enviorment.

```
REACT_APP_API_URL"http://localhost:4000/graphql"
```

### Start the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Run using docker

Run the following command to start a docker container with the API in it.

```
docker build -t employeehappiness .

docker run -it -d -p3000:3000 --name employeehappiness employeehappiness
```
