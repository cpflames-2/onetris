export class RatingsCalc {
    public static predictNewRating(startingRating: number, opponentRatings: number[], pointsScored: number): number {
        // Calculate K factor
        const kn = 50 / Math.sqrt(0.84 + 0.0000040445 * Math.pow(2755.99 - startingRating, 2));
        const gamesPlayed = opponentRatings.length;
        const k = 800 / (kn + gamesPlayed);

        // Calculate expected points
        const expectedPoints = opponentRatings.reduce((sum, oppRating) => {
            const winRate = 1.0 / (1.0 + Math.pow(10.0, (oppRating - startingRating) / 400.0));
            return sum + winRate;
        }, 0.0);

        // Calculate rating change
        const deltaPoints = k * (pointsScored - expectedPoints);
        const effectiveGamesPlayed = Math.max(gamesPlayed, 4);
        const bonusCap = 9.7 * Math.sqrt(effectiveGamesPlayed);
        const bonusPoints = Math.max(0, deltaPoints - bonusCap);

        return startingRating + deltaPoints + bonusPoints;
    }
} 