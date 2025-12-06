# Delivery Fee Calculator (Nigeria-Focused) but can work world wide

A lightweight, flexible JavaScript library for calculating delivery fees based on:

* **Weight (kg)**
* **Distance calculated using latitude & longitude (Haversine Formula)**
* **Dynamic configuration using environment variables or runtime parameters**

This package is designed specifically for **Group-buy platforms** to keep delivery costs **low**, **fair**, and **scalable**, avoiding unrealistic per‑kg multipliers.

---

# ✨ Features

* ⚖️ Weight-based fee calculation
* 📍 Distance-based calculation using GPS coordinates
* 📦 Supports both **pickup** and **multi-drop delivery** scenarios
* 📡 Haversine formula for accurate distance (km)
* 🔧 No hardcoded figures — fully configurable via **ENV variables** or **runtime inputs**
* 🇳🇬 Optimized for Nigerian delivery logic
* 🧮 Safe + predictable cost outputs
* 🧱 Zero dependencies

---

# 📦 Installation

```bash
npm install @dr-nio/delivery-calculator
```

or

```bash
yarn add @dr-nio/delivery-calculator
```

---

# ⚙️ Environment Variables (Optional)

You can configure default values using `.env`:

```env
BASE_RATE_PER_KG=50
BASE_RATE_PER_KM=20
MINIMUM_DELIVERY_FEE=500
```

All ENV values are optional.

---

# 🧩 Usage (Simple Example)

```javascript
import { calculateDeliveryFee } from "nigeria-delivery-fee";

const result = calculateDeliveryFee({
  weightKg: 50,                       // weight of items
  origin: { lat: 6.5244, lon: 3.3792 },   // Lagos
  destination: { lat: 7.3775, lon: 3.9470 }, // Abeokuta
  config: {
    ratePerKg: 25,                     // ₦ per kg
    ratePerKm: 15,                     // ₦ per km
    minimumFee: 800                    // lowest allowed fee
  }
});

console.log(result);
```

### Output example:

```json
{
  "distanceKm": 75.3,
  "weightFee": 1250,
  "distanceFee": 1129.5,
  "total": 2379.5
}
```

---

# 🧮 Example: Very Large Weight But Still Low Cost

To prevent extreme fees like: *"50kg rice × ₦500/kg = ₦25,000 delivery"*,
we use a softened fee model.

```javascript
const result = calculateDeliveryFee({
  weightKg: 50,
  origin: { lat: 6.45, lon: 3.39 },
  destination: { lat: 6.6, lon: 3.3 },
  config: {
    ratePerKg: 5,   // gentle multiplier
    ratePerKm: 10,
    minimumFee: 500
  }
});
```

✔ Delivery stays affordable
✔ Group-buy concept preserved

---

# 🚚 Multi-User / Mixed Delivery Mode Example

Some group members pick up, others need dispatch.

```javascript
import { calculateMultiUserDelivery } from "nigeria-delivery-fee";

const users = [
  {
    userId: 1,
    method: "pickup",
  },
  {
    userId: 2,
    method: "delivery",
    destination: { lat: 9.05, lon: 7.45 },
    weightKg: 10
  },
  {
    userId: 3,
    method: "delivery",
    destination: { lat: 6.52, lon: 3.37 },
    weightKg: 20
  }
];

const result = calculateMultiUserDelivery({
  origin: { lat: 6.5244, lon: 3.3792 },
  users,
  config: {
    ratePerKg: 10,
    ratePerKm: 20,
    minimumFee: 800
  }
});

console.log(result);
```

### Output Example

```json
{
  "totals": [
    { "userId": 1, "method": "pickup", "total": 0 },
    { "userId": 2, "method": "delivery", "total": 1800.4 },
    { "userId": 3, "method": "delivery", "total": 2150.7 }
  ]
}
```

---

# 🔍 API Reference

## `calculateDeliveryFee(options)`

| Field                 | Type   | Required | Description          |
| --------------------- | ------ | -------- | -------------------- |
| weightKg              | number | ✔        | Weight of product(s) |
| origin.lat / lon      | number | ✔        | Starting location    |
| destination.lat / lon | number | ✔        | Delivery location    |
| config                | object | ✖        | Custom config values |

### Config Fields

| Field      | Default           | Description          |
| ---------- | ----------------- | -------------------- |
| ratePerKg  | from ENV or `10`  | Cost per kg          |
| ratePerKm  | from ENV or `15`  | Cost per kilometer   |
| minimumFee | from ENV or `500` | Minimum delivery fee |

---

# 📍 Distance Calculation (Haversine)

Accurate to ~0.5%, great for delivery pricing.

```
distance = 2r * arcsin( sqrt( ... ) )
```

Where:

* r = 6371 km (Earth radius)

---

# 📝 License

This project uses the **MIT License**.

See the `LICENSE` file for full details.

---

# 🧰 Contributing

PRs are welcome.

1. Fork
2. Create feature branch
3. Submit PR
4. Wait for review

---

# 💬 Support

If you need implementation help or want custom tailoring for your platform, just ask! 🚀
