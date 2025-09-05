import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionVote, Poll } from '../../shared/poll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poll-item',
  imports: [CommonModule],
  templateUrl: './poll-item.component.html',
  styleUrl: './poll-item.component.css'
})
export class PollItemComponent {
  
  
  
  
  @Input() poll!:Poll;

  @Output() voted=new EventEmitter<number>();

  pollVoted=false;

  vote(optionIndex:number){
    this.voted.emit(optionIndex);
    this.pollVoted=true;
  }

  

  get totalVotes(): number {
    if (!this.poll) return 0;
    // document.documentElement.style.setProperty('--vote-width', 50 + '%');
    return this.poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  }


  getPercentage(option:OptionVote){
    if(this.pollVoted){
      return this.totalVotes === 0 ? 0 : (option.voteCount / this.totalVotes) * 100;
    }
    return 0;
    
  }
  

  




}
