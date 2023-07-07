import { useMutation } from "@apollo/client";
import { signupMutation } from "@/mutations/SignupMutation";
import React, { useState } from 'react'
import Image from "next/image";
import { useMachine } from "@xstate/react";
import toggleMachine from "../machines/toggleMachine";
import signinMachine from '../machines/signinMachine';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Link from 'next/link';

const SignupForm = () => {

    const [register] = useMutation(signupMutation)

    const [errors, setErrors] = useState({})

    const [current, send] = useMachine(toggleMachine)
    const [state, sendEvent] = useMachine(signinMachine, {
        context: {
            register: register
        }
    })

    const Icon = current.value === 'visible' ? FaEyeSlash : FaEye;


    async function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        const initialValues = {}
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const password_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (!state.context.title) {
            newErrors.title = "Title is required"
        }
        if (!state.context.firstName) {
            newErrors.firstName = "First name is required"
        }
        if (!state.context.lastName) {
            newErrors.lastName = "Last name is required"
        }
        if (!state.context.emailAddress) {
            newErrors.emailAddress = "Email is required"
        } else if (!email_regex.test(state.context.emailAddress)) {
            newErrors.emailAddress = "Email is invalid"
        }
        if (!state.context.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required"
        }
        if (!state.context.password) {
            newErrors.password = "Password is required"
        } else if (state.context.password.length < 8) {
            newErrors.password = "Password must be more than 8 characters"
        } else if (!password_regex.test(state.context.password)) {
            newErrors.password = "Password should contain atleast one number, one special character, one uppercase and one lowercase letter"
        }
        setErrors(newErrors)
        console.log(newErrors)

        if (JSON.stringify(newErrors) === JSON.stringify(initialValues)) {
            sendEvent({ type: "submit" })
            setErrors({})
        }
    }








    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center my-10">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 items-center">
                <div className="md:w-1/2 px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
                    <p className="text-xs mt-4 text-[#002D74]">Interested in joining our platform. Please fill out the form to create an account.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <input className="mt-8 p-2 rounded-xl border" type="text" name="title" placeholder="Title" value={state.context.title} onChange={(event) => sendEvent({ type: 'titleChange', value: event.target.value })} />
                            {errors.title && <div className="text-xs text-red-500">{errors.title}</div>}

                        </div>
                        <div>
                            <input className="p-2 rounded-xl border" type="text" name="firstName" placeholder="First Name" value={state.context.firstName} onChange={(event) => sendEvent({ type: 'firstNameChange', value: event.target.value })} />

                            {errors.firstName && <div className="text-xs text-red-500">{errors.firstName}</div>}
                        </div>
                        <div>
                            <input className="p-2 rounded-xl border" type="text" name="lastName" placeholder="Last Name" value={state.context.lastName} onChange={(event) => sendEvent({ type: 'lastNameChange', value: event.target.value })} />
                            {errors.lastName && <div className="text-xs text-red-500">{errors.lastName}</div>}
                        </div>
                        <div>
                            <input className="p-2 rounded-xl border" type="text" name="emailAddress" placeholder="Email" value={state.context.emailAddress} onChange={(event) => sendEvent({ type: 'emailChange', value: event.target.value })} />
                            {errors.emailAddress && <div className="text-xs text-red-500">{errors.emailAddress}</div>}
                        </div>
                        <div>
                            <input className="p-2 rounded-xl border" type="text" name="phoneNumber" placeholder="Phone Number" value={state.context.phoneNumber} onChange={(event) => sendEvent({ type: 'phoneNumberChange', value: event.target.value })} />
                            {errors.phoneNumber && <div className="text-xs text-red-500"> {errors.phoneNumber}</div>}
                        </div>

                        <div>
                            <div className="relative">

                                <input className="p-2 rounded-xl border w-full" type={current.value === 'visible' ? 'text' : 'password'} name="password" placeholder="Password" value={state.context.password} onChange={(event) => sendEvent({ type: 'passwordChange', value: event.target.value })} />
                                <a onClick={() => send('TOGGLE')}>
                                    <Icon className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300" />

                                </a>
                            </div>
                            {errors.password && <div className="text-xs text-red-500">{errors.password}</div>}
                        </div>


                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">
                            {state.matches('submitting') ? 'Submitting' : 'SignUp'}

                        </button>
                    </form>
                    <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Already have an account?</p>
                        <Link href="/login" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Login
                        </Link>
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