import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';

function App() {
	const [projectsStane, setProjectsStane] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

	console.log(projectsStane);

	function handleStartAddProject() {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: null,
			};
		});
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<ProjectsSidebar onStartAddProject={handleStartAddProject} />
			<NoProjectSelected onStartAddProject={handleStartAddProject} />
		</main>
	);
}

export default App;
