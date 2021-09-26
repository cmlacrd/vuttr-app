import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Tool {
  id: number,
  title:string,
  link:string,
  description: string,
  tags:any
}

const urlBase='http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) { }

  listTools(){
    return this.http.get<Tool[]>(`${urlBase}/tools?sort=id`);
  }

  searchTool(input: string){
    return this.http.get<Tool[]>(`${urlBase}/tools?q=${input}`);
  }

  searchTag(input: string){
    return this.http.get<Tool[]>(`${urlBase}/tools?tags_like=${input}`);
  }

  retrieveTool(id: number){
    return this.http.get<Tool>(`${urlBase}/tools/${id}`);
  }

  createTool(tool: Tool){
    return this.http.post<Tool>(`${urlBase}/tools`,tool);
  }

  deleteTool(id: number){
    return this.http.delete(`${urlBase}/tools/${id}`);
  }

}
