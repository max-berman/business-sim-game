import { Geom, Scene } from 'phaser'
import Biz from '../biz/Biz'
import bizUnits from '../biz/bizUnitsConfig'
import _uniqBy from 'lodash/uniqBy'

import { totalSumFont } from '../styles/styles'

const bizInstances = []
const total = 0

export default class Main extends Scene {
  constructor() {
    super('main')
  }

  updateTotalSum(sum) {
    const totalSumFormatted = sum.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    this.data.set('totalMoney', sum)
    this.totalIndicator.setText(totalSumFormatted)
    window.document.title = sum.toFixed(2)
    if (typeof localStorage !== undefined) {
      localStorage.setItem('total', sum)
    }
  }

  updateLocalStorage(biz) {
    if (typeof localStorage !== undefined) {
      const savedProgress = JSON.parse(localStorage.getItem('progress'))
      const progress = savedProgress === null ? [biz] : [biz, ...savedProgress]
      localStorage.setItem('progress', JSON.stringify(_uniqBy(progress, 'id')))
    }
  }

  init(data) {
    const savedTotal = JSON.parse(localStorage.getItem('total'))
    if (typeof localStorage !== undefined && savedTotal !== null) {
      this.data.set('totalMoney', savedTotal)
    } else {
      this.data.set('totalMoney', total)
    }
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
    const { totalMoney } = this.data.values
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(1)
    this.audioSprite = this.sound.addAudioSprite('sfx')
    this.audioSprite.stop()

    this.totalIndicator = this.add.text(80, 30, '', totalSumFont).setOrigin(0).setDepth(1)

    this.updateTotalSum(totalMoney)

    bizUnits.forEach((config, i) => {
      bizInstances[i] = new Biz(this, i, config)
      bizInstances[i].init()
    })
  }
  update() {
    bizInstances.forEach((instance, i) => {
      const {
        biz: { isBizEnabled }
      } = instance

      // to avoid unnecessary update loop on disabled instance
      if (isBizEnabled) {
        instance.update()
        if (bizInstances.length === i + 1) return
        bizInstances[i + 1].update()
      }
    })
  }
}
