package com.voting.votingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String question;

    @ElementCollection
    @CollectionTable(
            name = "poll_options",
            joinColumns = @JoinColumn(name = "poll_id", foreignKey = @ForeignKey(name = "fk_poll_options", foreignKeyDefinition = "FOREIGN KEY (poll_id) REFERENCES poll(id) ON DELETE CASCADE"))
    )
    private List<OptionVote> options = new ArrayList<>();




}
