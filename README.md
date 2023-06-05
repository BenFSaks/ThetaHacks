# ThetaHacks

## Overview
When choosing our idea for this project we were heavily inspired by Theta blockchain
technology and the potential it has for creating a serverless environment for video streaming. We wanted to create something that could demonstrate this potential in a relevant and mainstream way. We thought we would adapt it to what is probably the most relevant and mainstream concept in video streaming to date, the short video.

In recent years, the format of short videos has taken the world by storm, mostly due to the meteoric rise of the TikTok app. In 2022 alone, TikTok amassed 672 million downloads globally (Curry) and has now become a household name. The short video concept that TikTok uses focuses on delivering rapid-fire content that is tailored to each user. This same method has been adopted by other large applications such as YouTube with “Shorts” and Instagram with “Reels”. What we propose is that the Theta blockchain can be used to deliver the same experience but with all the benefits that Theta technology brings to the table via its decentralized video streaming model. This is where our software, ThetaTok alongside TCap, comes into play.

ThetaTok is a short video streaming platform powered by modern software technologies such as React and Firebase. We implement the theta blockchain as a way to store videos and provide a unique take on content delivery. With ThetaTok, users can upload their videos directly to the Theta blockchain. Our hope as we further develop Thetatok, is that users will be able to earn currency as they watch videos. This currency will be granted in return for borrowing user bandwidth to host videos peer-to-peer.

Moving on, TCap is the native partner to ThetaTok as it allows users to create their own short videos. Similar to ThetaTok, TCap’s frontend software is powered by React. However, rather than creating a second web application, we decided to create a desktop application that is powered by Tauri. The backend for TCap is written entirely in Rust. TCap allows screen recording with one or multiple displays, webcam capture, and audio capture. Our intention as we continue development is that TCap will be integrated directly into Thetatok.

## What We Could Improve

If we were to improve our project with some additional time, we would make various
changes to UX/UI. The current UI is a little bland and doesn't offer much to the user visually. This goes for both ThetaTok and TCap applications. In terms of UX, we would like to implement better error handling for both sectors of the project. At the moment, invalid inputs cause both programs to crash leaving the user in the dark. Furthermore, with TCap, there is an issue with path specification. We would like to make it so that the user can pick their path instead of typing it in. We would also like to allow the user to name their recording in a separate input from the path. At the moment, both must be specified together in the same field. Furthermore, there is an issue with webcam sizing that causes the webcam to appear too large in the output video when using TCap, and there is an issue with uploading videos to Thetatok where for the first few minutes after uploading the video is not viewable.

To conclude, a big hurdle for the ThetaTok project was trying to develop a custom video player. In a perfect world, we would like for our custom video player to have all of the modern features we see in most popular apps such as a liking system, comment section, and direct sharing among other things, but we were not able to include a lot of these features. Also, we were unable to implement a system that rewards users for watching videos on ThetaTok with currency, but this feature is crucial to allowing peer-to-peer hosting to exist. We will definitely add all of the features we mentioned later in development.

## Demo
[![Watch the video](https://img.youtube.com/vi/iT4UWtJEZfQ/maxresdefault.jpg)](https://youtu.be/iT4UWtJEZfQ)

## Works Cited

[37+ TikTok Statistics For Marketers In 2023 (demandsage.com)](https://www.demandsage.com/tiktok-user-statistics/#:~:text=TikTok%20is%20the%20first%20non,the%20Google%20play%20store%20alone.)
