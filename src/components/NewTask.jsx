import { useState } from "react";

export default function NewTask({ onAdd }) {

    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && enteredTask.trim() !== '') {
            handleClick();
        }
    }

    function handleClick() {
        onAdd(enteredTask)
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
                className="2-64 px-2 py-1 rounded-sm bg-stone-200"
                value={enteredTask}
            />
            <button
                onClick={handleClick} className="text-stone-700 hover:text-stone-900">
                Add Task
            </button>
        </div>
    )
}