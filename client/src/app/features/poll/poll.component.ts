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



  
  

  constructor(private pollService: PollService){}
  
  
  ngOnInit(): void {
    this.loadPolls();
   
  }

  loadPolls(){
    this.pollService.getPolls().subscribe({
      next:(data)=>{
        this.polls=data;
         
      },
      error:(error)=>{
        console.log("error fetching polls:",error)
      }
    })
  }

  createPoll(){
    this.pollService.createPoll(this.newPoll).subscribe({
      next:(createdPoll)=>{
        this.polls.push(createdPoll);
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
    this.pollService.vote(pollId,optionIndex).subscribe({
      next:()=>{
        const poll=this.polls.find(p=>p.id===pollId);
        if(poll){
          poll.options[optionIndex].voteCount++
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
}
