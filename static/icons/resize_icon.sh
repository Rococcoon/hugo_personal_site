#!/bin/bash

# This script will attempt to reduce the file size of all .png images
# in the current directory using only ImageMagick's 'convert' command.
# It will overwrite the original files.

for img in *.png; do
  [ -f "$img" ] || continue
  echo "Processing $img..."

  # Reduce file size by stripping metadata and optimizing compression
  convert "$img" -strip -define png:compression-level=9 "$img"

  if [ $? -eq 0 ]; then
    echo "✅ $img processed (attempted size reduction)."
  else
    echo "⚠️ Error processing $img."
  fi
done

echo "✅ Finished processing all .png images."
