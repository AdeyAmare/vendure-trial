import { useMutation } from "@apollo/client";
import { loginMutation } from "@/mutations/LoginMutation";
import React, { useState } from 'react';
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "../machines/toggleMachine";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginForm = () => {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [current, send] = useMachine(toggleMachine)

    const [register] = useMutation(loginMutation)

    const Icon = current.value === 'visible' ? FaEyeSlash : FaEye;

    async function handleSubmit(event) {
        event.preventDefault()

        const resp = await register({
            variables: {
                username: username,
                password: password
            }
        });

        console.log(resp)
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Please login to access your account</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input className="mt-8 p-2 rounded-xl border" type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />


                        <div className="relative">



                            <input className="p-2 rounded-xl border w-full" type={current.value === 'visible' ? 'text' : 'password'} name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <button onClick={() => send('TOGGLE')}>
                                <Icon className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300" />

                            </button>
                        </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">Login</button>
                    </form>
                    <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Sign Up</button>
                    </div>

                </div>
                <div className="w-1/2 md:block hidden">
                    <Image width={500} height={500} className=" rounded-2xl" src="/login.svg" alt="" />
                </div>
            </div>
        </section>



    )
}

export default LoginForm
