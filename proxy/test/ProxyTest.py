import pytest
import requests
import os
import signal
from time import sleep
from subprocess import Popen
import mysql.connector as cpy

proxies = {
    'http': 'http://127.0.0.1:8080',
    'https': 'http://127.0.0.1:8080',
}

db_config = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "blocker",
}

@pytest.fixture(scope="session", autouse=True)
def run_proxy():
    proc = Popen(["mitmdump", "-s", "../mitmproxy.py", "--listen-port", "8080"])

    sleep(7)

    yield
    os.kill(proc.pid, signal.SIGTERM)

@pytest.fixture(scope="session")
def add_filter() :
    with cpy.connect(**db_config) as cnx:
        with cnx.cursor() as cur:
            cur.execute("INSERT INTO filters (classroom_id, ip) VALUES (1, '149.126.4.22');") # yurix.ch
        cnx.commit()

    sleep(3)
    yield


# HTTP Test
def test_deny():
    response = requests.get("http://youtube.com", proxies=proxies, verify=False)

    assert response.status_code == 403
    assert "Access forbidden" in response.text

def test_allowed():
    response = requests.get("http://google.com", proxies=proxies, verify=False)

    assert response.status_code == 200

# IP filter & new filter Test
def test_deny_ip() :
    response = requests.get("http://yurix.ch", proxies=proxies, verify=False)

    assert response.status_code == 403
    assert "Access forbidden" in response.text

@pytest.mark.usefixtures("add_filter")
def test_allow_ip() :
    response = requests.get("http://yurix.ch", proxies=proxies, verify=False)

    assert response.status_code == 200

# HTTPS Test
def test_https_deny():
    response = requests.get("https://youtube.com", proxies=proxies, verify=r"./mitmproxy-ca-cert.pem")

    assert response.status_code == 403
    assert "Access forbidden" in response.text

def test_https_allowed():
    response = requests.get("https://google.com", proxies=proxies, verify=r"./mitmproxy-ca-cert.pem")

    assert response.status_code == 200