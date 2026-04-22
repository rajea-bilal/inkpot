unless the user is not verified (email link clicked),
login API will not generate a token and pass it to the browser
without the token, user wont be able to access the resources in the app

Your Node server wants to send emails from your Gmail account.

But Google will not just let any random server do that.

So you create a Google app in Google Cloud.

That Google app gives your server an identity when talking to Google.

What the Google app gives you

It gives you things like:

Client ID
Client Secret

These are tied to your app/server setup.

Google OAuth client = the app you registered with Google
in your case, that represents your backend/app

Step 1

Create Google app
This gives your app an identity:

client ID
client secret
Step 2

Authorize access using your Gmail account
This tells Google:

yes, I allow this app to use my Gmail
Step 3

Google gives tokens
These are what your server actually uses to act on your behalf

For example:

access token
refresh token
Step 4

Nodemailer uses those details to send mail

“Sign in with Google”

This means:

the end-user uses their Google account to log into your app

Example:

user comes to your app
clicks Continue with Google
Google confirms who they are
your app logs them in

Here, the user means your app’s end-user.

In this case, you create a Google app because Google needs to know:

which app is asking for login
where to send the user back after login

So yes, for this case:

you create a Google app so end-users can sign into your app using Google accounts

2. “Use Gmail / send emails through Google”

This is different.

This means:

your server/app wants permission to use a Gmail account to send emails

Example:

new user registers
your backend sends a welcome email
or password reset email
or verification email

Here, Google is not being used for app login.
Here, Google is being used as the mail provider.

In this case, the “user” in the OAuth flow is often you, the Gmail account owner, because Google is asking:

“Do you allow this app/server to send email using this Gmail account?”

So if you are using your own Gmail account to send emails to registered users, then this process is about:

letting Google send email on your behalf from your email address

not about end-users signing in.

## Nodemailer:

Nodemailer is a Node.js library for sending emails from your backend/server.

At a high level, Nodemailer works like this:

- your backend decides an email should be sent
- Nodemailer is called in your code
  Nodemailer connects to an email service/provider
  it proves it is allowed to send from that account
  it sends the email data
  the provider accepts it and tries to deliver it

So Nodemailer is the sending layer between your Node app and an email provider.

### Web server:

regular server like our Express web servers cannot directly send an email

### SMTP server:

responsible for sending emails
handle emails

web servers communicate with smtp server, the smtp server can then forward an email to an email address.

## Transporter:

acts like the bridge between web server & smtp server

smtp server can then send an email to an email account.
