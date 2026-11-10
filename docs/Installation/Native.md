---
title: Native
description: Run Lumunarr natively with Node.js on Windows, Linux or macOS
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Lumunarr is designed to run in Docker, but you can also run it directly on Windows, Linux or macOS with Node.js.

## Requirements

- [Node.js](https://nodejs.org/) **26 LTS**. This is the version the Docker image uses. Other versions may fail to install dependencies or leave you on outdated, insecure packages.
- [Git](https://git-scm.com/), if you want to clone the repository instead of downloading a ZIP file.

## Get the source code

Clone the repository from the folder you want Lumunarr to live in:

<Tabs>
  <TabItem value="main" label="Stable (main)" default>

```bash
git clone https://github.com/chadwpalm/Lumunarr.git -b main
```

  </TabItem>
  <TabItem value="develop" label="Development (develop)">

```bash
git clone https://github.com/chadwpalm/Lumunarr.git -b develop
```

  </TabItem>
</Tabs>

Or download a ZIP of the [main](https://github.com/chadwpalm/Lumunarr/archive/refs/heads/main.zip) or [develop](https://github.com/chadwpalm/Lumunarr/archive/refs/heads/develop.zip) branch and unzip it. On Windows you can also use [Git for Windows](https://gitforwindows.org/) or [GitHub Desktop](https://desktop.github.com/).

## Build and start

Install the packages for the web interface and build it, then install the server's packages and start Lumunarr:

<Tabs>
  <TabItem value="windows" label="Windows" default>

```powershell
cd Lumunarr\frontend
npm ci
npm run build
cd ..
npm ci
npm start
```

  </TabItem>
  <TabItem value="linux" label="Linux / macOS">

```bash
cd Lumunarr/frontend
npm ci
npm run build
cd ..
npm ci
npm start
```

  </TabItem>
</Tabs>

Lumunarr runs on port `3939` by default. Open `http://localhost:3939` in a browser to finish setting it up.

## Config folder

Lumunarr keeps its settings and logs in `/config` by default. On Windows that's `C:\config` on the drive Lumunarr runs from.

On Linux and macOS, a regular user usually can't create a folder at the root of the drive, so Lumunarr may fail to start the first time. Either create `/config` yourself and give your user access to it, or use `CONFIG_DIR` to keep the config somewhere else:

```bash
sudo mkdir /config
sudo chown $USER /config
```

If `PUID` and `PGID` are set, Lumunarr changes the owner of its settings file to that user and group. Otherwise the file belongs to the user that runs Lumunarr.

## Environment variables

The [Docker parameters](/docs/Installation/Docker#parameters) `APP_PORT`, `APP_BASE_URL`, `DISABLE_AUTH`, `PUID`, `PGID` and `TZ` work natively too. There is one extra variable for native installs:

| Variable     | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIG_DIR` | _Optional._ The folder for settings and logs. Defaults to `/config`. A relative path is resolved from the folder you start Lumunarr in. |

Set them in front of `npm start`:

<Tabs>
  <TabItem value="powershell" label="Windows PowerShell" default>

```powershell
$env:APP_PORT=4000; $env:CONFIG_DIR="C:\Lumunarr-config"; npm start
```

  </TabItem>
  <TabItem value="cmd" label="Windows CMD">

```bat
set "APP_PORT=4000" && set "CONFIG_DIR=C:\Lumunarr-config" && npm start
```

  </TabItem>
  <TabItem value="linux" label="Linux / macOS">

```bash
APP_PORT=4000 CONFIG_DIR=~/lumunarr-config npm start
```

  </TabItem>
</Tabs>

## Run as a background process

Started this way, Lumunarr stops when you close the terminal. To keep it running in the background and start it automatically, use a service manager. Setting one up is outside the scope of this guide, but these are good starting points:

- [systemd](https://stackoverflow.com/a/29042953/339122) (Linux)
- [launchd](https://stackoverflow.com/a/25998406/339122) (macOS)
- [node-windows](https://stackoverflow.com/a/15616912/339122) (Windows)
- [PM2](https://stackoverflow.com/a/17005935/339122) (any platform)
