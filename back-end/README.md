# Instructions for deploying backend

TODO: Add a guide for setting up
Things to include

- How to setup domains adn subdomains - namecheap with Digital Ocean
- Certbot and nginx configs
- dockerfiles and images, docker-compose, volumes
- sql commands
- any cron jobs

- certbot will be run on the digital ocean droplet
- nginx will be installed on the linux server and also deployed as a container
- Nginx will have it's config files which will be shared as a volume into the nginx container
- Certbot will use the nginx plugin to make it easier
- When renewing will send a docker kill -s HUS signal to the nginx container to gracefully reload the server
- Can adjust or setup a cron job to renew daily
- Main purpose of nginx is for ssl certificate and redirecting http to https - so can access data (deal with mixed content error - cannot have http backend when front end is https)
- Will eventually use subdomain e.g api.towerhamletsmosques.co.uk for backend
- Will probably use app.towerhamletsmosques.co.uk for this app and keep WP site going for a while until this is fully deployed and stable
