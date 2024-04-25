import { type ReactNode, useEffect, useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';

function App() {
	type Project = {
		id: number;
		title: string;
		description: string;
		dueDate: string;
	};

	type ProjectState = {
		selectedProjectId: string | undefined;
		projects: Project[];
	};

	const [projectsStane, setProjectsStane] = useState<ProjectState>({
		selectedProjectId: undefined,
		projects: [],
	});

	function handleStartAddProject() {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: null,
			};
		});
	}

	function handleAddProject(
		title: string,
		description: string,
		dueDate: string
	) {
		const newProject = {
			id: Math.random(),
			title: title,
			description: description,
			dueDate: dueDate,
		};
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: undefined,
				projects: [...prevStane.projects, newProject],
			};
		});
	}
	console.log(projectsStane.projects);

	function handleCancelAddProject() {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: undefined,
			};
		});
	}

	let content: ReactNode;

	if (projectsStane.selectedProjectId === null) {
		content = (
			<NewProject
				onAddProject={handleAddProject}
				onCancel={handleCancelAddProject}
			/>
		);
	} else if (projectsStane.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectsStane.projects}
			/>
			{content}
		</main>
	);
}

export default App;
