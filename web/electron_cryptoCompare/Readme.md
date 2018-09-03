# Crypto Compare
## Building a simple BTC price grabber with Electron + Typescript + React + Webpack

The original basis for this comes from the [YouTube electron tutorial](https://www.youtube.com/watch?v=2RxHQoiDctI) written in vanilla JS.  

I wanted to redo this with a couple of different technologies. Being somewhat new to this space, I spent a **lot** of time researching and trying to get all these pieces to work. This may not be the most optimal setup for sure and I welcome feedback on how I can improve bits of it. I ended up following the [most recent guide I found online](https://taraksharma.com/setting-up-electron-typescript-react-webpack/)

The core tech/concepts used here:
1. Electron (1.6.10)
2. Typescript (3.0.1)
3. React (16.4.2)
4. Webpack (4.16.4)
5. CSS Grid, Variables
6. (Ticking updates - use polling instead of subscription)

**Screnshots**

Ticking Prices

![alt text](https://github.com/sparkydasrath/media/blob/master/web/electron/cc01.png "Ticking Price")

Resized

![alt text](https://github.com/sparkydasrath/media/blob/master/web/electron/cc02.png "Resized")

**Running**

1. In the terminal type in *yarn run dev*. This will run the webpack.dev.js file that will compile the typescript to javascript and output to the *dist* folder.
2. In VS Code, click the debug icon in the tool pane on the left, in the dropdown at the top, select *Electron: All*
3. Hit F5 and it will launch the electron window and [grab some crypto coins back](https://www.cryptocompare.com/)

**Tasks**

I did not make a Trello board for this (sad!)