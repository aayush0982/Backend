"use client"
import { useActionState, useContext } from "react";
import { useFormStatus } from 'react-dom'
import { signup } from "./signupaction";
import Link from "next/link";



const SignUpForm = () => {

    const [state, signupAction] = useActionState(signup, undefined);
    return (
        <div className='bg-white py-16 px-16 w-[30vw] rounded-4xl  my-24 absolute left-[35vw] top-[10vh]'>

            <p className="font-bold text-3xl">Say hello to the world</p>
            <p className="text-gray-500 font-medium text-center mt-2">Explore the world to experience the beauty of nature</p>
            <form action={signupAction} className='flex flex-col gap-4 mt-4'>
                <div>
                    <p className='text-black text-sm font-semibold mb-1'>Email</p>
                    <div className='py-1 px-2 border border-black rounded-md w-[20vw]'>
                        <input name="email" className='outline-none w-full' type="text" placeholder='Enter your email' />
                    </div>
                    {state?.error?.email && <p className="text-red-500 text-sm">{state.error.email[0]}</p>}
                </div>
                <div>
                    <p className='text-black text-sm font-semibold mb-1'>Password</p>
                    <div className='py-1 px-2 border border-black rounded-md w-[20vw]'>
                        <input name="password" className='outline-none w-full' type="text" placeholder='Enter your password' />
                    </div>
                    {state?.error?.password && <p className="text-red-500 text-sm">{state.error.password[0]}</p>}
                </div>

                <SubmitForm />
            </form>
            <p className="text-gray-500 text-sm text-center mt-2">Already a user? <Link href={"/login"}><u className="cursor-pointer">Login</u></Link> </p>
        </div>
    )
}

function SubmitForm() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' disabled={pending} className='cursor-pointer py-2 px-2 text-white font-bold rounded-md w-[20vw] bg-green-600 mt-3'>
            SignUp
        </button>
    )
}

export default SignUpForm
