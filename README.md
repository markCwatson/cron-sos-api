## SOS Query App
Makes queries to SOS - an inventory management system - through the SOS API.

## Note
In the process of moving the tokens over to the mongoDB database. Currently they are stored in `app/tokens/*.txt` files.

## Precursor
You must have a `.env` file at the root of this project with the following contents. You need to get the SOS client ID, secret, and code from SOS (see below). The mongo username, password, and name can be anything.

```
SOS_APP_CLIENT_ID=
SOS_APP_CLIENT_SECRET=
SOS_CODE=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DB_NAME=
```

## Obtaining the SOS_CODE
Create a login at `https://developer.sosinventory.com/` using the "Register your applications" tile. While logged in to above, register an application to obtain the Client ID and Secret.

Use Chrome to make a call to the API: Enter `https://api.sosinventory.com/oauth2/authorize?response_type=code&client_id=[client id]&redirect_uri=https://www.google.com/` replacing [client id] with your above collected Client ID in the address bar of the browser.  When you press enter, the system will have you log into your account.  Upon logging in, the address bar will then reflect your authorization code. Copy this code and assign it to the SOS_CODE variable in the `.env` file.

## To run
The SOS_CODE must be obtained first: see above.

Build the required Docker images by running the following command inside the `app/` folder.

```
docker-compose build --no-cache app
```

Then run the app using

```
docker-compose up app
```