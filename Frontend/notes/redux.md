# What Redux is

Redux is a state management library. That means it helps you store and manage shared data for your whole app.

Examples of shared data:

- logged in user
- cart items
- theme
- notifications
- loading state
- errors

So instead of lots of components each holding their own copy of the same data, Redux gives you one central place for it. That central place is called the **store**.

## Why people use Redux

In a small app, normal React state is often enough. But in a bigger app, lots of components may need the same data.

**Example:**

- `navbar` needs user info
- `profile page` needs user info
- `settings page` needs user info
- `protected routes` need to know if user is logged in

Without Redux, you often end up:

- passing data down through many components
- repeating logic
- getting messy state
- struggling to keep everything in sync

Redux helps by making **one single source of truth**. That means there is one main official place where shared state lives.

## The main Redux words

You only really need these first:

### 1. Store

The store is the central container for your app’s shared state.

### 2. State

State is just data that can change. In your case:

```json
{
  "user": null,
  "loading": false,
  "error": null
}
```

### 3. Action

An action is an object that says: _“something happened, update the state like this.”_
Usually it has:

- a `type`
- optionally a `payload`

**Example idea:**

```json
{
  "type": "auth/setUser",
  "payload": { "id": 1, "username": "Rajea" }
}
```

### 4. Reducer

A reducer is a function that receives the current state and the action, then updates the state. So:

- **action** says what happened
- **reducer** changes the state

### 5. Slice

A slice is one section of the Redux state. Examples:

- auth slice
- cart slice
- post slice

Your code has an `auth` slice, meaning it manages authentication-related state.

---

## Now let’s explain your code

### `auth.slice.js`

```javascript
import { createSlice } from "@reduxjs/toolkit";
```

You are importing `createSlice`. `createSlice` is a Redux Toolkit function that helps you create:

- the slice
- the reducers
- the action creators

...all in one place. Redux Toolkit is the modern easier way to write Redux.

#### Creating the Slice

```javascript
const authSlice = createSlice({
  name: "auth",
```

You are creating a slice called `"auth"`. That means this slice is responsible for auth-related state.

#### Initial State

```javascript
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
```

This is the starting state. Meaning when the app first loads:

- `user` is `null`
- `loading` is `false`
- `error` is `null`

So nothing has happened yet.

#### Reducers

```javascript
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
```

These are your reducers. They define how the state changes.

- **`setUser`**: Updates the user.
  - _Example:_ `dispatch(setUser({ id: 1, username: "Rajea" }))`
  - Then: `user: null` becomes `user: { id: 1, username: "Rajea" }`
- **`setLoading`**: Updates loading.
  - _Example:_ `dispatch(setLoading(true))`
  - Now Redux knows something is loading.
- **`setError`**: Updates the error.
  - _Example:_ `dispatch(setError("Invalid password"))`
  - Now Redux stores that error.

#### What is `action.payload`?

`payload` is the data you send with the action.

- _Example:_ `dispatch(setUser({ id: 1, username: "Rajea" }))`
- The payload is: `{ "id": 1, "username": "Rajea" }`

So this line: `state.user = action.payload;` means: _“take the data sent with the action and save it in user.”_

#### Important fix in your file

You wrote:

```javascript
export const { setUser, setLoading, setError } = authSlice;
```

That should be:

```javascript
export const { setUser, setLoading, setError } = authSlice.actions;
```

Because the actions are inside `authSlice.actions`.

#### Exporting the Reducer

```javascript
export default authSlice.reducer;
```

This exports the reducer for the auth slice. That reducer gets added to the store.

---

### Now `app.store.js`

```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
```

You import:

- `configureStore` to create the Redux store
- `authReducer` from your auth slice

```javascript
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

This creates the Redux store. And inside the store, you are saying:

- create a section called `auth`
- let `authReducer` manage it

So your Redux state will look like:

```json
{
  "auth": {
    "user": null,
    "loading": false,
    "error": null
  }
}
```

That is the shape of your global state right now.

---

## So what is happening overall?

Very simply:

**`auth.slice.js`**:
You define:

- what the auth state looks like
- how auth state can change

**`app.store.js`**:
You create the main Redux store and plug the auth slice into it.

So together they are building a central auth state system.

---

## Real example

Let’s say the user logs in.

### 1. Start loading

```javascript
dispatch(setLoading(true));
```

State becomes:

```json
auth: {
  user: null,
  loading: true,
  error: null
}
```

### 2. Login succeeds

```javascript
dispatch(setUser(userData));
dispatch(setLoading(false));
```

Now state becomes:

```json
auth: {
  user: userData,
  loading: false,
  error: null
}
```

### 3. Login fails

```javascript
dispatch(setError("Email or password is wrong"));
dispatch(setLoading(false));
```

Now state becomes:

```json
auth: {
  user: null,
  loading: false,
  error: "Email or password is wrong"
}
```

## Why this is useful

Because any component in the app can read the same auth state. So:

- `navbar` can show the username
- `profile page` can show user info
- `protected routes` can check if user exists
- `login form` can show loading or error

All from one central place.

## One more important thing

Redux does not fetch data by itself. Redux only stores and updates state. So usually the flow is:

1. user clicks login
2. your app sends request to backend
3. backend responds
4. you dispatch Redux actions
5. Redux updates the store
6. UI updates

So Redux is the state container, not the backend.

## Tiny summary

Your code is doing this:

1. creating an auth slice
2. giving it default state: `user`, `loading`, `error`
3. creating reducers to update those values
4. exporting the reducer
5. creating a Redux store
6. adding the auth reducer to the store under `auth`

So you’re setting up global auth state for your app.

## Corrected file

```javascript
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
```
