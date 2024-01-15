import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUser=(userId:string)=>{
    const {data,error,isLoading,mutate}=useSWR(userId ? `/api/users/${userId}` : null,fetcher); //it fetches current using the axios fetcher here we have our current file of current user present
    
    return {
        data,
        error,
        isLoading,
        mutate
    }

};

export default useUser;