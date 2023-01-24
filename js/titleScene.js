/* global Phaser */

// Copyright (c) 2022 Brennan Lee All rights reserved
//
// Created by: Brennan Lee
// Created on: nov 2022
// This is title Scene

/**
 *  This is the Title Scene.
 */
class TitleScene extends Phaser.Scene {
  /**
   * This is the construtor.
   */
  constructor() {
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStlye = {
      font: "200px Times",
      fill: "#fde4b9",
      align: "center",
    }
  }

  /**
   * can be definded on your own scenes.
   * this mathod is called by the scene manager when the scene starts,
   * before payload() and crate().
   * @param {object} data - any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor("FFFFFF")
  }

  /**
   * this can be definded on your own scenes.
   * use it to load assets.
   */
  preload() {
    console.log("Tittle Scene")
    this.load.image("titleSceneBackground", "./assets/pacman.png")
  }

  /**
   * can be defined on your own scene.
   * use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.titleSceneBackgroundImage = this.add
      .sprite(0, 0, "titleSceneBackground")
      .setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1580 / 2

    this.titleSceneText = this.add
      .text(1920 / 2, 1080 / 2 + 350, "pac man", this.titleSceneTextStlye)
      .setOrigin(0.5)
  }

  /**
   * this can be definded on your own scenes.
   * use it to crate your game objects.
   * @param {number} time - current time
   * @param {number} delta - the delta time in ms since last frame.
   */
  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("menuScene")
    }
  }
}
export default TitleScene
