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
exports.DestinationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const destinations_service_1 = require("./destinations.service");
let DestinationsController = class DestinationsController {
    constructor(destinationsService) {
        this.destinationsService = destinationsService;
    }
    async findAll(featured, region, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const skip = (pageNum - 1) * limitNum;
        return this.destinationsService.findAll({
            featured: featured === "true" ? true : featured === "false" ? false : undefined,
            region,
            skip,
            take: limitNum,
        });
    }
    async getFeatured() {
        return this.destinationsService.getFeatured();
    }
    async search(query) {
        return this.destinationsService.search(query);
    }
    async findOne(id) {
        return this.destinationsService.findOne(id);
    }
    async findBySlug(slug) {
        return this.destinationsService.findBySlug(slug);
    }
};
exports.DestinationsController = DestinationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all destinations" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of destinations retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "featured", required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: "region", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("featured")),
    __param(1, (0, common_1.Query)("region")),
    __param(2, (0, common_1.Query)("page")),
    __param(3, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured destinations" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Featured destinations retrieved successfully",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search destinations" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Search results retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "q", required: true, type: String }),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get destination by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Destination retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Destination not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get destination by slug" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Destination retrieved successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Destination not found" }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "findBySlug", null);
exports.DestinationsController = DestinationsController = __decorate([
    (0, swagger_1.ApiTags)("destinations"),
    (0, common_1.Controller)("destinations"),
    __metadata("design:paramtypes", [destinations_service_1.DestinationsService])
], DestinationsController);
//# sourceMappingURL=destinations.controller.js.map