import axios from "axios"
import { useDispatch } from "react-redux"
import { deleteTask } from "../redux/slices/categoriesSlice"
import { useEffect } from "react";
export default function Task({item, category}: any) {
    useEffect(() => {
        console.log(item);
    }, []);
    const dispatch = useDispatch();
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
    return <div className="bg-two rounded-lg py-2 flex">
        <div className="mt-1.5 ml-2 h-2 w-2 bg-six rounded-full" onClick={() => deleteTaskClick(item._id, category._id)}></div>            
        <div className="gap-1">
            <h3 className="ml-2 font-semibold text-sm">{item.title}</h3>
            <p className="ml-2 text-xs">{item.description}</p>
        </div>
    </div>
}