import { Geom, Scene } from 'phaser'
const { Rectangle } = Geom

const hexColors = {
  darkGray: 0x333333,
  red: 0xff2200,
  white: 0xffffff
}

export default class Boot extends Scene {
  constructor() {
    super('boot')
    this.progressBar = null
    this.progressBgRect = null
    this.progressRect = null
  }

  preload() {
    this.load.image('bg', 'images/bg.png')
    this.load.image('item-bg', 'images/item-bg_.png')
    this.load.image('biz-1', 'images/hot-dog-stand.png')
    this.load.image('biz-2', 'images/gas-station.png')
    this.load.image('biz-3', 'images/pub.png')
    this.load.image('biz-4', 'images/delivery.png')
    this.load.image('biz-5', 'images/arcade.png')
    this.load.image('biz-6', 'images/casino.png')
    this.load.image('dollar', 'images/dollar-sign.png')
    this.load.image('manager', 'images/manager.png')
    this.load.image('upgrade', 'images/upgrade.png')

    this.load.audioSprite('sfx', 'audio/effects.json', [
      'audio/effects.ogg',
      'audio/effects.mp3'
    ])

    this.load.on('progress', this.onLoadProgress, this)
    this.load.on('complete', this.onLoadComplete, this)
    this.createProgressBar()
  }

  create() {
    this.scene.start('main')
  }

  createProgressBar() {
    const main = this.cameras.main
    this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50)
    Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.5 * main.height)
    this.progressRect = Rectangle.Clone(this.progressBgRect)
    this.progressBar = this.add.graphics()
  }

  onLoadComplete(loader, totalComplete, totalFailed) {
    this.progressBar.destroy()
  }
  onLoadProgress(progress) {
    const { darkGray, red, white } = hexColors
    this.progressRect.width = progress * this.progressBgRect.width
    this.progressBar
      .clear()
      .fillStyle(darkGray)
      .fillRectShape(this.progressBgRect)
      .fillStyle(this.load.totalFailed ? red : white)
      .fillRectShape(this.progressRect)
  }
}
