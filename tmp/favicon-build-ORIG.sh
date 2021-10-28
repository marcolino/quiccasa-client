#!/usr/bin/env bash
# 
# Script to create a favicon images from specified png.
# Requires imagemagick (http://www.imagemagick.org)

sourceImage="${1:-assets/main-logo.png}"

mkdir -p "tmp-$$/"
favicon256="tmp-$$/favicon-256.png"
favicon128="tmp-$$/favicon-128.png"
favicon64="tmp-$$/favicon-64.png"
favicon32="tmp-$$/favicon-32.png"
favicon16="tmp-$$/favicon-16.png"
favicon="public/favicon.ico"
convert "$sourceImage" -resize 256x256 "$favicon256"
convert "$favicon256" -resize 128x128 "$favicon128"
convert "$favicon256" -resize 64x64 "$favicon64"
convert "$favicon256" -resize 32x32 "$favicon32"
convert "$favicon256" -resize 16x16 "$favicon16"
convert "$favicon16" "$favicon32" "$favicon64" "$favicon128" "$favicon256" "favicon.ico"
rm -r "tmp-$$/"