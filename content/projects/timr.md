---
title: "timr"
date: 2022-07-21T09:39:05-04:00
description: "an open-source laravel-zero project that allows you track time spent on projects"
tags: ["opensource","php"]
type: "project"
repolink: "https://github.com/hallindavid/timr"
demolink: ""
bloglink: "/blog/making-timr"
---

# why?

I wanted to track the time I was spending on some of my projects. I looked at services like Toggl, but I never remember to open the app.

I figured if I had something accessible from command line, it'd be easier because I basically always have at least a terminal window open.

## commands / usage

**list projects**

```bash
# Output a list of projects in your database
php timr project:list
```

_sample output_
<img src="/images/timr/project-list.png">


---

**begin working on project**

```bash
# Begin time tracking on project (using prompts)
php timr project:start

# Begin time tracking on project with short code of acp
php timr project:start acp 
```

---

**stop working on project**

```bash
# End project time tracking (will prompt you to select which project, if more than 1 are active)
php timr project:stop 
```

---

**show project entries**

```bash
# Show Time Entries for project with short code of una
php timr project:log una

# Show time log entries for project with short code of una, between 2022-01-01 and 2022-02-01
php timr project:log una --from=2022-01-01 --to=2022-02-01
```

_sample_
<img src="/images/timr/project-log.png">

---

Check out the full docs on github

