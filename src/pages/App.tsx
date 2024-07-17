import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesStart, getCategoriesFailure, getCategoriesSuccess } from "../redux/slices/categoriesSlice";
import {useEffect} from "react";
import axios from "axios";

export default function App(){
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categories.categories);
    const isLoading = useSelector((state: any) => state.categories.isLoading);
    const error = useSelector((state: any) => state.categories.error);

    useEffect(() => {
        dispatch(getCategoriesStart());
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        axios.get("http://82.165.221.123:3000/api/categories",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(getCategoriesSuccess(response.data));
        }).catch((error) => {
            dispatch(getCategoriesFailure(error.message));
        })
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error}</div>;
    }
    else {
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
                    <div className="ml-3 flex flex-wrap">
                        {categories.map((category: any) => {
                            return <div className="w-2/5 p-4">
                                <div className="bg-one p-4 rounded-lg">
                                    <h2 className="font-semibold">{category.name}</h2>
                                    <button className="mt-2 w-full h-10 rounded-xl bg-three flex justify-center items-center">
                                        <h2>+</h2>
                                    </button>
                                    <ul className="list-disc pl-4">
                                        {category.tasks.map((item: any) => {
                                            return <li>{item.name}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </main>
    }
}