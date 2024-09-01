import api from "@/api";
import jwtDecode from "jwt-decode"
import { Token, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { isTokenValid } from "@/lib/utils";
import { router } from "@/App";

export const userContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");

  const token = localStorage.getItem("token");

  const getUserDetails = async () => {
    if(userId){
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    throw Error("Did not find user id");
  };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
    enabled: !!userId,
    initialData: {}
  })

  const handleDecodeUser = (token: string) => {
    try {
        const decoded = jwtDecode<Token>(token);

        return decoded;
    }
    catch (error) {
        throw Error("token decoding failed")
    }
    }

    useEffect(() => {
        if (token) {
          const decodedToken = handleDecodeUser(token)
          const isValid = isTokenValid(decodedToken)
    
          if (!isValid) {
            router.navigate("/login")
            return
          }
          setUserId(decodedToken.user_id)
        }
      }, [token])
    
      return <userContext.Provider value={user}>{children}</userContext.Provider>
}