# Flutterwave Subscriptions

Handling monthly subscriptions using Flutterwave

## Run locally

1. Start MongoDB Server
```
docker-compose up
```

2. Create a `.env` file

```
PORT=
DB_URI=mongodb://user:password@host:port
MONGO_USER=demo
MONGO_PASSWORD=demo
MONGO_DB=demo
SALT_ROUNDS=10
JWT_EXPIRY=1
JWT_SECRET=
FW_PUBKEY=
FW_SECRET_KEY=
FW_PREMIUM_LINK=
```

3. Create a merchant account on [Flutterwave](https://dashboard.flutterwave.com/signup) and copy public key and secret key to the `.env` file

4. Create a payment link from the Flutterwave dashboard and copy the link to the `.env` file

5. Create a local tunnel URL using Ngrok and add the url as a webhook on the Flutterwave dashboard

6. Start NodeJS Server

```
npm start
```

## Test

```
npm run test
```


[API Documentation](https://documenter.getpostman.com/view/4654837/UzBgvVVv)

### Service Subscription 

<img src="./pic1.png" alt="drawing" width="300"/>

Use the following card details:
```
Card number: 5531 8866 5214 2950

Cvv: 564

Expiry: 09/32

OTP: 123456

```
<img src="./pic2.png" alt="drawing" width="300"/>

### Payment confirmation

<img src="./pic3.png" alt="drawing" width="300"/>

### Flutterwave Admin dashboard

<img src="./pic4.png" alt="drawing" width="700"/>


## Reference

[Flutterwave Documentation](https://developer.flutterwave.com/)