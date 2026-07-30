import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task
    onToggle: (task:Task) => void
}

export const TaskItem = ({task, onToggle}:TaskItemProps) => {
    return(
        <li>
            <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            />

            <label>{task.title}</label>
        </li>
    )
}