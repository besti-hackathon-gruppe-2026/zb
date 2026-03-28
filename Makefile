start-proxy:
	docker compose build
	docker compose up -d

dev-upload:
	rsync --exclude-from=.rsyncignore -r ./ hackathon@172.16.0.1:zb-hackathon

