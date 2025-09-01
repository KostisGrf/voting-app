package com.voting.votingapp.services;

import com.voting.votingapp.model.Poll;
import org.springframework.stereotype.Service;
import com.voting.votingapp.repositories.PollRepository;

import java.util.List;

@Service
public class PollService {
    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public List<Poll> getPolls() {
        return pollRepository.findAll();
    }

    public Poll createPoll(Poll poll) {


        return pollRepository.save(poll);
    }
}
