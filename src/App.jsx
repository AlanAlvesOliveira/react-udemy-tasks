import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSiteBar from "./components/ProjectSideBar";
import SeletedProject from "./components/SeletedProject";

function App() {


  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [{
      "Title": "Projeto numero 1",
      "Description": "Descrição completa e detalhada do projeto\n\nFim da descrição",
      "DueDate": "2025-06-15",
      "Id": 0.2526887347555048
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
          (tasks) => tasks.id !== id
        )
      }
    });

  }

  function handleStartAddProjectI() {
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
        )
      }
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.Id === projectsState.selectedProjectId
  )

  let content = (
    <SeletedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  )

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProjectI} />
  }

  console.log(projectsState);

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSiteBar
        onStartAddProject={handleStartAddProjectI}
        projectsList={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
