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
exports.ToursService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ToursService = class ToursService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { featured, category, difficulty, skip = 0, take = 10, } = params || {};
        const where = {};
        if (featured !== undefined) {
            where.featured = featured;
        }
        if (category) {
            where.category = {
                has: category,
            };
        }
        if (difficulty) {
            where.difficulty = difficulty;
        }
        return this.prisma.tour.findMany({
            where,
            skip,
            take,
            include: {
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        title: true,
                        comment: true,
                        user: {
                            select: {
                                name: true,
                                country: true,
                            },
                        },
                        createdAt: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                        bookings: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findOne(id) {
        return this.prisma.tour.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                country: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                        bookings: true,
                    },
                },
            },
        });
    }
    async findBySlug(slug) {
        return this.prisma.tour.findUnique({
            where: { slug },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                country: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                        bookings: true,
                    },
                },
            },
        });
    }
    async getFeatured() {
        return this.findAll({ featured: true, take: 6 });
    }
    async search(query) {
        return this.prisma.tour.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        category: {
                            hasSome: [query],
                        },
                    },
                ],
            },
            take: 10,
        });
    }
};
exports.ToursService = ToursService;
exports.ToursService = ToursService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ToursService);
//# sourceMappingURL=tours.service.js.map