docker load <interfacewatcher_web.tar
docker compose -p interfacewatcher_web down
docker compose -p interfacewatcher_web up -d --remove-orphans
