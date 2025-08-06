import { PrismaService } from "../common/prisma/prisma.service";
import { Destination } from "@prisma/client";
export declare class DestinationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params?: {
        featured?: boolean;
        region?: string;
        skip?: number;
        take?: number;
    }): Promise<Destination[]>;
    findOne(id: string): Promise<Destination | null>;
    findBySlug(slug: string): Promise<Destination | null>;
    getFeatured(): Promise<Destination[]>;
    search(query: string): Promise<Destination[]>;
}
