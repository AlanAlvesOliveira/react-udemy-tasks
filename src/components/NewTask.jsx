import { useContext, useState, useEffect } from "react";
import { ProjectContextReducer } from "../store/project-context-reducer";

export default function NewTask() {
    const [isInputInvalid, setIsInputInvalid] = useState(false);
    const { handleAddTask } = useContext(ProjectContextReducer);
    const [enteredTask, setEnteredTask] = useState('');

    useEffect(() => {
        let timer;
        if (isInputInvalid) {
            timer = setTimeout(() => {
                setIsInputInvalid(false);
            }, 1000);
        }
        return () => clearTimeout(timer); // Limpa o timeout se o componente desmontar
    }, [isInputInvalid]);

    function handleChange(event) {
        setEnteredTask(event.target.value);
        // Reset invalid state quando o usuário começa a digitar
        if (isInputInvalid) {
            setIsInputInvalid(false);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleClick();
        }
    }

    function handleClick() {
        if (enteredTask.trim() === '') {
            setIsInputInvalid(true);
            return;
        }
        handleAddTask(enteredTask);
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
                className={`w-64 px-2 py-1 rounded-sm bg-stone-200 focus:outline-none ${isInputInvalid
                        ? 'ring-2 ring-red-400'
                        : 'focus:ring-2 focus:ring-stone-400'
                    }`}
                value={enteredTask}
            />
            <button
                onClick={handleClick}
                className="px-4 py-1 text-stone-100 bg-stone-700 hover:bg-stone-600 rounded-sm 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-400
                flex items-center gap-1"
            >
                + Add Task
            </button>
            {isInputInvalid && (
                <p className="text-red-400 text-sm ml-2 animate-pulse">Please enter a valid task!</p>
            )}
        </div>
    )
}