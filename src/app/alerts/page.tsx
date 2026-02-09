import { getDashboardData } from '@/lib/data';
import { calculateInsights } from '@/lib/intelligence';
import { AlertsContent } from '@/components/alerts/AlertsContent';

export default async function AlertsPage() {
    const { locations, reviews, kpis } = await getDashboardData();
    const allInsights = calculateInsights(locations, reviews, kpis);
    const criticalAlerts = allInsights.filter(i => i.type === 'critical');
    const warningAlerts = allInsights.filter(i => i.type === 'warning');

    return (
        <AlertsContent
            criticalAlerts={criticalAlerts}
            warningAlerts={warningAlerts}
        />
    );
}
