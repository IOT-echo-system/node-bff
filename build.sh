#!/bin/bash
#tag=$(curl https://hub.docker.com/v2/repositories/shiviraj/node-bff/tags | jq -r '.results | sort_by(.last_updated) | last(.[-2]).name')
#echo current tag: $tag
#majorTag=$(echo $tag | cut -d '.' -f 1-2 )
#minorTag=$(echo $tag | cut -d '.' -f 3)
#((minorTag+=1))
#
#newTag=$(echo $majorTag.$minorTag)
#echo new tag: $newTag

rm -rf node_modules
npm install && \
npm run build --omit=dev && \
rm -rf node_modules && \
npm install --production --ignore-scripts --prefer-offline && \
docker buildx build --no-cache --platform=linux/arm64,linux/amd64 -t shiviraj/node-bff:latest --push .
