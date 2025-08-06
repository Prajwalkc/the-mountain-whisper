import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FeaturedHotelsService } from "./featured-hotels.service";

@ApiTags("featured-hotels")
@Controller("featured-hotels")
export class FeaturedHotelsController {
  constructor(private readonly featuredHotelsService: FeaturedHotelsService) {}

  @Get()
  @ApiOperation({ summary: "Get all featured hotels" })
  @ApiResponse({ status: 200, description: "List of all featured hotels" })
  async findAll() {
    return this.featuredHotelsService.findAll();
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured hotels for homepage" })
  @ApiResponse({ status: 200, description: "List of featured hotels" })
  async findFeatured() {
    return this.featuredHotelsService.findFeatured();
  }

  @Get("location/:location")
  @ApiOperation({ summary: "Get featured hotels by location" })
  @ApiResponse({
    status: 200,
    description: "List of featured hotels in location",
  })
  async findByLocation(@Param("location") location: string) {
    return this.featuredHotelsService.findByLocation(location);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get featured hotel by ID" })
  @ApiResponse({ status: 200, description: "Featured hotel details" })
  @ApiResponse({ status: 404, description: "Featured hotel not found" })
  async findOne(@Param("id") id: string) {
    return this.featuredHotelsService.findOne(id);
  }
}
