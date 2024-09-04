import { User } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useAuthenticate } from "@/features/use-authenticate";
import { useUserDetails } from "@/features/use-user-details";

interface UserContextType {
    user: User | null;
    logout: () => void;
    login: (token: string) => void;
    update: (user: User) => void;
}

export const userContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userId = useAuthenticate();
    const { data: userDetail } = useUserDetails(userId);

    const [user, setUser] = useState<User | null>(null);

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
        setUser(null);
    };

    const update = (user: User | null) => {
        setUser(user);
    }

    return (
        <userContext.Provider value={{ user, logout, login, update }}>
            {children}
        </userContext.Provider>
    );
}
