import { useContext } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSiteBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";
import { ProjectContext } from "./store/projects-context";

function App() {

  const {
    selectedProjectId
  } = useContext(ProjectContext);


  let content = (
    <SelectedProject />
  )

  if (selectedProjectId === null) {
    content = <NewProject />
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSiteBar />
      {content}
    </main>
  );
}

export default App;
