
export interface Collaborator {
  user_id: number;
  batch? : string,
  major? : string
}

export interface Project {
  user_id?: number;
  project_id? : number;
  project_name: string;       
  project_detail: string;
  project_images: string[];   
  project_date: string;
  project_link : string,
  collaborators: Collaborator[] ;
  popularity?: number;
  liked?: boolean;
  created_at?: Date | string
}
