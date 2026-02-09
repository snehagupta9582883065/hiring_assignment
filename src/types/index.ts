export interface Location {
    location_id: string;
    store_code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    primary_category: string;
    phone: string;
    website: string;
    average_rating: number;
    total_reviews: number;
    is_verified: boolean;
    created_at?: string;
}

export interface Review {
    review_id: string;
    location_id: string;
    rating: number;
    review_text: string;
    reviewer_name: string;
    review_date: string;
    language: string;
    has_reply: boolean;
    reply_text: string;
    created_at?: string;
}

export interface KPI {
    kpi_id: string;
    location_id: string;
    week_start: string;
    impressions_maps: number;
    impressions_search: number;
    phone_calls: number;
    direction_requests: number;
    website_clicks: number;
    bookings: number;
    created_at?: string;
}

export interface Insight {
    type: 'critical' | 'warning' | 'positive';
    title: string;
    description: string;
    locationId?: string;
    locationName?: string;
}
