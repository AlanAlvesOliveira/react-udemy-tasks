import { useContext, useState } from "react";
import { ProjectContext } from "../store/projects-context";

export default function NewTask() {

    const {
        handleAddTask
    } = useContext(ProjectContext);

    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        handleAddTask(enteredTask)
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input
                onChange={handleChange}
                type="text"
                className="2-64 px-2 py-1 rounded-sm bg-stone-200"
                value={enteredTask}
            />
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-900">Add Task</button>
        </div>
    )
}