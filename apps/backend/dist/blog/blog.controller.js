"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_service_1 = require("./blog.service");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async findAll() {
        return this.blogService.findAll();
    }
    async findFeatured() {
        return this.blogService.findFeatured();
    }
    async findByCategory(category) {
        return this.blogService.findByCategory(category);
    }
    async findBySlug(slug) {
        return this.blogService.findBySlug(slug);
    }
    async findOne(id) {
        return this.blogService.findOne(id);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all blog posts" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of all blog posts" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured blog posts" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of featured blog posts" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)("category/:category"),
    (0, swagger_1.ApiOperation)({ summary: "Get blog posts by category" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of blog posts in category" }),
    __param(0, (0, common_1.Param)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get blog post by slug" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Blog post details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Blog post not found" }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get blog post by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Blog post details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Blog post not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findOne", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)("blog"),
    (0, common_1.Controller)("blog"),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map