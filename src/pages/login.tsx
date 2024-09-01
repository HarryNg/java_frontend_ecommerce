import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login(){
    const navigate = useNavigate();

    const [credentisls, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const response = await api.post("/users/login", credentisls);
        const token = response.data.data.token;
        console.log(credentisls);
        console.log(token)
        localStorage.setItem("token", token);
        navigate("/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-3xl">Please login!</h3>
      <div className="p-2">
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <Input name="email" placeholder="Your email" onChange={handleChange} />
          <Input
            name="password"
            placeholder="your password"
            type="password"
            onChange={handleChange}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
    );
}