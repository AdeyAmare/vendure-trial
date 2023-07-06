import { useMutation } from "@apollo/client";
import React, { useState } from 'react'
import { verificationMutation } from "@/mutations/VerificationMutation";

const Verification = () => {


    const [token, setToken] = useState("")

    const [register] = useMutation(verificationMutation)

    async function handleSubmit(event){
        event.preventDefault()

        const resp = await register({
            variables: {
                token: token,
            }
        });

        console.log(resp)
    }

    return (
        <div>
            <div>registration-form</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Token" value={token} onChange={(event) => setToken(event.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default Verification
