"use client";

import React, { ReactNode } from "react";

export interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "dock" | "button" | "card" | "pill" | "subtle";
  onClick?: () => void;
}

export const LiquidGlassFilter: React.FC = () => (
  <svg
    style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    aria-hidden="true"
  >
    <filter
      id="liquid-glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.002 0.008"
        numOctaves="2"
        seed="23"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1.2" exponent="8" offset="0.4" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0.8" exponent="1" offset="0.4" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="2.5" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="4"
        specularConstant="1.2"
        specularExponent="90"
        lightingColor="#ffffff"
        result="specLight"
      >
        <fePointLight x="-150" y="-150" z="250" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="60"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = "",
  style = {},
  variant = "card",
  onClick,
}) => {
  const isButton = variant === "button" || Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`liquid-glass-wrapper liquid-glass--${variant} ${className}`}
      style={style}
    >
      {/* Liquid Glass Refraction & Blur Layers */}
      <div
        className="liquid-glass-backdrop"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
        }}
      />
      <div className="liquid-glass-tint" />
      <div className="liquid-glass-border-glow" />

      {/* Actual Content */}
      <div className="liquid-glass-content relative z-10">{children}</div>
    </div>
  );
};

export default LiquidGlass;
