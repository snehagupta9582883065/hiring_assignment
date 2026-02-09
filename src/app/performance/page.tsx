import { getDashboardData } from '@/lib/data';
import { PerformanceDashboard } from '@/components/dashboard/PerformanceDashboard';

export default async function PerformancePage() {
    const { kpis, locations } = await getDashboardData();

    return <PerformanceDashboard kpis={kpis} locations={locations} />;
}
