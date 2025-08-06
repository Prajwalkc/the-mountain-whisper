import { ReviewsService } from "./reviews.service";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getAllReviews(): Promise<any[]>;
    getFeaturedReviews(): Promise<any[]>;
    getReviewById(id: string): Promise<any>;
    getReviewsByTourId(tourId: string): Promise<any[]>;
}
