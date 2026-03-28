# NetSwitch
![logo](./img/logo.png)

NetSwitch is a lightweight yet powerful MITM proxy that allows teachers to precisely control students’ internet access during lessons and exams. Using server‑side whitelists, only the websites that are actually needed are made available. This creates a calm, focused working environment without distractions. NetSwitch is flexible and can be used both in everyday classroom situations and during tests.

## Features
- Server‑side whitelist of URLs & IPs
- Real‑time filtering using mitmproxy
- Classroom‑based traffic separation
- Web interface for teachers (SvelteKit)
- Blocking of all non‑whitelisted HTTP/HTTPS traffic

## Architecture
- **Proxy: [mitmproxy](https://www.mitmproxy.org/) with our custom addon.**
  Custom addon intercepts HTTP/HTTPS and filters based on database entries.
- **MySQL database**
  Stores classrooms, filters and user data.
- **CoreDns**
  Handles DNS routing inside the school network.
- **[SvelteKit](https://svelte.dev/)**
  Our frontend. Allows teachers to manage whitelist entries.

## Setup guide

## Configuration
`Settings for .env, examples in .env.example`
- **DB_PASSWORD**
  Password for database.
- **DB_USER**
  User for database.
- **CLASSROOM_ID**
  Which classroom filters the proxy uses.
- **PROXY_PORT**
  Change port of our proxy.

## Testing
**mitmproxy test:**
1. Install requirements in `server/mitmproxy-container`
2. Setup a test database using our schema, `server/server-backend/db-schema.sql`
3. Add `google.com` to whitelist
4. Run `pytest -q ProxyTest.py` inside `server/mitmproxy-container/test`

## How it works
![map](./img/map.png)

- Every classroom has a proxy on the server through which the clients (Laptops) are routing all traffic.
- The proxy forwards whitelisted URLs or IPs to the router, which are fetched from the Database. All other traffic is blocked.
- Using the WebUI teachers can whitelist URLs and IPs in the database.
- The router wont allow any traffic except when it is coming form one of the proxies.

