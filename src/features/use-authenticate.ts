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
            const decodedToken = handleDecodeUser(token)
            if (decodedToken && isTokenValid(decodedToken)) {
                setUserId(decodedToken.user_id);
            } else {
                router.navigate("/login");
            }
        }
    }, [])
    return userId;
}