import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.blogPost.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findFeatured(): Promise<any[]> {
    return this.prisma.blogPost.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.blogPost.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<any> {
    return this.prisma.blogPost.findUnique({
      where: { slug },
    });
  }

  async findByCategory(category: string): Promise<any[]> {
    return this.prisma.blogPost.findMany({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
