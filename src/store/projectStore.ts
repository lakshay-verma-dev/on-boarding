import { create } from "zustand";

interface Project {
    _id: string;
    name: string;
    status: string;
}

interface ProjectState {
    projects: Project[];

    selectedProject: Project | null;

    setProjects: (
        projects: Project[]
    ) => void;

    setSelectedProject: (
        project: Project | null
    ) => void;
}

export const useProjectStore =
    create<ProjectState>((set) => ({
        projects: [],

        selectedProject: null,

        setProjects: (projects) =>
            set({ projects }),

        setSelectedProject: (
            selectedProject
        ) =>
            set({
                selectedProject,
            }),
    }));