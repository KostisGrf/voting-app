import { Component, OnInit } from '@angular/core';
import { PollService } from '../../core/services/poll.service';
import { Poll } from '../../shared/poll';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollItemComponent } from "../poll-item/poll-item.component";
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule,ReactiveFormsModule, PollItemComponent],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {

  newPoll:Poll={
    id:0,
    question:'',
    options:[
      {voteOption:'',voteCount:0},
      {voteOption:'',voteCount:0}
    ]
  }
  searchTerm:string='';
  polls:Poll[]=[];
  
  paginated={
    pageNumber:1,
    pageSize:1,
    totalElements:1,
    totalPages:1,
    last:false
  }

  currentPage = 1;
  loading=true;

  searchControl = new FormControl();


  constructor(private pollService: PollService){}
  
  
  ngOnInit(): void {
    this.loadPolls(1,5,"idDesc");

    this.searchControl.valueChanges
    .pipe(
      debounceTime(300), // wait 300ms after typing stops
      distinctUntilChanged()
    )
    .subscribe(value => {
      this.searchTerm = value;
      this.searchPolls();
    });
   
  }

  loadPolls(page:number,size:number,sort:string){
    this.pollService.getPolls(page,size,sort,this.searchTerm).subscribe({
      next:(data)=>{
        this.polls=data.content;
        this.paginated={
          pageNumber:data.pageNumber,
          pageSize:data.pageSize,
          totalElements:data.totalElements,
          totalPages:data.totalPages,
          last:data.last
        }
        this.loading=false;
         
      },
      error:(error)=>{
        console.log("error fetching polls:",error)
      }
    })
  }

  createPoll(){
    this.pollService.createPoll(this.newPoll).subscribe({
      next:(createdPoll)=>{
        this.polls.unshift(createdPoll);
        this.resetPoll();
      },
      error:(error)=>{
        console.log("error creating poll:",error)
      }
    })
  }

  resetPoll(){
    this.newPoll={
    id:0,
    question:'',
    options:[
      {voteOption:'',voteCount:0},
      {voteOption:'',voteCount:0}
    ]
  }
  }

  vote(pollId:number,optionIndex:number){
    const key = `poll_${pollId}_voted`;

    if(localStorage.getItem(key)){
      return;
    }

    this.pollService.vote(pollId,optionIndex).subscribe({
      next:()=>{
        const poll=this.polls.find(p=>p.id===pollId);
        if(poll){
          poll.options[optionIndex].voteCount++
          localStorage.setItem(key,optionIndex.toString());
        }
      },
      error:(error)=>{
        console.log("error fetching polls:",error)
      }
    
    });
  }

  addOption(){
    this.newPoll.options.push({voteOption:'',voteCount:0})
  }

  removeOption(index:number){
    this.newPoll.options.splice(index,1);
  }

  searchPolls(){
    if(this.searchTerm.length>=3||this.searchTerm.length===0){
      this.currentPage=1;
      this.loading=true;
      this.loadPolls(this.currentPage,5,"idDesc");
    }
  }

  setPage(page: number) {
  this.currentPage = page;
  this.loading=true;
  this.loadPolls(page,5,"idDesc"); 
}
}
