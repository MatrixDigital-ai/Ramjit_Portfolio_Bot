"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        let mx = 0,
            my = 0,
            rx = 0,
            ry = 0;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + "px";
            cursor.style.top = my + "px";
        };

        document.addEventListener("mousemove", onMouseMove);

        let animId: number;
        const anim = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + "px";
            ring.style.top = ry + "px";
            animId = requestAnimationFrame(anim);
        };
        anim();

        const interactiveEls = document.querySelectorAll("a, button");
        const onEnter = () => {
            cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
            ring.style.opacity = "0";
        };
        const onLeave = () => {
            cursor.style.transform = "translate(-50%,-50%) scale(1)";
            ring.style.opacity = "1";
        };
        interactiveEls.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animId);
            interactiveEls.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor" ref={cursorRef}></div>
            <div className="cursor-ring" ref={ringRef}></div>
        </>
    );
}
