import { Player } from './Player.ts';
import { RatingsCalc } from './RatingsCalc.ts';

interface CommentaryRow {
    playerName: string;
    startRating: number;
    endRating: number;
    totalScore: number;
    earnedScore: number;
    opponents: (number | null)[];
    realOpponents: (number)[];
    predictedRating: number;
    ratingChange: number;
    rounds: string[];
}

export class TournamentResults {
    private readonly REQUIRED_HEADER_PARTS = ["pos", "last name first", "id numb", "start", "tot"];
    private roundsCount: number = 0;
    private players: Player[] = [];
    private errors: string[] = [];
    private commentary: CommentaryRow[] = [];

    constructor(reportText: string) {
        this.parseReport(reportText);
    }

    private parseHeader(headerLine: string): boolean {
        // Check required parts are present and in order
        let currentIndex = -1;
        
        for (const part of this.REQUIRED_HEADER_PARTS) {
            const nextIndex = headerLine.indexOf(part);
            if (nextIndex === -1 || nextIndex <= currentIndex) {
                this.errors.push("Report must include the standard header format");
                return false;
            }
            currentIndex = nextIndex;
        }

        // Count number of rounds by looking for rd1, rd2, etc.
        let roundNum = 1;
        while (headerLine.includes(`rd${roundNum}`)) {
            roundNum++;
        }
        this.roundsCount = roundNum - 1;

        if (this.roundsCount < 1) {
            this.errors.push("No rounds found in header");
            return false;
        }

        return true;
    }

    private parseLine(line: string): Player | null {
        // First split by whitespace and forward slash
        const columns = line.trim().split(/[\s/]+/);
        const minimumColumns = 8 + this.roundsCount; // pos, name, id, start, end, gms, rounds, tot
        
        if (columns.length < minimumColumns) {
            return null;
        }

        try {
            const roundsStartIndex = 7;
            const rounds = columns.slice(roundsStartIndex, roundsStartIndex + this.roundsCount);
            
            // Validate that total score matches round results
            const calculatedScore = rounds.reduce((score, round) => {
                if (round.startsWith('W') || round === 'BYE') return score + 1;
                if (round.startsWith('D')) return score + 0.5;
                if (round === 'U' || round === 'ZPB') return score;
                return score;
            }, 0);
            
            const reportedScore = parseFloat(columns[roundsStartIndex + this.roundsCount]);
            
            if (calculatedScore !== reportedScore) {
                this.errors.push(`Score total doesn't match round results for player in position ${columns[0]}`);
                return null;
            }
            
            return new Player(
                columns[0],          // pos
                columns[1],          // lastName
                columns[2],          // firstName
                columns[3],          // id
                columns[4],          // startRating
                columns[5],          // endRating
                columns[6],          // numGames
                rounds,             // rounds array
                columns[roundsStartIndex + this.roundsCount]  // total
            );
        } catch (e) {
            console.error(`Error parsing line: ${line}`, e);
            return null;
        }
    }

    private parseReport(report: string): void {
        // Basic format checks
        if (!report.trim()) {
            this.errors.push("Ratings report cannot be empty");
            return;
        }

        const lines = report.trim().split('\n');
        if (lines.length < 2) {
            this.errors.push("Report must contain at least two lines");
            return;
        }

        // Parse header to determine format
        if (!this.parseHeader(lines[0])) {
            return;
        }

        // Parse each line into a Player object, skipping the header
        lines.slice(1).forEach((line, index) => {
            const player = this.parseLine(line);
            if (player) {
                this.players.push(player);
            } else {
                this.errors.push(`Line ${index + 2}: Invalid player data format`);
            }
        });

        // Rest of validation remains the same
        if (this.players.length === 0) {
            this.errors.push("No valid player data found");
            return;
        }

        this.players.forEach((player, index) => {
            if (player.pos !== index + 1) {
                this.errors.push(`Invalid position number for ${player.fullName}`);
            }
        });

        if (this.errors.length === 0) {
            this.generateCommentary();
        }
    }

    private generateCommentary(): void {
        this.commentary = this.players.map(player => ({
            playerName: player.fullName,
            startRating: player.startRating,
            endRating: player.endRating,
            totalScore: player.totalScore,
            earnedScore: player.earnedScore,
            opponents: this.getOpponentRatings(player),
            realOpponents: this.getOpponentRatings(player).filter(r => r !== null),
            predictedRating: this.getPredictedRating(player),
            ratingChange: player.endRating - player.startRating,
            rounds: player.rounds
        }));
    }

    public getPlayer(pos: number): Player {
        if (pos < 1 || pos > this.players.length) {
            throw new Error(`Invalid player position: ${pos}. Must be between 1 and ${this.players.length}`);
        }
        return this.players[pos - 1];
    }

    public getOpponentRatings(player: Player): (number | null)[] {
        return player.rounds.map(round => {
            // If player was unpaired, had a bye, or zero point bye this round, return null
            if (round === 'U' || round === 'BYE' || round === 'ZPB') {
                return null;
            }
            
            const pos = parseInt(round.slice(1));
            try {
                return this.getPlayer(pos).startRating;
            } catch (e) {
                this.errors.push(`Invalid opponent reference in ${player.fullName}'s rounds: ${round}`);
                return null;
            }
        });
    }

    public getPredictedRating(player: Player): number {
        return RatingsCalc.predictNewRating(
            player.startRating, 
            this.getOpponentRatings(player).filter(r => r !== null) as number[], 
            player.earnedScore
        );
    }

    public getErrors(): string[] {
        return this.errors;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getCommentary(): CommentaryRow[] {
        // Always return an array, even if empty
        return this.commentary || [];
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }
} 