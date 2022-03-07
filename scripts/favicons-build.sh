#!/usr/bin/env bash
# 
# Script to create a favicon images from specified source png image.
# Source png image size should be at least 512x512 pixels.
# Imagemagick (http://www.imagemagick.org) is required.

sourceImage="${1:-src/assets/icons/LogoMain.png}"
#minSize=512
minSize=400

if [ ! -f "$sourceImage" ]; then
  echo "Source image \"$sourceImage\" not found"
  exit 1;
fi
if ! command -v identify &> /dev/null; then
  echo "Command \"identify\" should be installed to check image size"
  exit 2;
fi
if ! command -v convert &> /dev/null; then
  echo "Command \"identify\" must be installed to convert image"
  exit 3;
fi
width=`identify -format '%w' "$sourceImage"`
height=`identify -format '%h' "$sourceImage"`
if [ $width -lt $minSize ]; then
  echo "Source image \"$sourceImage\" should be at least 512 pixels wide"
  exit 4;
fi
if [ $height -lt $minSize ]; then
  echo "Source image \"$sourceImage\" should be at least 512 pixels high"
  exit 5;
fi

favicon512="public/favicon-512.png"
favicon192="public/favicon-192.png"
favicon128="public/favicon-128.png"
favicon="public/favicon.ico"

convert "$sourceImage" -resize 512x512 "$favicon512"
convert "$sourceImage" -resize 192x192 "$favicon192"
convert "$sourceImage" -resize 192x192 "$favicon128"
convert "$favicon128" -define icon:auto-resize=64,48,32,16 "$favicon"

rm -f "$favicon128"

exit 0
