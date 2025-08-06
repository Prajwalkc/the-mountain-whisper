import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Tour } from "@prisma/client";

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: {
    featured?: boolean;
    category?: string;
    difficulty?: string;
    skip?: number;
    take?: number;
  }): Promise<Tour[]> {
    const {
      featured,
      category,
      difficulty,
      skip = 0,
      take = 10,
    } = params || {};

    const where: any = {};

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

  async findOne(id: string): Promise<Tour | null> {
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

  async findBySlug(slug: string): Promise<Tour | null> {
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

  async getFeatured(): Promise<Tour[]> {
    return this.findAll({ featured: true, take: 6 });
  }

  async search(query: string): Promise<Tour[]> {
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
}
