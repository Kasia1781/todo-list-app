import { useState } from 'react';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import SelectedProject from './components/SelectedProject';

function App() {
	type Project = {
		id: number;
		title: string;
		description: string;
		dueDate: string;
	};

	type Task = {
		id: number;
		text: string;
	};

	type ProjectState = {
		selectedProjectId: number | undefined;
		projects: Project[];
		tasks: Task[];
	};

	const [projectsStane, setProjectsStane] = useState<ProjectState>({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
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

	function handleCancelAddProject() {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: undefined,
			};
		});
	}

	function handleSelectedProject(id: number) {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: id,
			};
		});
	}

	const selectedProject = projectsStane.projects.find(
		(project) => project.id === projectsStane.selectedProjectId
	);

	function handleDeleteProject() {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				selectedProjectId: undefined,
				projects: projectsStane.projects.filter(
					(project) => project.id !== prevStane.selectedProjectId
				),
			};
		});
	}

	function handleAddTask(text: string) {
		setProjectsStane((prevStane) => {
			const newTask = {
				id: Math.random(),
				text: text,
				projectId: prevStane.selectedProjectId,
			};
			return {
				...prevStane,
				tasks: [...prevStane.tasks, newTask],
			};
		});
	}

	function handleDeleteTask(id: number) {
		setProjectsStane((prevStane) => {
			return {
				...prevStane,
				tasks: prevStane.tasks.filter((task) => task.id !== id),
			};
		});
	}

	//console.log(projectsStane.projects);
	//console.log(projectsStane);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsStane.tasks}
		/>
	);

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
				onSelectedProject={handleSelectedProject}
				onSelectedProjectId={projectsStane.selectedProjectId}
			/>
			{content}
		</main>
	);
}

export default App;
