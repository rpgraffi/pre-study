import { Task } from "./task_model";

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  colorClass: string;
}