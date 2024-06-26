import { FormEvent, useState } from 'react';

type NewTaskProps = {
	onAdd: (text: string) => void;
};

export default function NewTask({ onAdd }: NewTaskProps) {
	const [enteredTask, setEnteredTask] = useState('');

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setEnteredTask(event.currentTarget.value);
	}

	function handleClick() {
		if (enteredTask.trim() === '') {
			return;
		}

		onAdd(enteredTask);
		setEnteredTask('');
	}

	return (
		<div className='flex items-center gap-4'>
			<input
				onChange={handleChange}
				value={enteredTask}
				type='text'
				className='w-64 px-2 py-1 rounded-md bg-stone-200'
			/>
			<button
				onClick={handleClick}
				className='text-stone-700 hover:text-red-500'>
				Add Task
			</button>
		</div>
	);
}
