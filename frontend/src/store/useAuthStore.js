//we are using zustand for state management it is small,fast and scalable state management soution
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers : [],

  //creating a function
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created sucessfully");
    } catch (error) {
      toast.error(error.response?.data?.message) ||
        "an unexpected error occured";
    } finally {
      set({ isSigningUp: false });
    }
  },

  login : async(data)=>{
    set({isLoggingIn : true});
    try{
      const res = await axiosInstance.post("/auth/login",data);
      set({authUser : res.data});
      toast.success("logged in sucessfully");
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isLoggingIn : false});
    }

  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      console.log(authUser);
      toast.success("Logged out sucessfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  updateProfile: async(data) =>{
    set({isUpdatingProfile : true});
    try{
      const res = await axiosInstance.put("/auth/update-profile",data);
      set({authUser : res.data});
      toast.success("profile updated successfully");

    }catch(error){
      console.log("error in update Profile",error)
      toast.error(error.response.data.message);
    }finally{
      set({isUpdatingProfile :false})
    }

  },



}));
