package com.voting.votingapp.controllers;

import com.voting.votingapp.dtos.PaginatedResponse;
import com.voting.votingapp.model.Poll;
import com.voting.votingapp.request.Vote;
import com.voting.votingapp.services.PollService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:4200/")
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
    public ResponseEntity<PaginatedResponse<Poll>> GetPolls(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "idDesc") String sort,
            @RequestParam(required = false) String search
    ) {

        int zeroBasedPage = page - 1 < 0 ? 0 : page - 1;

        Page<Poll> pollsPage = pollService.getPolls(zeroBasedPage, size, sort, search);

        PaginatedResponse<Poll> response = new PaginatedResponse<>(
                pollsPage.getContent(),
                page,
                pollsPage.getSize(),
                pollsPage.getTotalElements(),
                pollsPage.getTotalPages(),
                pollsPage.isLast()
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable long id){
        return pollService.getPollById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST
    //VOTE
    //->
    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote){
        pollService.vote(vote.getPollId(),vote.getOptionIndex());
    }

}
