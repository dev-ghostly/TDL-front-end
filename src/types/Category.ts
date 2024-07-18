import { Task } from './Task';

export type Category = {
    _id: string;
    name: string;
    tasks: Task[];
    user: string;
}