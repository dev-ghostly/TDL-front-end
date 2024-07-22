import Navbar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';

export default function Login(){
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://82.165.221.123:3000/api/users/login',{
            username: user.username,
            password: user.password
        }).then((response) => {
            if(response.status === 200){
                localStorage.setItem('token', response.data.token);
                alert("User logged in successfully");
                window.location.href = '/remindme/app';
            }
            else if(response.status === 400){
                alert("User does not exist");
            }
            else if(response.status === 500){
                alert("Internal server error");
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    return <>
        <Navbar />
        <main className="flex max-w-6xl mx-auto font-website">
            <div className="w-1/2 flex justify-center">
                <h1 className="text-4xl font-semibold mt-80">login.</h1>
            </div>
            <div className="w-1/2">
                <form onSubmit={(e) => handleSubmit(e)} className="mt-52 bg-two p-4 rounded-lg">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="username" className="text-sm mb-2">Username</label>
                        <input type="text" id="username" className="p-2 bg-four rounded-full" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-sm mb-2">Password</label>
                        <input type="password" id="password" className="p-2 bg-four rounded-full" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='flex justify-center'>
                        <button className="bg-four text-white p-2 rounded-full px-8">Login</button>
                    </div>
                </form>
            </div>
        </main>
    </>
}