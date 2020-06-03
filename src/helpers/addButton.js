const addButton = (scene, x, y, text, font) =>
  scene.rexUI.add
    .textBox({
      x,
      y,
      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 2, 2, 0xf7131b)
        .setStrokeStyle(2, 0x333333),
      icon: scene.rexUI.add.roundRectangle(0, 0, 4, 4, 4, 0x333333),
      iconMask: false,
      orientation: 0,
      text: scene.add.text(0, 0, text, font),
      space: {
        left: 4,
        right: 4,
        top: 4,
        bottom: 4,
        icon: 6,
        text: 0
      }
    })
    .layout()

export default addButton
