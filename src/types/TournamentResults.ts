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

    private parseLine(line: string): { player: Player | null; error?: string } {
        try {
            // First find the ID pattern: 3+ alphanumeric chars followed by numbers and a letter
            const idMatch = line.match(/[A-Z0-9]{3,}[0-9]+[A-Z0-9]/);
            if (!idMatch) {
                return { player: null, error: "Could not find valid ID pattern" };
            }

            const id = idMatch[0];
            // Split the line at the ID
            const [beforeId, afterId] = line.split(id);
            if (!beforeId || !afterId) {
                return { player: null, error: "Could not split line at ID" };
            }

            // Parse the position and name from beforeId
            const [pos, lastName, firstName] = beforeId.trim().replace(' ', ',').split(',').map(s => s.trim());
            if (!pos || !lastName || !firstName) {
                return { player: null, error: "Could not parse position and name correctly" };
            }

            // Parse the ratings and rounds data from afterId
            const afterParts = afterId.trim().split(/[\s/]+/);
            if (afterParts.length < 3 + this.roundsCount) {
                return { player: null, error: `Expected at least ${3 + this.roundsCount} data fields after ID, found ${afterParts.length}` };
            }

            const startRating = afterParts[0];
            const endRating = afterParts[1];
            const numGames = afterParts[2];
            const rounds = afterParts.slice(3, 3 + this.roundsCount);
            
            // Validate that total score matches round results
            const calculatedScore = rounds.reduce((score, round) => {
                if (round.startsWith('W') || round === 'BYE') return score + 1;
                if (round.startsWith('D')) return score + 0.5;
                if (round === 'U' || round === 'ZPB') return score;
                return score;
            }, 0);
            
            const reportedScore = parseFloat(afterParts[3 + this.roundsCount]);
            
            if (calculatedScore !== reportedScore) {
                return { player: null, error: `Score total ${reportedScore} doesn't match calculated round results ${calculatedScore}` };
            }
            
            return { 
                player: new Player(
                    pos,
                    lastName,
                    firstName,
                    id,
                    startRating,
                    endRating,
                    numGames,
                    rounds,
                    afterParts[3 + this.roundsCount]
                )
            };
        } catch (e) {
            return { player: null, error: `Unexpected error: ${e.message}` };
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
            const result = this.parseLine(line);
            if (result.player) {
                this.players.push(result.player);
            } else {
                this.errors.push(`Line ${index + 2}: ${result.error}`);
                this.errors.push(line);
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