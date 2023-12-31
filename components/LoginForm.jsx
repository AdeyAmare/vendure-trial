import { useMutation } from "@apollo/client";
import { loginMutation } from "@/mutations/LoginMutation";
import React, { useState } from 'react';
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "../machines/toggleMachine";
import loginMachine from '../machines/loginMachine'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';


const LoginForm = () => {



    const [login] = useMutation(loginMutation)
    const [current, send] = useMachine(toggleMachine)

    const [errors, setErrors] = useState({})


    const [state, sendEvent] = useMachine(loginMachine, {
        context: {
            login: login
        }
    })


    const Icon = current.value === 'visible' ? FaEyeSlash : FaEye;

    async function handleSubmit(event) {
        event.preventDefault()
        const newErrors = {};
        const initialValues = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!state.context.username) {
            newErrors.username = "Email is required"
        } else if (!regex.test(state.context.username)) {
            newErrors.username = "Email is invalid"
        }

        if (!state.context.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        console.log(newErrors)

        if (JSON.stringify(newErrors) === JSON.stringify(initialValues)) {
            sendEvent({ type: "submit" });
        }

    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Please login to access your account</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <input className="mt-8 p-2 rounded-xl border" type="text" name="username" placeholder="Email" value={state.context.username} onChange={(event) => sendEvent({ type: 'userNameChange', value: event.target.value })} />
                            {errors.username && <div className="text-xs text-red-500">{errors.username}</div>
                            }
                        </div>
                        <div>
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type={current.value === 'visible' ? 'text' : 'password'} name="password" placeholder="Password" value={state.context.password} onChange={(event) => sendEvent({ type: 'passwordChange', value: event.target.value })} />
                                <button onClick={() => send('TOGGLE')}>
                                    <Icon className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300" />

                                </button>
                                {errors.password && <div className="text-xs text-red-500">{errors.password}</div>}

                            </div>
                        </div>



                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">
                            {state.matches('submitting') ? 'Submitting' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <Link href="/signup" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Sign Up</Link>
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
