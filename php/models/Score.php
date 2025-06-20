<?php 

/**
 * Class representing a player's game score.
 */
class Score {
    public int $id;
    public int $user_id;
    public int $score;
    public string $date; //datetime as string

    /**
     * Constructor for the Score class.
     * @param array $score_data Dictionary containing score properties.
     */
    public function __construct(array $score_data) {
        $this->id = $score_data['id'] ?? -1;
        $this->user_id = $score_data['user_id'] ?? -1;
        $this->score = $score_data['score'] ?? 0;
        $this->date = $score_data['date'] ?? '';
    }
}

?>