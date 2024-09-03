import api from "@/api";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER_STATES = {
  LOGIN: "Login",
  SIGN_UP: "Sign Up",
  LOGGED_IN: "Logged in",
};

export function Login() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(USER_STATES.LOGIN);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", {
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      setUserState(USER_STATES.LOGGED_IN);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", {
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
      });
      setUserState(USER_STATES.LOGIN);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex-col">
      {userState === USER_STATES.LOGGED_IN ? (
        <p>Successfully logged in</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{userState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          {userState === USER_STATES.LOGIN ? (
            <LoginForm onSubmit={handleLogin} onChange={handleChange} />
          ) : (
            <SignupForm onSubmit={handleSignup} onChange={handleChange} />
          )}
          <div className="mt-0 inline-flex items-center m-auto p-2">
            {userState === USER_STATES.LOGIN ? (
              <>
                <p>Don't have an account?</p>
                <Button className="mx-1 text-base text-blue-500" variant={"link"} onClick={() => setUserState(USER_STATES.SIGN_UP)}>
                  Register
                </Button>
              </>
            ) : (
              <>
                <p>Already have an account?</p>
                <Button className="mx-1 text-base text-blue-500" variant={"link"} onClick={() => setUserState(USER_STATES.LOGIN)}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
