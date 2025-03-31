"use client"
import { useActionState, useContext, useEffect } from "react";
import { useFormStatus } from 'react-dom'
import { login } from './loginaction'
import Link from "next/link";
import { redirect } from "next/navigation";

/**
* React component for the login/signup form.
* - Uses `useActionState` to handle form submission state.
* - Displays error messages if validation fails.
* - Switches between login and signup modes dynamically.
*
* @component
* @returns {JSX.Element} - Rendered authentication form.
*/

const LoginForm = () => {
    /**
 * Handles form submission using `useActionState`.
 * - Calls the `login` function on submission.
 * - Stores form state and error messages.
 *
 * @hook
 * @function useActionState
 * @param {Function} login - Server action for authentication.
 * @param {any} initialState - Initial state for form submission.
 * @returns {[Object, Function]} - Returns the form state and the login action function.
 */
    const [state, loginAction] = useActionState(login, undefined);
    useEffect(() => {
        if (state?.success && state.email) {
            localStorage.setItem("userEmail", state.email);
            redirect("/new_trip");
        }
    }, [state]);
    return (
        <div className='bg-white py-16 px-16 w-[30vw] rounded-4xl  my-24 absolute left-[35vw] top-[10vh]'>

            <p className="font-bold text-3xl">Say hello to the world</p>
            <p className="text-gray-500 font-medium text-center mt-2">Explore the world to experience the beauty of nature</p>
            <form action={loginAction} className='flex flex-col gap-4 mt-4'>
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
            <p className="text-gray-500 text-sm text-center mt-2">New to Website Name? <Link href={"/signup"}><u className="cursor-pointer">Sign up</u></Link> </p>

        </div>
    )
}

function SubmitForm() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' disabled={pending} className='cursor-pointer py-2 px-2 text-white font-bold rounded-md w-[20vw] bg-green-600 mt-3'>
            Login
        </button>
    )
}

export default LoginForm
