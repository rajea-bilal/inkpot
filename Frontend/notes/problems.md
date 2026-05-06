Every time I refreshed the Dashboard, the logged-in user was being lost, the user state wouldn't persist and it would default to null (since the initial state for user was set as null in auth.slice)

I solved this problem by using the useAuth custom hook inside app.js file, saved the result of useAuth to an auth object, on this auth object we had a handleGetMe method. This method was responsbile for making an API call to the backend, retrieving the logged-in user's info. This user info was then set as user state.

I used a useEffect hook to run the handleGetMe method every time the app mounts, so the user data was 'hydrated' into the app.
