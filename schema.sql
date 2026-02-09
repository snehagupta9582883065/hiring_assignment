-- Create Locations Table
CREATE TABLE locations (
    location_id UUID PRIMARY KEY,
    store_code TEXT NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    primary_category TEXT,
    phone TEXT,
    website TEXT,
    average_rating DOUBLE PRECISION,
    total_reviews INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Reviews Table
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY,
    location_id UUID REFERENCES locations(location_id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    reviewer_name TEXT,
    review_date DATE,
    language TEXT,
    has_reply BOOLEAN DEFAULT FALSE,
    reply_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create KPIs Table
CREATE TABLE kpis (
    kpi_id UUID PRIMARY KEY,
    location_id UUID REFERENCES locations(location_id) ON DELETE CASCADE,
    week_start DATE,
    impressions_maps INTEGER DEFAULT 0,
    impressions_search INTEGER DEFAULT 0,
    phone_calls INTEGER DEFAULT 0,
    direction_requests INTEGER DEFAULT 0,
    website_clicks INTEGER DEFAULT 0,
    bookings INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_reviews_location_id ON reviews(location_id);
CREATE INDEX idx_kpis_location_id ON kpis(location_id);
CREATE INDEX idx_kpis_week_start ON kpis(week_start);
