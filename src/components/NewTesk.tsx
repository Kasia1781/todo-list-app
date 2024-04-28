export default function NewTask() {
	return (
		<div className='flex items-center gap-4'>
			<input type='text' className='w-64 px-2 py-1 rounded-md bg-stone-200' />
			<button className='text-stone-700 hover:text-red-500'>Add Task</button>
		</div>
	);
}
