import axios from "axios";

const api = await axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


export async function register({ email, username, password }) {
   const response = await api.post("/api/auth/register", { email, username, password} )
   return response.data
}

export async function login({ email, username }) {
    const response = await api.post("/api/auth/login", { email, username})
})