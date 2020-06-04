### About

Solution to Game Closure's Code Challenge:

Create a basic clone game of Adventure Capitalist with the following requirements:

- [x] Buy and upgrade businesses. There should be several business types to choose from.
- [x] Make money from a business. (i.e. you click on a business and in a certain amount of time you get money – see web implementation above.)
- [x] Hire managers, so that money is made automatically.
- [ ] When you close the game, next time you open it, you should see the money that your businesses made for you.\*

## Available Scripts

## 👷 To run the game in the development mode

```
npm run start
```

## 🏗 To build and serve locally

```
npm run build
```

### Comments on the implementation

- The came is leveraging Phaser 3 JavaScript Game Framework and focuses fully on the front-end
- The aim was to provide a polished UI considering time constrains
- The last feature from the requirement above has been omitted due to time constraints however the game state is persistent and being saved upon closing the browser window/tab so that when the player opens the game (in the same browser) he will start from where he left off
- The game supports Desktop as well as Mobile experience

### Room for improvements

- Add Unit Testing for click/tap events, game logic
- Pack multiple images into one atlas for optimization
- Add sprite animation for better UI experience
- Optimize for mobile usage

<a href="https://naknick.com/biz-sim-game/" rel="promo video">![image](biz-sim-game-screenshot.png)</a>
