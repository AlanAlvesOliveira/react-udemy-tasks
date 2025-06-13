import Button from "./Button";

export default function ProjectSiteBar({ onStartAddProject, projectsList }) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <div>
                <Button onClick={onStartAddProject}>+ Add Projects</Button>
            </div>
            <ul className="mt-8">
                {projectsList.map((project, index) => (
                    <li key={index} className="mb-2 p-2 rounded hover:bg-stone-800 cursor-pointer">
                        <button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">{project.Title}</button>

                        {/* <h3 className="font-semibold">{project.Title}</h3>
                        <p className="text-sm text-stone-400">{project.Description}</p>
                        <p className="text-sm text-stone-400">{project.DueDate}</p>
                        <p className="text-sm text-stone-400">{project.Id}</p>
                     */}
                    </li>
                ))}
            </ul>
        </aside>
    )
}