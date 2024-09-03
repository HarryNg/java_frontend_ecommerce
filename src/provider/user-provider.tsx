import { User } from "@/types";
import { createContext, useState, useEffect } from "react";
import { useAuthenticate } from "@/features/use-authenticate";
import { useUserDetails } from "@/features/use-user-details";

interface UserContext {
    user: User | null;
    logout: () => void;
    login: (user: User) => void;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userId = useAuthenticate();
    const { data: userDetail } = useUserDetails(userId);
    const [userState, setUserState] = useState<User | null>(null);

    
    const logout = () => {
        localStorage.removeItem("userData");
        setUserState(null);
    };
    const login = (user: User) => {
        setUserState(user);
    }
    
    useEffect(() => {
        if (userDetail?.data && userId) {
            setUserState(userDetail.data);
        }
    }, [userDetail, userId]);

    return (
        <userContext.Provider value={{ user: userState, logout, login }}>
            {children}
        </userContext.Provider>
    );
}
