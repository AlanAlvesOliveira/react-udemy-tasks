import { useContext, useState, useRef, useEffect } from "react";
import Tasks from "./Tasks";
import { ProjectContextReducer } from "../store/project-context-reducer";
import Button from "./Button";
import Icon from "./Icon";

export default function SelectedProject() {
    const {
        handleDeleteProject,
        selectedProject,
        handleEditProject
    } = useContext(ProjectContextReducer);

    const [isExpanded, setIsExpanded] = useState(false);
    const [needsTruncation, setNeedsTruncation] = useState(false);
    const descriptionRef = useRef(null);
    const project = selectedProject;

    useEffect(() => {
        if (descriptionRef.current) {
            // Calcula o número de linhas
            const element = descriptionRef.current;
            const lineHeight = parseInt(getComputedStyle(element).lineHeight);
            const totalHeight = element.scrollHeight;
            const calculatedLines = Math.round(totalHeight / lineHeight);

            setNeedsTruncation(calculatedLines > 4);
        }
    }, [project.Description]);

    return (
        <div key={project.Id} className="w-[35rem] mt-16 animation-content">
            <header className="pb-4 mb-4 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.Title}</h1>
                    <div className="flex justify-end gap-4">
                        <Button onClick={handleEditProject}>Edit</Button>
                        <Button onClick={handleDeleteProject}>Delete</Button>
                    </div>
                </div>
                <p className="mb-4 text-stone-400">{project.DueDate}</p>

                <div className="mb-4">
                    <div
                        ref={descriptionRef}
                        className={`text-stone-600 whitespace-pre-wrap transition-all duration-300 overflow-hidden ${!isExpanded && needsTruncation ? 'max-h-[6rem]' : 'max-h-[1000px]'
                            }`}
                        style={{ lineHeight: '1.5rem' }} /* Defina um line-height consistente */
                    >
                        {project.Description}
                    </div>
                    {needsTruncation && (
                        <div className="flex justify-between items-center mt-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:text-blue-800 text-sm focus:outline-none flex items-center gap-1 mt-4"
                            >
                                <Icon type={isExpanded ? 'chevron-up' : 'chevron-down'} size={5} className="mr-1" />
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <Tasks />
        </div>
    );
}