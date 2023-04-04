import User from "../models/User";
import axiosInstance from "./axiosInstance";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await axiosInstance.post<User>("/users", {
      email,
      password,
      name,
    });
    return {
      data: response.data,
      headers: response.headers,
    };
  } catch (error) {
    throw error;
  }
};
