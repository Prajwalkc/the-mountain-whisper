import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { ToursService } from "./tours.service";
import { Tour } from "@prisma/client";

@ApiTags("tours")
@Controller("tours")
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  @ApiOperation({ summary: "Get all tours" })
  @ApiResponse({
    status: 200,
    description: "List of tours retrieved successfully",
  })
  @ApiQuery({ name: "featured", required: false, type: Boolean })
  @ApiQuery({ name: "category", required: false, type: String })
  @ApiQuery({ name: "difficulty", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  async findAll(
    @Query("featured") featured?: string,
    @Query("category") category?: string,
    @Query("difficulty") difficulty?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ): Promise<Tour[]> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const skip = (pageNum - 1) * limitNum;

    return this.toursService.findAll({
      featured:
        featured === "true" ? true : featured === "false" ? false : undefined,
      category,
      difficulty,
      skip,
      take: limitNum,
    });
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured tours" })
  @ApiResponse({
    status: 200,
    description: "Featured tours retrieved successfully",
  })
  async getFeatured(): Promise<Tour[]> {
    return this.toursService.getFeatured();
  }

  @Get("search")
  @ApiOperation({ summary: "Search tours" })
  @ApiResponse({
    status: 200,
    description: "Search results retrieved successfully",
  })
  @ApiQuery({ name: "q", required: true, type: String })
  async search(@Query("q") query: string): Promise<Tour[]> {
    return this.toursService.search(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tour by ID" })
  @ApiResponse({ status: 200, description: "Tour retrieved successfully" })
  @ApiResponse({ status: 404, description: "Tour not found" })
  async findOne(@Param("id") id: string): Promise<Tour | null> {
    return this.toursService.findOne(id);
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get tour by slug" })
  @ApiResponse({ status: 200, description: "Tour retrieved successfully" })
  @ApiResponse({ status: 404, description: "Tour not found" })
  async findBySlug(@Param("slug") slug: string): Promise<Tour | null> {
    return this.toursService.findBySlug(slug);
  }
}
