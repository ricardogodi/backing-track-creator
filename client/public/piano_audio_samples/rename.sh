#!/bin/bash

# Rename files in the current directory (and subdirectories if needed)
find . -depth -name "*#*" | while read -r file; do
    # Get directory and filename
    dir=$(dirname -- "$file")
    base=$(basename -- "$file")

    # Replace '#' with 'sharp'
    new_name="${base//#/sharp}"

    # Rename the file
    mv -- "$file" "$dir/$new_name"

    echo "Renamed: $file -> $dir/$new_name"
done

echo "All files renamed successfully!"
