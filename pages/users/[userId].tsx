import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";
//for the users/userid page
const UserView=()=>{
    const router=useRouter();
    const {userId}=router.query;

    const {data:fetchedUser,isLoading/**react-spinners */} = useUser(userId as string);

     if(isLoading || !fetchedUser){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
     }

    return(
        <>
        <Header label={fetchedUser?.name}/**username */ showBackArrow/>
        <UserHero userId={userId as string}/>
        <UserBio userId={userId as string}/>
        <PostFeed userId={userId as string} />
        </>
    );
}


export default UserView;