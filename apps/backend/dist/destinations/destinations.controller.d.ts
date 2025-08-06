import { DestinationsService } from "./destinations.service";
import { Destination } from "@prisma/client";
export declare class DestinationsController {
    private readonly destinationsService;
    constructor(destinationsService: DestinationsService);
    findAll(featured?: string, region?: string, page?: string, limit?: string): Promise<Destination[]>;
    getFeatured(): Promise<Destination[]>;
    search(query: string): Promise<Destination[]>;
    findOne(id: string): Promise<Destination | null>;
    findBySlug(slug: string): Promise<Destination | null>;
}
