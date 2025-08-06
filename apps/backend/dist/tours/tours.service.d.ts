import { PrismaService } from "../common/prisma/prisma.service";
import { Tour } from "@prisma/client";
export declare class ToursService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params?: {
        featured?: boolean;
        category?: string;
        difficulty?: string;
        skip?: number;
        take?: number;
    }): Promise<Tour[]>;
    findOne(id: string): Promise<Tour | null>;
    findBySlug(slug: string): Promise<Tour | null>;
    getFeatured(): Promise<Tour[]>;
    search(query: string): Promise<Tour[]>;
}
