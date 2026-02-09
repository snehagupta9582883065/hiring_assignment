import { getDashboardData } from '@/lib/data';
import { ReviewsContent } from '@/components/reviews/ReviewsContent';

export default async function ReviewsPage() {
    const { reviews, locations } = await getDashboardData();

    const locationMap = locations.reduce((acc: any, loc) => {
        acc[loc.location_id] = loc.name;
        return acc;
    }, {});

    const sortedReviews = [...reviews].sort((a, b) =>
        new Date(b.review_date).getTime() - new Date(a.review_date).getTime()
    );

    return <ReviewsContent sortedReviews={sortedReviews} locationMap={locationMap} />;
}
