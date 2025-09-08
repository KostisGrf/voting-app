package com.voting.votingapp.services;

import com.voting.votingapp.model.OptionVote;
import com.voting.votingapp.model.Poll;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.voting.votingapp.repositories.PollRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;


import java.util.List;
import java.util.Optional;

@Service
public class PollService {
    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Page<Poll> getPolls(int page,int size,String sort) {
        String property = sort.replaceAll("Asc|Desc", "");
        Sort.Direction direction = sort.endsWith("Desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        return pollRepository.findAll(pageable);

    }

    public Poll createPoll(Poll poll) {


        return pollRepository.save(poll);
    }

    public Optional<Poll> getPollById(long id) {
        return pollRepository.findById(id);
    }

    @Transactional
    public void vote(Long pollId, int optionIndex) {

        Poll poll=pollRepository.findById(pollId)
                .orElseThrow(()->new RuntimeException("Poll not found"));

        List<OptionVote> options=poll.getOptions();
        if(optionIndex<0||optionIndex>=options.size()){
            throw new IllegalArgumentException("Invalid option index");
        }


        OptionVote selectedOption = options.get(optionIndex);

        selectedOption.setVoteCount(selectedOption.getVoteCount()+1);

        //save
        pollRepository.save(poll);
    }
}
