import { useContext } from "react";
import NewTask from "./NewTask";
import { ProjectContextReducer } from "../store/project-context-reducer";

export default function Tasks() {
    const {
        projectTasks,
        handleDeleteTask,
    } = useContext(ProjectContextReducer);

    const tasks = projectTasks;

    return (
        <section className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-700 mb-6 border-b pb-2 border-stone-300">
                Tasks
            </h2>

            <NewTask />

            {(tasks.length) === 0 && (
                <div className="bg-stone-100/50 rounded-lg p-6 text-center my-6">
                    <p className="text-stone-600 italic">
                        This project does not have any tasks yet. Start by adding one above.
                    </p>
                </div>
            )}

            {tasks.length > 0 && (
                <ul className="mt-6 divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden shadow-sm">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center py-3 px-4 hover:bg-stone-50 transition-colors duration-150">
                            <span className="text-stone-700 font-medium">{task.text}</span>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-stone-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                                title="Delete task"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}