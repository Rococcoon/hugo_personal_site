#!/bin/bash

# Compile and minify your CSS for production
./tailwindcss -i assets/css/main.css -o static/css/main.css --minify
