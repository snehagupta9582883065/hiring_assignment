import { supabase } from './supabase';
import { Location, Review, KPI } from '@/types';

export async function getDashboardData() {
    try {
        const [
            { data: locations },
            { data: reviews },
            { data: kpis }
        ] = await Promise.all([
            supabase.from('locations').select('*'),
            supabase.from('reviews').select('*'),
            supabase.from('kpis').select('*')
        ]);

        return {
            locations: (locations || []) as Location[],
            reviews: (reviews || []) as Review[],
            kpis: (kpis || []) as KPI[]
        };
    } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        return { locations: [], reviews: [], kpis: [] };
    }
}

export async function getLocationDetails(id: string) {
    try {
        const [
            { data: location },
            { data: reviews },
            { data: kpis }
        ] = await Promise.all([
            supabase.from('locations').select('*').eq('location_id', id).single(),
            supabase.from('reviews').select('*').eq('location_id', id),
            supabase.from('kpis').select('*').eq('location_id', id).order('week_start', { ascending: true })
        ]);

        return {
            location: location as Location | null,
            reviews: (reviews || []) as Review[],
            kpis: (kpis || []) as KPI[]
        };
    } catch (error) {
        console.error(`Error fetching details for location ${id}:`, error);
        return { location: null, reviews: [], kpis: [] };
    }
}
