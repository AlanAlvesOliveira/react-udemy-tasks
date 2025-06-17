import { useContext } from "react";
import Button from "./Button";
import { ProjectContextReducer } from "../store/project-context-reducer";

export default function ProjectSiteBar() {

    const {
        projects,
        selectedProjectId,
        handleStartAddProject,
        handleSelectProject
    } = useContext(ProjectContextReducer);

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <div>
                <Button onClick={handleStartAddProject}>+ Add Projects</Button>
            </div>
            <ul className="mt-8">
                {projects.map((project, index) => {

                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"

                    if (project.Id === selectedProjectId) {
                        cssClasses += " text-stone-200 bg-stone-800"
                    } else {
                        cssClasses += " text-stone-400"
                    }

                    return (
                        <li key={index} className="mb-2 p-2 rounded hover:bg-stone-800 cursor-pointer">
                            <button
                                onClick={() => handleSelectProject(project.Id)}
                                className={cssClasses}>
                                {project.Title}
                            </button>
                        </li>
                    )

                })}
            </ul>
        </aside>
    )
}