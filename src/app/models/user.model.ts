import { Role } from "./role.model";

export class User {
    id: number;
    project_id: number;
    org_id: number;
    first_name: string;
    last_name: string;
    email: string;
    linkedin_profile: string;
    org_tenure: string;
    generation: string;
    culture_definition: string;
    role_code:string;
    role: Role;
    token: string;

     constructor()  { 
        this.first_name = '';
        this.last_name = '';        
        this.email = ''; 
        this.linkedin_profile = '';
        this.org_tenure = '';    
        this.generation = ''; 
        this.culture_definition = '';
        this.token = '';
    }
    
}
