import api from "./axios";

export interface UpdateProfileData {
    name: string;
    bio?: string;
    occupation?: string;
    location?: string;
    github?: string;
    linkedin?: string
}

export async function getProfile() {
    
    const response = await api.get("/users/profile");

    return response.data;
}

export async function updateProfile(data: UpdateProfileData) {
    
    const response = await api.put("/users/profile", data);

    return response.data;
}

export async function uploadAvatar(file: File) {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.post("/users/avatar", formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return response.data;
}

export async function removeAvatar() {
    const response = await api.delete("/users/avatar");
    return response.data;
}