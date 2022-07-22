---
title: "how to run a script when you open terminal"
date: 2022-07-22T09:23:28-04:00
description: "make terminal greet you on login"
tags: ["general"]
draft: false
---

Over the past couple years, I've been a heavy linux user.

I often prefer to use CLI productivity tools like [timr](/projects/timr) and [bash-mission-log](/projects/bash-mission-log) instead of web apps, both because they are more privacy focused (I know exactly where the data is, and if it's backed up etc.), and it's always in my face because I always have a terminal window open.

The issue is that sometimes, you're in a rush, and you forget to check these CLI tools to see what is in there.

What I needed was a way to make it so that my tasks and tracking come up right away when I open terminal so I can see what I have on the go.

<center>
<img class="w-4/5" src="/images/run-script-on-terminal-open.png">
</center>

This is the `project:list` command in timr, as well as a simple "Hello Davey Boy" greeting.


You can really run any script when you open terminal if you edit your terminal profile settings.

This should be in one of the following files (probably - really only accounting for bash & zsh here)
```bash
vim ~/.zprofile # I've only seen it called this on mac
vim ~/.zshrc 
vim ~/.bashrc
vim ~/.bash_profile
```

Once you're in one of these files, you should be able to add things like

```bash
echo "Hello Davey Boy"
```

Then, if you close down the terminal window, the next time you open it, you should see the greeting like in the picture.

For the second part there, making it run a CLI tool like timr, as long as you have the executable (PHAR in timr's case) in your path variable (eg /usr/bin/timr), then you should be able to just add something like this

```bash
timr project:list
```

if you don't compile it, or it's more of a project file you are running that you don't want to change the location of, or add to a bin location, you can do something like this

```bash
cd ~/dev/php/timr && php timr project:status && cd ~/
```

This way, you basically change directories to where the executable is, then run it, and then change directories back to your home folder.

Hope this helps any of you who like CLI tools!