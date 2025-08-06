import { FeaturedHotelsService } from "./featured-hotels.service";
export declare class FeaturedHotelsController {
    private readonly featuredHotelsService;
    constructor(featuredHotelsService: FeaturedHotelsService);
    findAll(): Promise<any[]>;
    findFeatured(): Promise<any[]>;
    findByLocation(location: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
}
