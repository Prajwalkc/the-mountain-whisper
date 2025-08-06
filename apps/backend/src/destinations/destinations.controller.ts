import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { DestinationsService } from "./destinations.service";
import { Destination } from "@prisma/client";

@ApiTags("destinations")
@Controller("destinations")
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all destinations" })
  @ApiResponse({
    status: 200,
    description: "List of destinations retrieved successfully",
  })
  @ApiQuery({ name: "featured", required: false, type: Boolean })
  @ApiQuery({ name: "region", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async findAll(
    @Query("featured") featured?: string,
    @Query("region") region?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ): Promise<Destination[]> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const skip = (pageNum - 1) * limitNum;

    return this.destinationsService.findAll({
      featured:
        featured === "true" ? true : featured === "false" ? false : undefined,
      region,
      skip,
      take: limitNum,
    });
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured destinations" })
  @ApiResponse({
    status: 200,
    description: "Featured destinations retrieved successfully",
  })
  async getFeatured(): Promise<Destination[]> {
    return this.destinationsService.getFeatured();
  }

  @Get("search")
  @ApiOperation({ summary: "Search destinations" })
  @ApiResponse({
    status: 200,
    description: "Search results retrieved successfully",
  })
  @ApiQuery({ name: "q", required: true, type: String })
  async search(@Query("q") query: string): Promise<Destination[]> {
    return this.destinationsService.search(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get destination by ID" })
  @ApiResponse({
    status: 200,
    description: "Destination retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Destination not found" })
  async findOne(@Param("id") id: string): Promise<Destination | null> {
    return this.destinationsService.findOne(id);
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get destination by slug" })
  @ApiResponse({
    status: 200,
    description: "Destination retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Destination not found" })
  async findBySlug(@Param("slug") slug: string): Promise<Destination | null> {
    return this.destinationsService.findBySlug(slug);
  }
}
