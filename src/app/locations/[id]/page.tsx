import { getLocationDetails } from '@/lib/data';
import { LocationDetailContent } from '@/components/locations/LocationDetailContent';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function LocationDetailPage({ params }: { params: { id: string } }) {
    const { location, reviews, kpis } = await getLocationDetails(params.id);

    if (!location) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={40} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">Asset Not Identified</h2>
                <p className="text-slate-500 max-w-sm mx-auto font-medium">
                    The requested clinical facility could not be retrieved from the network master list.
                </p>
                <Link href="/locations" className="btn btn-secondary mt-10">
                    <ArrowLeft size={18} /> Return to Infrastructure
                </Link>
            </div>
        );
    }

    return (
        <LocationDetailContent
            location={location}
            reviews={reviews}
            kpis={kpis}
        />
    );
}
