import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BlogService } from "./blog.service";

@ApiTags("blog")
@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ApiOperation({ summary: "Get all blog posts" })
  @ApiResponse({ status: 200, description: "List of all blog posts" })
  async findAll() {
    return this.blogService.findAll();
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured blog posts" })
  @ApiResponse({ status: 200, description: "List of featured blog posts" })
  async findFeatured() {
    return this.blogService.findFeatured();
  }

  @Get("category/:category")
  @ApiOperation({ summary: "Get blog posts by category" })
  @ApiResponse({ status: 200, description: "List of blog posts in category" })
  async findByCategory(@Param("category") category: string) {
    return this.blogService.findByCategory(category);
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get blog post by slug" })
  @ApiResponse({ status: 200, description: "Blog post details" })
  @ApiResponse({ status: 404, description: "Blog post not found" })
  async findBySlug(@Param("slug") slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get blog post by ID" })
  @ApiResponse({ status: 200, description: "Blog post details" })
  @ApiResponse({ status: 404, description: "Blog post not found" })
  async findOne(@Param("id") id: string) {
    return this.blogService.findOne(id);
  }
}
