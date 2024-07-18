import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesStart, getCategoriesFailure, getCategoriesSuccess, addCategory, addTask, updateCategory, deleteCategory, deleteTask } from "../redux/slices/categoriesSlice";
import {useEffect} from "react";
import axios from "axios";
import Category from "../components/Category";

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

    function deleteTaskClick(taskId: string, categoryId: string) {
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        axios.delete(`http://82.165.221.123:3000/api/tasks/${taskId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(deleteTask({id: taskId, categoryId: categoryId}));
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function deleteCategoryClick(categoryId: string) {
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        axios.delete(`http://82.165.221.123:3000/api/categories/${categoryId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(deleteCategory({id : categoryId}));
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function logout() {
        var prompt = window.confirm("Are you sure you want to log out?");
        if (!prompt) {
            return;
        }
        localStorage.removeItem("token");
        window.location.href = "/";
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
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-six"></div>
                    <p className="font-semibold text-sm" onClick={(e) => logout()}>Log out</p>
                </div>
            </div>
            <div className="w-3/4 h-screen">
                <div className="mt-4">
                    <h1 className="font-semibold ml-8 text-2xl">Your Lists</h1>
                    <div className="ml-3 flex flex-nowrap overflow-x-auto mt-8">
                        {categories.map((category: any, index : any) => {
                            return <Category key={index} category={category} index={index} />
                        })}
                        <button onClick={() => createCategory()} className="mt-4 rounded-full h-6 w-6 flex justify-center items-center bg-two">+</button>
                    </div>
                </div>
            </div>
        </main>
    }
}