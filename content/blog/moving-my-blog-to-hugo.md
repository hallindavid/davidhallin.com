---
title: "Switching this site to Hugo"
date: 2021-03-08T06:43:17-05:00
description: "I'm moving my blog from Jigsaw over to Hugo"
tags: ["php", "go","static site generator", "hugo", "jigsaw"]
draft: false
---
# TLDR
I am switching my blog from <a href="https://jigsaw.tighten.co/">Jigsaw</a> to <a href="https://gohugo.io">Hugo</a>
so I can learn a bit more about webpack, bundlers, postcss, purgecss etc.

# Longer version
Let me start by saying, I think <a href="https://jigsaw.tighten.co/">Jigsaw</a> is a fantastic static site generator, 
if you're a Laravel developer, you'll feel right at home using it.

TailwindCSS version 1 is baked into the Jigsaw blog scaffolding, and when I began updating it to version 2, I noticed how 
much magic was going on under the hood that I didn't understand.

The only super important features I need for TailwindCSS, are PurgeCSS and making class components.  For the life of me, 
I couldn't seem to get it right on Jigsaw.  When I finally read through a few tutorials I got it, but I had no idea how I
accomplished that.


So - I wanted to go back to basics on this, and start with just the 2 features that I really wanted, PurgeCSS with TailwindCSS.

## TailwindCSS Setup

I <a href="https://twitter.com/prasannatoenjoy/status/1368602152952688644">asked on Twitter</a> and got a fantastic response.

<div class="w-full aspect-w-16 aspect-h-9">
<iframe width="100%" height="100%" src="https://www.youtube.com/embed/hvm5-EGe3fU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Static Site Generator Setup
After getting this initial setup, I started making a simpler option for static site generation with Go where I'd have a directory structure like this
```
/build / the output directory that would get served
|-index.html
|-post1.html
|-...html
/includes
|-header.html
|-footer.html
/source
|-index.html
|-posts/
|--post1.html
|--post2.html
/assets
|-css/
|--style.css
```
the go program would loop through the `source` directory and prepend `header.html` and append `footer.html` to every 
file in the source, and then copy them to the `build` folder  

The problem with this is things like meta tags, or titles, or partials that need data from another directory, so I looked 
and found <a href="https://gohugo.io">Hugo</a>.

It's written in go, it's wicked fast.  I don't use all the features (eg - I'm not using a theme, I created the layouts myself using TailwindCSS), 
but I think it results in much less magic I don't understand under the hood.

<span class="text-sm italic">If you want to see the code behind website - check out <a href="https://github.com/hallindavid/davidhallin.com">davidhallin.com on GitHub</a></span>

## Deployment using Netlify
I figured as well, while doing this, rather than playing with all the `gh-pages` deployment branch stuff for using GitHub pages, I'd 
move to Netlify - so I did that as well.

<span class="text-sm italic">If you want to see how I setup Jigsaw to be hosted on GitHub pages, check out <a href="/blog/deploying-a-static-site-to-github-pages/">Deploying a static site on GitHub Pages</a></span>

## Wrapping up
Doing some of this stuff got me closer to my code, and removed a lot of the *magic* from the build process which has been good.
I'm going to start a template file which has this code setup automatically, and then people can dump their tailwind code into this hugo repository.

I'll post a link to it on the projects page.

