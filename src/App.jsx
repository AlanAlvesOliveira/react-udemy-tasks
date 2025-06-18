import { useContext } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSiteBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";
import { ProjectContextReducer, STATUS } from "./store/project-context-reducer";
import ProjectForm from "./components/ProjectForm";
// import EditProject from "./components/EditProject";

function App() {
  const { status } = useContext(ProjectContextReducer);

  const getContent = () => {
    switch (status) {
      case STATUS.NO_PROJECT_SELECTED:
        return <NoProjectSelected />;
      case STATUS.PROJECT_SELECTED:
        return <SelectedProject />;
      case STATUS.ADDING_NEW_PROJECT:
      case STATUS.EDITING_PROJECT:
        return <ProjectForm />;
      default:
        return <NoProjectSelected />;
    }
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSiteBar />
      {getContent()}
    </main>
  );
}

export default App;