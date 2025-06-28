import React, { useState } from "react";
import Input from "../components/forms/Input";
import Label from "../components/forms/Label";
import Select from "../components/forms/Select";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/buttons/Button";
import loginBG from "../assets/images/loginPageBGImage.png";
import Logo from "../assets/images/black logo 1.png";
import Background from "../assets/images/Rectangle 4209.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "ADMIN",
    active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://${BaseUrl}/api/login`, formData);
      if (res.data?.token) {
        dispatch(loginUser(res.data));
        localStorage.setItem("token",res.data.token)
        navigate("/dashboard");
      } else {
        console.error("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
    navigate("/dashboard");
  };

  return (
    <div className="relative overflow-hidden flex min-h-screen w-full">
      <img
        src={loginBG}
        alt="Login Background"
        className="absolute h-full w-full object-cover -z-20"
      />
      <div className="flex w-full flex-col lg:flex-row">

        <div className="relative lg:w-1/2 flex items-center justify-center px-8 py-12 text-white">
          <img
            src={Background}
            alt="Overlay Texture"
            className="absolute inset-0 h-fit object-cover  -z-10"
          />
          <div className="w-fit pl-4">
            <p className="text-2xl mb-3">Leading Manufacturer of a wide range of</p>
            <h1 className="text-5xl font-extrabold leading-tight">
              Geared Motor and Helical Gearbox.
            </h1>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center px-6 py-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl space-y-5"
          >
            <img src={Logo} alt="Magneq" className="mx-auto mb-6 max-w-[160px]" />

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  {showPassword ? <IoEyeOutline className="h-5 w-5" /> : <IoEyeOffOutline className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="EXECUTIVE">Sales Executive</option>
                <option value="CUSTOMER">Customer</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              <Label htmlFor="active" className="mb-0 mt-1">Active</Label>
            </div>

            <Button type="submit" size="md" variant="primary" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;