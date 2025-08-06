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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedHotelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let FeaturedHotelsService = class FeaturedHotelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.featuredHotel.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async findFeatured() {
        return this.prisma.featuredHotel.findMany({
            where: {
                isActive: true,
                featured: true,
            },
            orderBy: { createdAt: "desc" },
            take: 3,
        });
    }
    async findOne(id) {
        return this.prisma.featuredHotel.findUnique({
            where: { id },
        });
    }
    async findByLocation(location) {
        return this.prisma.featuredHotel.findMany({
            where: {
                location: {
                    contains: location,
                    mode: "insensitive",
                },
                isActive: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
};
exports.FeaturedHotelsService = FeaturedHotelsService;
exports.FeaturedHotelsService = FeaturedHotelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeaturedHotelsService);
//# sourceMappingURL=featured-hotels.service.js.map