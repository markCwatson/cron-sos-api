## SOS Query App
Makes queries to SOS - an inventory management system - through the SOS API.

## Environment variables
You must have a `.env` file at the root of this project with the following contents. You need to get the SOS client ID and client secret from the [SOS developer portal](https://developer.sosinventory.com/home). One you have an SOS dev account, login and click the "Register your applications" button. Copy/paste the SOS client ID and secret into a `.env` file. The mongo username, password, and name can be anything.

```
SOS_APP_CLIENT_ID=
SOS_APP_CLIENT_SECRET=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DB_NAME=
```

## Obtaining the SOS code
From step 1 [here](https://developer.sosinventory.com/apidoc/Authentication): in Chrome, enter the following url: `https://api.sosinventory.com/oauth2/authorize?response_type=code&client_id=[client id]&redirect_uri=https://www.google.com/` replacing [client id] with your above collected Client ID in the address bar of the browser.  When you press enter, the system will have you log into your account.  Upon logging in, the address bar will then reflect your authorization code. Copy this code for use later.

## To build Docker image and run container
Build the required Docker images by running the following commands inside the `/app` folder.

```
docker-compose build --no-cache app
```

Then run the app using

```
docker-compose up app
```

## Convert SOS code to auth tokens
The SOS code must be obtained manually first (see above). When you have this, open a shell into the running `app` container.

```
docker exec -it app sh
```

When inside the shell, run the following script to convert the SOS token to the initial set of auth tokens.

```
npm run sos:auth -- <your code>
```

## Cron jobs
Two cron jobs are scheduled to run: one for reading the SOS shipping orders and one for renewing the tokens. See `/app/Settings/config.js` for the schedules. Adjust as needed.

## Reading shipping orders manually
You can also trigger a manual read of the SOS shipping orders by running the following command inside a shell inside the app container.

```
npm run sos:read
```

Adjust `/app/utils/displayData.js` as necessary.