"use client";

import { useContext, useEffect, useRef } from "react";
import { Application, Sprite, Assets, AnimatedSprite } from "pixi.js";
import { GifSprite } from 'pixi.js/gif';
import gsap from "gsap";
import { ContractContext } from "@/contexts/ContractContext";

const GameComponent = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null); // Use ref to persist app instance
  const {activeRoom,setActiveRoom,activeRoomRef,setShowChatIcon} = useContext(ContractContext);
  useEffect(() => {
    let isMounted = true; // Track mounting state
    let currentAvatarAngle = 0;
    let animating = false;
    let gsapanimation ;
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



          const sheet = await Assets.load('/assets/texture.json');

          // Create an AnimatedSprite using frames
          const animation = new Sprite(sheet.textures["0.png"]);
          console.log(animation)
          animation.scale = 0.08

          animation.x = 650;
          animation.y = 400;
          animation.zIndex = 99;
          animation.visible = false;
          app.stage.addChild(animation);
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
            let angle = getAngleBetweenPoints(mouseX, mouseY, animation.x + 25, animation.y + 50);

            // Ensure angle is positive (0-360)
            if (angle < 0) angle += 360;
            // Determine which frame to use based on the closest angle
            const frameIndex = Math.round(angle / 45);
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
            animation.texture = sheet.textures[rotationFrames[frameIndex]];
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
              console.log("WalkingSprites", angle,frames)
          
              // Create an AnimatedSprite
              const sprite = new AnimatedSprite(frames);
              
              // Set animation properties
              sprite.animationSpeed = 1;
              sprite.loop = true;
              sprite.scale = 0.08;
              sprite.x = animation.x;
              sprite.y = animation.y;
              sprite.visible = false;
              
              app.stage.addChild(sprite);
              
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

          const baseCity = [
            { "x": 1065 , "y": 281 },
            { "x": 1140, "y": 257 },
            { "x": 1299, "y": 291 },
            { "x": 1325, "y": 344 },
            { "x": 1065 , "y": 281 }
          ]

          const backtoLanding = [
            { "x": 43 , "y": 416 },
            { "x": 141 , "y": 395 },
            { "x": 200, "y": 437 },
            { "x": 104, "y": 572 },
            { "x": 3, "y": 516 },
            { "x": 43 , "y": 416 },
          ]

          const bankGate = [
            { "x": 981 , "y": 282 },
            { "x": 1054, "y": 293 },
            { "x": 1033, "y": 457 },
            { "x": 943, "y": 435 },
          ]

          const bankBack = [
            { "x": 64 , "y": 97 },
            { "x": 572, "y": 98 },
            { "x": 68, "y": 558 },
            { "x": 551, "y": 556 },
          ]

          const LandingrestrictedArea = [
            { "x": 4 , "y": 255 },
            { "x": 390 , "y": 232 },
            { "x": 423 , "y": 381 },
            { "x": 947 , "y": 341 },
            { "x": 1139 , "y": 260 },
            { "x": 1294 , "y": 284 },
            { "x": 1323 , "y": 352 }, 
            { "x": 1393 , "y": 732 },
            { "x": 9 , "y": 732 },
            { "x": 4 , "y": 255 },

          ]
          app.stage.addEventListener('pointerdown', (e) => {
            console.log("plot room",activeRoomRef.current)
            if(activeRoomRef.current == "landing"){
              const newX = e.global.x;
              const newY = e.global.y
              const distance = Math.hypot(newX - animation.x, newY - animation.y);

              // Compute duration dynamically (seconds)
              const duration = distance / 100;
              console.log("plot landing", e.global.x, e.global.y)

              if (isPointInPolygon({ x: newX, y: newY }, baseCity)) {
                console.log("plot found", e.global.x, e.global.y)
                setTimeout(() => {
                  animation.x = 168
                  animation.y = 428
                  animation.visible = true;
                  mainbg.visible = true;
                  
              setActiveRoom("base")
                }, duration*1000);
               
                }


                if (isPointInPolygon({ x: newX, y: newY }, LandingrestrictedArea)) {
                  if(animating){
                    gsapanimation.pause(); // Stop animation without destroying it
                    let target = gsapanimation.targets()[0]; // Get the animated element
                  animation.x = gsap.getProperty(target, "x"); // Get the last 'x' position
                  animation.y = gsap.getProperty(target, "y"); // Get the last 'y' position
                  console.log("gsap",animation.x,animation.y)
                  WalkingSprites.forEach(sprite => {
                    sprite.visible = false;
                    sprite.x = animation.x ;
                    sprite.y = animation.y ;
                    sprite.stop();
                  })
                  }
                  animating = true;
                  animation.visible = false;
                  // console.log("currentAvatarAngle",currentAvatarAngle,WalkingSprites[currentAvatarAngle],WalkingSprites)
                  // const WalkingSprites = [WalkingSprites_0, WalkingSprites_1, WalkingSprites_2];
                  let _currentAvatarAngle = currentAvatarAngle <  8 ? currentAvatarAngle : 0
                  if (WalkingSprites[_currentAvatarAngle]) {
                    let sprite = WalkingSprites[_currentAvatarAngle];
                    sprite.visible = true;
                    sprite.play();
                
                    gsapanimation = gsap.to(sprite, {
                        duration: duration,
                        x: newX - 25,
                        y: newY - 50,
                        ease: "none",
                        
                        onComplete: () => {
                          WalkingSprites.forEach(sprite => {
                            sprite.visible = false;
                            
                            sprite.stop();
                            if(isPointInPolygon({ x: newX, y: newY }, baseCity)){
                              animation.x = 162;
                              animation.y = 428;
                              sprite.x = 162;
                              sprite.y = 428;
                            }
                            else{
                              sprite.x = newX - 25;
                            sprite.y = newY - 50;
                            }
                        });
                        animation.x = newX - 25;
                        animation.y = newY - 50;
                        if(isPointInPolygon({ x: newX, y: newY }, baseCity)){
                          animation.x = 162;
                          animation.y = 428;
                          WalkingSprites[_currentAvatarAngle].x = 162;
                          WalkingSprites[_currentAvatarAngle].y = 428;
                        }
                        animation.visible = true;
                        animating = false;
      
                        }
                    });
                }
                setTimeout(() => {
                  
              }, duration * 1000);
    
               
                 
    
                }
          
            }

            if(activeRoomRef.current == "base"){

            console.log("plot base", e.global.x, e.global.y)
            const newX = e.global.x;
            const newY = e.global.y
            // Calculate distance
            const distance = Math.hypot(newX - animation.x, newY - animation.y);

            // Compute duration dynamically (seconds)
            const duration = distance / 100;
            if(isPointInPolygon({ x: newX, y: newY }, backtoLanding)){
              setTimeout(() => {
                animation.visible = false;
                mainbg.visible = false;
                bankbg.visible = false;
                setActiveRoom("landing")

              }, duration*1000);
            }

            if(isPointInPolygon({ x: newX, y: newY }, bankGate)){
              setTimeout(() => {
                animation.visible = false;
                mainbg.visible = false;
                bankbg.visible = true;
                setActiveRoom("bank")

              }, duration*1000);
            }


            if (isPointInPolygon({ x: newX, y: newY }, restrictedArea)) {
              animation.visible = false;
              if(animating){
                gsapanimation.pause(); // Stop animation without destroying it
                let target = gsapanimation.targets()[0]; // Get the animated element
              animation.x = gsap.getProperty(target, "x"); // Get the last 'x' position
              animation.y = gsap.getProperty(target, "y"); // Get the last 'y' position
              console.log("gsap",animation.x,animation.y)
              WalkingSprites.forEach(sprite => {
                sprite.visible = false;
                sprite.x = animation.x ;
                sprite.y = animation.y ;
                sprite.stop();
            });
              }
              animating = true;
              // console.log("currentAvatarAngle",currentAvatarAngle,WalkingSprites[currentAvatarAngle],WalkingSprites)
              // const WalkingSprites = [WalkingSprites_0, WalkingSprites_1, WalkingSprites_2];
              let _currentAvatarAngle = currentAvatarAngle <  8 ? currentAvatarAngle : 0
              if (WalkingSprites[_currentAvatarAngle]) {
                let sprite = WalkingSprites[_currentAvatarAngle];
                sprite.visible = true;
                sprite.play();
            
                gsapanimation =  gsap.to(sprite, {
                    duration: duration,
                    x: newX - 25,
                    y: newY - 50,
                    ease: "none",
                    onComplete: () => {
                      WalkingSprites.forEach(sprite => {
                        sprite.visible = false;
                        sprite.x = newX - 25;
                        sprite.y = newY - 50;
                        sprite.stop();
                    });
                    animation.x = newX - 25;
                    animation.y = newY - 50;
                    if(isPointInPolygon({x: newX, y: newY}, backtoLanding)){
                      animation.x = 1299 - 55
                      animation.y = 291 - 50
                      WalkingSprites[_currentAvatarAngle].x = 1245;
                      WalkingSprites[_currentAvatarAngle].y = 241;
                    }
                    if(isPointInPolygon({ x: newX, y: newY }, bankGate)){
                      animation.visible = false;
                    }
                    else{
                      animation.visible = true;
      
                    }
                    animating = false;
      
                    }
                });
            }
          //   setTimeout(() => {
              
          // }, duration * 1000);

           
             

            }
          }


          if(activeRoomRef.current == "bank"){
            console.log("plot bank", e.global.x, e.global.y)
            const newX = e.global.x;
            const newY = e.global.y
            // Calculate distance
            const distance = Math.hypot(newX - animation.x, newY - animation.y);

            // Compute duration dynamically (seconds)
            const duration = distance / 100;
            if(isPointInPolygon({ x: newX, y: newY }, bankBack)){
              setTimeout(() => {
                animation.visible = true;
                mainbg.visible = true;
                bankbg.visible = false;
                setActiveRoom("base")

              }, duration*1000);
            }
          }
            // avatar.position.copyFrom(e.global);
          });
          setTimeout(() => {
            // animatedSprite.visible = false;
            // bg.visible = false;
            animatedBarSprite.visible = false;
            animation.visible = true;
        

            // app.stage.addChild(avatar); // Add background first (so it's behind everything)

            const adBanner = document.getElementById("adBanner");
            if(adBanner){
              adBanner.style.visibility = "visible";
            }
            
            // const chabubble = document.getElementById("chatIconLeft");
            // if(chabubble){
            //   chabubble.style.visibility = "visible";
            // }
            setShowChatIcon(true)
            const menubar = document.getElementById("menubar");
            if (menubar) {
              menubar.style.visibility = "visible";
            }
          }, 2500)


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
        appRef.current.destroy(true, {
          children: true,
          texture: true,
          baseTexture: true,
        });
        appRef.current = null; // Clear ref
      }
    };
  }, []);



  return (<>
  <div ref={canvasRef} />
  </>)
  
};

export default GameComponent;