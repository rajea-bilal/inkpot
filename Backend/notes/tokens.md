There are usually two tokens:

Access token
Refresh token

An access token is short-lived. It may only work for a short time.

A refresh token is longer-lived. Its job is to create new access tokens when the old access token expires.

So the idea is:

1. You generate a refresh token once.
2. You save it in your .env file.
3. Nodemailer uses it whenever it needs a fresh access token.
4. Gmail allows the email to be sent.

You are not manually refreshing anything. Nodemailer handles that part for you.

Client ID = identifies the registered Google OAuth app, e.g. Inkpot

Client Secret = proves your backend is allowed to use that registered OAuth app

Refresh Token = proves the Gmail account owner gave Inkpot permission

Access Token = short-lived permission token used to actually send the email

Google will not let random backend code send emails from a Gmail account. So I register Inkpot in Google Cloud as an OAuth app. Google gives me a Client ID and Client Secret for that registered identity. Then the Gmail account owner gives permission, which creates a Refresh Token. Nodemailer uses those details to ask Google for short-lived Access Tokens, and those Access Tokens allow my backend to send emails from that Gmail account

Your backend does not manually create access tokens.
Your backend configures Nodemailer.
Nodemailer requests the access token from Google.
Google creates the access token.
Nodemailer uses it to authenticate with Gmail.
Gmail sends the email.
