from mitmproxy import http, addonmanager
import mysql.connector
import asyncio

class BlockerAddon :
    def __init__(self) :
        self.cnx = None
        self.whitelist_urls = []
        self.whitelist_ips = []

    async def refresh_whitelist(self) :
        while True :
            await asyncio.sleep(5);

            cursor = self.cnx.cursor()
            cursor.execute("SELECT url, ip FROM filters WHERE classroom_id = 1")
            rows = cursor.fetchall()

            for url, ip in rows :
                if url is not None :
                    self.whitelist_urls.append(url)
                if ip is not None :
                    self.whitelist_ips.append(ip)


    def load(self, loader: addonmanager.Loader) :
        self.cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='blocker')
        asyncio.get_event_loop().create_task(self.refresh_whitelist())

    def done(self) :
        if self.cnx :
            self.cnx.close()

    def request(self, flow: http.HTTPFlow):
        for url in self.whitelist_urls:
            if url in flow.request.pretty_url :
                return

            flow.response = http.Response.make(403,
                                               "<p>Access forbidden!</p>",
                                               {"Content-Type": "text/html"})

addons = [BlockerAddon()]