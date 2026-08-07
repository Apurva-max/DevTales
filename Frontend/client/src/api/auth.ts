import api from "./axios";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function register(data: RegisterData) {
  console.log("Calling Register API...");
  console.log(data);

  const response = await api.post("/auth/register", data);

  console.log(response);

  return response.data;
}

interface LoginData {
    email: string;
    password: string;
}

export async function login(data: LoginData) {
    
    const response = await api.post("/auth/login", data);

    return response.data;
}

export async function profile() {
    
    const response = await api.get("/users/profile");

    return response.data
}

interface UpdatePData {

    name: string;
    bio ?: string;
    occupation ?: string;
    location ?: string;
    github ?: string;
    linkedin?: string
}

export async function updateProfile(data: UpdatePData) {
    
    const response = await api.put("/users/profile", data);

    return response.data;
}