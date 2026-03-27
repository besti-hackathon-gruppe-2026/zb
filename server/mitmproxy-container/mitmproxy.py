from mitmproxy import http, addonmanager
import mysql.connector
import asyncio


class BlockerAddon:
    def __init__(self):
        self.cnx = None
        self.whitelist_urls = []
        self.whitelist_ips = []

    def done(self):
        if self.cnx:
            self.cnx.close()

    def request(self, flow: http.HTTPFlow):
        flow.response = http.Response.make(403,
                                           "<p>Access forbidden!</p>",
                                           {"Content-Type": "text/html"})


print("hi")
addons = [BlockerAddon()]
