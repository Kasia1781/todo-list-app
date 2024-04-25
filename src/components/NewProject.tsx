import { useRef } from 'react';
import Input from './Input';
import Modal, { ModalHandle } from './Modal';
import SelectedProject from './SelectedProject';

type NewProjectProps = {
	onAddProject: (title: string, description: string, dueDate: string) => void;
	onCancel: () => void;
};

export default function NewProject({
	onAddProject,
	onCancel,
}: NewProjectProps) {
	const title = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLInputElement>(null);
	const dueDate = useRef<HTMLInputElement>(null);

	const modal = useRef<ModalHandle>(null);

	function handleSave() {
		const enteredTitle = title.current!.value;
		const enteredDescription = description.current!.value;
		const enteredDueDate = dueDate.current!.value;

		if (
			enteredTitle.trim() === '' ||
			enteredDescription.trim() === '' ||
			enteredDueDate.trim() === ''
		) {
			modal.current?.open();
			return;
		}

		onAddProject(enteredTitle, enteredDescription, enteredDueDate);
	}

	return (
		<>
			<Modal ref={modal} buttonCaption='Okey'>
				<h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
				<p className='text-stone-600 mb-4'>
					Ooops... looks like you forgot to enter a value.
				</p>
				<p className='text-stone-600 mb-4'>
					Please make sure you provide a valid value for every input field.
				</p>
			</Modal>
			<div className='w-[35rem] mt-16'>
				<menu className='flex items-center justify-end gap-4 my-4'>
					<li>
						<button
							onClick={onCancel}
							className='text-stone-800 hover:text-stone-950'>
							Cancel
						</button>
					</li>
					<li>
						<button
							onClick={handleSave}
							className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>
							Save
						</button>
					</li>
				</menu>
				<div>
					<Input label='Title' ref={title} type='text' />
					<Input label='Description' textarea ref={description} />
					<Input label='Due Date' ref={dueDate} type='date' />
				</div>
			</div>
		</>
	);
}
