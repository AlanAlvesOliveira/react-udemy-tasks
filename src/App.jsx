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
  let content;
  if (projectsState.selectedProjetctId === null) {
    content = (<NewProject />)
  } else {
    content = (<NoProjectSelected onStartAddProject={handleStartAddProjectI} />
    )
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSiteBar onStartAddProject={handleStartAddProjectI} />
      {content}
    </main>
  );
}

export default App;
