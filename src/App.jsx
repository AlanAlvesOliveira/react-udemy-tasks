import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSiteBar from "./components/ProjectSideBar";
import SeletedProject from "./components/SeletedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

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

  let content = <SeletedProject project={selectedProject} onDelete={handleDeleteProject} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProjectI} />
  }

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
