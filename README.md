# Employee Happiness

## Setup the project

To start the project you need to have nodejs installed.

## Create a .env file with the following parameters.

You can change the variables to match your enviorment.

Client id is needed for githubs OAuth and can be created [here](https://github.com/settings/developers). Note that the Homepage URL and Authorization callback URL should match the URL for the web application. The id needs to be the same in the API.

Only the e-mail adresses that are entered in the .env file of the API will be able to login. However you can disable the github login by setting REACT_APP_USE_GITHUB_LOGIN to false.

```
REACT_APP_API_IP="localhost"
REACT_APP_API_PORT=4000
REACT_APP_API_PASSWORD="123"

REACT_APP_USE_GITHUB_LOGIN="false"
REACT_APP_CLIENT_ID=

REACT_APP_HOSTIP="localhost"
REACT_APP_HOSTPORT=3000
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
