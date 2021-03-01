#!/bin/bash

path=$( cd "$(dirname "$0")" ; pwd )
cd $path/front
# npm install
npm run build

cd $path/backend
go run main.go