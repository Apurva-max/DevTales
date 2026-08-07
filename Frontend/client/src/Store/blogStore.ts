import { create } from "zustand";

export interface Comment {
  id: number;
  userId: number;
  blogId: number;
  name: string;
  avatar?: string | null;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;

  title: string;
  slug: string;
  excerpt: string;
  content: string;

  author: string;
  authorId: number;
  avatar?: string;

  category: string;

  coverImage?: string;

  status: "public" | "private" | "draft";

  likes: number;
  views: number;

  readingTime: number;

  createdAt: string;
  updatedAt: string;

  bookmarked?: boolean;
  comments?: Comment[];
}

interface BlogState {
  blogs: BlogPost[];

  selectedBlog: BlogPost | null;

  setBlogs: (blogs: BlogPost[]) => void;

  setSelectedBlog: (blog: BlogPost | null) => void;

  getBlogById: (id: number) => BlogPost | undefined;

  toggleBookmark: (id: number) => void;

  likeBlog: (id: number) => void;

  unlikeBlog: (id: number) => void;

  incrementViews: (id: number) => void;

  setBlogLikes: (id: number, likes: number) => void;
}

const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],

  selectedBlog: null,

  setBlogs: (blogs) => {
    set({
      blogs: blogs.map((blog) => ({
        ...blog,
        bookmarked: blog.bookmarked ?? false,
        comments: blog.comments ?? [],
      })),
    });
  },

  setSelectedBlog: (blog) => {
    set({
      selectedBlog: blog,
    });
  },

  getBlogById: (id) => {
    return get().blogs.find((blog) => blog.id === id);
  },

  toggleBookmark: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              bookmarked: !blog.bookmarked,
            }
          : blog
      ),
    })),

  likeBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              likes: blog.likes + 1,
            }
          : blog
      ),
    })),

    unlikeBlog: (id) =>
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id
            ? {
                ...blog,
                likes: blog.likes - 1,
              }
            : blog
        ),
      })),

  setBlogLikes: (id: number, likes: number) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              likes: likes,
            }
          : blog
      ),
    })),

  incrementViews: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              views: blog.views + 1,
            }
          : blog
      ),
    })),
}));

export default useBlogStore;

