/**
 * Main shipping calculator for Group-buy Nigeria.
 * Always returns the cheapest between:
 * - weight-based fee
 * - distance-based fee
 * - capped max fee
 */
export declare function calculateShipping({ weightKg, origin, destination, maxCap, }: {
    weightKg: number;
    origin: {
        lat: number;
        lon: number;
    };
    destination: {
        lat: number;
        lon: number;
    };
    maxCap?: number;
}): {
    weightFee: number;
    distanceFee: number;
    distanceKm: number;
    finalFee: number;
};
