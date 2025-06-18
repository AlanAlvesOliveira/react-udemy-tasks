import { createContext, useReducer, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


const STORAGE_KEY = 'project_management_app_data';

// Definindo os status possíveis
export const STATUS = {
    NO_PROJECT_SELECTED: 'NO_PROJECT_SELECTED',
    PROJECT_SELECTED: 'PROJECT_SELECTED',
    EDITING_PROJECT: 'EDITING_PROJECT',
    ADDING_NEW_PROJECT: 'ADDING_NEW_PROJECT'
};

export const ProjectContextReducer = createContext({
    status: STATUS.NO_PROJECT_SELECTED,
    projects: [],
    selectedProjectId: undefined,
    tasks: [],
    selectedProject: null,
    projectTasks: [],
    handleAddTask: () => { },
    handleDeleteTask: () => { },
    handleStartAddProject: () => { },
    handleAddOrUpdateProject: () => { },
    handleCancel: () => { },
    handleSelectProject: () => { },
    handleDeleteProject: () => { },
    handleEditProject: () => { }
});

const ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    START_ADD_PROJECT: 'START_ADD_PROJECT',
    ADD_OR_UPDATE_PROJECT: 'ADD_OR_UPDATE_PROJECT',
    CANCEL: 'CANCEL',
    SELECT_PROJECT: 'SELECT_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT',
    EDIT_PROJECT: 'EDIT_PROJECT'
};

function projectsReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return {
                ...state,
                tasks: [{
                    id: uuidv4(),
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
                status: STATUS.ADDING_NEW_PROJECT,
                selectedProjectId: null
            };

        case ACTIONS.ADD_OR_UPDATE_PROJECT:
            const project = action.payload.project;
            const projectId = project.Id ?? uuidv4();

            // Se o projeto já existe (tem ID), atualiza
            if (project.Id) {
                return {
                    ...state,
                    status: STATUS.PROJECT_SELECTED,
                    selectedProjectId: project.Id,
                    projects: (state.projects || []).map(p =>
                        p.Id === project.Id ? { ...project } : p
                    )
                };
            }
            // Se não tem ID, adiciona como novo
            else {
                return {
                    ...state,
                    status: STATUS.PROJECT_SELECTED, // Deve selecionar o novo projeto
                    selectedProjectId: projectId,
                    projects: [...(state.projects || []), { ...project, Id: projectId }]
                };
            }

        case ACTIONS.CANCEL:
            return {
                ...state,
                status: STATUS.NO_PROJECT_SELECTED,
                selectedProjectId: undefined
            };

        case ACTIONS.SELECT_PROJECT:
            return {
                ...state,
                status: STATUS.PROJECT_SELECTED,
                selectedProjectId: action.payload.id
            };

        case ACTIONS.DELETE_PROJECT:
            return {
                ...state,
                status: STATUS.NO_PROJECT_SELECTED,
                selectedProjectId: undefined,
                projects: state.projects.filter(
                    project => project.Id !== state.selectedProjectId
                ),
                tasks: state.tasks.filter(
                    task => task.projectId !== state.selectedProjectId
                )
            };

        case ACTIONS.EDIT_PROJECT:
            return {
                ...state,
                selectedProject: state.selectedProject,
                status: STATUS.EDITING_PROJECT
            };

        default:
            return state;
    }
}

const initialState = {
    status: STATUS.NO_PROJECT_SELECTED,
    selectedProjectId: undefined,
    projects: [],
    tasks: []
};


function loadInitialState() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialState;
}

export default function ProjectContextReducerProvider({ children }) {
    const [state, dispatch] = useReducer(projectsReducer, loadInitialState());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const selectedProject = state?.projects?.find(
        project => project.Id === state.selectedProjectId
    );

    const projectTasks = state?.tasks?.filter(
        task => task.projectId === state.selectedProjectId
    );

    const handleAddTask = (text) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: { text } });
    };

    const handleDeleteTask = (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
    };

    const handleStartAddProject = () => {
        dispatch({ type: ACTIONS.START_ADD_PROJECT });
    };

    const handleAddOrUpdateProject = (project) => {
        dispatch({ type: ACTIONS.ADD_OR_UPDATE_PROJECT, payload: { project } });
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

    const handleEditProject = () => {
        dispatch({ type: ACTIONS.EDIT_PROJECT });
    };

    const value = useMemo(() => ({
        status: state.status,
        projects: state.projects,
        selectedProjectId: state.selectedProjectId,
        tasks: state.tasks,
        selectedProject,
        projectTasks,
        handleAddTask,
        handleDeleteTask,
        handleStartAddProject,
        handleAddOrUpdateProject,
        handleCancel,
        handleSelectProject,
        handleDeleteProject,
        handleEditProject,
    }), [state, selectedProject, projectTasks]);

    return (
        <ProjectContextReducer.Provider value={value}>
            {children}
        </ProjectContextReducer.Provider>
    );
}