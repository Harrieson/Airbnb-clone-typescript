'use client'

import {signIn} from 'next-auth/react'
import axios from "axios";
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "../../hooks/useLoginModal";
import Modal from "./Modals";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter()
    const LoginModal = useLoginModal();
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {
        errors }} = useForm<FieldValues>({defaultValues: {
        email: '',
        password: ''
    }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                setIsLoading(false);

                if(callback?.ok) {
                    toast.success('Logged in')
                    router.refresh()
                    LoginModal.onClose();
                }

                if (callback?.error){
                    toast.error(callback.error);
                }
            })
    }
    const bodyContent = (
        <div  className="flex flex-col gap-4">
            <Heading 
                title="Welcome to Airbnb"
                subtitle="Create an Account"/>
                <Input id="email" label="Email" disabled={isLoading}
                        register={register} errors={errors}  required/>
                <Input id="password" label="Passowrd" type="password" disabled={isLoading}
                        register={register} errors={errors}  required/>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button outline label="Sign In with Google"
                    icon={FcGoogle}
                    onClick={() => {}} />
             <Button outline label="Sign In with Github"
                    icon={AiFillGithub}
                    onClick={() => {}} />
            
            <div className="text-neutral-500 text-center mt-4  font-light">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        Don&apos;t Have an Account?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline">
                        Register
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title='Login'
            actionLabel="Login"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent} />
    );
}

export default LoginModal;