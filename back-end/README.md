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

[cron setup](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)

## Initial Nginx setup

These steps are from the [DO guide](<https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04#step-5-%E2%80%93-setting-up-server-blocks-(recommended)>)

1. Install nginx

```sh
sudo apt update
sudo apt install nginx
```

2. Adjust firewall to allow Nginx http

```sh
sudo ufw allow 'Nginx HTTP'
```

Note: this is not needed as will be disabling and enabling https anyways - [Step 2 of certbot config](#certbot-and-redirecting-to-https)!

3. Setting up proxy server block
   Open a new domain config file using vim

```sh
sudo vim /etc/nginx/sites-available/your_domain
```

Add in the following server block to the file:

```conf
Server {
	Listen 80 default_server;  This is to listen for http on ipv4
	Listen [::]:80 default_server;  This is to listen for http on ipv6

	Server_name addDomainHERE;

	Location / {
		Proxy_pass http://IpAddressToRedirectTO:PortOfServer;  This is where you redirect to the actual server!
		Proxy_set_header Host $host;  This is make sure request carries host header and isn't blocked?
	}
```

This will start off only redirecting any default http(80) requests to the server

4. Activate the server using symlink

```sh
sudo ln -s /etc/nginx/sites-available/INSERT_your_domain /etc/nginx/sites-enabled/
```

5. Check if conf is working

If you visit the page and get the default nginx page, it is still using the default.conf so test the new config first:

```
sudo nginx -t
```

Fix any issues, then remove the default config file:

```
sudo rm /etc/nginx/sites-enabled/default
```

Then reload (-s flag attempts reload if fails it will use continue with old config but will show error in the output):

```
sudo nginx -s reload
```

Visit the site and should get a success json that is returned when visiting the API - indicating it is using the api.

Note: If you don't get a response then check postman, if that hangs most likely the docker containers are not running.

## Certbot and redirecting to HTTPS

This is following this [DO Guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

1. Install certbot and nginx plugin

```sh
sudo apt install certbot python3-certbot-nginx
```

2. Reconfiguring firewall to only allow HTTPS

```sh
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Note: if you previously did not allow HTTP then leave out second delete command.

3. Obtaining SSL certificate

Run certbot with nginx plugin and pass ther domain to secure.

```sh
sudo certbot --nginx -d example.com
```

Note: The nginx plugin looks for the server_name that matches example.com so make sure the server block contains the server_name - so the plugin can redirect when choosing option 2 during setup by adjusting the config/server block accordingly!
