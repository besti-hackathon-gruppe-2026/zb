from mitmproxy import http, addonmanager
import mysql.connector.aio as cpy_async
import asyncio

config = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "database": "blocker",
}

class BlockerAddon :
    def __init__(self) :
        self.whitelist_urls = []
        self.whitelist_ips = []

    async def refresh_whitelist(self) :
        while True:
            await asyncio.sleep(5)
            async with await cpy_async.connect(**config) as cnx:
                async with await cnx.cursor() as cur:
                    await cur.execute("SELECT url, ip FROM filters WHERE classroom_id = 1")
                    rows = await cur.fetchall()

                    whitelist_urls_tmp = []
                    whitelist_ips_tmp = []

                    for url, ip in rows :
                        if url is not None :
                            whitelist_urls_tmp.append(url)
                        if ip is not None :
                            whitelist_ips_tmp.append(ip)

                    self.whitelist_urls = whitelist_urls_tmp
                    self.whitelist_ips = whitelist_ips_tmp


    def load(self, loader: addonmanager.Loader) :
        asyncio.get_event_loop().create_task(self.refresh_whitelist())

    def request(self, flow: http.HTTPFlow):
        for url in self.whitelist_urls:
            if url in flow.request.pretty_url :
                return

        flow.response = http.Response.make(403,
                                               "<p>Access forbidden!</p>",
                                               {"Content-Type": "text/html"})

addons = [BlockerAddon()]