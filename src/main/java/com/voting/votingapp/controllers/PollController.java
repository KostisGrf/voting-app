package com.voting.votingapp.controllers;

import com.voting.votingapp.model.Poll;
import com.voting.votingapp.services.PollService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
public class PollController {
    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }


    @PostMapping
    public Poll CreatePoll(@RequestBody Poll poll){
        return pollService.createPoll(poll);
    }

    @GetMapping
    public List<Poll> GetPolls(){
        return pollService.getPolls();
    }

}
