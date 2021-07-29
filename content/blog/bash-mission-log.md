---
title: bash mission log
date: 2021-07-29
description: I released a new little bash tool to remind me of my daily goals every time I open my terminal
tags: [opensource]
draft: false
---

## some background/requirements for this project 

I have a mac, as well as 2 linux machines, and I switch between them fairly regularly depending on where I'm working, and what I'm working on.

When I make a list of my daily goals, I often neglect/forget to look back at my journal and remind myself of my other goals for the day.

But, because I open terminal so much to run scripts, or to compile etc, I realized I had an opportunity here to make it so I get my daily goals flashed in my face as often as possible.

All of my machines have php installed, and I could whip up a quick laravel-zero application, but the idea was so simple, and as I get deeper into docker, I didn't want a PHP installation to be a requirement.

So I decided to write this in bash.

I needed to decide on what the important functionality was.


_requirements_

- add/delete/complete missions
- clear the list
- display list when ever I open terminal
- display the list with a command
- local, no extra drivers, file storage - I didn't want to have this in the cloud

## the build

So the final product looks like this

<img src="https://github.com/hallindavid/bash-mission-log/blob/main/preview.gif?raw=true" />

It is open source (MIT) and basically completely contained in a single bash file.

You can check it out here: <a href="https://github.com/hallindavid/bash-mission-log">https://github.com/hallindavid/bash-mission-log</a>