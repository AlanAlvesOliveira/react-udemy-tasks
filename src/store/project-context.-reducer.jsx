import { createContext, useReducer, useMemo } from "react";

export const ProjectContextReducer = createContext({
    projects: [],
    selectedProjectId: undefined,
    tasks: [],
    selectedProject: null,
    projectTasks: [],
    handleAddTask: () => { },
    handleDeleteTask: () => { },
    handleStartAddProject: () => { },
    handleAddProject: () => { },
    handleCancel: () => { },
    handleSelectProject: () => { },
    handleDeleteProject: () => { },
});

// Defina os tipos de ação
const ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    START_ADD_PROJECT: 'START_ADD_PROJECT',
    ADD_PROJECT: 'ADD_PROJECT',
    CANCEL: 'CANCEL',
    SELECT_PROJECT: 'SELECT_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT'
};

// Reducer function
function projectsReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return {
                ...state,
                tasks: [{
                    id: Math.random(),
                    text: action.payload.text,
                    projectId: state.selectedProjectId,
                }, ...state.tasks]
            };

        case ACTIONS.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };

        case ACTIONS.START_ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: null
            };

        case ACTIONS.ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: undefined,
                projects: [...state.projects, {
                    ...action.payload.project,
                    Id: Math.random()
                }]
            };

        case ACTIONS.CANCEL:
            return {
                ...state,
                selectedProjectId: undefined
            };

        case ACTIONS.SELECT_PROJECT:
            return {
                ...state,
                selectedProjectId: action.payload.id
            };

        case ACTIONS.DELETE_PROJECT:
            return {
                ...state,
                selectedProjectId: undefined,
                projects: state.projects.filter(
                    project => project.Id !== state.selectedProjectId
                ),
                tasks: state.tasks.filter(
                    task => task.projectId !== state.selectedProjectId
                )
            };

        default:
            return state;
    }
}

const initialState = {
    selectedProjectId: undefined,
    projects: [{
        "Title": "Projeto numero 1",
        "Description": "Descrição completa e detalhada do projeto\n\nFim da descrição",
        "DueDate": "2025-06-15",
        "Id": 1
    }],
    tasks: []
};

export default function ProjectContextReducerProvider({ children }) {
    const [state, dispatch] = useReducer(projectsReducer, initialState);

    // Valores derivados
    const selectedProject = state.projects.find(
        project => project.Id === state.selectedProjectId
    );

    const projectTasks = state.tasks.filter(
        task => task.projectId === state.selectedProjectId
    );

    // Actions
    const handleAddTask = (text) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: { text } });
    };

    const handleDeleteTask = (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
    };

    const handleStartAddProject = () => {
        dispatch({ type: ACTIONS.START_ADD_PROJECT });
    };

    const handleAddProject = (project) => {
        dispatch({ type: ACTIONS.ADD_PROJECT, payload: { project } });
    };

    const handleCancel = () => {
        dispatch({ type: ACTIONS.CANCEL });
    };

    const handleSelectProject = (id) => {
        dispatch({ type: ACTIONS.SELECT_PROJECT, payload: { id } });
    };

    const handleDeleteProject = () => {
        dispatch({ type: ACTIONS.DELETE_PROJECT });
    };

    const value = useMemo(() => ({
        projects: state.projects,
        selectedProjectId: state.selectedProjectId,
        tasks: state.tasks,
        selectedProject,
        projectTasks,
        handleAddTask,
        handleDeleteTask,
        handleStartAddProject,
        handleAddProject,
        handleCancel,
        handleSelectProject,
        handleDeleteProject,
    }), [state, selectedProject, projectTasks]);

    return (
        <ProjectContextReducer.Provider value={value}>
            {children}
        </ProjectContextReducer.Provider>
    );
}