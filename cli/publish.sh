docker load <interfacewatcher_web.tar
docker compose -p interfacewatcher-web down
docker compose -p interfacewatcher-web up -d --remove-orphans
