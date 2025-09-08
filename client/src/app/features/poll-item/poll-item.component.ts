import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionVote, Poll } from '../../shared/poll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poll-item',
  imports: [CommonModule],
  templateUrl: './poll-item.component.html',
  styleUrl: './poll-item.component.css'
})
export class PollItemComponent implements OnInit {
  
@Input() set poll(value: Poll) {
  this._poll = value;
  if (this._poll) {
    const voted = localStorage.getItem(`poll_${this._poll.id}_voted`);
    this.votedIndex = voted !== null ? parseInt(voted, 10) : null;
  }
}
_poll!: Poll;
votedIndex: number | null = null;

  @Output() voted=new EventEmitter<number>();

  pollVoted=false;
 
  ngOnInit(): void {
    this.hasVoted();
    
  }

  vote(optionIndex:number,button:HTMLElement){
    if(localStorage.getItem(`poll_${this._poll.id}_voted`)){
      return;
    }
    this.voted.emit(optionIndex);
    this.pollVoted=true;
    button.classList.add('border-success');
  }

  

  get totalVotes(): number {
    if (!this._poll) return 0;
    return this._poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  }


  getPercentage(option:OptionVote){
    if(this.pollVoted){
      return this.totalVotes === 0 ? 0 : (option.voteCount / this.totalVotes) * 100;
    }
    return 0;
    
  }

  hasVoted(){
    if(localStorage.getItem(`poll_${this._poll.id}_voted`)){
      this.pollVoted=true;
    }
  }

  getOptionColor(isVoted:boolean){
    if(isVoted){
      return "rgba(13, 110, 253, 0.3)"
    }
      return "rgba(72, 72, 72, 0.5)"
  }
  
}
