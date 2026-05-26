-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_publicId_key" ON "Image"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
