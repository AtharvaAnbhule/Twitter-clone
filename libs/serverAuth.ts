import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from "next-auth/react";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
//import { getServerSession } from "next-auth";

const serverAuth=async (req:NextApiRequest,res:NextApiResponse)=>{
    //creating session
    const session=await getServerSession(req,res,authOptions);//in {}

    if(!session?.user?.email){
        throw new Error("Not signed in!");
    }

   //if signed in
   const currentUser=await prisma.user.findUnique({
    where:{
        email:session.user.email
    }
   });

   if(!currentUser){
    throw new Error("Not Signed in!");
   }

   return {currentUser};

}


export default serverAuth;