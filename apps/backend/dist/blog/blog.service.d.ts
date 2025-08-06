import { PrismaService } from "../common/prisma/prisma.service";
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any[]>;
    findFeatured(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findBySlug(slug: string): Promise<any>;
    findByCategory(category: string): Promise<any[]>;
}
