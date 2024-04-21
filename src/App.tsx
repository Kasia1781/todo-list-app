import { type ReactNode, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';

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

	let content: ReactNode;

	if (projectsStane.selectedProjectId === null) {
		content = <NewProject />;
	} else if (projectsStane.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<ProjectsSidebar onStartAddProject={handleStartAddProject} />
			{content}
		</main>
	);
}

export default App;
