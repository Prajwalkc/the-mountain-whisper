import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Destination } from "@prisma/client";

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: {
    featured?: boolean;
    region?: string;
    skip?: number;
    take?: number;
  }): Promise<Destination[]> {
    const { featured, region, skip = 0, take = 10 } = params || {};

    const where: any = {};

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (region) {
      where.region = {
        contains: region,
        mode: "insensitive",
      };
    }

    return this.prisma.destination.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string): Promise<Destination | null> {
    return this.prisma.destination.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Destination | null> {
    return this.prisma.destination.findUnique({
      where: { slug },
    });
  }

  async getFeatured(): Promise<Destination[]> {
    return this.findAll({ featured: true, take: 6 });
  }

  async search(query: string): Promise<Destination[]> {
    return this.prisma.destination.findMany({
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
            region: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            activities: {
              hasSome: [query],
            },
          },
        ],
      },
      take: 10,
    });
  }
}
