#!/bin/bash

# Input file
input_file="Dsharp2.wav"

# Base output filename (without extension)
output_base="D#_transposed"

# Loop to increment pitch in 100-cent steps (1 semitone each)
for i in {1..12}; do
    pitch_shift=$((i * 100))  # Calculate pitch shift in cents
    output_file="${output_base}_${pitch_shift}c.wav"  # Generate output filename
    
    # Apply pitch shift using sox
    sox "$input_file" "$output_file" pitch "$pitch_shift"

    echo "Generated: $output_file (Pitch Shift: +${pitch_shift} cents)"
done

echo "All transpositions completed."
