"use client";

import { useContext, useEffect, useRef } from "react";
import { Application, Sprite, Assets, AnimatedSprite, Text, Container, NineSlicePlane, Point } from "pixi.js";
import { GifSprite } from 'pixi.js/gif';
import gsap from "gsap";
import { ContractContext } from "@/contexts/ContractContext";
import { io } from "socket.io-client";

const GameComponent = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null); // Use ref to persist app instance
  const socketRef = useRef(null);
  const players = useRef({});
  const playersWalking = useRef({})
  const userPos = useRef({})
  const { activeRoom, setActiveRoom, quickChat, setQuickChat, setAirTokBot, activeRoomRef, setShowChatIcon, user } = useContext(ContractContext);
  const rotationIndex = useRef(0)
   
  useEffect(() => {
    let isMounted = true; // Track mounting state
    let currentAvatarAngle = 0;
    let animating = false;
    let gsapanimation;
    const access_token = window.localStorage.getItem("access_token");

    const socket = io("https://api.gundys.world", {
      auth: { access_token }
    });
    socketRef.current = socket;
    const initApp = async () => {
      try {


        // Initialize Application
        const app = new Application();
        await app.init({
          width: 1400,
          height: 800,
          backgroundColor: "white",
        });

        // Store app in ref
        if (isMounted) {
          appRef.current = app;

          // Append canvas to DOM
          if (!app.canvas) {
            throw new Error("Canvas is undefined after initialization");
          }
          canvasRef.current.appendChild(app.canvas);

          // Load texture and create sprite
          const texture = await Assets.load("/assets/mainbg.png");
          const mainbg = new Sprite(texture);
          mainbg.x = 0;
          mainbg.y = 0;
          mainbg.width = app.screen.width; // Fit screen width
          mainbg.height = app.screen.height; // Fit screen height
          mainbg.zIndex = 0; // Fit screen height
          mainbg.visible = false;
          app.stage.addChild(mainbg);



          const banktexture = await Assets.load("/assets/bankbg.png");
          const bankbg = new Sprite(banktexture);
          bankbg.x = 0;
          bankbg.y = 0;
          bankbg.width = app.screen.width; // Fit screen width
          bankbg.height = app.screen.height; // Fit screen height
          bankbg.zIndex = 0; // Fit screen height
          bankbg.visible = false;
          app.stage.addChild(bankbg);

          const aitoktexture = await Assets.load("/assets/AirTok.png");
          const airtokAvatar = new Sprite(aitoktexture);
          airtokAvatar.x = 650;
          airtokAvatar.y = 550;
          airtokAvatar.scale = 0.3;
          // airtokAvatar.width = app.screen.width; // Fit screen width
          // airtokAvatar.height = app.screen.height; // Fit screen height
          airtokAvatar.zIndex = 9999; // Fit screen height
          airtokAvatar.visible = false;

          app.stage.addChild(airtokAvatar);

          const bubbleTexture = await Assets.load("/assets/chat_bubble.png");

          // Create a resizable background using 9-slice scaling
          const bubble = new NineSlicePlane(bubbleTexture, 15, 15, 15, 15);
          // These 4 values are your left, top, right, bottom edge slices
          bubble.name = "bubble";
          bubble.scale = 0.08
          bubble.anchor = new Point(0.2, 0.7);
    


          const bgTexture = await Assets.load('/assets/landing.png');
          const bg = new Sprite(bgTexture);
          bg.width = app.screen.width; // Fit screen width
          bg.height = app.screen.height; // Fit screen height

          bg.zIndex = -1; // Fit screen height
          app.stage.addChild(bg); // Add background first (so it's behind everything)


          const source = await Assets.load('/assets/loader.gif');
          const animatedBarSprite = new GifSprite({ source, anchor: 0.5 });

          animatedBarSprite.x = app.screen.width / 2; // Center inside the box
          animatedBarSprite.y = app.screen.height - app.screen.height / 6;
          animatedBarSprite.scale = 0.3
          animatedBarSprite.animationSpeed = 1.8; // Make animation faster
          animatedBarSprite.zIndex = 0;
          app.stage.addChild(animatedBarSprite);


          const playerContainer = new Container();
          const sheet = await Assets.load('/assets/texture.json');

          // Create an AnimatedSprite using frames
          const animation = new Sprite(sheet.textures["0.png"]);
          console.log(animation)
          animation.scale = 0.08


          // playerContainer.sprite = animation


          playerContainer.addChild(animation);
          // playerContainer.addChild(quickChatContainer);

          playerContainer.x = 650;
          playerContainer.y = 400;
          playerContainer.zIndex = 99;
          playerContainer.visible = false;
          playerContainer.name = 'player';
          app.stage.addChild(playerContainer);
          // const nameText = new Text("Player123", {
          //   fontSize: 14,
          //   fill: 0xffffff
          // });
          // nameText.anchor.set(0.5, 1);
          // nameText.y = 400;
          // app.stage.addChild(nameText);


          // app.stage.addChild(animation);
          // Function to get the correct mouse position relative to the canvas
          function getMousePos(event) {
            const rect = app.canvas.getBoundingClientRect(); // Get canvas position
            const mouseX = event.clientX - rect.left; // Adjust X
            const mouseY = event.clientY - rect.top;  // Adjust Y
            return { x: mouseX, y: mouseY };
          }

          function getAngleBetweenPoints(x1, y1, x2, y2) {

            let angleRad = Math.atan2(y2 - y1, x2 - x1); // Get angle in radians
            let angleDeg = angleRad * (180 / Math.PI);  // Convert to degrees
            return (angleDeg + 360) % 360;  // Ensure the angle is between 0-360°
          }

          function updateSpriteRotation(event) {
            const { x: mouseX, y: mouseY } = getMousePos(event);
            // Calculate angle in radians and convert to degrees
            let angle = getAngleBetweenPoints(mouseX, mouseY, playerContainer.x + 25, playerContainer.y + 50);

            // Ensure angle is positive (0-360)
            if (angle < 0) angle += 360;
            // Determine which frame to use based on the closest angle
            const frameIndex = Math.round(angle / 45);
            rotationIndex.current = frameIndex
            // console.log(angle, frameIndex)

            const rotationFrames = [
              "0.png",
              "45.png",
              "90.png",
              "135.png",
              "180.png",
              "225.png",
              "270.png",
              "315.png",
              "0.png"
            ]
            currentAvatarAngle = frameIndex;
            // socket.emit("rotate", {angle: frameIndex});

            playerContainer.children[0].texture = sheet.textures[rotationFrames[frameIndex]];
          }



          const WalkingSprites = []; // Store all sprites here

          for (let angle = 0; angle <= 315; angle += 45) {
            const sheet = await Assets.load(`/assets/${angle}Walk.json`);
            const frames = [];

            // for (let i = 1; i <= 7; i++) {
            //     frames.push(sheet.textures[`${i}.png`]);
            // }
            for (let i = 1; i <= 30; i++) {
              frames.push(sheet.textures[`Walk${i}.png`]);
            }
            // console.log("WalkingSprites", angle,frames)

            // Create an AnimatedSprite
            const sprite = new AnimatedSprite(frames);

            // Set animation properties
            sprite.animationSpeed = 1;
            sprite.loop = true;
            sprite.scale = 0.08;

            // sprite.x = playerContainer.x;
            // sprite.y = playerContainer.y;
            sprite.visible = false;

            // playerContainer.addChild(sprite);

            // Store it in an object with its angle as the key
            WalkingSprites.push(sprite);
          }



          // Listen for mouse movement
          app.stage.addEventListener('mousemove', updateSpriteRotation);



          app.stage.eventMode = 'static';
          app.stage.hitArea = app.screen;

          const restrictedArea = [
            { "x": 100.0234375, "y": 400.1484375 },
            { "x": 10.0234375, "y": 498.1484375 },
            { "x": 170.0234375, "y": 601.1484375 },
            { "x": 277.796875, "y": 737.75390625 },
            { "x": 1388, "y": 785.9375 },
            { "x": 1388, "y": 605.9375 },
            { "x": 1016, "y": 380 },
            { "x": 532, "y": 402 },

          ];

          // Check if a point is inside the polygon (Ray-Casting Algorithm)
          function isPointInPolygon(point, polygon) {
            let intersects = 0;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
              let xi = polygon[i].x, yi = polygon[i].y;
              let xj = polygon[j].x, yj = polygon[j].y;

              let intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);
              if (intersect) intersects++;
            }
            return intersects % 2 !== 0; // Odd = inside, Even = outside
          }

          const airtok = [
            { "x": 650, "y": 550 },
            { "x": 730, "y": 550 },
            { "x": 730, "y": 710 },
            { "x": 650, "y": 710 }
          ]
          const baseCity = [
            { "x": 1065, "y": 281 },
            { "x": 1140, "y": 257 },
            { "x": 1299, "y": 291 },
            { "x": 1325, "y": 344 },
            { "x": 1065, "y": 281 }
          ]

          const backtoLanding = [
            { "x": 43, "y": 416 },
            { "x": 141, "y": 395 },
            { "x": 200, "y": 437 },
            { "x": 104, "y": 572 },
            { "x": 3, "y": 516 },
            { "x": 43, "y": 416 },
          ]

          const bankGate = [
            { "x": 981, "y": 282 },
            { "x": 1054, "y": 293 },
            { "x": 1033, "y": 457 },
            { "x": 943, "y": 435 },
          ]

          const bankBack = [
            { "x": 64, "y": 97 },
            { "x": 572, "y": 98 },
            { "x": 68, "y": 558 },
            { "x": 551, "y": 556 },
          ]

          const LandingrestrictedArea = [
            { "x": 4, "y": 255 },
            { "x": 390, "y": 232 },
            { "x": 423, "y": 381 },
            { "x": 947, "y": 341 },
            { "x": 1139, "y": 260 },
            { "x": 1294, "y": 284 },
            { "x": 1323, "y": 352 },
            { "x": 1393, "y": 732 },
            { "x": 9, "y": 732 },
            { "x": 4, "y": 255 },

          ]
          app.stage.addEventListener('pointerdown', (e) => {
            console.log("plot room", activeRoomRef.current)
            if (activeRoomRef.current == "landing") {

              const newX = e.global.x;
              const newY = e.global.y
              const distance = Math.hypot(newX - playerContainer.x, newY - playerContainer.y);

              // Compute duration dynamically (seconds)
              const duration = distance / 100;
              console.log("plot landing", e.global.x, e.global.y)
              if (isPointInPolygon({ x: newX, y: newY }, airtok)) {
                setAirTokBot(true);
                return false;
              }
              if (isPointInPolygon({ x: newX, y: newY }, baseCity)) {
                console.log("plot found", e.global.x, e.global.y)
                setTimeout(() => {
                  playerContainer.x = 168
                  playerContainer.y = 428
                  playerContainer.visible = true;
                  mainbg.visible = true;

                  setActiveRoom("base")
                }, duration * 1000);

              }


              if (isPointInPolygon({ x: newX, y: newY }, LandingrestrictedArea)) {
                if (animating) {
                  gsapanimation.pause(); // Stop animation without destroying it
                  let target = gsapanimation.targets()[0]; // Get the animated element
                  playerContainer.x = gsap.getProperty(target, "x"); // Get the last 'x' position
                  playerContainer.y = gsap.getProperty(target, "y"); // Get the last 'y' position
                  console.log("gsap", playerContainer.x, playerContainer.y);
                  if (playerContainer.getChildByName('walking')) {
                    playerContainer.removeChild(playerContainer.getChildByName('walking'))
                  }


                  // const WalkingSprites = 
                  // WalkingSprites.forEach(sprite => {
                  //   sprite.visible = false;
                  //   sprite.x = playerContainer.x ;
                  //   sprite.y = playerContainer.y ;
                  //   sprite.stop();
                  // })
                }
                animating = true;
                // playerContainer.visible = false;
                // console.log("currentAvatarAngle",currentAvatarAngle,WalkingSprites[currentAvatarAngle],WalkingSprites)
                // const WalkingSprites = [WalkingSprites_0, WalkingSprites_1, WalkingSprites_2];
                let _currentAvatarAngle = currentAvatarAngle < 8 ? currentAvatarAngle : 0
                // if (WalkingSprites[_currentAvatarAngle]) {
                //   let sprite = WalkingSprites[_currentAvatarAngle];
                //   sprite.visible = true;
                //   sprite.play();

                playerContainer.children[0].visible = false;
                WalkingSprites[_currentAvatarAngle].name = 'walking'
                playerContainer.addChild(WalkingSprites[_currentAvatarAngle]);
                if (playerContainer.getChildByName("walking")) {
                  playerContainer.getChildByName("walking").play();
                  playerContainer.getChildByName("walking").visible = true;

                }

                socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: activeRoomRef.current, quickChat: quickChat , act: "move"});

                gsapanimation = gsap.to(playerContainer, {
                  duration: duration,
                  x: newX - 25,
                  y: newY - 50,
                  ease: "none",

                  onComplete: () => {
                    playerContainer.children[0].visible = true;
                    playerContainer.removeChild(playerContainer.getChildByName("walking"))
                    //   WalkingSprites.forEach(sprite => {
                    //     sprite.visible = false;

                    //     sprite.stop();
                    //     if(isPointInPolygon({ x: newX, y: newY }, baseCity)){
                    //       playerContainer.x = 162;
                    //       playerContainer.y = 428;
                    //       sprite.x = 162;
                    //       sprite.y = 428;
                    //     }
                    //     else{
                    //       sprite.x = newX - 25;
                    //     sprite.y = newY - 50;
                    //     }
                    // });
                    playerContainer.x = newX - 25;
                    playerContainer.y = newY - 50;
                    socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: 'landing', quickChat: quickChat , act: "move"});
                    if (isPointInPolygon({ x: newX, y: newY }, baseCity)) {
                      playerContainer.x = 162;
                      playerContainer.y = 428;
                        socket.emit("move", { x: 162, y: 428, angle: _currentAvatarAngle, activeRoom: 'base', quickChat: quickChat , act: "resposition"});
                        setActiveRoom("base")

                      // WalkingSprites[_currentAvatarAngle].x = 162;
                      // WalkingSprites[_currentAvatarAngle].y = 428;
                    }
                    // playerContainer.visible = true;
                    animating = false;

                  }
                });

                // }
                setTimeout(() => {

                }, duration * 1000);




              }

            }

            if (activeRoomRef.current == "base") {

              console.log("plot base", e.global.x, e.global.y)
              const newX = e.global.x;
              const newY = e.global.y
              // Calculate distance
              const distance = Math.hypot(newX - playerContainer.x, newY - playerContainer.y);
              if (isPointInPolygon({ x: newX, y: newY }, airtok)) {
                setAirTokBot(true);
                return false;
              }
              // Compute duration dynamically (seconds)
              const duration = distance / 100;
              if (isPointInPolygon({ x: newX, y: newY }, backtoLanding)) {
                setTimeout(() => {
                  playerContainer.visible = false;
                  mainbg.visible = false;
                  bankbg.visible = false;
                  setActiveRoom("landing")

                }, duration * 1000);
              }

              if (isPointInPolygon({ x: newX, y: newY }, bankGate)) {
                setTimeout(() => {
                  playerContainer.visible = false;
                  mainbg.visible = false;
                  bankbg.visible = true;
                  setActiveRoom("bank")

                }, duration * 1000);
              }


              if (isPointInPolygon({ x: newX, y: newY }, restrictedArea)) {
                // playerContainer.visible = false;
                if (animating) {
                  gsapanimation.pause(); // Stop animation without destroying it
                  let target = gsapanimation.targets()[0]; // Get the animated element
                  playerContainer.x = gsap.getProperty(target, "x"); // Get the last 'x' position
                  playerContainer.y = gsap.getProperty(target, "y"); // Get the last 'y' position
                  console.log("gsap", playerContainer.x, playerContainer.y)
                 
                  if (playerContainer.getChildByName('walking')) {
                    playerContainer.removeChild(playerContainer.getChildByName('walking'))
                  }

                  //   WalkingSprites.forEach(sprite => {
                  //     sprite.visible = false;
                  //     sprite.x = playerContainer.x ;
                  //     sprite.y = playerContainer.y ;
                  //     sprite.stop();
                  // });
                }
                animating = true;
                // console.log("currentAvatarAngle",currentAvatarAngle,WalkingSprites[currentAvatarAngle],WalkingSprites)
                // const WalkingSprites = [WalkingSprites_0, WalkingSprites_1, WalkingSprites_2];
                let _currentAvatarAngle = currentAvatarAngle < 8 ? currentAvatarAngle : 0
                // if (WalkingSprites[_currentAvatarAngle]) {
                //   let sprite = WalkingSprites[_currentAvatarAngle];
                //   sprite.visible = true;
                //   sprite.play();

                playerContainer.children[0].visible = false;
                WalkingSprites[_currentAvatarAngle].name = 'walking'
                playerContainer.addChild(WalkingSprites[_currentAvatarAngle]);
                if (playerContainer.getChildByName('walking')) {
                  playerContainer.getChildByName('walking').play();
                  playerContainer.getChildByName('walking').visible = true;
                }

                socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: activeRoomRef.current, quickChat: quickChat , act: "move"});

                gsapanimation = gsap.to(playerContainer, {
                  duration: duration,
                  x: newX - 25,
                  y: newY - 50,
                  ease: "none",
                  onComplete: () => {
                    //   WalkingSprites.forEach(sprite => {
                    //     sprite.visible = false;
                    //     if(isPointInPolygon({x: newX, y: newY}, backtoLanding)){
                    //       sprite.x = 1245;
                    //       sprite.y = 241;
                    //     }
                    //     else{
                    //       sprite.x = newX - 25;
                    //       sprite.y = newY - 50;
                    //     }

                    //     sprite.stop();
                    // });
                    playerContainer.children[0].visible = true;
                    playerContainer.removeChild(playerContainer.getChildByName("walking"))
                    socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: 'base', quickChat: quickChat , act: "move"});
                    if (isPointInPolygon({ x: newX, y: newY }, backtoLanding)) {
                      playerContainer.x = 1299 - 55
                      playerContainer.y = 291 - 50
                      socket.emit("move", { x: 1299 - 55, y: 291 - 50, angle: _currentAvatarAngle, activeRoom: 'landing', quickChat: quickChat , act: "resposition"});
                      setActiveRoom('landing')

                      // WalkingSprites[_currentAvatarAngle].x = 1245;
                      // WalkingSprites[_currentAvatarAngle].y = 241;
                    }
                    else {
                      playerContainer.x = newX - 25;
                      playerContainer.y = newY - 50;
                      socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: 'base', quickChat: quickChat , act: "move"});
                    }
                    if (isPointInPolygon({ x: newX, y: newY }, bankGate)) {
                      playerContainer.visible = false;
                      socket.emit("move", { x: newX - 25, y: newY - 50, angle: _currentAvatarAngle, activeRoom: 'bank', quickChat: quickChat , act: "resposition"});
                      setActiveRoom('bank')

                    }
                    else {
                      playerContainer.visible = true;

                    }
                    animating = false;

                  }
                });

                // }
                //   setTimeout(() => {

                // }, duration * 1000);




              }
            }


            if (activeRoomRef.current == "bank") {
              console.log("plot bank", e.global.x, e.global.y)
              const newX = e.global.x;
              const newY = e.global.y
              // Calculate distance
              const distance = Math.hypot(newX - animation.x, newY - animation.y);

              // Compute duration dynamically (seconds)
              const duration = distance / 100;
              if (isPointInPolygon({ x: newX, y: newY }, bankBack)) {
                setTimeout(() => {
                  playerContainer.visible = true;
                  mainbg.visible = true;
                  bankbg.visible = false;
                  setActiveRoom("base")

                }, duration * 1000);
              }
            }
            // avatar.position.copyFrom(e.global);
          });
          setTimeout(() => {
            // animatedSprite.visible = false;
            // bg.visible = false;
            animatedBarSprite.visible = false;
            playerContainer.visible = true;
            airtokAvatar.visible = true

            // app.stage.addChild(avatar); // Add background first (so it's behind everything)

            const adBanner = document.getElementById("adBanner");
            if (adBanner) {
              adBanner.style.visibility = "visible";
            }

            // const chabubble = document.getElementById("chatIconLeft");
            // if(chabubble){
            //   chabubble.style.visibility = "visible";
            // }`
            setShowChatIcon(true)
            const menubar = document.getElementById("menubar");
            if (menubar) {
              menubar.style.visibility = "visible";
            }
            socket.emit("move", { x: 650, y: 400, angle: 6, activeRoom: activeRoomRef.current, quickChat: quickChat , act: "move"});

            appRef.current = app;

          }, 2500)

          socket.on("playersUpdate", async (data) => {
            if (!app) {
              return;
            }
            for (const id in data) {
              if (id === user._id) continue;
              const pos = data[id];
              
              console.log('activeRoom',activeRoomRef.current)

              const _rotationFrames = [
                "0.png",
                "45.png",
                "90.png",
                "135.png",
                "180.png",
                "225.png",
                "270.png",
                "315.png",
                "0.png"
              ]
              if (!players.current[id] && pos.activeRoom == activeRoomRef.current) {

                const p = new Container()

                const s = new Sprite(sheet.textures[_rotationFrames[6]]);

                s.scale = 0.08

                p.x = pos.x ;
                p.y = pos.y;
                s.name = 'player'
                p.zIndex = 99;
                p.addChild(s)

                const quickChatContainer = new Container();


                const nameText = new Text(pos.quickChat, {
                  fontSize: 16,
                  wordWrap: true,
                  align: "center",
                  wordWrapWidth: 10,
                  fill: 0x000000
                });
                nameText.anchor.set(0.1, 1);
                // nameText.y = -5;
                nameText.name = 'quickchattext'
                // const bounds = nameText.getLocalBounds();
                // nameText
                bubble.width = 2200
                bubble.height = pos.quickChat ? pos.quickChat.length > 20 ? 1000 : 500 : 500
                quickChatContainer.name = 'quickchat'
                quickChatContainer.addChild(bubble)
                quickChatContainer.addChild(nameText)
                quickChatContainer.visible = pos.quickChat && pos.quickChat != "" ? true : false;
                p.addChild(quickChatContainer)
                app.stage.addChild(p);
                // app.stage.addChild(quickChatContainer);
                players.current[id] = p;
              }

              // if (!playersWalking.current[id]) {

              //     const WalkingSprites = []; // Store all sprites here

              // for (let angle = 0; angle <= 315; angle += 45) {

              //     const sheet = await Assets.load(`/assets/${angle}Walk.json`);
              //     const frames = [];

              //     for (let i = 1; i <= 30; i++) {
              //       frames.push(sheet.textures[`Walk${i}.png`]);
              //   }
              //     console.log("WalkingSprites", angle,frames)

              //     // Create an AnimatedSprite
              //     const sprite = new AnimatedSprite(frames);

              //     // Set animation properties
              //     sprite.animationSpeed = 1;
              //     sprite.loop = true;
              //     sprite.scale = 0.08;
              //     sprite.x = animation.x;
              //     sprite.y = animation.y;
              //     sprite.visible = false;

              //     app.stage.addChild(sprite);

              //     // Store it in an object with its angle as the key
              //     WalkingSprites.push(sprite);

              // }
              //   playersWalking.current[id] = WalkingSprites
              // }

              if (pos.quickChat) {
                console.log("quickchat", pos.quickChat)
                if (pos.quickChat != "") {
                  players.current[id].getChildByName('quickchat').visible = true;
                  players.current[id].getChildByName('quickchat').getChildByName('quickchattext').text = pos.quickChat
                }
                else {
                  players.current[id].getChildByName('quickchat').visible = false;
                  players.current[id].getChildByName('quickchat').getChildByName('quickchattext').text = ""
                }
              }
              else {
                console.log("not quickchat")
                players.current[id].getChildByName('quickchat').visible = false;
                players.current[id].getChildByName('quickchat').getChildByName('quickchattext').text = ""
              }

              const distance = Math.hypot(pos.x - players.current[id].x, pos.y - players.current[id].y);

              // Compute duration dynamically (seconds)
              const duration = distance / 100;

              players.current[id].getChildByName('player').texture = sheet.textures[_rotationFrames[parseInt(pos.angle)]];
              if (players.current[id].x != pos.x) {
                if (players.current[id].getChildByName('player')) {
                  players.current[id].getChildByName('player').visible = false;
                }
                if (players.current[id].getChildByName('walking')) {
                  players.current[id].getChildByName('walking');
                }
                WalkingSprites[pos.angle].name = 'walking'
                players.current[id].addChild(WalkingSprites[pos.angle])
                players.current[id].getChildByName('walking').play();
                players.current[id].getChildByName('walking').visible = true;
                // players.current[id]

                  
                if (pos.activeRoom !== activeRoomRef.current && pos.act == "resposition") {
                  app.stage.removeChild(players.current[id]);
                  delete players.current[id];
                  return;
                };
               
                gsap.to(players.current[id], {
                  duration: duration,
                  x: pos.x,
                  y: pos.y,
                  ease: "none",

                  onComplete: () => {
                    //   playersWalking.current[id].forEach(sprite => {
                    //     sprite.visible = false;                
                    //     sprite.x = pos.x;
                    //     sprite.y = pos.y ;               
                    //     sprite.stop();
                    // });
                    players.current[id].getChildByName('player').visible = true;
                    players.current[id].removeChild(players.current[id].getChildByName('walking'));
                    players.current[id].x = pos.x;
                    players.current[id].y = pos.y;
                    if (pos.activeRoom !== activeRoomRef.current) {
                      app.stage.removeChild(players.current[id]);
                      delete players.current[id];
                      return;
                    };
                  }
                });
              }

            }

            for (const id in players.current) {
              if (!data[id]) {
                app.stage.removeChild(players.current[id]);
                // app.stage.removeChild(playersWalking.current[id]);
                delete players.current[id];
                // delete playersWalking.current[id];
              }
            }
          });
          // Animation

        }
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    };



    initApp();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (appRef.current) {
        if (socket) {
          socket.disconnect();
        }
        appRef.current.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true,
        });
        appRef.current = null; // Clear ref
      }
    };
  }, [user]);

  useEffect(() => {
    if (activeRoom == "bank") {
      console.log("room elements", appRef.current.stage)
      const airtok = appRef.current.stage.children[5];

      airtok.visible = false;
    }
    if (activeRoom == "base") {
      const bankBg = appRef.current.stage.children[2];
      bankBg.visible = false;


      const baseBg = appRef.current.stage.children[1];
      baseBg.visible = true;

      const player = appRef.current.stage.children[4];
      player.visible = true;

      const airtok = appRef.current.stage.children[5];

      airtok.visible = true;
    }
    activeRoomRef.current = activeRoom
  }, [activeRoom])
  async function updateQuickChat() {

    const player = appRef.current.stage.getChildByName('player');
    console.log(player)
    if (quickChat != "") {

      const quickChatContainer = new Container();
      // Load the texture (already in your loader or from file)
      const bubbleTexture = await Assets.load("/assets/chat_bubble.png");

      // Create a resizable background using 9-slice scaling
      const bubble = new NineSlicePlane(bubbleTexture, 15, 15, 15, 15);
      // These 4 values are your left, top, right, bottom edge slices
      bubble.name = "bubble";
      bubble.scale = 0.08
      bubble.anchor = new Point(0.2, 0.7);

      bubble.width = 2200
      bubble.height = quickChat ? quickChat.length > 20 ? 1000 : 500 : 500


      const nameText = new Text(quickChat, {
        fontSize: 16,
        wordWrap: true,
        align: "center",
        wordWrapWidth: 10,
        fill: 0x000000
      });
      nameText.anchor.set(0.1, 1);
      // nameText.y = -5;
      nameText.name = "quickchattext"
      // const bounds = nameText.getLocalBounds();
      // nameText
      quickChatContainer.visible = true;
      quickChatContainer.name = 'quickchat';
      quickChatContainer.addChild(bubble)
      quickChatContainer.addChild(nameText)


      player.addChild(quickChatContainer)



    }
    else {
      player.removeChild(player.getChildByName('quickchat'))

    }
 
  }
  useEffect(() => {
    if (appRef.current) {
      updateQuickChat()
      const player = appRef.current.stage.getChildByName('player');
      socketRef.current.emit("move", { x: player.x, y: player.y, angle: rotationIndex.current, activeRoom: activeRoom, quickChat: quickChat });

    }  
  }, [quickChat,activeRoom, appRef])

  useEffect(() => {
    console.log("players", players)

  }, [players])





  return (<>

    <div ref={canvasRef} />
  </>)

};

export default GameComponent;