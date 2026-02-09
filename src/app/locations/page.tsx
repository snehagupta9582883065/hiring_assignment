import { getDashboardData } from '@/lib/data';
import { LocationsContent } from '@/components/locations/LocationsContent';

export default async function LocationsPage() {
    const { locations } = await getDashboardData();

    return <LocationsContent locations={locations} />;
}
