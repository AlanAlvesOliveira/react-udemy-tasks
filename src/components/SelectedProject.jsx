import { useContext } from "react";
import Tasks from "./Tasks";
import { ProjectContextReducer } from "../store/project-context-reducer";

export default function SelectedProject() {

    // const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric'
    // });

    const {
        handleDeleteProject,
        selectedProject
    } = useContext(ProjectContextReducer);


    const project = selectedProject;

    return (

        //essa key é necessaria para o react "remontar" o component, assim ele realiza a animation
        <div key={project.Id} className="w-[35rem] mt-16 animation-content">
            <header className="pb-4 mb-4 boder-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.Title}</h1>
                    <button onClick={handleDeleteProject} className="text-stone-600 hover:text-stone-950">Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{project.DueDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.Description}</p>
            </header>
            <Tasks />
        </div>
    )
}