-- CreateTable
CREATE TABLE "kategori" (
    "katId" SERIAL NOT NULL,
    "katAd" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("katId")
);

-- CreateTable
CREATE TABLE "urun" (
    "urunId" SERIAL NOT NULL,
    "urunAd" TEXT NOT NULL,
    "kat_id" INTEGER NOT NULL,

    CONSTRAINT "urun_pkey" PRIMARY KEY ("urunId")
);

-- AddForeignKey
ALTER TABLE "urun" ADD CONSTRAINT "urun_kat_id_fkey" FOREIGN KEY ("kat_id") REFERENCES "kategori"("katId") ON DELETE RESTRICT ON UPDATE CASCADE;
