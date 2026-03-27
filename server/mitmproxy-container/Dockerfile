FROM mitmproxy/mitmproxy:12.1

WORKDIR /app

RUN pip install mysql-connector-python

COPY ../mitmproxy.py mitmproxy.py

EXPOSE 8080
CMD mitmdump -s mitmproxy.py --listen-port=8080 --set console_eventlog_verbosity=debug --set block_global=false