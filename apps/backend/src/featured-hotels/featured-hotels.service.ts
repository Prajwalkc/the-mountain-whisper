import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class FeaturedHotelsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.featuredHotel.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findFeatured(): Promise<any[]> {
    return this.prisma.featuredHotel.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.featuredHotel.findUnique({
      where: { id },
    });
  }

  async findByLocation(location: string): Promise<any[]> {
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
}
