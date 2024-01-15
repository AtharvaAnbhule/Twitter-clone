import useUser from "@/hooks/useUser";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps{
    userId:string;
    isLarge?:boolean;
    hasBorder?:boolean;
}

const Avatar:React.FC<AvatarProps> =({
    userId,
    isLarge,
    hasBorder
}) =>{

    const router=useRouter();
    const {data:fetchedUser} = useUser(userId);

    const onClick=useCallback((event:any)=>{
        //avatar will be wrapper in other component
        //so when click on avatar
        //so want parent element onClick for it
        event.stopPropagation();

        const url=`/users/${userId}`;

        router.push(url);
   
    },[router,userId])
    return(
        <div className={`${hasBorder ? "border-4 border-black" :""}
        ${isLarge?"h-32" :"h-12"}
        ${isLarge?"w-32" :"w-12"}
        rounded-full 
        hover:opacity-90
        transition
        cursor-pointer
        relative

        `}>
            <Image fill style={{
                objectFit:"cover",
                borderRadius:"100%",
            }}
            alt="Avatar"
            onClick={onClick}
            src={fetchedUser?.profileImage || "/images/1.png"}
            />
        </div>
    )
}

export default Avatar;