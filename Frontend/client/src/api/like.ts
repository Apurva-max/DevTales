import api from './axios';

export async function addLike(blogId: number) {
    const response = await api.post(`/likes/${blogId}`);

    return response.data;
}

export async function removeLike(blogId: number) {
    const response = await api.delete(`/likes/${blogId}`);

    return response.data;
}

export async function getLikes(blogId: number) {
    const response = await api.get(`/likes/${blogId}`);

    return response.data;
}