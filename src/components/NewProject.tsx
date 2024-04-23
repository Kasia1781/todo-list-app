import { useRef } from 'react';
import Input from './Input';

type NewProjectProps = {
	onAddProject: (title: string, description: string, dueDate: string) => void;
};

export default function NewProject({ onAddProject }: NewProjectProps) {
	const title = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLInputElement>(null);
	const dueDate = useRef<HTMLInputElement>(null);

	function handleSave() {
		const enteredTitle = title.current!.value;
		const enteredDescription = description.current!.value;
		const enteredDueDate = dueDate.current!.value;

		onAddProject(enteredTitle, enteredDescription, enteredDueDate);
	}

	return (
		<div className='w-[35rem] mt-16'>
			<menu className='flex items-center justify-end gap-4 my-4'>
				<li>
					<button className='text-stone-800 hover:text-stone-950'>
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
	);
}
