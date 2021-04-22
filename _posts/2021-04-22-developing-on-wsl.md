---
layout: post
title: Getting up and running with WSL and Docker
sub-title: I used Jekyll, what other new things can I try?
excerpt: "To date I have largely been using containers from Windows, can I work with WSL?"
tags: development jekyll wsl
---

Over the past year or so I have been pulled out of my comfort zone of developing on Linux or using Apache XAMPP to the more complex, discrete and simplified world of containers. In this context I mean simplified in so much that the dependencies are more closely tied to the development of a project, rather than getting up and running, with Docker and containers having their own learning curve.

To date I have largely been using containers from Windows, using Docker desktop on the Windows OS, but could I work with Windows Subsystem Linux (WSL)? My awareness of WSL had slowly increased over the year without directly investigating it until a colleague walked me through getting running so I could generate SSL signatures. Even though WSL has been around since 2016 it was new to me, so when learning Vuejs from Laracasts I was surprised to find that Laravel had moved their ecosystem away from Vagrant to a Docker contaier on WSL with Laravel 8 and Sail in 2020.

When it came time to set up a new development machine and pleased with my progress with Jekyll I thought it was about time to try WSL in earnest and see if I could get it up and running. I had to go through the install of WSL twice. I am still not entirely sure why, but the first time around something went very wrong with the install and after multiple freeze/restarts my filesystem became corrupted and I needed to install Windows 10 and all my applications from scratch. This was a little galling as Docker was the last thing I planned to install before creating myself a useful recovery backup of a machine I could just install and work from.

A day of re-installing drivers and applications later and with a fresh backup made I was ready to try again, this time with no hiccups, so far. Once I had everything installed I walked through [Getting started with Docker remote containers on WSL2](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers) instead of using their Django example jumping straight to getting a new post on my site.

This brings you up to date. I know there will be more to learn, but I am happy I am off to a good start and developing with the new build tools and WSL docker has been stright forwards, kepping my new machine dependency light.
