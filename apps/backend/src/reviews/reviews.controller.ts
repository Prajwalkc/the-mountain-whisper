import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";

@ApiTags("reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: "Get all reviews" })
  @ApiResponse({ status: 200, description: "List of all reviews" })
  async getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured reviews/testimonials" })
  @ApiResponse({ status: 200, description: "List of featured reviews for testimonials" })
  async getFeaturedReviews() {
    return this.reviewsService.getFeaturedReviews();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get review by ID" })
  @ApiResponse({ status: 200, description: "Review details" })
  @ApiResponse({ status: 404, description: "Review not found" })
  async getReviewById(@Param("id") id: string) {
    return this.reviewsService.getReviewById(id);
  }

  @Get("tour/:tourId")
  @ApiOperation({ summary: "Get reviews for a specific tour" })
  @ApiResponse({ status: 200, description: "List of reviews for the tour" })
  async getReviewsByTourId(@Param("tourId") tourId: string) {
    return this.reviewsService.getReviewsByTourId(tourId);
  }
}