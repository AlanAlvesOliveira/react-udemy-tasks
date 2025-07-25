import { useContext, useEffect, useRef } from "react";
import { ProjectContextReducer } from "../store/project-context-reducer";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

export default function ProjectForm() {

    const {
        status,
        selectedProject,
        handleAddOrUpdateProject,
        handleCancel,
    } = useContext(ProjectContextReducer);

    const modal = useRef();
    const refTitle = useRef();
    const refDescription = useRef();
    const refDueDate = useRef();

    useEffect(() => {
        if (status === 'EDITING_PROJECT') {
            refTitle.current.value = selectedProject.Title;
            refDescription.current.value = selectedProject.Description;
            refDueDate.current.value = selectedProject.DueDate;
        }
        refTitle.current.focus();
    }, [selectedProject]);

    function handleSave() {

        const project = {
            Id: selectedProject?.Id ?? undefined,
            Title: refTitle.current.value,
            Description: refDescription.current.value,
            DueDate: refDueDate.current.value,
        };

        if (!project.Title || !project.Description || !project.DueDate) {
            modal.current.open();
            return;
        }

        handleAddOrUpdateProject(project);
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
            <div key={selectedProject?.Id} className="w-[35rem] mt-16 animation-content">

                <menu className="flex justify-between my-4">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{status === 'EDITING_PROJECT' ? `Edit Project` : "New Project"}</h1>
                    <div className="flex gap-3">
                        <li>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </li>
                        <li>
                            <Button onClick={handleSave}>{status === 'EDITING_PROJECT' ? "Update" : "Save"}</Button>
                        </li>
                    </div>
                </menu>
                <div>
                    <Input type="text" ref={refTitle} label="Title" />
                    <Input ref={refDescription} label="Description" textarea />
                    <Input type="date" ref={refDueDate} label="Due Date" />
                </div>
            </div>
        </>
    );
}