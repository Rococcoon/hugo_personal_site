#!/bin/bash

# Download Tailwind CLI for Linux x64
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64

# Make it executable
chmod +x tailwindcss-linux-x64

# Make watch executable
chmod +x watch-tailwindcss.sh

# Make minify executable
chmod +x minify-tailwindcss.sh

# Rename it to just "tailwindcss"
mv tailwindcss-linux-x64 tailwindcss
