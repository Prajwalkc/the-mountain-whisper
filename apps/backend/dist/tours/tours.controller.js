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
exports.ToursController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tours_service_1 = require("./tours.service");
let ToursController = class ToursController {
    constructor(toursService) {
        this.toursService = toursService;
    }
    async findAll(featured, category, difficulty, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const skip = (pageNum - 1) * limitNum;
        return this.toursService.findAll({
            featured: featured === "true" ? true : featured === "false" ? false : undefined,
            category,
            difficulty,
            skip,
            take: limitNum,
        });
    }
    async getFeatured() {
        return this.toursService.getFeatured();
    }
    async search(query) {
        return this.toursService.search(query);
    }
    async findOne(id) {
        return this.toursService.findOne(id);
    }
    async findBySlug(slug) {
        return this.toursService.findBySlug(slug);
    }
};
exports.ToursController = ToursController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all tours" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of tours retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "featured", required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: "category", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "difficulty", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("featured")),
    __param(1, (0, common_1.Query)("category")),
    __param(2, (0, common_1.Query)("difficulty")),
    __param(3, (0, common_1.Query)("page")),
    __param(4, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ToursController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured tours" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Featured tours retrieved successfully",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToursController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search tours" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Search results retrieved successfully",
    }),
    (0, swagger_1.ApiQuery)({ name: "q", required: true, type: String }),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToursController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get tour by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Tour retrieved successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Tour not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToursController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get tour by slug" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Tour retrieved successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Tour not found" }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToursController.prototype, "findBySlug", null);
exports.ToursController = ToursController = __decorate([
    (0, swagger_1.ApiTags)("tours"),
    (0, common_1.Controller)("tours"),
    __metadata("design:paramtypes", [tours_service_1.ToursService])
], ToursController);
//# sourceMappingURL=tours.controller.js.map