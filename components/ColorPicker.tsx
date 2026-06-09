'use client';

import { useState, useEffect, useCallback } from 'react';

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function generatePalette(h: number, s: number, l: number): string[] {
  const colors: string[] = [];
  // Original color
  colors.push(rgbToHex(...Object.values(hslToRgb(h, s, l)) as [number, number, number]));
  // Complementary
  colors.push(rgbToHex(...Object.values(hslToRgb((h + 180) % 360, s, l)) as [number, number, number]));
  // Analogous 1
  colors.push(rgbToHex(...Object.values(hslToRgb((h + 30) % 360, s, l)) as [number, number, number]));
  // Analogous 2
  colors.push(rgbToHex(...Object.values(hslToRgb((h + 330) % 360, s, l)) as [number, number, number]));
  // Triadic
  colors.push(rgbToHex(...Object.values(hslToRgb((h + 120) % 360, s, l)) as [number, number, number]));

  return colors;
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });
  const [palette, setPalette] = useState<string[]>([]);

  const updateFromHex = useCallback((newHex: string) => {
    setHex(newHex);
    const rgbVal = hexToRgb(newHex);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
      setPalette(generatePalette(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).h, rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).s, rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).l));
    }
  }, []);

  const updateFromRgb = useCallback((newRgb: RGB) => {
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    setHsl(newHsl);
    setPalette(generatePalette(newHsl.h, newHsl.s, newHsl.l));
  }, []);

  useEffect(() => {
    updateFromHex(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Large preview */}
          <div
            className="h-32 rounded-xl border border-gray-700"
            style={{ backgroundColor: hex }}
          />

          {/* HEX Input */}
          <div>
            <label htmlFor="color-hex" className="block text-sm font-medium text-gray-300 mb-2">
              HEX Color
            </label>
            <div className="flex gap-2">
              <input
                id="color-hex"
                type="text"
                value={hex}
                onChange={(e) => {
                  const val = e.target.value;
                  setHex(val);
                  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                    updateFromHex(val);
                  }
                }}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-100 font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#3b82f6"
              />
              <input
                type="color"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-transparent"
              />
            </div>
          </div>

          {/* RGB Sliders */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">RGB</h3>
            <div className="space-y-3">
              {[
                { label: 'R', value: rgb.r, color: 'red', max: 255 },
                { label: 'G', value: rgb.g, color: 'green', max: 255 },
                { label: 'B', value: rgb.b, color: 'blue', max: 255 },
              ].map((channel) => (
                <div key={channel.label} className="flex items-center gap-3">
                  <span className="w-6 text-sm text-gray-400 font-medium">
                    {channel.label}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={channel.max}
                    value={channel.value}
                    onChange={(e) => {
                      const newVal = parseInt(e.target.value);
                      const newRgb = { ...rgb, [channel.label.toLowerCase()]: newVal };
                      updateFromRgb(newRgb);
                    }}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="w-10 text-right text-sm text-gray-300 font-mono">
                    {channel.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: values + ad */}
        <div className="space-y-4">
          {/* Color values */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
            <div>
              <div className="text-xs text-gray-400">HEX</div>
              <div className="text-white font-mono">{hex}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">RGB</div>
              <div className="text-white font-mono">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">HSL</div>
              <div className="text-white font-mono">
                hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(hex)}
              className="w-full mt-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              📋 Copy HEX
            </button>
          </div>

          {/* Desktop ad slot */}
          <div className="hidden lg:block">
            <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-3 text-center text-gray-500 text-xs">
              Advertisement
            </div>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          Color Palette
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {palette.map((color, idx) => (
            <button
              key={idx}
              onClick={() => updateFromHex(color)}
              className="group relative"
            >
              <div
                className="h-20 rounded-lg border border-gray-700 transition-transform group-hover:scale-105"
                style={{ backgroundColor: color }}
              />
              <div className="text-xs text-gray-400 text-center mt-1 font-mono">
                {color}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile ad slot */}
      <div className="lg:hidden">
        <div className="bg-gray-800/50 border border-gray-700 border-dashed rounded-lg p-3 text-center text-gray-500 text-xs">
          Advertisement
        </div>
      </div>
    </div>
  );
}
