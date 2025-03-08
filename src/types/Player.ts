export class Player {
    pos: number;
    lastName: string;
    firstName: string;
    id: string;
    startRating: number;
    endRating: number;
    numGames: number;
    rounds: string[];  // Store round results (e.g., ["W4", "L2", "D1"])
    totalScore: number;

    constructor(
        pos: string,
        lastName: string,
        firstName: string,
        id: string,
        start: string,
        end: string,
        games: string,
        rounds: string[],
        total: string
    ) {
        this.pos = parseInt(pos);
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = id;
        this.startRating = parseInt(start);
        this.endRating = parseInt(end.split('/')[0]);  // Handle "565/69" format
        this.numGames = parseInt(games.split('/')[1] || games);
        this.rounds = rounds;
        this.totalScore = parseFloat(total);
    }

    get fullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }

    get ratingChange(): number {
        return this.endRating - this.startRating;
    }

    get earnedScore(): number {
        return this.rounds.reduce((score, round) => {
            if (round.startsWith('W')) return score + 1;
            if (round.startsWith('D')) return score + 0.5;
            return score;
        }, 0);
    }
} 