import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useCurrentUser=()=>{
    const {data,error,isLoading,mutate}=useSWR("/api/current",fetcher); //it fetches current using the axios fetcher here we have our current file of current user present
    
    return {
        data,
        error,
        isLoading,
        mutate
    }

};

export default useCurrentUser;
