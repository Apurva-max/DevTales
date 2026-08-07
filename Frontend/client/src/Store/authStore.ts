import { create } from "zustand";
import { login, profile,updateProfile} from "../api/auth";

export interface User {
  id: number;
  name: string;
  email: string;

  avatar?: string;
  bio?: string;
  occupation?: string;
  location?: string;
  github?: string;
  linkedin?: string;

  createdAt?: string;
}

interface UpdateProfileData {
  name: string;
  bio?: string;
  occupation?: string;
  location?: string;
  github?: string;
  linkedin?: string;
}

interface AuthState {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;

  fetchProfile: () => Promise<void>;

  updateUserProfile: (
    data: UpdateProfileData
  ) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({

  user: null,

  token: localStorage.getItem("token"),

  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {

      const response = await login({
        email,
        password,
      });

      console.log(response.user);

      localStorage.setItem("token", response.token);

      set({
        token: response.token,
        isAuthenticated: true,
        user: response.user,
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: () => {

    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });

  },

  fetchProfile: async () => {
    try {

      const response = await profile();

      set({
        user: response.user,
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateUserProfile: async (data) => {
    try {

      await updateProfile(data);

      const response = await profile();

      set({
        user: response.user,
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

}));

export default useAuthStore;