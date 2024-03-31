"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

const instance = axios.create({ timeout: 1000 * 60 * 2 });

export default function Home() {
  const imageElementScale = useRef(1);
  const [isRedirect, setIsRedirect] = useState(!!getCookie("witnessName"));
  const start = useRef({});
  const router = useRouter();

  const callAPI = () => {
    instance
      .get("https://jsonplaceholder.typicode.com/todos", {})
      .then((response) => {
        console.log(response.data);
        setIsRedirect(true);
        setCookie("witnessName", "Roofi", 1);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  };

  const postAPI = (option = {}) => {
    instance
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        { ...option }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     callAPI();
  //     postAPI();
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (!isRedirect) {
      callAPI();
    } else {
      router.push("/witness");
    }
  }, [isRedirect]);

  // useEffect(() => {
  //   const imageElement = document.getElementById("image");

  //   const touchStartEventHandler = (event) => {
  //     console.log("touchstart", event);
  //     if (event.touches.length === 2) {
  //       event.preventDefault(); // Prevent page scroll

  //       // Calculate where the fingers have started on the X and Y axis
  //       start.current.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
  //       start.current.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
  //       start.current.distance = distance(event);
  //     }
  //   };

  //   const touchMoveEventHandler = (event) => {
  //     console.log("touchmove", event);
  //     if (event.touches.length === 2) {
  //       event.preventDefault(); // Prevent page scroll
  //       let scale;

  //       // Safari provides event.scale as two fingers move on the screen
  //       // For other browsers just calculate the scale manually
  //       if (event.scale) {
  //         scale = event.scale;
  //       } else {
  //         const deltaDistance = distance(event);
  //         scale = deltaDistance / start.current.distance;
  //       }

  //       imageElementScale.current = Math.min(Math.max(1, scale), 4);

  //       // Calculate how much the fingers have moved on the X and Y axis
  //       const deltaX =
  //         ((event.touches[0].pageX + event.touches[1].pageX) / 2 -
  //           start.current.x) *
  //         2; // x2 for accelarated movement
  //       const deltaY =
  //         ((event.touches[0].pageY + event.touches[1].pageY) / 2 -
  //           start.current.y) *
  //         2; // x2 for accelarated movement

  //       // Transform the image to make it grow and move with fingers
  //       const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale.current})`;
  //       imageElement.style.transform = transform;
  //       imageElement.style.WebkitTransform = transform;
  //       imageElement.style.zIndex = "9999";
  //     }
  //   };

  //   const touchEndEventHandler = (event) => {
  //     console.log("touchend", event);
  //     // Reset image to it's original format
  //     imageElement.style.transform = "";
  //     imageElement.style.WebkitTransform = "";
  //     imageElement.style.zIndex = "";
  //   };

  //   imageElement.addEventListener("touchstart", touchStartEventHandler);

  //   imageElement.addEventListener("touchmove", touchMoveEventHandler);

  //   imageElement.addEventListener("touchend", touchEndEventHandler);

  //   return () => {
  //     const imageElement = document.getElementById("image");

  //     imageElement.removeEventListener("touchstart", touchStartEventHandler);
  //     imageElement.removeEventListener("touchmove", touchMoveEventHandler);
  //     imageElement.removeEventListener("touchend", touchEndEventHandler);

  //     alert("cleanup func worked");
  //   };
  // }, []);

  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      <input type="search" style={{ height: 40, color: "#000000" }} />
      <h1>Hello World</h1>
      <div style={{ background: "green", width: "100%", height: "30px" }}>
        container 1
      </div>
      <div style={{ background: "orange", width: "100%", height: "30px" }}>
        container 2
      </div>
      <div>
        <img
          alt="cat"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg"
          style={{ width: 500, height: 500, objectFit: "contain" }}
          id="image"
        />
      </div>
    </main>
  );
}
