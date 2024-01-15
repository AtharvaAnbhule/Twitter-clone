import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = ( userId:string) =>{
    const {data:currentUser,mutate:mutateCurrentUser} = useCurrentUser();
    const {mutate:mutateFetchedtUser} = useUser(userId);

    const loginModal=useLoginModal();

    const isFollowing= useMemo(()=>{

        const list=currentUser?.followingIds || [];

        return  list.includes(userId);
    },[userId,currentUser?.followingIds]);

    const toggleFollow=useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        try {
             
            let request;

            if(isFollowing){
                request = () => axios.delete("/api/follow",{ params : { userId } });
            }else{
                request = () => axios.post( "/api/follow", { userId } );
            }
    
             await request();

             mutateCurrentUser();

             mutateFetchedtUser();

             toast.success("Success")

            
        }
        
         catch (error) {
            console.log(error);
            toast.error("Something went Wrong...!");
            
        }
    },[currentUser,isFollowing,userId,mutateCurrentUser,mutateFetchedtUser,loginModal]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;