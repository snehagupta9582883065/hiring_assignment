import { getDashboardData } from '@/lib/data';
import { calculateInsights } from '@/lib/intelligence';
import { HomeDashboard } from '@/components/dashboard/HomeDashboard';

export default async function Home() {
    const { locations, reviews, kpis } = await getDashboardData();
    const insights = calculateInsights(locations, reviews, kpis);

    return (
        <HomeDashboard
            locations={locations}
            reviews={reviews}
            kpis={kpis}
            insights={insights}
        />
    );
}
