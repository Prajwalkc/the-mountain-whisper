import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getFeaturedReviews(): Promise<any[]> {
    return this.prisma.review.findMany({
      where: {
        isActive: true,
        rating: {
          gte: 4, // Only show 4+ star reviews as testimonials
        },
      },
      include: {
        user: {
          select: {
            name: true,
            country: true,
            avatar: true,
          },
        },
        tour: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6, // Get top 6 reviews for testimonials
    });
  }

  async getAllReviews(): Promise<any[]> {
    return this.prisma.review.findMany({
      where: {
        isActive: true,
      },
      include: {
        user: {
          select: {
            name: true,
            country: true,
            avatar: true,
          },
        },
        tour: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getReviewById(id: string): Promise<any> {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            country: true,
            avatar: true,
          },
        },
        tour: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getReviewsByTourId(tourId: string): Promise<any[]> {
    return this.prisma.review.findMany({
      where: {
        tourId,
        isActive: true,
      },
      include: {
        user: {
          select: {
            name: true,
            country: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}