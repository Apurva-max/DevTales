import api from "./axios";

export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category: string;
  status: "public" | "private" | "draft";
  readingTime: number;
}

export interface UpdateBlogData {
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  status: "public" | "private" | "draft";
}

export async function getAllBlogs(
  page: number,
  limit: number
) {
  const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
  return response.data;
}

export async function getSingleBlog(id: number) {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
}

export async function createBlog(data: CreateBlogData) {
  const response = await api.post("/blogs", data);
  return response.data;
}

export async function updateBlog(
  id: number,
  data: UpdateBlogData
) {
  const response = await api.put(`/blogs/${id}`, data);
  return response.data;
}

export async function deleteBlog(id: number) {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
}

export async function addComment(
  blogId: number,
  content: string
) {
  const response = await api.post(
    `/blogs/${blogId}/comments`,
    { content }
  );

  return response.data;
}

export async function getComments(blogId: number) {
  const response = await api.get(
    `/blogs/${blogId}/comments`
  );

  return response.data;
}

export async function getMyBlogs() {
  const response = await api.get("/blogs/myblogs");
  return response.data;
}

export async function draftBlogs() {
  const response = await api.get("/blogs/drafts");
  return response.data;
}