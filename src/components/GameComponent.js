"use client";

import { useContext, useEffect, useRef } from "react";
import { Application, Sprite, Assets } from "pixi.js";
import { GifSprite } from 'pixi.js/gif';
import gsap from "gsap";
import { ContractContext } from "@/contexts/ContractContext";

const GameComponent = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null); // Use ref to persist app instance

  useEffect(() => {
    let isMounted = true; // Track mounting state

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



          const sheet = await Assets.load('/assets/spritesheet.json');

          // Create an AnimatedSprite using frames
          const animation = new Sprite(sheet.textures["1.png"]);
          console.log(animation)
          animation.scale = 0.10

          animation.x = 650;
          animation.y = 400;
          animation.zIndex = 99;


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
            const frameIndex = Math.round(angle / 30);
            // console.log(angle, frameIndex)

            const rotationFrames = [
              "34.png",
              "30.png",
              "21.png",
              "14.png",
              "12.png",
              "7.png",
              "5.png",
              "1.png",
              "39.png",
              "37.png",
              "36.png",
              "35.png",
              "35.png",
            ]
            animation.texture = sheet.textures[rotationFrames[frameIndex]];
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
          app.stage.addEventListener('pointerdown', (e) => {
            console.log("plot", e.global.x, e.global.y)
            const newX = e.global.x;
            const newY = e.global.y
            // Calculate distance
            const distance = Math.hypot(newX - animation.x, newY - animation.y);

            // Compute duration dynamically (seconds)
            const duration = distance / 300;
            if (isPointInPolygon({ x: newX, y: newY }, restrictedArea)) {
              gsap.to(animation, {
                duration: duration,
                x: newX - 25,
                y: newY - 50,
                ease: "none",  
              });

            }
            // avatar.position.copyFrom(e.global);
          });
          setTimeout(() => {
            // animatedSprite.visible = false;
            // bg.visible = false;
            animatedBarSprite.visible = false;
            // app.stage.addChild(mainbg);
            // app.stage.addChild(animation);

            // app.stage.addChild(avatar); // Add background first (so it's behind everything)

            const adBanner = document.getElementById("adBanner");
            if(adBanner){
              adBanner.style.visibility = "visible";
            }
            
            const chabubble = document.getElementById("chatIconLeft");
            if(chabubble){
              chabubble.style.visibility = "visible";
            }
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