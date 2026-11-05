---
title: Introduction
description: What Lumunarr is and how it connects Plex to your Philips Hue lights
sidebar_position: 1
sidebar_label: Introduction
---

### What is Lumunarr?

Lumunarr connects Plex to your Philips Hue lights. When you play, pause, resume or stop something in Plex, Lumunarr changes the lighting in that room to match: dim the lights when a movie starts, bring them up when you pause, and put them back the way they were when you're done.

Everything is set up through a web interface that works on desktop and mobile, and Lumunarr can run natively or in a Docker container.

### What Problem Does This Solve?

The Hue app can set a scene, but it has no idea what's happening in Plex. Without Lumunarr you have to change the lights yourself every time you start, pause or finish something.

Plex can send out a notification (a **webhook**) for each playback event, but nothing on the Hue side listens for it. Lumunarr sits in between and turns those Plex events into Hue lighting changes.

### How It Works

```mermaid
flowchart LR
    plex["Plex Media Server"] -- "Webhook<br>(play, pause, stop...)" --> lumunarr["Lumunarr"]
    lumunarr -- "Scene change" --> bridge["Hue Bridge"]
    bridge --> lights["Room lights"]
```

1. Plex sends a webhook to Lumunarr whenever playback starts, pauses, resumes or stops, and when it scrobbles (see below).
2. Lumunarr checks which **client profile** matches the event.
3. If a profile matches, Lumunarr tells your Hue bridge which scene to apply to that profile's room.

### Client Profiles

A client profile ties a Plex player to a room of Hue lights. For each Plex event in the profile, you choose a Hue scene from that room to run. You can create as many profiles as you need, for example one for the living room TV and another for the bedroom.

The events you can set a scene for are:

- **Play:** playback starts.
- **Pause** and **Resume:** playback is paused or continues.
- **Stop:** playback ends or is stopped.
- **Scrobble:** Plex marks the item as watched, which happens when playback passes a set percentage of the runtime. This usually lines up with the end credits, so it's a good time to bring the lights back up before the movie or episode has actually stopped.

Each profile can be narrowed down so it only reacts when it should:

- **User:** only react when specific Plex users are watching.
- **Media type:** treat movies, episodes and trailers/prerolls differently.
- **Library:** only react to certain Plex libraries.
- **Schedule:** only run at certain times, including sunrise and sunset.
- **Lights off:** ignore events if the room's lights are already off.

### More Features

- **Restore Pre-Play:** return the lights to exactly how they were before playback started.
- **Poster colors:** set the lights to colors taken from the movie or show poster. This feature is still experimental.
- **Server alerts:** have an individual light turn on or blink when someone starts streaming from your server or when new media is added. Unlike client profiles, server alerts control a single light rather than a scene.

### Requirements

- A Plex Media Server with an active **Plex Pass** subscription. Plex only sends webhooks for Plex Pass accounts.
- A **Philips Hue bridge** with lights set up in rooms or zones.
- A computer, NAS or server to run Lumunarr on, either natively or in Docker.

### Getting Started

- [Installation](/docs/Installation)
- [Configuration](/docs/Configuration)
- [Reference](/docs/Reference)
