import Phaser, { Geom } from 'phaser'
import Biz from '../biz/Biz'
import bizUnits from '../biz/bizUnitsConfig'

import { totalSumFont } from '../styles/styles'

let total
const bizInstances = []

export default class Main extends Phaser.Scene {
  constructor() {
    super('main')
  }

  init(data) {
    this.data.set('totalMoney', 20900)
  }

  pulseNextBizPrice({ index }) {
    // Tween Price indicator only if the business is available
    if (bizInstances[index + 1] === undefined) return
    if (bizInstances[index + 1].canBuy())
      this.tween = this.tweens.add({
        targets: bizInstances[index + 1].bizPrice,
        scale: { from: 1, to: 1.2 },
        ease: 'Power1',
        duration: 200,
        repeat: 1
      })
  }

  bounceIn(targets) {
    this.tween = this.tweens.add({
      targets,
      props: {
        x: { value: 0, duration: 600, ease: 'Bounce.easeOut' }
      },
      repeat: 0
    })
  }

  pulse(targets, scale) {
    this.tween = this.tweens.add({
      targets,
      scale,
      ease: 'Elastic',
      duration: 200,
      repeat: 0
    })
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(1)
    this.audioSprite = this.sound.addAudioSprite('sfx')
    this.audioSprite.stop()

    this.totalIndicator = this.add
      .text(80, 28, this.data.values.totalMoney, totalSumFont)
      .setOrigin(0)
      .setDepth(1)

    bizUnits.forEach((config, i) => {
      bizInstances[i] = new Biz(this, i, config)
      bizInstances[i].init()
    })
  }
  update() {
    const { totalMoney } = this.data.values
    const total = totalMoney.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    bizInstances.forEach((biz, i) => {
      const { isBizEnabled, index } = biz
      if (isBizEnabled) {
        biz.update()
        if (bizInstances.length === i + 1) return
        bizInstances[i + 1].update()
      }
    })

    this.totalIndicator.setText(total)
    window.document.title = total
  }
}
