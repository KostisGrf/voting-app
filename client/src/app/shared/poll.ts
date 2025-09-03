export interface Poll {
    id:number;
    question:string;
    options:OptionVote[];
}

export interface OptionVote{
    voteOption:string;
    voteCount:number;
}


