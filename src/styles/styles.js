export const coreFontFamily = {
  fontFamily: 'Verdana, "Times New Roman", Tahoma, serif'
}
export const generalPadding = {
  padding: { x: 4, y: 2 }
}
export const pointerStyle = { cursor: 'pointer' }
export const totalSumFont = {
  ...coreFontFamily,
  fontSize: 32,
  stroke: '#000',
  strokeThickness: 4
}

export const bizTitleFont = {
  ...coreFontFamily,
  fontSize: 20,
  color: '#000',
  stroke: '#fff',
  strokeThickness: 2,
  backgroundColor: '#F4E591',
  padding: { x: 8, y: 2 }
}

export const revTextFont = {
  ...coreFontFamily,
  fontSize: 15,
  color: '#fff',
  backgroundColor: '#84AF4D',
  padding: { x: 4, y: 2 }
}

export const BuyButtonFont = {
  ...coreFontFamily,
  fontSize: 18,
  color: '#fff',
  backgroundColor: '#F7131B',
  ...generalPadding
}

export const generalFont = {
  ...coreFontFamily,
  fontSize: 16,
  color: '#000'
}
export const bizAmount = {
  ...coreFontFamily,
  fontSize: 12,
  color: '#000',
  backgroundColor: '#ffffff'
}

export const enabledBizFont = {
  ...coreFontFamily,
  ...generalPadding,
  fontSize: 20,
  color: '#000',
  stroke: '#fff',
  strokeThickness: 4
}
export const disabledBizFont = {
  ...coreFontFamily,
  ...generalPadding,
  fontSize: 16,
  color: '#000',
  strokeThickness: 0
}

export const circleStyle = {
  lineStyle: { width: 3, color: 0x000000, alpha: 1 },
  fillStyle: {
    color: 0xffffff,
    alpha: 1
  }
}
