import api from "./axios";

export async function addBookmark(blogId: number){
    const response = await api.post(`/bookmarks/${blogId}`);

    return response.data;
}

export async function removeBookmark(blogId: number){
    const response = await api.delete(`/bookmarks/${blogId}`);

    return response.data;
}

export async function getBookmarks(){
    const response = await api.get("/bookmarks");

    return response.data;
}