import { router } from "@/App";
import { isTokenValid } from "@/lib/utils";
import { Token } from "@/types";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export const useAuthenticate = () => {
    const [userId, setUserId] = useState<string>("");

    const handleDecodeUser = (token: string) => {
        try {
            return jwtDecode<Token>(token);
        }
        catch (error) {
            console.error("Token decoding failed", error);
            return null;
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try{
                const decodedToken = handleDecodeUser(token);
                if (decodedToken && isTokenValid(decodedToken)) {
                    setUserId(decodedToken.id);
                } else {
                    router.navigate("/login");
                }
            }
            catch(error) {
                console.error("Token decoding failed", error);
                router.navigate("/login");
            }
        } else {
            router.navigate("/login");
        }
    }, [])
    return userId;
}