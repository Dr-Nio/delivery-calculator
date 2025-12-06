import { haversineDistanceKm } from "./distance.js";

/**
 * Tiered weight pricing based on Nigerian logistics behavior.
 * Heavy items get cheaper per kg.
 */
function getWeightRate(weightKg: number): number {
  if (weightKg <= 5) return 350;
  if (weightKg <= 15) return 250;
  if (weightKg <= 30) return 180;
  if (weightKg <= 50) return 150;
  return 120; // 50kg+
}

/**
 * Distance-based pricing tiers (affordable Nigerian rates)
 */
function getDistanceRate(distanceKm: number): number {
  if (distanceKm <= 10) return 1000;
  if (distanceKm <= 30) return 1500;
  if (distanceKm <= 80) return 2500;
  if (distanceKm <= 200) return 4000;
  if (distanceKm <= 500) return 6000;
  return 8000; // max long-distance charge
}

/**
 * Main shipping calculator for Group-buy Nigeria.
 * Always returns the cheapest between:
 * - weight-based fee
 * - distance-based fee
 * - capped max fee
 */
export function calculateShipping({
  weightKg,
  origin,
  destination,
  maxCap = 10000, // Maximum allowed delivery fee
}: {
  weightKg: number;
  origin: { lat: number; lon: number };
  destination: { lat: number; lon: number };
  maxCap?: number;
}) {
  if (!weightKg || weightKg <= 0) throw new Error("Invalid weight");

  const distanceKm = haversineDistanceKm(
    origin.lat,
    origin.lon,
    destination.lat,
    destination.lon
  );

  const weightFee = weightKg * getWeightRate(weightKg);
  const distanceFee = getDistanceRate(distanceKm);

  const finalFee = Math.min(weightFee, distanceFee, maxCap);

  return {
    weightFee,
    distanceFee,
    distanceKm: Number(distanceKm.toFixed(2)),
    finalFee,
  };
}
