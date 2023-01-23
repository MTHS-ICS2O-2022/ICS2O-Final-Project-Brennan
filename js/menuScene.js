/* global Phaser */

// Copyright (c) 2022 Brennan Lee All rights reserved
//
// Created by: Brennan Lee
// Created on: nov 2022
// This is Menu Scene

/**
 * This class is the Menu Scene
 */
class MenuScene extends Phaser.Scene {
  /**
   * This method is the construtor.
   */
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  /**
   * Can be defined on your own scenes
   * This mathod is called by the Scene Manager when  the scene starts,
   *  before preload() and crate().
   *  @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff");
  }

  /**
   * can be defined on your own scenes.
   * use it to load assets.
   */
  preload() {
    console.log("Menu Scene");
    this.load.image(
      "menuSceneBackground",
      "./assets/decimos-partida-perfecta-pac-man (3).jpg");
    this.load.image("startButton", "./assets/Start-Button-Vector-PNG.png");
  }

  /**
   * can be defined on your own scene.
   * use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "menuSceneBackground"
    );
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1280 / 2;

    this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 100, "startButton");
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", () => this.clickButton());
  }

  /**
   * this should beoverridden by your own Scenes.
   * This mathod is called once per game step while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    // pass
  }

  clickButton() {
    this.scene.start("gameScene");
  }
}

export default MenuScene;
