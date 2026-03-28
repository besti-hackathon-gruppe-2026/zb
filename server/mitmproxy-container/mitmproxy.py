import re

from mitmproxy import http, addonmanager, ctx
from urllib.parse import urlparse
from socket import gethostbyname
import mysql.connector.aio as cpy_async
import asyncio
import os
from urllib.parse import urlparse

classroom = os.getenv('CLASSROOM_ID', "1")

config = {
    "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.getenv("MYSQL_PORT", 3306)),
    "user": os.getenv("MYSQL_USER", "root"),
    "password": os.getenv("MYSQL_PASSWORD", ""),
    "database": os.getenv("MYSQL_DATABASE", "blocker"),
}

with open("error-message.html", "r") as f:
    error_message_template = f.read()


class BlockerAddon:
    def __init__(self):
        self.ip_cache = {}
        self.whitelist_urls = []
        self.whitelist_ips = []
        # when we discover a link to
        self.temporary_allow_resources: set[str] = set()

    async def refresh_whitelist(self):
        while True:
            await asyncio.sleep(5)
            async with await cpy_async.connect(**config) as cnx:
                async with await cnx.cursor() as cur:
                    await cur.execute("SELECT url, ip FROM filter WHERE classroom_id = {};".format(classroom))
                    rows = await cur.fetchall()

                    whitelist_urls_tmp = []
                    whitelist_ips_tmp = []

                    for url, ip in rows:
                        if url is not None:
                            whitelist_urls_tmp.append(url)
                        if ip is not None:
                            whitelist_ips_tmp.append(ip)

                    self.whitelist_urls = whitelist_urls_tmp
                    self.whitelist_ips = whitelist_ips_tmp
            ctx.log.info(""+str(self.whitelist_urls)+str(self.whitelist_ips))

    async def clear_cache(self):
        while True:
            await asyncio.sleep(1800)  # 30min
            self.ip_cache.clear()

    def resolve_ip(self, host):
        if host in self.ip_cache:
            return self.ip_cache[host]

        ip = gethostbyname(host)
        self.ip_cache[host] = ip
        return ip

    def load(self, loader: addonmanager.Loader):
        self.refresh_whitelist()
        asyncio.create_task(self.refresh_whitelist())
        asyncio.create_task(self.clear_cache())

    def response(self, flow):
        try:
            pattern = r'https?://[^\s\"\']+'
            urls = re.findall(pattern, flow.response.content.decode("utf-8"))

            for url in urls:
                res = urlparse(url)
                print(res.netloc)

                if res.netloc != "":
                    self.temporary_allow_resources.add(res.netloc)
        except:
            pass

        domain = urlparse(flow.request.pretty_url).netloc
        ctx.log.info("log "+domain+" "+str(self.whitelist_urls))

        if self.whitelist_urls:
            for url in self.whitelist_urls:
                if domain.endswith(url):
                    return

        if self.whitelist_ips:
            for ip in self.whitelist_ips:
                if ip == self.resolve_ip(domain):
                    return

        if "Content-Type" in flow.response.headers and "text/html" not in flow.response.headers["Content-Type"]:
            ctx.log.info(str(self.temporary_allow_resources))
            for url in self.temporary_allow_resources:
                if domain.endswith(url):
                    return

        flow.response = http.Response.make(403,
                                           error_message_template,
                                           {"Content-Type": "text/html"})

addons = [BlockerAddon()]