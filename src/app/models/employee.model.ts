export class Employee {
    id: number;
    project_id: number;
    first_name: string;
    last_name: string;
    company_email: string;
    linkedin_profile: string;
    org_tenure: string;
    generation: string;
    culture_definition: string;

     constructor()  { 
        this.first_name = '';
        this.last_name = '';        
        this.company_email = ''; 
        this.linkedin_profile = '';
        this.org_tenure = '';    
        this.generation = ''; 
        this.culture_definition = '';
    }
    
}