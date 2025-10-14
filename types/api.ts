// Types based on 42 API structure
export interface Image {
	link: string;
	versions: {
		large: string;
		medium: string;
		small: string;
		micro: string;
	};
}

export interface Campus {
	id: number;
	name: string;
	time_zone: string;
	language: {
		id: number;
		name: string;
		identifier: string;
		created_at: string;
		updated_at: string;
	};
	users_count: number;
	vogsphere_id: number;
}

export interface Cursus {
	id: number;
	created_at: string;
	name: string;
	slug: string;
}

export interface Skill {
	id: number;
	name: string;
	level: number;
}

export interface CursusUser {
	id: number;
	begin_at: string;
	end_at: string | null;
	grade: string | null;
	level: number;
	skills: Skill[];
	cursus_id: number;
	has_coalition: boolean;
	user: {
		id: number;
		login: string;
		url: string;
	};
	cursus: Cursus;
}

export interface Project {
	id: number;
	name: string;
	slug: string;
	parent_id: number | null;
	cursus_ids: number[];
}

export interface ProjectUser {
	id: number;
	final_mark: number | null;
	status: string;
	validated: boolean;
	current_team_id: number | null;
	project: Project;
	marked_at: string | null;
	retriable_at: string | null;
	marked: boolean;
}

export interface User {
	id: number;
	email: string;
	login: string;
	first_name: string;
	last_name: string;
	usual_full_name: string;
	usual_first_name: string;
	url: string;
	phone: string | null;
	displayname: string;
	kind: string;
	image: Image;
	staff: boolean;
	correction_point: number;
	pool_month: string;
	pool_year: string;
	location: string | null;
	wallet: number;
	anonymize_date: string;
	data_erasure_date: string | null;
	alumni: boolean;
	active: boolean;
	cursus_users: CursusUser[];
	projects_users: ProjectUser[];
	campus: Campus[];
}
