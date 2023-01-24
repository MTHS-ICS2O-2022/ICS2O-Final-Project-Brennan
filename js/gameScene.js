/* global Phaser */

// Copyright (c) 2022 Brennan Lee All rights reserved
//
// Created by: Brennan Lee
// Created on: nov 2022
// This is Game Scene

/**
 * This class is the Game Scene.
 */

class GameScene extends Phaser.Scene {
  // crate an alien
  createDot() {
    const dotXLocation = Math.floor(Math.random() * 1920) + 1; // this will get a number between 1 and 1920;
    let dotXVelocity = Math.floor(Math.random() * 50) + 1; // this will get a number between 1 and 50;
    dotXVelocity *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    const Dot = this.physics.add
      .sprite(dotXLocation, -100, "dot")
      .setScale(0.05);
    Dot.body.velocity.y = 200;
    Dot.body.velocity.x = dotXVelocity;
    this.dotGroup.add(Dot);
  }

  createGhost() {
    const ghostXLocation = Math.floor(Math.random() * 1920) + 1; // this will get a number between 1 and 1920;
    let ghostXVelocity = Math.floor(Math.random() * 50) + 1; // this will get a number between 1 and 50;
    ghostXVelocity *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    const Ghost = this.physics.add
      .sprite(ghostXLocation, -100, "ghost")
      .setScale(0.35);
    Ghost.body.velocity.y = 200;
    Ghost.body.velocity.x = ghostXVelocity;
    this.ghostGroup.add(Ghost);
  }

  constructor() {
    super({ key: "gameScene" });

    this.background = null;
    this.ship = null;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    };
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a");
  }

  preload() {
    console.log("Game Scene");

    // images
    this.load.image("binary", "./assets/code.jpg");
    this.load.image("ship", "./assets/pacman-png-9.png");
    this.load.image("ghost", "./assets/2469744-pinky.png");
    this.load.image("dot", "./assets/dots.png");
    // sound
    this.load.audio("eat", "./assets/pacman_chomp.wav");
    this.load.audio("death", "./assets/death.wav");
  }

  create(data) {
    this.background = this.add.image(0, 0, "binary").setScale(3.8);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    );

    this.ship = this.physics.add
      .sprite(1920 / 2, 1080 - 100, "ship")
      .setScale(0.175);

    // crate a group for the dot

    this.dotGroup = this.add.group();
    this.createDot();

    this.ghostGroup = this.add.group();
    this.createGhost();

    // create a group for the dot
    this.physics.add.collider(
      this.ship,
      this.dotGroup,
      function (shipCollide, dotCollide) {
        dotCollide.destroy();
        this.sound.play("eat");
        this.score = this.score + 1;
        this.scoreText.setText("Score: " + this.score.toString());
        this.createDot();
        this.createDot();
      }.bind(this)
    );

    this.physics.add.collider(
      this.ship,
      this.ghostGroup,
      function (shipCollide, ghostCollide) {
        this.sound.play("death");
        this.physics.pause();
        ghostCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keyupObj = this.input.keyboard.addKey("up");
    const keydownObj = this.input.keyboard.addKey("down");

    if (keyLeftObj.isDown === true) {
      this.ship.x = this.ship.x - 15;
      if (this.ship.x < 0) {
        this.ship.x = 2000;
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x = this.ship.x + 15;
      if (this.ship.x > 1920) {
        this.ship.x = -100;
      }
    }

    if (keyupObj.isDown === true) {
      this.ship.y = this.ship.y - 15;
      if (this.ship.y < 0) {
        this.ship.y = 1080;
      }
    }

    if (keydownObj.isDown === true) {
      this.ship.y = this.ship.y + 15;
      if (this.ship.y > 1080) {
        this.ship.y = 0;
      }
    }
    this.ghostGroup.children.each(function(respawn) {
      if (respawn.y > 1200) {
        respawn.y = -100;
      }

      if (respawn.x > 1920) {
        respawn.x = -100
        this.createGhost()
      }
    })
  }
}

export default GameScene;
