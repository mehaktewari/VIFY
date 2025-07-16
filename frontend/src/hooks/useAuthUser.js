import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authQuery.isLoading,
    authUser: authQuery.data?.user || authQuery.data || null,
    error: authQuery.error,
  };
};

export default useAuthUser;
