import { CiMenuKebab } from "react-icons/ci";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addTask, deleteCategory, updateCategory } from "../redux/slices/categoriesSlice";

export default function Category({category, index}: any) {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    useEffect(() => {
        console.log(category);
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
            setModal(false);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateCategoryClick(categoryId: string) {
        var token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        var name = window.prompt("Enter the new name");
        if (!name) {
            return;
        }
        axios.put(`http://82.165.221.123:3000/api/categories/${categoryId}`,{
            name: name,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(updateCategory({id: categoryId, name: name}));
            setModal(false);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return <div className="w-2/5 p-4 flex-none">
        <div className="bg-one p-4 rounded-lg relative">
            <div className="flex justify-between">
                <h2 className="font-semibold">{category.name}</h2>
                {index !== 0 && <button onClick={(e) => setModal(!modal)} className="ml-2"><CiMenuKebab /></button> }
            </div>
            {modal && <div className="bg-two rounded-lg py-2 flex w-20 absolute -right-12 flex-col items-start px-2">
                    <button className="text-xs" onClick={(e) => deleteCategoryClick(category._id)}>Delete</button>
                    <button className="text-xs" onClick={(e) => updateCategoryClick(category._id)}>Rename</button>
                </div>}
            <button onClick={(e) => createTask(category._id)} className="mt-2 w-full h-10 rounded-xl bg-three flex justify-center items-center">
                <h2>+</h2>
            </button>
            <ul className="flex flex-col gap-2 mt-2">
                {category.tasks.map((item: any) => {
                    return <Task key={item._id} item={item} category={category}/>
                })}
            </ul>
        </div>
    </div>
}