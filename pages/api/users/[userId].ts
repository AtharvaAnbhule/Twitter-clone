import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== "GET"){
        return res.status(405).end();

    }
    try {
     //here will get userId in req.query due to file name
     const {userId}=req.query;

     if(!userId || typeof userId !== "string"){
        throw new Error("Invalid Id...!");
     }
     // for existing users
     const existingUser=await prisma.user.findUnique({
        where:{
            id:userId
        }
     });
      // for followers
     const followersCount=await prisma.user.count({
        where:{
            followingIds:{
                has:userId
            }
        }
     });

    return res.status(200).json({...existingUser,followersCount})

        
    } catch (error) {

        console.log(error);
        res.status(400).end();
        
    }
}