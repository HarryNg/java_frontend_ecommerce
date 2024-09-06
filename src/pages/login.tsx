import api from "@/api";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { userContext } from "@/provider/user-provider";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER_STATES = {
  LOGIN: "Login",
  SIGN_UP: "Sign Up",
};

export function Login() {
  const userDataContext = useContext(userContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState(USER_STATES.LOGIN);
  const [credentials, setCredentials] = useState({
    email: "", // unique
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: null,
    phoneNumber: null, // unique
    birthDate: "11-11-1999",
    role: "ADMIN", // default required
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

      const { token } = response.data.data;
      userDataContext?.login(token);
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
        password: credentials.password ,
        firstName: credentials.firstName,
        lastName: credentials.lastName || "Noane",
        address: credentials.address || null,
        birthDate: credentials.birthDate || "1-11-1899",
        phoneNumber: credentials.phoneNumber,
        role: "ADMIN",
      });
      navigate("/login");
      setFormState(USER_STATES.LOGIN);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

 

  // If user is already logged in, show a message
  if ( userDataContext?.user !== null && userDataContext?.user !== undefined && typeof userDataContext?.user !== "string") {
    return <p>Hello {userDataContext?.user.firstName}, you are already logged in</p>;
  }

  return (
    <div className="flex-col">

      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{formState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {formState === USER_STATES.LOGIN ? (
          <LoginForm onSubmit={handleLogin} onChange={handleChange} />
        ) : (
          <SignupForm onSubmit={handleSignup} onChange={handleChange} />
        )}
        <div className="mt-0 inline-flex items-center m-auto p-2">
          {formState === USER_STATES.LOGIN ? (
            <>
              <p>Don't have an account?</p>
              <Button className="mx-1 text-base text-blue-500" variant={"link"} onClick={() => setFormState(USER_STATES.SIGN_UP)}>
                Register
              </Button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <Button className="mx-1 text-base text-blue-500" variant={"link"} onClick={() => setFormState(USER_STATES.LOGIN)}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
