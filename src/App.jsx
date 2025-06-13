import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSiteBar from "./components/ProjectSideBar";

function App() {
  const [projectsState, setProjecrsTate] = useState({
    selectedProjetctId: undefined,
    projects: []
  });

  function handleStartAddProjectI() {
    setProjecrsTate(prevState => {
      return {
        ...prevState,
        selectedProjetctId: null,
      }
    });
  }

  function handleAddProject(newProject) {

    newProject = {
      ...newProject,
      Id: Math.random()
    }

    setProjecrsTate((prevState) => {
      return {
        ...prevState,
        selectedProjetctId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleCancel() {
    setProjecrsTate((prevState) => {
      return {
        ...prevState,
        selectedProjetctId: undefined,
      }
    });
  }

  let content;
  if (projectsState.selectedProjetctId === null) {
    content = (<NewProject onAdd={handleAddProject} onCancel={handleCancel} />)
  } else {
    content = (<NoProjectSelected onStartAddProject={handleStartAddProjectI} />
    )
  }


  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSiteBar onStartAddProject={handleStartAddProjectI} projectsList={projectsState.projects} />
      {content}
    </main>
  );
}

export default App;
