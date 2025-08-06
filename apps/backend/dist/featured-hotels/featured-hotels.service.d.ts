import { PrismaService } from "../common/prisma/prisma.service";
export declare class FeaturedHotelsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any[]>;
    findFeatured(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByLocation(location: string): Promise<any[]>;
}
