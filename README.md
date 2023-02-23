## SOS Query App
Makes queries to SOS - an inventory management system - through the SOS API.

## Note
In the process of moving the tokens over to the mongoDB database. Currently they are stored in `app/tokens/*.txt` files.

## Precursor
You must have a `.env` file at the root of this project with the following contents. You need to get the SOS client ID, secret, and code from SOS. The mongo username, password, and host can be anything.

```
SOS_APP_CLIENT_ID=
SOS_APP_CLIENT_SECRET=
SOS_CODE=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
```

## To run
Build the required Docker images by running the following command inside the `app/` folder.

```
docker-compose build --no-cache sos
```

Then run the app using

```
docker-compose up sos
```