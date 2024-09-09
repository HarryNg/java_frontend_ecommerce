import { createContext, useEffect, useState } from "react";

import { User, UserContextType } from "@/types";
import { useAuthenticate } from "@/features/use-authenticate";
import { useUserDetails } from "@/features/use-user-details";

export const userContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userId = useAuthenticate();
    const { data: userDetail } = useUserDetails(userId);

    const [user, setUser] = useState<User | string>("Guest");

    // Update user context when userDetail is fetched
    useEffect(() => {
        if (userDetail?.data) {
            setUser(userDetail.data);
        }
    }, [userDetail]);

    // Set user data and local storage
    const login = (token: string) => {
        localStorage.setItem("token", token);
        setUser(userDetail.data);
    }

    // Clear user data and local storage
    const logout = () => {
        localStorage.removeItem("token");
        setUser("Guest");
    };

    const update = (user: User | string) => {
        setUser(user);
    }

    return (
        <userContext.Provider value={{ user, logout, login, update }}>
            {children}
        </userContext.Provider>
    );
}
