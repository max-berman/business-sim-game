import { GameObjects, Geom, Math } from 'phaser'
import {
  bizTitleFont,
  revTextFont,
  BuyButtonFont,
  enabledBizFont,
  disabledBizFont,
  bizAmount,
  circleStyle,
  pointerStyle
} from '../styles/styles'

const savedProgress = JSON.parse(localStorage.getItem('progress'))

export default class Biz {
  constructor(scene, index, config) {
    this.scene = scene
    this.index = index
    this.config = config

    this.currentRev = this.scene.data.values.totalMoney

    const bizData =
      savedProgress !== null
        ? savedProgress.filter(({ id }) => id === this.config.id)[0]
        : null

    console.log(bizData, savedProgress)

    this.biz =
      bizData !== undefined && bizData !== null
        ? bizData
        : {
            id: this.config.id,
            amount: this.config.id === 'biz-1' ? 1 : 0,
            currentCost: config.initCost,
            isManagerEnabled: false,
            isBizEnabled: this.config.id === 'biz-1' // enable only first business at start
          }

    this.isBusy = false
  }

  canBuy() {
    return this.scene.data.values.totalMoney >= this.biz.currentCost
  }

  displayTooltip(x, y, text) {
    this.tooltip = this.scene.add.text(x, y, text, bizAmount).setOrigin(0.5).setAlpha(1)
  }
  removeTooltip() {
    this.tooltip.setAlpha(0)
  }

  bizActionCallback() {
    const { revenue, managerFee } = this.config
    const { totalMoney } = this.scene.data.values
    const { manager } = this.button
    this.currentRev = totalMoney + revenue * this.biz.amount
    this.scene.updateTotalSum(this.currentRev)
    this.scene.pulseNextBizPrice(this)
    this.isBusy = false
    this.scene.updateLocalStorage(this.biz)
    if (this.biz.isManagerEnabled) {
      this.handleBizAction()
    }
  }

  handleBizAction() {
    this.isBusy = true
    const { revenue, delay } = this.config
    this.icon.setAlpha(0.5)
    this.countDown = this.scene.time.delayedCall(
      delay,
      this.bizActionCallback,
      null,
      this
    )
  }

  handleBuyBiz() {
    const { coefficient } = this.config
    const { totalMoney } = this.scene.data.values
    //debugger
    this.currentRev = totalMoney - this.biz.currentCost
    this.biz.currentCost *= coefficient
    this.biz.amount += 1
    this.scene.updateTotalSum(this.currentRev)
    this.scene.pulse(this.indicator.bizAmount, { from: 1.3, to: 1 })
    this.scene.pulse(this.icon, { from: 0.8, to: 0.7 })
    this.scene.updateLocalStorage(this.biz)
  }

  init() {
    const {
      config: { title, id, initCost, revenue, managerFee },
      scene: {
        data,
        data: {
          values: { totalMoney }
        }
      },
      index,
      scene
    } = this

    const isOdd = index % 2 === 0
    const posY = index * 104
    const titleYAlign = isOdd ? posY + 104 : posY + 134
    const circle = new Geom.Circle(isOdd ? 56 : 412, posY + 167, 32)

    // Init White circular background with countdown timer
    this.circularCountdown = scene.add.graphics()
    this.iconBg = scene.add.graphics(circleStyle)
    this.iconBg.fillCircleShape(circle)

    // Business unit Background
    this.background = scene.add
      .image(isOdd ? 5 : 15, posY + 114, 'item-bg')
      .setFlipX(isOdd)
      .setOrigin(0)

    // Business unit Icon
    this.icon = scene.add
      .image(isOdd ? 50 : 370, posY + 140, id)
      .setOrigin(0)
      .setInteractive(pointerStyle)
      .setScale(0.7)
      .setAngle(isOdd ? -3 : 3)

    // Init Buttons
    this.button = {
      manager: scene.add.image(isOdd ? 420 : 24, posY + 166, 'manager'),
      buyMore: scene.add.text(240, posY + 182, 'Buy', BuyButtonFont)
    }

    // Intit Indicators
    this.indicator = {
      title: scene.add.text(isOdd ? 20 : 460, titleYAlign, title, bizTitleFont),
      revenue: scene.add.text(240, posY + 138, revenue, revTextFont),
      bizAmount: scene.add.text(
        isOdd ? 60 : 416,
        isOdd ? posY + 150 : posY + 140,
        this.biz.amount,
        bizAmount
      )
    }

    this.button.manager
      .setOrigin(0)
      .setInteractive(pointerStyle)
      .setScale(0.6)
      .setAlpha(0)
    this.indicator.title.setOrigin(isOdd ? 0 : 1).setAngle(isOdd ? -2 : 2)
    this.indicator.bizAmount.setOrigin(isOdd ? 1 : 0).setDepth(0.2)

    this.indicator.revenue
      .setOrigin(0.5)
      .setAngle(isOdd ? 1 : -1)
      .setDepth(0)
      .setDepth(1)

    this.button.buyMore
      .setOrigin(0.5)
      .setText('Buy')
      .setAlpha(0)
      .setInteractive(pointerStyle)

    this.bizPrice = scene.add
      .text(240, posY + 170, `$${initCost.toFixed(2)}`, disabledBizFont)
      .setOrigin(0.5)
      .setAngle(isOdd ? -3 : 3)
      .disableInteractive()

    /* Handling Button Events */
    this.icon
      .on('pointerdown', (e) => {
        if (this.isBusy) return
        scene.sound.playAudioSprite('sfx', 'blip', { volume: 0.4 })
        this.handleBizAction()
      })
      .on('pointerover', function (e) {
        this.setTint(0xeeeeee)
      })
      .on('pointerout', function (e) {
        this.clearTint()
      })

    this.button.manager
      .on('pointerdown', () => {
        scene.sound.playAudioSprite('sfx', 'powerup', { volume: 0.4 })
        this.biz.isManagerEnabled = true
        if (this.isBusy) return
        this.handleBizAction()
      })
      .on('pointerover', () => {
        this.button.manager.setTint(0xeeeeee)
        const posX = isOdd ? this.button.manager.x : this.button.manager.x + 30
        this.displayTooltip(
          posX,
          this.button.manager.y - 18,
          ` Hire Manager \n for ${managerFee.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })} `
        )
      })
      .on('pointerout', () => {
        this.button.manager.clearTint()
        this.removeTooltip()
      })

    this.button.buyMore
      .on('pointerdown', (e) => {
        scene.sound.playAudioSprite('sfx', 'coin', { volume: 0.4 })
        this.handleBuyBiz()
      })
      .on('pointerover', function (e) {
        this.setX(this.x + 1)
        this.setY(this.y + 1)
      })
      .on('pointerout', function (e) {
        this.setX(this.x - 1)
        this.setY(this.y - 1)
      })

    this.bizPrice
      .on('pointerdown', () => {
        scene.sound.playAudioSprite('sfx', 'powerup', { volume: 0.4 })
        this.biz.isBizEnabled = true
        this.handleBuyBiz()
        scene.bounceIn(this.container)
      })
      .on('pointerover', function (e) {
        this.setX(this.x + 1)
        this.setY(this.y + 1)
      })
      .on('pointerout', function (e) {
        this.setX(this.x - 1)
        this.setY(this.y - 1)
      })

    // Add all Business' objects into a single container
    this.container = scene.add
      .container(0, 0, [
        this.background,
        this.indicator.title,
        this.circularCountdown,
        this.iconBg,
        this.icon,
        this.button.manager,
        this.button.buyMore,
        this.indicator.revenue,
        this.indicator.bizAmount
      ])
      .setX(this.biz.amount === 0 ? (isOdd ? -500 : 500) : 0)

    if (this.biz.isManagerEnabled) {
      this.handleBizAction()
    }
  }

  callBackUpdate() {}

  update(time, delta) {
    const {
      config: { revenue, title, id, initCost, delay, managerFee },
      button: { buyMore, manager },
      biz: { amount },
      indicator,
      bizPrice,
      icon,
      circularCountdown,
      index,
      countDown
    } = this

    const isOdd = index % 2 === 0
    const posY = index * 104

    const buyLabel = this.canBuy()
      ? `Buy ${title} for $${initCost.toFixed(2)}`
      : `${title} - $${initCost.toFixed(2)}`

    indicator.revenue.setText(
      (amount * revenue).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    )
    // apply a bit of transparency for disabled icon
    icon.setAlpha(amount > 0 && !this.isBusy ? 1 : 0.9)
    buyMore
      .setText(`Buy x 1 - $${this.biz.currentCost.toFixed(2)}`)
      .setAlpha(this.canBuy() ? 1 : 0)

    bizPrice
      .setText(buyLabel)
      .setAlpha(!this.biz.isBizEnabled)
      .setStyle(this.canBuy() ? enabledBizFont : disabledBizFont)

    indicator.bizAmount.setText(amount)

    if (this.canBuy()) {
      bizPrice.setInteractive(pointerStyle)
    }

    if (amount > 0 && !this.isBusy) {
      icon.setInteractive(pointerStyle)
    } else {
      icon.disableInteractive()
    }

    if (this.currentRev >= managerFee) {
      if (this.biz.isManagerEnabled) {
        manager.setAlpha(0.5)
        manager.disableInteractive()
      } else {
        //this.scene.pulse(manager, { from: 0.7, to: 0.6 })
        manager.setAlpha(1)
      }
    }

    // Render countdown only when it's dispatched
    if (countDown !== undefined && !countDown.hasDispatched) {
      const delayInSec = delay * 0.001
      const startAngle = -90
      const endAngle = startAngle + (countDown.getElapsedSeconds() * 360) / delayInSec
      circularCountdown.clear()
      circularCountdown.lineStyle(3, 0x85ae53, 1)
      circularCountdown.beginPath()
      circularCountdown.arc(
        isOdd ? 56 : 412,
        posY + 167,
        35,
        Math.DegToRad(startAngle),
        Math.DegToRad(endAngle),
        false
      )
      circularCountdown.strokePath()
    }
  }
}
