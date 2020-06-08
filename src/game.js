import { AUTO, Scale, Game } from 'phaser'

import Boot from './scenes/Boot'
import Main from './scenes/Main'

const config = {
  title: 'Adv. Capitalist',
  backgroundColor: '#fdd80d',
  type: AUTO,
  antialias: true,
  canvasStyle: null,
  disableContextMenu: true,
  banner: false,
  loader: {
    path: 'assets/'
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
    width: 480,
    height: 740
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  fps: {
    forceSetTimeOut: true,
    panicMax: 0,
    smoothStep: false,
    target: 24
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      debugBodyColor: 0xffffff,
      debugShowBody: true,
      debugShowVelocity: true,
      debugStaticBodyColor: 0x00ff00,
      useTree: true,
      gravity: {
        y: 0
      }
    }
  },
  scene: [Boot, Main]
}

export default new Game(config)
