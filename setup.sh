docker exec -it $(docker ps | grep server | awk '{ print $1 }') /bin/bash -c 'npm run db:migrate'
docker kill $(docker ps | grep server | awk '{ print $1 }')
docker kill $(docker ps | grep postgres | awk '{ print $1 }')
docker-compose up