---
layout: post
title: A whole new site
sub-title: Building on Github Pages
excerpt: "I wanted to create a new site, I used Jekyll"
tags: development jekyll
---
Over the last 18 months working as a developer my skillset has grown a lot and I felt that my personal site was in need of a serious refresh. I wanted to create a new site based on somthing that was going to be relitivly simple to update and maintain, secure, with no real need for a backend and bringing together content from my exisiting site and older material from Blogger. I was interested in trying static site generators and had been looking at GitHub pages for hosting, which lead me to the static site generator Jekyll.

I have not worked  with Ruby before, so I needed to install all of the prequisits, but the documentation on the Jekyll site made the process fairly simple, even on a Windows machine. There is also documentation on replacing the built in theme with your own, so with a little work I could remove all of the references to the defualt theme to build in my own styles and layouts.

I have been playing around with two themes, heavily inspired by the 80s nostalga of Ready Player One and Ready Player Two and I couldn't decide between them, so rather than impliment different pages in different styles I added the "Go Retro" and contextually "Launch Terminal" buttons to let the user choose bewteen them.

I wanted to improve my development workflow for the site after a few hours tinkering, so I had a search and found an article by [Brett Stevenson](https://brettstevenson.io/) who had created this gist [https://gist.github.com/tterb/9bd8e94eb094f1f38fc3dd33a250a2ed](https://gist.github.com/tterb/9bd8e94eb094f1f38fc3dd33a250a2ed) containing browsersync and several useful utilities for minimising and cleaning the site assets. Sadly I found that it did not work out of the box and I had to spend some time cleaning up and updating it to work with newer versions of gulp and the associated packages.

After investing the time in the build time, I should have a better site overall, although in the spirit of yack shaving I think may need to refactor the build scripts when I have chance.
