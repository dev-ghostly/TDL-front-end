import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Signup(){
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }
    return <>
        <Navbar />
        <main className="flex max-w-6xl mx-auto font-website">
            <div className="w-1/2 flex justify-center">
                <h1 className="text-4xl font-semibold mt-80">sign up.</h1>
            </div>
            <div className="w-1/2">
                <form className="mt-52 bg-two p-4 rounded-lg">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="username" className="text-sm mb-2">Username</label>
                        <input type="text" id="username" className="p-2 bg-four rounded-full" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-sm mb-2">Password</label>
                        <input type="password" id="password" className="p-2 bg-four rounded-full" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="confirm-password" className="text-sm mb-2">Confirm Password</label>
                        <input type="password" id="confirm-password" className="p-2 bg-four rounded-full" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="flex justify-center mt-10">
                        <button className="bg-black text-one py-2 px-8 bg-five rounded-full">Sign Up</button>
                    </div>
                </form>
            </div>
        </main>
    </>
}