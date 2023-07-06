import { useMutation } from "@apollo/client";
import { signupMutation } from "@/mutations/SignupMutation";
import React, { useState } from 'react'
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "../machines/toggleMachine";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupForm = () => {


    const [title, setTitle] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [phoneNumber, setPhoneNumeber] = useState("")
    const [password, setPassword] = useState("")

    const [register] = useMutation(signupMutation)

    const [current, send] = useMachine(toggleMachine)
    const Icon = current.value === 'visible' ? FaEyeSlash : FaEye;


    async function handleSubmit(event) {
        event.preventDefault();

        const resp = await register({
            variables: {
                email: emailAddress,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                password: password
            }
        });

        console.log(resp)


    }


    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center my-10">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 items-center">
                <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Interested in joining our platform. Please fill out the form to create an account.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input className="mt-8 p-2 rounded-xl border" type="text" name="title" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
                        <input className="p-2 rounded-xl border" type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                        <input className="p-2 rounded-xl border" type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                        <input className="p-2 rounded-xl border" type="text" name="emailAddress" placeholder="Email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} />
                        <input className="p-2 rounded-xl border" type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumeber(event.target.value)} />
                        <div className="relative">
                            <input className="p-2 rounded-xl border w-full" type={current.value === 'visible' ? 'text' : 'password'} name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <button onClick={() => send('TOGGLE')}>
                                <Icon className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300" />

                            </button>
                        </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">Signup</button>
                    </form>
                    <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Already have an account?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
                    </div>

                </div>
                <div className="w-1/2 md:block hidden">
                    <Image width={500} height={800} className=" rounded-2xl" src="/signup.svg" alt="" />
                </div>
            </div>
        </section>


    )
}

export default SignupForm