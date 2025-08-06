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
exports.FeaturedHotelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const featured_hotels_service_1 = require("./featured-hotels.service");
let FeaturedHotelsController = class FeaturedHotelsController {
    constructor(featuredHotelsService) {
        this.featuredHotelsService = featuredHotelsService;
    }
    async findAll() {
        return this.featuredHotelsService.findAll();
    }
    async findFeatured() {
        return this.featuredHotelsService.findFeatured();
    }
    async findByLocation(location) {
        return this.featuredHotelsService.findByLocation(location);
    }
    async findOne(id) {
        return this.featuredHotelsService.findOne(id);
    }
};
exports.FeaturedHotelsController = FeaturedHotelsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all featured hotels" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of all featured hotels" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeaturedHotelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured hotels for homepage" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of featured hotels" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeaturedHotelsController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)("location/:location"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured hotels by location" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of featured hotels in location",
    }),
    __param(0, (0, common_1.Param)("location")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturedHotelsController.prototype, "findByLocation", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured hotel by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Featured hotel details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Featured hotel not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturedHotelsController.prototype, "findOne", null);
exports.FeaturedHotelsController = FeaturedHotelsController = __decorate([
    (0, swagger_1.ApiTags)("featured-hotels"),
    (0, common_1.Controller)("featured-hotels"),
    __metadata("design:paramtypes", [featured_hotels_service_1.FeaturedHotelsService])
], FeaturedHotelsController);
//# sourceMappingURL=featured-hotels.controller.js.map