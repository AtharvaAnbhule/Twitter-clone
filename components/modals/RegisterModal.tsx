import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import {toast} from "react-hot-toast";
import { signIn } from "next-auth/react";


const RegisterModal=()=>{

    const loginModal=useLoginModal();
    const RegisterModal=useRegisterModal();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [isLoading,setIsLoading]=useState(false);

    const onToggle=useCallback(() =>{
        if(isLoading){
            return;

        }
        
        RegisterModal.onClose();
        loginModal.onOpen();
    },[isLoading,RegisterModal,loginModal])

    const onSubmit=useCallback(async() =>{//useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
        try {

        setIsLoading(true);

        //TODO app Register and login!
        
        await axios.post("/api/register",{
            email,
            password,
            username,
            name
        }); // as to register we created
        

        toast.success("Account Created!");
        signIn("credentials",{
            email,
            password,// after sign up immediately sign in
        });

        RegisterModal.onClose();
            
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong!");
        }finally {
            setIsLoading(false);
        }
    },[RegisterModal,email,password,username,name]);

    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Input 
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            disabled={isLoading}

            />
                <Input 
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            disabled={isLoading}

            />

          <Input 
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            disabled={isLoading}

            />

            

            
            <Input 
            placeholder="Password"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            
            />
        </div>
    )

    const footerContent=(

        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an Acoount? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underLine "> Sign in!</span>
            </p>
        </div>
    )

    return(
        <Modal
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title="Create an Account!"
        actionLabel="Register"
        onClose={RegisterModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    )
}
export default RegisterModal;