interface Player {
    id: string;
    preRating: number;
    initialRating: number;  // rate0
    numGames: number;       // num0
    numPrintedGames: number; // numprt
    evalWins: number;       // ievalwin
    score: number;
    opponents: number[];    // Array of opponent ratings
    grade?: string;        // Optional grade level
}

class RatingsCalculator {
    private static readonly MIN_RATING = 400;

    constructor(
        private players: Player[],
        private masterDatabase: {
            id: string;
            rating: number;
            numGames: number;
            unratedRating: number;
            numUnratedGames: string;
            allWins: number;
        }[]
    ) {}

    // Step 1: Set initial ratings for unrated players
    private setInitialRatings(): void {
        for (const player of this.players) {
            if (player.preRating > 0) {
                player.initialRating = player.preRating;
                player.numGames = 50;
                player.numPrintedGames = 0;
                player.evalWins = 0;
                continue;
            }

            // Handle new players vs existing players
            if (!player.id) {
                player.initialRating = this.gradeToRating(player.grade);
                player.numGames = 0;
                player.numPrintedGames = 0;
                player.evalWins = 0;
                if (player.initialRating < this.MIN_RATING) {
                    player.initialRating = this.MIN_RATING;
                }
            } else {
                // Look up player in master database
                const dbPlayer = this.masterDatabase.find(p => p.id === player.id);
                if (dbPlayer) {
                    player.initialRating = dbPlayer.rating;
                    player.numGames = dbPlayer.numGames;
                    if (player.numGames < 50 && 
                        dbPlayer.unratedRating > 0 && 
                        dbPlayer.numUnratedGames === 'E    ') {
                        player.numGames = 50;
                    }
                    player.numPrintedGames = dbPlayer.numGames;
                    player.evalWins = dbPlayer.allWins;
                } else {
                    console.error(`Cannot find rating for player with id ${player.id}`);
                    throw new Error('Player not found in database');
                }
            }
        }
    }

    // Step 2: Calculate effective number of games
    private calculateEffectiveGames(): void {
        for (const player of this.players) {
            player.effectiveGames = this.calculateEffectiveGameCount(
                player.initialRating,
                player.numGames
            );
        }
    }

    private calculateEffectiveGameCount(rating: number, numGames: number): number {
        if (numGames === 0) return 0;

        let starValue: number;
        if (rating > 2350) {
            starValue = 50;
        } else {
            starValue = 50 / Math.sqrt(0.662 + 0.00000739 * Math.pow(2569 - rating, 2));
        }

        return Math.min(numGames, starValue);
    }

    // Step 3: Calculate first rating estimate for unrated players
    private calculateFirstEstimate(): void {
        for (const player of this.players) {
            if (player.preRating > 0) {
                player.rating1 = player.initialRating;
                continue;
            }

            if (!player.id) {
                // Special rating calculation for unrated players
                this.calculateSpecialRating(
                    player.initialRating,
                    player.evalWins,
                    1.0,  // N' hardcoded to 1.0 for this step
                    player.opponents,
                    player
                );
            } else {
                player.rating1 = player.initialRating;
            }

            if (player.rating1 < 100) player.rating1 = 100;
        }
    }

    // Helper function for provisional winning expectancy (PWE)
    private calculatePWE(playerRating: number, opponentRating: number): number {
        const rt1 = opponentRating - 400;
        const rt2 = opponentRating + 400;

        if (playerRating <= rt1) return 0;
        if (playerRating >= rt2) return 1;
        return 0.5 + (playerRating - opponentRating) / 800;
    }

    // Objective function for special rating calculation
    private objectiveFunction(
        effectiveGames: number,
        rating: number,
        adjustedInitialRating: number,
        opponents: number[],
        adjustedScore: number
    ): number {
        const opponentsPWE = opponents.reduce((sum, opp) => 
            sum + this.calculatePWE(rating, opp), 0);
        
        return effectiveGames * this.calculatePWE(rating, adjustedInitialRating) + 
               opponentsPWE - adjustedScore;
    }

    // Special rating calculation
    private calculateSpecialRating(
        initialRating: number,
        evalWins: number,
        effectiveGames: number,
        opponents: number[],
        player: Player
    ): void {
        if (opponents.length === 0) {
            player.rating1 = initialRating;
            return;
        }

        let adjustedInitialRating = initialRating;
        let adjustedScore = player.score + effectiveGames / 2;

        // Adjust for all wins or all losses
        if (evalWins === 1) {
            adjustedInitialRating = initialRating - 400;
            adjustedScore = player.score + effectiveGames;
        } else if (evalWins === 2) {
            adjustedInitialRating = initialRating + 400;
            adjustedScore = player.score;
        }

        // Calculate knot points
        const knotPoints = [
            adjustedInitialRating - 400,
            adjustedInitialRating + 400,
            ...opponents.flatMap(opp => [opp - 400, opp + 400])
        ];

        // Initial rating estimate
        let ratingEstimate = (
            effectiveGames * adjustedInitialRating + 
            opponents.reduce((sum, r) => sum + r, 0) + 
            400 * (2 * player.score - opponents.length)
        ) / (effectiveGames + opponents.length);

        // Iterative improvement using secant method
        const tolerance = 0.00001;
        let prevEstimate: number;
        do {
            prevEstimate = ratingEstimate;
            const f = this.objectiveFunction(
                effectiveGames,
                ratingEstimate,
                adjustedInitialRating,
                opponents,
                adjustedScore
            );

            // Find nearest knot points
            const lowerKnot = Math.max(...knotPoints.filter(k => k < ratingEstimate));
            const upperKnot = Math.min(...knotPoints.filter(k => k > ratingEstimate));

            if (Math.abs(f) < tolerance) break;

            if (f > 0) {
                const fLower = this.objectiveFunction(
                    effectiveGames,
                    lowerKnot,
                    adjustedInitialRating,
                    opponents,
                    adjustedScore
                );
                ratingEstimate = lowerKnot + (ratingEstimate - lowerKnot) * 
                                fLower / (fLower - f);
            } else {
                const fUpper = this.objectiveFunction(
                    effectiveGames,
                    upperKnot,
                    adjustedInitialRating,
                    opponents,
                    adjustedScore
                );
                ratingEstimate = ratingEstimate + f * (upperKnot - ratingEstimate) / 
                                (fUpper - f);
            }
        } while (Math.abs(ratingEstimate - prevEstimate) > tolerance);

        // Final bounds check
        const withinBounds = [initialRating, ...opponents].some(
            r => Math.abs(ratingEstimate - r) <= 400
        );

        if (!withinBounds) {
            const nearestLower = Math.max(...knotPoints.filter(k => k < ratingEstimate));
            const nearestUpper = Math.min(...knotPoints.filter(k => k > ratingEstimate));
            
            if (initialRating < nearestLower) {
                ratingEstimate = nearestLower;
            } else if (initialRating > nearestUpper) {
                ratingEstimate = nearestUpper;
            } else {
                ratingEstimate = initialRating;
            }
        }

        player.rating1 = ratingEstimate;
    }

    // Standard rating calculation
    private calculateStandardRating(
        initialRating: number,
        effectiveGames: number,
        numRounds: number,
        score: number,
        opponents: number[]
    ): number {
        if (numRounds === 0) return initialRating;

        const minRounds = Math.max(4, numRounds);
        const BONUS_FACTOR = 14;

        // Calculate AK (K-factor)
        let ak: number;
        if (initialRating > 2200) {
            if (initialRating > 2500) {
                ak = 200 / (effectiveGames + numRounds);
            } else {
                ak = 800 * (6.5 - 0.0025 * initialRating) / (effectiveGames + numRounds);
            }
        } else {
            ak = 800 / (effectiveGames + numRounds);
        }

        // Calculate expected score
        const expectedScore = opponents.reduce((sum, opp) => 
            sum + 1 / (1 + Math.pow(10, -(initialRating - opp) / 400)), 0);

        // Calculate rating change
        if (numRounds < 3) {
            return initialRating + ak * (score - expectedScore);
        }

        const bonus = Math.max(0, ak * (score - expectedScore) - 
                             BONUS_FACTOR * Math.sqrt(minRounds));
        return initialRating + ak * (score - expectedScore) + bonus;
    }
}
