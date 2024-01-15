import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePosts=(userId?:string)=>{
    const url = userId ? `/api/posts?userId=${userId}` : `/api/posts`;

    const {data,error,isLoading,mutate}=useSWR(url,fetcher); //it fetches current using the axios fetcher here we have our current file of current user present
    
    return {
        data,
        error,
        isLoading,
        mutate
    }

};

export default usePosts;
