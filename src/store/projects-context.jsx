import { createContext, useState } from "react";

export const ProjectContext = createContext({
    projects: [],
    selectedProjectId: undefined,
    tasks: [],
    handleAddTask: () => { },
    handleDeleteTask: () => { },
    handleStartAddProject: () => { },
    handleAddProject: () => { },
    handleCancel: () => { },
    handleSelectProject: () => { },
    handleDeleteProject: () => { },
    getSelectedProject: () => { },
    getProjectTasks: () => { }
});

export default function ProjectContextProvider({ children }) {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [{
            "Title": "Projeto numero 1",
            "Description": "Descrição completa e detalhada do projeto\n\nFim da descrição",
            "DueDate": "2025-06-15",
            "Id": 1
        }],
        tasks: []
    });

    function handleAddTask(text) {
        setProjectsState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                id: taskId,
                text: text,
                projectId: prevState.selectedProjectId,
            }
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            }
        });
    }

    function handleDeleteTask(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (task) => task.id !== id
                )
            }
        });
    }

    function handleStartAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        });
    }

    function handleAddProject(newProject) {
        newProject = {
            ...newProject,
            Id: Math.random()
        }

        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            }
        });
    }

    function handleCancel() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        });
    }

    function handleSelectProject(idProject) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: idProject
            }
        });
    }

    function handleDeleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.Id !== prevState.selectedProjectId
                ),
                tasks: prevState.tasks.filter(
                    (task) => task.projectId !== prevState.selectedProjectId
                )
            }
        });
    }

    function getSelectedProject() {
        return projectsState.projects.find(
            project => project.Id === projectsState.selectedProjectId
        );
    }

    function getProjectTasks(projectId) {
        return projectsState.tasks.filter(
            task => task.projectId === projectId
        );
    }

    const projectValues = {
        projects: projectsState.projects,
        selectedProjectId: projectsState.selectedProjectId,
        tasks: projectsState.tasks,
        handleAddTask,
        handleDeleteTask,
        handleStartAddProject,
        handleAddProject,
        handleCancel,
        handleSelectProject,
        handleDeleteProject,
        getSelectedProject,
        getProjectTasks
    };

    return (
        <ProjectContext.Provider value={projectValues}>
            {children}
        </ProjectContext.Provider>
    );
}