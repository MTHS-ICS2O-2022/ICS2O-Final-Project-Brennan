/* global Phaser */

// Copyright (c) 2023 Brennan Lee All rights reserved
//
// Created by: Brennan Lee
// Created on: jan 2023
// This is Splash Scene

/**
 * this class is the splash scene.
 */
class SplashScene extends Phaser.Scene {
  /**
   * This mathod is the construtor.
   */
  constructor() {
    super({ key: "splashScene" });

    this.SplashSceneBackgroundImage = null;
  }

  /**
   * Can be defined on your own scenes
   * This mathod is called by the Scene Manager when  the scene start,
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
    console.log("Splash Scene");
    this.load.image(
      "splashSceneBackground",
      "./assets/Screenshot 2023-01-10 13.53.33.png (4)"
    );
    this.load.audio("pacman-beginning", "./assets/Pac-Man-Theme-Song.wav");
  }

  /**
   * can be defined on your own scene.
   * use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.SplashSceneBackgroundImage = this.add.sprite(
      0,
      0,
      "splashSceneBackground"
    );
    this.SplashSceneBackgroundImage.x = 1920 / 2;
    this.SplashSceneBackgroundImage.y = 1580 / 2;
    this.sound.play("pacman-beginning");
  }

  /**
   * this should beoverridden by your own Scenes.
   * This mathod is called once per game step while the scene is running.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch("titleScene");
    }
  }
}

export default SplashScene;
3;
