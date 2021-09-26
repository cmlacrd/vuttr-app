import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Tool, ToolsService } from '../tools.service';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-vuttr-crud',
  templateUrl: './vuttr-crud.component.html',
  styleUrls: ['./vuttr-crud.component.css']
})

export class VuttrCRUDComponent implements OnInit {
  
  
  constructor(
    private modalService: NgbModal,
    private toolsService: ToolsService,
    private router: Router
  ) {}

  tools: Tool[] = [];

  values = '';

  onKey(event: any) { 
    let get = document.getElementsByClassName("tag");
    let checked = get[0].checked;

    this.values += event.target.value;

    if(this.values != '' && !checked){
      this.toolsService.searchTool(event.target.value).subscribe(tools =>{
        this.tools = tools;
      });
    }else if(this.values != '' && checked){
      this.toolsService.searchTag(event.target.value).subscribe(tools =>{
        this.tools = tools;
      });
    }
  }

  ngOnInit(): void {
    this.toolsService.listTools().subscribe( tools =>{
      this.tools = tools;
    });
  }

  toolForm = new FormGroup({
    title: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required)
  })

  createTool(): void {
    this.toolForm.value['tags'] = this.toolForm.value['tags'].split(',')
    this.toolsService.createTool(this.toolForm.value).subscribe(tool =>{
      window.location.reload();
    });
  }

  deleteTool(tool: Tool){
    this.toolsService.deleteTool(tool.id).subscribe(()=>{
      const index = this.tools.indexOf(tool);
      this.tools.splice(index,1);
    });
  }

  deleting(): void {
    let get = document.getElementsByClassName("removeId");
    let id = get[0].id;

    this.toolsService.retrieveTool(parseInt(id)).subscribe( tool =>{
      this.deleteTool(tool);
    });
  }

// modal settings
  closeResult: string;

  open(content,tool:'',action:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    if(tool != '' && action === "remove"){
      document.getElementById('removeId').id = tool;
    }
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

//end of modal settings

}
