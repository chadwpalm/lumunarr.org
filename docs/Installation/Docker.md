---
title: Docker
description: Run Lumunarr in a Docker container
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Docker is the recommended way to run Lumunarr. The image includes everything Lumunarr needs, so there's nothing else to install.

## Image

Lumunarr images are on Docker Hub at [chadwpalm/lumunarr](https://hub.docker.com/r/chadwpalm/lumunarr).

### Tags

| Tag               | Description                            |
| ----------------- | -------------------------------------- |
| `latest`          | The latest stable release              |
| `#.#.#.#`         | A specific stable release              |
| `develop`         | The latest development release         |
| `develop-#.#.#.#` | A specific development release         |

`latest` is always the newest stable release. To stay on a particular version, use its version number as the tag instead.

`develop` is the newest development release. Development releases include new features that are still being tested and may not be stable. Earlier development releases are tagged with their version number after `develop-`.

## Usage

<Tabs>
  <TabItem value="cli" label="Docker CLI" default>

```bash
docker run -d \
  --name=lumunarr \
  --network host \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=America/Los_Angeles \
  -v /path/to/config:/config \
  --restart unless-stopped \
  chadwpalm/lumunarr:latest
```

  </TabItem>
  <TabItem value="compose" label="Docker Compose">

```yaml
services:
  lumunarr:
    image: chadwpalm/lumunarr:latest
    container_name: lumunarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Los_Angeles
    network_mode: "host"
    volumes:
      - /path/to/config:/config
    restart: unless-stopped
```

  </TabItem>
</Tabs>

Once the container is running, open `http://<your-server-ip>:3939` in a browser to finish setting up Lumunarr.

## Parameters

| Parameter         | Description                                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--name`          | The name to give the container.                                                                                                                                                                      |
| `--network host`  | Uses the host's network. Recommended so Lumunarr can find your Hue bridge on the local network. See [Host network mode](#host-network-mode).                                                          |
| `-e PUID`         | User ID that owns the files in `/config` (settings, logs and backups).                                                                                                                               |
| `-e PGID`         | Group ID that owns the files in `/config`.                                                                                                                                                           |
| `-e TZ`           | Time zone, for example `America/Los_Angeles`. Used for log timestamps, and required for schedules, including sunrise and sunset, to run at the right time.                                           |
| `-e APP_PORT`     | _Optional._ The port Lumunarr runs on inside the container. Defaults to `3939`. Overrides the port set in **Settings → Host**.                                                                       |
| `-e APP_BASE_URL` | _Optional._ A URL base for running behind a reverse proxy, for example `/lumunarr` to serve it at `mydomain.com/lumunarr`. Overrides the URL base set in **Settings → Host**.                         |
| `-v /config`      | Where Lumunarr keeps its settings and logs. Format: `<host path>:/config`. The right side must always be `/config`.                                                                                  |
| `-p`              | _Only without host network mode._ Port mapping in the format `<host port>:<container port>`. The container port must match `APP_PORT` or the port in **Settings → Host** (`3939` by default).          |
| `--restart`       | Docker's [restart behavior](https://docs.docker.com/engine/containers/start-containers-automatically/), for example `unless-stopped`.                                                                 |

:::tip
Setting `PUID` and `PGID` to your own user and group on the host avoids permission problems with the files in your config folder. On Linux, run `id` to find them.
:::

:::note
When `APP_PORT` or `APP_BASE_URL` is set, the matching fields in **Settings → Host** are locked and show a note saying the environment variable is in control. Port and URL base changes need a container restart.
:::

## Host network mode

`--network host` (Docker CLI) or `network_mode: "host"` (Docker Compose) runs the container directly on the host's network, with the same IP address as the host.

This lets Lumunarr use **mDNS** to find your Hue bridge on the local network. Without host mode, Lumunarr falls back to Hue's cloud discovery service to look up the bridge's IP address.

In host mode, Docker ignores `-p` port mappings. To run Lumunarr on a different port, set `APP_PORT` or change the port in **Settings → Host** instead.
