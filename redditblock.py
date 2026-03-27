import logging
from mitmproxy import http
import re

with open("blocked.html") as f:
    template = f.read()

class RedditBlock:
    def __init__(self):
        logging.info("redditblock activated")

    def request(self, flow):
        if "reddit.com" in flow.request.pretty_url or "news.ycombinator.com" in flow.request.pretty_url or "youtube" in flow.request.pretty_url:
            # detailed regexp check

            # allow hackernews and reddit from google
            if re.match(r"https://news\.ycombinator\.com/item\?id=\d+|https://news\.ycombinator\.com/item\?id=\d+|https://www\.reddit\.com/r/[^/]+/comments/.+", flow.request.pretty_url):
                return

            logging.info(f"redditblock: capture")
            flow.response = http.Response.make(
                451,
                template.replace("__SITE__",flow.request.pretty_url).encode("utf-8"),
                {"Content-Type": "text/html"}
            )


addons = [RedditBlock()]