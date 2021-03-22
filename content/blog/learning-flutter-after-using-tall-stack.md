---
title: "learning flutter after using tall stack"
date: 2021-03-22T05:18:31-04:00
description: "learning flutter after using the tall stack for a while now (tailwind, alpine js, laravel, livewire"
tags: [general, php]
---

Over the last little while, I've noticed more and more development frameworks moving towards component based layouts.

A few years ago I became familiar with the concept by learning Vue.js, and since then I've played with a few other frameworks like React, Redwood, and others that use similar sort of structures.

Now, primarily I'm a web developer, so when I moved to Tailwind CSS from Bootstrap it was pretty neat to see components becoming a way to organize your code, albeit a little different types of components from the other components mentioned so far.

Then, when I began using Livewire frequently, I jumped two-feet into components.  Of course, Laravel wasn't long after when they allowed the use of similar components, and now the initial Laravel Jetstream scaffolding is component-based.

All of this is just to say, that you can see a definitive trend towards writing smaller, re-usable pieces of front-end code, really taking the DRY (don't repeat yourself) method, to the front-end.

I have a few small app-goals in the upcoming future, so I started taking some time to learn Flutter.  Flutter is a VERY different framework for development than Laravel.

To use Flutter, you write Dart code.  Functionally it's actually really similar to writing a javascript single page app, where you have an entry point, and then you setup different widgets (Flutters term for components) that the app will display.  You structure your code so that widgets can pass data, and callbacks up and down the inheritance tree, so you need to conceptually think about it similarly to the way you would in one of the Javascript frameworks as well.

The particular piece that I find really fun is this.

It's kind of like taking a laravel component, and tailwind components, and throwing it into a single concept.

I'll try to show this through a screenshot.

<div class="grid md:grid-cols-2 gap-5">
    <div>
        <img class="w-full" src="/images/flutter-after-tall/flutter-widget.png"/>
        <span class="italic text-sm">This is a flutter widget</span>
    </div>
    <div>
        <img class="w-full" src="/images/flutter-after-tall/tw-html.png"/>
        <span class="italic text-sm">This is the same thing, but using Tailwind</span>
    </div>
</div>
<br />

This is how you can accomplish outputting Hey world in a 300 px tall container, with some padding on all sides.


There are obviously some big differences between these languages, but I'm surprised at how easy it is to draw parallels between working with Flutter, and working with the TALL stack.

I'm still learning flutter by going through the <a href="https://pro.academind.com/p/learn-flutter-dart-to-build-ios-android-apps-2020">Academind course</a>, but I find that I'm getting through pretty well, and the similarities to other languages I know makes it much easier.