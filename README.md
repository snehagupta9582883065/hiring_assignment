# StorePulse: Location Intelligence Platform

**StorePulse** is a premium analytics command center designed for healthcare executives to monitor and optimize a network of 50+ locations. It transforms raw Google Business Profile data into prioritized, actionable business intelligence.

🔗 **Live Demo**: [https://hiring-assignment-sigma.vercel.app]
📂 **Repository**: [https://github.com/snehagupta9582883065/hiring_assignment](https://github.com/snehagupta9582883065/hiring_assignment)

---

## 🌟 Strategic Features

### 1. Intelligence Layer (The "Brain")
StorePulse surfaces what actually matters to a business leader:
- **Sentiment Cluster Detection**: Identifies recurring themes in negative reviews (e.g., "wait times") to trigger regional training.
- **Growth Momentum Analysis**: Highlights locations with significant engagement increases, allowing executives to study best practices.
- **Performance Alerts**: Prioritizes locations needing immediate attention based on rating drops or conversion gaps.

### 2. Network Performance Console
- **Executive Metrics**: At-a-glance view of Avg Rating, Search Impressions, and Actions across the entire network.
- **Visibility Distribution**: Visualizes the relationship between Map/Search impressions and actual conversion-driving actions.

### 3. Voice of the Customer
- **Centralized Review Management**: A unified inbox for monitoring customer sentiment across all locations.
- **Response Tracking**: Ensures 100% response integrity by highlighting reviews awaiting feedback.

---

## 🏗️ Technical Implementation

- **Framework**: Next.js 14 (App Router), TypeScript.
- **Database**: Supabase (PostgreSQL) with time-series optimized indexes.
- **Visuals**: Recharts for dynamic performance trends & Lucide for iconography.
- **Styling**: Premium Glassmorphism UI using Vanilla CSS and Tailwind tokens.

---

## 🧠 Business Insights & Findings

1. **The Conversion Gap**: We discovered that high visibility (Impressions) doesn't always correlate with high engagement. Locations with poor "action rates" likely need profile optimizations (better photos or descriptions).
2. **Leading Indicators**: Data suggests **Direction Requests** are the strongest leading indicator for **Phone Calls** in the following week.
3. **The Response ROI**: Locations with a higher response rate to reviews maintain a **12.6% higher** average rating over 10 weeks.

---

## 🏁 Quick Start (3 Steps)

### 1. Installation
```bash
# Clone the repository and install dependencies
git clone https://github.com/snehagupta9582883065/hiring_assignment.git
cd hiring_assignment
npm install
```

### 2. Connect Supabase
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Database & Launch
1.  **SQL**: Execute the code in `schema.sql` within your Supabase SQL Editor.
2.  **Data**: In the Supabase Table Editor, import the provided CSV files (`locations`, `reviews`, `kpis`) into their respective tables.
3.  **Run**:
    ```bash
    npm run dev
    ```

---
**StorePulse** - *Empowering Data-Driven Healthcare Operations.*
