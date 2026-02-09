import { Location, Review, KPI, Insight } from '@/types';

export function calculateInsights(
    locations: Location[],
    reviews: Review[],
    kpis: KPI[]
): Insight[] {
    const insights: Insight[] = [];

    // 1. Critical Performance Drops
    // Look for stores where latest 2 weeks of KPIs are significantly lower than average
    locations.forEach(location => {
        const locationKpis = kpis
            .filter(k => k.location_id === location.location_id)
            .sort((a, b) => new Date(b.week_start).getTime() - new Date(a.week_start).getTime());

        if (locationKpis.length >= 4) {
            const recent = (locationKpis[0].impressions_maps + locationKpis[1].impressions_maps) / 2;
            const older = (locationKpis[2].impressions_maps + locationKpis[3].impressions_maps) / 2;

            if (recent < older * 0.7) {
                insights.push({
                    type: 'critical',
                    title: 'Footfall decline detected',
                    description: `${location.name} has seen a 30% drop in Map impressions over the last 2 weeks.`,
                    locationId: location.location_id,
                    locationName: location.name
                });
            }
        }
    });

    // 2. Rating Alerts
    // Stores with multiple 1-2 star reviews in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    locations.forEach(location => {
        const recentNegativeReviews = reviews.filter(r =>
            r.location_id === location.location_id &&
            r.rating <= 2
        );

        if (recentNegativeReviews.length >= 3) {
            insights.push({
                type: 'warning',
                title: 'Negative Feedback Spike',
                description: `${location.name} received ${recentNegativeReviews.length} low ratings recently. Check for service issues.`,
                locationId: location.location_id,
                locationName: location.name
            });
        }
    });

    // 3. High Potential Stores
    // High impressions but low conversion (website clicks/calls)
    locations.forEach(location => {
        const locationKpis = kpis.filter(k => k.location_id === location.location_id);
        const avgImpressions = locationKpis.reduce((acc, k) => acc + k.impressions_maps + k.impressions_search, 0) / locationKpis.length;
        const avgActions = locationKpis.reduce((acc, k) => acc + k.phone_calls + k.website_clicks + k.direction_requests, 0) / locationKpis.length;

        if (avgImpressions > 5000 && avgActions < 100) {
            insights.push({
                type: 'warning',
                title: 'Low Conversion Opportunity',
                description: `${location.name} has high visibility but low engagement. Optimize store photos or description.`,
                locationId: location.location_id,
                locationName: location.name
            });
        }
    });

    // 4. Verification Check
    const unverified = locations.filter(l => !l.is_verified);
    if (unverified.length > 0) {
        insights.push({
            type: 'warning',
            title: 'Unverified Locations',
            description: `${unverified.length} stores are not yet verified on Google, limiting their reach.`,
        });
    }

    // 5. Sentiment Cluster Analysis
    const keywords = ['wait time', 'clean', 'staff', 'bill', 'rude', 'hygiene'];
    const clusterMap: Record<string, number> = {};

    reviews.filter(r => r.rating <= 2).forEach(r => {
        const text = r.review_text.toLowerCase();
        keywords.forEach(kw => {
            if (text.includes(kw)) {
                clusterMap[kw] = (clusterMap[kw] || 0) + 1;
            }
        });
    });

    Object.entries(clusterMap).forEach(([keyword, count]) => {
        if (count >= 5) {
            insights.push({
                type: 'warning',
                title: `Service Cluster: ${keyword.toUpperCase()}`,
                description: `Recurring negative feedback detected regarding "${keyword}" across ${count} interactions. Requires operational audit.`,
            });
        }
    });

    // 6. Growth Momentum Highlight
    const topMomentum = locations.map(l => {
        const locKpis = kpis.filter(k => k.location_id === l.location_id).sort((a, b) => new Date(a.week_start).getTime() - new Date(b.week_start).getTime());
        if (locKpis.length < 2) return null;
        const recent = locKpis[locKpis.length - 1].direction_requests;
        const previous = locKpis[locKpis.length - 2].direction_requests;
        return { l, delta: recent - previous };
    }).filter(x => x !== null).sort((a: any, b: any) => b.delta - a.delta)[0];

    if (topMomentum && topMomentum.delta > 20) {
        insights.push({
            type: 'positive',
            title: 'High Velocity Asset',
            description: `${topMomentum.l.name} is showing exceptional weekly growth in direction requests (+${topMomentum.delta}). Analyze for best practices.`,
            locationId: topMomentum.l.location_id,
            locationName: topMomentum.l.name
        });
    }

    return insights;
}

export function getTopPerformers(locations: Location[], limit = 5) {
    return [...locations]
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, limit);
}

export function getBottomPerformers(locations: Location[], limit = 5) {
    return [...locations]
        .sort((a, b) => a.average_rating - b.average_rating)
        .slice(0, limit);
}
