## Authentication system

- register api
- login api
- logout api
- get-me api

## Chat with AI

- maintaining chat history
- messages storage

## AI with internet research feature

### Data modelling

- designing database for the app

### User

- \_id
- username
- email
- password
- verified (user cant access anything in the app unless verified, email link sent, user clicks link --> verified: true)
- createdAt
- updatedAt

### Chat

- \_id
- user
- title
- createdAt
- updatedAt

### Message

- \_id
- chat ref
- content
- role ["user", "AI"]
