#!/bin/bash

mkdir "react-bundles"

for fileName in "react" "react-dom" "scheduler"
do
  cp "node_modules/$fileName/cjs/$fileName.development.js" "react-bundles/"
done





