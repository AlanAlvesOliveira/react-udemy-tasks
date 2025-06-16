import { useContext, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import { ProjectContext } from "../store/projects-context";

export default function NewProject() {

    const {
        handleAddProject,
        handleCancel
    } = useContext(ProjectContext);

    const modal = useRef();

    const refTitle = useRef();
    const refDescription = useRef();
    const refDueDate = useRef();

    function handleSave() {

        const newProject = {
            Title: refTitle.current.value,
            Description: refDescription.current.value,
            DueDate: refDueDate.current.value,
        }

        if (!newProject.Title || !newProject.Description || !newProject.DueDate) {
            modal.current.open();
            return;
        }

        handleAddProject(newProject);
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">
                    Oops ... looks like you forgot to enter a value.
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a valid value for every input field.
                </p>
            </Modal>
            <div className="w-[35rem] mt-16 ">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button onClick={handleCancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
                    </li>
                    <li>
                        <button onClick={handleSave} className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md">Save</button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={refTitle} label="Title" />
                    <Input ref={refDescription} label="Description" textarea={true} />
                    <Input type="date" ref={refDueDate} label="Due Date" />
                </div>
            </div>
        </>


    )

}