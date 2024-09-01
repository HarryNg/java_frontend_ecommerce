import { User } from "@/types";
import { createContext} from "react";
import { useAuthenticate } from "@/features/use-authenticate";
import { useUserDetails } from "@/features/use-user-details";

export const userContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userId = useAuthenticate();
    const {data : user} = useUserDetails(userId);
    
    return <userContext.Provider value={user}>{children}</userContext.Provider>
}