import { BlogService } from "./blog.service";
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(): Promise<any[]>;
    findFeatured(): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    findBySlug(slug: string): Promise<any>;
    findOne(id: string): Promise<any>;
}
