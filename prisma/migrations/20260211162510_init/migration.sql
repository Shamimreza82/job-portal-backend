-- CreateTable
CREATE TABLE "divisions" (
    "id" TEXT NOT NULL,
    "geo_code" TEXT,
    "name" TEXT NOT NULL,
    "bn_name" TEXT,
    "url" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL,
    "division_id" TEXT NOT NULL,
    "geo_code" TEXT,
    "name" TEXT NOT NULL,
    "bn_name" TEXT,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "url" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upazilas" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "geo_code" TEXT,
    "name" TEXT NOT NULL,
    "bn_name" TEXT,
    "url" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "upazilas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipalities" (
    "id" TEXT NOT NULL,
    "upazila_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bn_name" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "union_parishads" (
    "id" TEXT NOT NULL,
    "upazila_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bn_name" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "union_parishads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "police_stations" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "geo_code" TEXT,
    "url" TEXT,
    "bn_name" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "police_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_offices" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "upazila_id" TEXT NOT NULL,
    "post_office" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_offices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upazilas" ADD CONSTRAINT "upazilas_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "union_parishads" ADD CONSTRAINT "union_parishads_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "police_stations" ADD CONSTRAINT "police_stations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_offices" ADD CONSTRAINT "post_offices_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_offices" ADD CONSTRAINT "post_offices_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
