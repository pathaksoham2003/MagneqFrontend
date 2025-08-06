import React, { useEffect } from "react";
import Button from "../../components/buttons/Button";
import loginBG from "../../assets/images/loginPageBGImage.png";
import Logo from "../../assets/images/black logo 1.png";
import Background from "../../assets/images/Rectangle 4209.png";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const predefinedLogins = [
  {
    label: "Bob Sales",
    user_name: "sales",
    password: "sales123",
    role: "STAFF",
  },
  {
    label: "Developer David",
    user_name: "developer",
    password: "developer123",
    role: "STAFF",
  },
  {
    label: "Charlie Admin",
    user_name: "admin",
    password: "admin123",
    role: "STAFF",
  },
  {
    label: "Purchase",
    user_name: "purchase",
    password: "purchase123",
    role: "STAFF",
  },
  {
    label: "Production Executive",
    user_name: "production",
    password: "production123",
    role: "STAFF",
  },
  {
    label: "Customer (Kapoor Sons)",
    user_name: "ks_corp",
    password: "customer123",
    role: "CUSTOMER",
  },
];

const TestLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    localStorage.setItem("test", "true");
  }, []);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.data.token) {
        dispatch(loginUser(data.data));
        localStorage.setItem("token", data.data.token);
        toast.success("Login successful!");
        const sidebar = data?.data?.route?.sidebar;
        const redirectPath = typeof sidebar?.[0] === "string" ? sidebar[0] : sidebar?.[0]?.route || "dashboard";
        navigate("/" + redirectPath);
      } else {
        toast.error("Invalid credentials");
      }
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const handleAutoLogin = (user) => {
    mutation.mutate({
      user_name: user.user_name,
      password: user.password,
      role: user.role,
      active: true,
    });
  };

  return (
    <div className="relative overflow-hidden flex min-h-screen w-full">
      <img src={loginBG} alt="Login Background" className="absolute h-full w-full object-cover -z-20" />

      <div className="flex w-full flex-col lg:flex-row">
        {/* LEFT: Info section */}
        <div className="relative lg:w-1/2 flex items-center justify-center px-8 py-12 text-white">
          <img src={Background} alt="Overlay Texture" className="absolute inset-0 h-fit object-cover -z-10" />
          <div className="w-fit pl-4">
            <p className="text-2xl mb-3">Leading Manufacturer of a wide range of</p>
            <h1 className="text-5xl font-extrabold leading-tight">
              Geared Motor and Helical Gearbox.
            </h1>
          </div>
        </div>

        {/* RIGHT: Logo + Quick Login */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl space-y-5">
            <img src={Logo} alt="Magneq" className="mx-auto mb-4 max-w-[160px]" />

            <h2 className="text-center text-lg font-semibold">Quick Login Options</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {predefinedLogins.map((user) => (
                <Button
                  key={user.user_name}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleAutoLogin(user)}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Signing In..." : user.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
