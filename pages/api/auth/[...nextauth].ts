import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";
import { AuthOptions } from "next-auth";

 export const authOptions:AuthOptions= {
    adapter:PrismaAdapter(prisma),// making the adapter
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"},
                
            },
            //login function
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){ //as credentials can be undefined so ? used to not creah the application
                    throw new Error("Invalid Credentials!");
                }
                // to find the user using the email
                const user=await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }

                });

                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid Credentials!");
                }

                const isCorrectPassword=await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if(!isCorrectPassword){
                    throw new Error("Invalid Credentials!");
                }

                return user;//as everything went ok!
            }
        })
    ],
    debug:process.env.NODE_ENV==="development",// gives you useful stuff
    session:{
        strategy:"jwt"
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);