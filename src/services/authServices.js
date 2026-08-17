import api from "./axios";

const login = async ({
  email,
  password,
  rememberMe,
}) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  // Adjust this if your backend returns a different key
  const accessToken =
    data.access_token || data.accessToken;

  const storage = rememberMe
    ? localStorage
    : sessionStorage;

  storage.setItem("accessToken", accessToken);

  localStorage.setItem(
    "rememberMe",
    String(rememberMe)
  );

  // Fetch logged-in user
  const profile = await api.get("/auth/me");

  return {
    accessToken,
    user: profile.data.data,
  };
};

const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");

  return data.data;
};

const logout = () => {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("rememberMe");
};

export default {
  login,
  logout,
  getCurrentUser,
};