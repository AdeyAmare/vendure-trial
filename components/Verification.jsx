import { useMutation } from "@apollo/client";
import React, { useState } from 'react'
import { verificationMutation } from "@/mutations/VerificationMutation";

const Verification = () => {


    const [token, setToken] = useState("")

    const [register] = useMutation(verificationMutation)
    const [errors, setErrors] = useState({});

    async function handleSubmit(event) {
        event.preventDefault()

        const newErrors = {};


        if (!token) {
            newErrors.token = "Token is required"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            const resp = await register({
                variables: {
                    token: token,
                }
            });

            console.log(resp)

        }




    }

    return (

        <div class="flex justify-center items-center h-screen bg-gray-50 ">
            <div class="bg-white shadow-md rounded-md p-20 mb-4">
                <div class="mb-4">
                    <h1 class="text-xl font-bold text-gray-800">Verification</h1>
                    <p class="text-gray-600">Please insert Verification Token</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <input className="mt-8 p-2 rounded-xl border" type="text" name="username" placeholder="Verification Token" value={token} onChange={(event) => setToken(event.target.value)} />
                        <div className="text-xs text-red-500">{errors.token}</div>

                    </div>

                    <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Verification
