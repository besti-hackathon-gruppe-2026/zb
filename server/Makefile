start-proxy:
	# disable IP forwarding
	#sudo sysctl net.ipv4.ip_forward=0
	#sudo sysctl net.ipv6.conf.all.forwarding=0
	docker compose build
	docker compose up -d

dev-upload:
	rsync -r ../ hackathon@172.16.0.1:zb-hackathon
	#rsync -r ../ hackathon@178.104.106.139:zb-hackathon

wifi-connect:
	sudo nmcli radio wifi on
	sudo nmcli device wifi
	sudo nmcli device wifi connect "Baden Hackt" password "BadenHackt2026!"
