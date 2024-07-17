import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesStart, getCategoriesFailure, getCategoriesSuccess, addCategory, addTask, updateCategory, deleteCategory, deleteTask } from "../redux/slices/categoriesSlice";
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
            console.log(response.data);
        }).catch((error) => {
            dispatch(getCategoriesFailure(error.message));
            window.location.href = "/login";
        })
    }, []);

    function createTask(categoryId: string) {
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        var taskname = window.prompt("Enter the task name");
        var description = window.prompt("Enter the task description");
        if (!taskname || !description) {
            return;
        }
        axios.post("http://82.165.221.123:3000/api/tasks",{
            title: taskname,
            description: description,
            category: categoryId,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(addTask(response.data));
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function createCategory() {
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        var categoryname = window.prompt("Enter the category name");
        if (!categoryname) {
            return;
        }
        axios.post("http://82.165.221.123:3000/api/categories",{
            name: categoryname,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(addCategory(response.data.category));
        }).catch((error) => {
            console.log(error);
        })
    }

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
                    <div className="ml-3 flex flex-wrap mt-8">
                        {categories.map((category: any) => {
                            return <div className="w-2/5 p-4">
                                <div className="bg-one p-4 rounded-lg">
                                    <h2 className="font-semibold">{category.name}</h2>
                                    <button onClick={(e) => createTask(category._id)} className="mt-2 w-full h-10 rounded-xl bg-three flex justify-center items-center">
                                        <h2>+</h2>
                                    </button>
                                    <ul className="flex flex-col gap-2 mt-2">
                                        {category.tasks.map((item: any) => {
                                            return <div className="bg-two rounded-lg py-2 flex">
                                                <div className="mt-1.5 ml-2 h-2 w-2 bg-six rounded-full"></div>
                                                <div className="gap-1">
                                                    <h3 className="ml-2 font-semibold text-sm">{item.title}</h3>
                                                    <p className="ml-2 text-xs">{item.description}</p>
                                                </div>
                                            </div>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        })}
                        <button onClick={(e) => createCategory(e)} className="mt-4 rounded-full h-6 w-6 flex justify-center items-center bg-two">+</button>
                    </div>
                </div>
            </div>
        </main>
    }
}