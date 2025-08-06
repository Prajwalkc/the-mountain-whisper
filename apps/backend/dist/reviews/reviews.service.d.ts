import { PrismaService } from "../common/prisma/prisma.service";
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    getFeaturedReviews(): Promise<any[]>;
    getAllReviews(): Promise<any[]>;
    getReviewById(id: string): Promise<any>;
    getReviewsByTourId(tourId: string): Promise<any[]>;
}
