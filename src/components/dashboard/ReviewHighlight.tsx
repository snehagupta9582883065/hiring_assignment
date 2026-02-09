import React from 'react';
import { Review } from '@/types';
import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function ReviewHighlight({ reviews }: { reviews: Review[] }) {
    const recentReviews = [...reviews]
        .sort((a, b) => new Date(b.review_date).getTime() - new Date(a.review_date).getTime())
        .slice(0, 3);

    return (
        <div className="card flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-gray-400" />
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Sentiment</h3>
                </div>
                <Link href="/reviews" className="text-xs font-semibold text-primary hover:underline">
                    Inbox
                </Link>
            </div>

            <div className="flex flex-col gap-5">
                {recentReviews.map((review) => (
                    <div key={review.review_id} className="flex flex-col gap-2 group/item">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">{review.reviewer_name}</span>
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{review.review_date}</span>
                            </div>
                            <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={i < review.rating ? "" : "text-gray-200"}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-2">
                            "{review.review_text}"
                        </p>
                        <div className="pt-1">
                            {review.has_reply ? (
                                <span className="badge badge-green">Replied</span>
                            ) : (
                                <span className="badge badge-amber">Action Needed</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
