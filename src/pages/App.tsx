import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";

export default function App(){
    const dispatch = useDispatch();
    
    return <main className="max-w-6xl mx-auto flex font-website">
        <div className="w-1/4 h-screen bg-two p-4 flex flex-col justify-between">
            <Logo />
            <div>
                <ul className="list-disc pl-4">
                    <li>Settings</li>
                    <li>Log out</li>
                </ul>
            </div>
        </div>
        <div className="w-3/4 h-screen">
            <div className="mt-4">
                <h1 className="font-semibold ml-8 text-2xl">Your Lists</h1>
            </div>
        </div>
    </main>
}