#!/bin/bash
# Shell script to copy original machinery images from the brain folder to public/images

SRC_DIR="/Users/mac/.gemini/antigravity-ide/brain/9df8a28c-c4bb-45fe-84ba-285a8d7a2a2f"
DST_DIR_1="dws-nextjs/public/images"
DST_DIR_2="public/images"

echo "Copying PT Denko Wahana Sakti real machinery images..."

# Create directories if they don't exist
mkdir -p "$DST_DIR_1/products" "$DST_DIR_1/gallery"
mkdir -p "$DST_DIR_2/products" "$DST_DIR_2/gallery"

# Copy function to duplicate copy
copy_file() {
    cp "$SRC_DIR/$1" "$DST_DIR_1/$2"
    cp "$SRC_DIR/$1" "$DST_DIR_2/$2"
}

# Copy main backgrounds & images
copy_file "hero_bg_1783255590089.png" "hero-forklift.jpg"
copy_file "about_office_1783255083267.png" "office.jpg"

# Copy product cutouts
copy_file "prod_forklift_electric_1783255605426.png" "products/forklift-electric.jpg"
copy_file "prod_forklift_diesel_1783255619932.png" "products/forklift-diesel.jpg"
copy_file "prod_reach_truck_1783255635869.png" "products/reach-truck.jpg"
copy_file "prod_stacker_1783255653476.png" "products/electric-stacker.jpg"
copy_file "prod_pallet_1783255668973.png" "products/hand-pallet.jpg"
copy_file "prod_scissor_1783255686129.png" "products/scissor-lift.jpg"

# Copy gallery images
copy_file "hero_bg_1783255590089.png" "gallery/gallery-1.jpg"
copy_file "about_office_1783255083267.png" "gallery/gallery-2.jpg"
copy_file "prod_forklift_electric_1783255605426.png" "gallery/gallery-3.jpg"
copy_file "prod_forklift_diesel_1783255619932.png" "gallery/gallery-4.jpg"
copy_file "prod_reach_truck_1783255635869.png" "gallery/gallery-5.jpg"
copy_file "prod_scissor_1783255686129.png" "gallery/gallery-6.jpg"

echo "Copy complete! All original machinery images have been copied."
