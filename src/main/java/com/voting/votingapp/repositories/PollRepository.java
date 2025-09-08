package com.voting.votingapp.repositories;

import com.voting.votingapp.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PollRepository extends JpaRepository<Poll,Long> {
    Page<Poll> findByQuestionContainingIgnoreCase(String keyword, Pageable pageable);
}
