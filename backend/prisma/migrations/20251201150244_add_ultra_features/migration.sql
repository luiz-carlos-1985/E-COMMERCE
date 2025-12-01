-- CreateEnum
CREATE TYPE "LoyaltyTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "metaversePrice" DOUBLE PRECISION,
ADD COLUMN     "model3D" TEXT,
ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "loyaltyTier" "LoyaltyTier" NOT NULL DEFAULT 'BRONZE';

-- CreateTable
CREATE TABLE "MetaverseAvatar" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "accessories" TEXT[],
    "position" TEXT NOT NULL DEFAULT '{"x":0,"y":0,"z":0}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetaverseAvatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StyleProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "preferredColors" TEXT[],
    "preferredStyles" TEXT[],
    "sizes" TEXT NOT NULL DEFAULT '{"top":"","bottom":"","shoes": ""}',
    "budget" TEXT NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StyleProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaverseAvatar_userId_key" ON "MetaverseAvatar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StyleProfile_userId_key" ON "StyleProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_productId_key" ON "WishlistItem"("userId", "productId");

-- AddForeignKey
ALTER TABLE "MetaverseAvatar" ADD CONSTRAINT "MetaverseAvatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StyleProfile" ADD CONSTRAINT "StyleProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
