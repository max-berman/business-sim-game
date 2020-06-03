import Phaser from 'phaser'

import Boot from './scenes/Boot'
import Main from './scenes/Main'

const config = {
  title: 'Adv. Capitalist',
  backgroundColor: '#fdd80d',
  type: Phaser.AUTO,
  antialias: true,
  canvasStyle: null,
  disableContextMenu: true,
  banner: false,
  loader: {
    path: 'assets/'
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 740
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
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

export default new Phaser.Game(config)
