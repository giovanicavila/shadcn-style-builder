import type { ColorToken } from "@/contexts/design-tokens-context";

export function colorTokenToOklch(token: ColorToken): string {
  return `oklch(${token.l / 100} ${token.c} ${token.h})`;
}

export function oklchToColorToken(oklch: string): ColorToken {
  const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) {
    return { l: 50, c: 0, h: 0 };
  }
  return {
    l: Number.parseFloat(match[1]) * 100,
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
  };
}

export function hexToOklch(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

  // Convert RGB to linear RGB
  const linearR = r <= 0.040_45 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  const linearG = g <= 0.040_45 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
  const linearB = b <= 0.040_45 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

  // Convert to XYZ
  const x =
    linearR * 0.412_456_4 + linearG * 0.357_576_1 + linearB * 0.180_437_5;
  const y = linearR * 0.212_672_9 + linearG * 0.715_152_2 + linearB * 0.072_175;
  const z = linearR * 0.019_333_9 + linearG * 0.119_192 + linearB * 0.950_304_1;

  // Convert to OKLab
  const l = 0.818_933_010_1 * x + 0.361_866_742_4 * y - 0.128_859_713_7 * z;
  const m = 0.032_984_543_6 * x + 0.929_311_871_5 * y + 0.036_145_638_7 * z;
  const s = 0.048_200_301_8 * x + 0.264_366_269_1 * y + 0.633_851_707 * z;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.210_454_255_3 * l_ + 0.793_617_785 * m_ - 0.004_072_046_8 * s_;
  const a = 1.977_998_495_1 * l_ - 2.428_592_205 * m_ + 0.450_593_709_9 * s_;
  const bLab = 0.025_904_037_1 * l_ + 0.782_771_766_2 * m_ - 0.808_675_766 * s_;

  // Convert to OKLCH
  const C = Math.sqrt(a * a + bLab * bLab);
  const H = Math.atan2(bLab, a) * (180 / Math.PI);
  const H_normalized = H < 0 ? H + 360 : H;

  return `oklch(${L} ${C} ${H_normalized})`;
}

export function oklchToHex(oklch: string): string {
  const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) {
    return "#000000";
  }

  const L = Number.parseFloat(match[1]);
  const C = Number.parseFloat(match[2]);
  const H = (Number.parseFloat(match[3]) * Math.PI) / 180;

  const a = C * Math.cos(H);
  const b = C * Math.sin(H);

  // Convert OKLab to linear RGB
  const l_ = L + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
  const m_ = L - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
  const s_ = L - 0.089_484_177_5 * a - 1.291_485_548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const x = 1.227_013_851_1 * l - 0.557_799_980_7 * m + 0.281_256_149 * s;
  const y = -0.040_580_178_4 * l + 1.112_256_869_6 * m - 0.071_676_678_7 * s;
  const z = -0.076_381_284_5 * l - 0.421_481_978_4 * m + 1.586_163_220_4 * s;

  // Convert to sRGB
  const r = Math.max(
    0,
    Math.min(1, x * 3.240_454_2 - y * 1.537_138_5 - z * 0.498_531_4)
  );
  const g = Math.max(
    0,
    Math.min(1, -x * 0.969_266 + y * 1.876_010_8 + z * 0.041_556)
  );
  const bl = Math.max(
    0,
    Math.min(1, x * 0.055_643_4 - y * 0.204_025_9 + z * 1.057_225_2)
  );

  // Apply gamma correction
  const r_linear =
    r <= 0.003_130_8 ? 12.92 * r : 1.055 * r ** (1 / 2.4) - 0.055;
  const g_linear =
    g <= 0.003_130_8 ? 12.92 * g : 1.055 * g ** (1 / 2.4) - 0.055;
  const b_linear =
    bl <= 0.003_130_8 ? 12.92 * bl : 1.055 * bl ** (1 / 2.4) - 0.055;

  const r_hex = Math.round(r_linear * 255)
    .toString(16)
    .padStart(2, "0");
  const g_hex = Math.round(g_linear * 255)
    .toString(16)
    .padStart(2, "0");
  const b_hex = Math.round(b_linear * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r_hex}${g_hex}${b_hex}`;
}
