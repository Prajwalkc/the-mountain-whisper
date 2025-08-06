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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getAllReviews() {
        return this.reviewsService.getAllReviews();
    }
    async getFeaturedReviews() {
        return this.reviewsService.getFeaturedReviews();
    }
    async getReviewById(id) {
        return this.reviewsService.getReviewById(id);
    }
    async getReviewsByTourId(tourId) {
        return this.reviewsService.getReviewsByTourId(tourId);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all reviews" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of all reviews" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured reviews/testimonials" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of featured reviews for testimonials" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getFeaturedReviews", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get review by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Review details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Review not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewById", null);
__decorate([
    (0, common_1.Get)("tour/:tourId"),
    (0, swagger_1.ApiOperation)({ summary: "Get reviews for a specific tour" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of reviews for the tour" }),
    __param(0, (0, common_1.Param)("tourId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsByTourId", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)("reviews"),
    (0, common_1.Controller)("reviews"),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map