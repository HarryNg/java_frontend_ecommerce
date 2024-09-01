import { getUserDetails } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails(userId),
    enabled: !!userId,
    initialData: {}
  });
};
