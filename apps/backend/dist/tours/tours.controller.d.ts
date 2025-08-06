import { ToursService } from "./tours.service";
import { Tour } from "@prisma/client";
export declare class ToursController {
    private readonly toursService;
    constructor(toursService: ToursService);
    findAll(featured?: string, category?: string, difficulty?: string, page?: string, limit?: string): Promise<Tour[]>;
    getFeatured(): Promise<Tour[]>;
    search(query: string): Promise<Tour[]>;
    findOne(id: string): Promise<Tour | null>;
    findBySlug(slug: string): Promise<Tour | null>;
}
