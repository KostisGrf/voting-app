import { Component, OnInit } from '@angular/core';
import { PollService } from '../../core/services/poll.service';
import { Poll } from '../../shared/poll';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PollItemComponent } from "../poll-item/poll-item.component";


@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule, PollItemComponent],
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


  constructor(private pollService: PollService){}
  
  
  ngOnInit(): void {
    this.loadPolls(1,5,"idDesc");
   
  }

  loadPolls(page:number,size:number,sort:String){
    this.pollService.getPolls(page,size,sort).subscribe({
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

  setPage(page: number) {
  this.currentPage = page;
  this.loading=true;
  this.loadPolls(page,5,"idDesc"); 
}
}
