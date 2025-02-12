import { Player } from './Player.ts';
import { RatingsCalc } from './RatingsCalc.ts';
export class TournamentResults {
    private readonly HEADER_PARTS = ["pos", "last name first", "id numb", "start"];
    private players: Player[] = [];
    private errors: string[] = [];
    private commentary: string = '';

    constructor(reportText: string) {
        this.parseReport(reportText);
    }

    private parseLine(line: string): Player | null {
        const columns = line.trim().split(/\s+/);
        if (columns.length < 11) return null;

        try {
            return new Player(
                columns[0],
                columns[1],
                columns[2],
                columns[3],
                columns[4],
                columns[5],
                columns[6],
                [columns[7], columns[8], columns[9]],
                columns[10]
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

        // Header check
        const headerLine = lines[0];
        let currentIndex = -1;
        
        for (const part of this.HEADER_PARTS) {
            const nextIndex = headerLine.indexOf(part);
            if (nextIndex === -1 || nextIndex <= currentIndex) {
                this.errors.push("Report must include the standard header format");
                break;
            }
            currentIndex = nextIndex;
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

        // Additional validations
        if (this.players.length === 0) {
            this.errors.push("No valid player data found");
            return;
        }

        // Validate player positions are sequential
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
        let output = "";
        this.players.forEach(player => {
            output += `${player.fullName}: ${player.startRating} → ${player.endRating}, `;
            output += `${player.totalScore} points vs (${this.getOpponentRatings(player).join(' ')}) → `;
            output += `${this.getPredictedRating(player)}`;
            output += `\n`;
        });
        this.commentary = output;
    }

    public getPlayer(pos: number): Player {
        return this.players[pos - 1];
    }

    public getOpponentRatings(player: Player): number[] {
        return player.rounds.map(round => this.getPlayer(parseInt(round.slice(1))).startRating);
    }

    public getPredictedRating(player: Player): number {
        return RatingsCalc.predictNewRating(player.startRating, this.getOpponentRatings(player), player.totalScore);
    }

    public getErrors(): string[] {
        return this.errors;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getCommentary(): string {
        return this.commentary;
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }
} 