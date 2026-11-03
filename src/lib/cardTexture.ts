import * as THREE from 'three';
import type { Topic } from '../types/topic';

const textureCache = new Map<string, THREE.CanvasTexture>();

export function getCardTexture(topic: Topic): THREE.CanvasTexture {
  if (textureCache.has(topic.id)) {
    return textureCache.get(topic.id)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 860;
  const ctx = canvas.getContext('2d')!;

  // 1. Base Paper Background
  const paperColor = topic.coverTheme?.paperColor || '#E9E4D8';
  ctx.fillStyle = paperColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Subtle Paper Grain / Edge Bleed
  ctx.fillStyle = 'rgba(23, 23, 32, 0.035)';
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // 3. Inner Frame
  ctx.strokeStyle = 'rgba(23, 23, 32, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  // 4. Header: Roman Numeral & Category
  const inkColor = topic.coverTheme?.inkColor || '#171720';
  ctx.fillStyle = inkColor;
  ctx.font = '600 22px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(topic.coverTheme?.romanNumeral || 'I', 52, 75);

  ctx.textAlign = 'right';
  ctx.font = '500 19px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(topic.category.toUpperCase(), canvas.width - 52, 75);

  // 5. Center Motif / Pattern
  ctx.textAlign = 'center';
  const pattern = topic.coverTheme?.pattern || 'zen-circle';

  if (pattern === 'zen-circle') {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 290, 75, 0, Math.PI * 1.85);
    ctx.strokeStyle = 'rgba(23, 23, 32, 0.18)';
    ctx.lineWidth = 3.5;
    ctx.stroke();
  } else if (pattern === 'geometric-arch') {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 250, 60, Math.PI, 0);
    ctx.lineTo(canvas.width / 2 + 60, 360);
    ctx.lineTo(canvas.width / 2 - 60, 360);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(23, 23, 32, 0.18)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  } else if (pattern === 'editorial-grid') {
    ctx.strokeStyle = 'rgba(23, 23, 32, 0.12)';
    ctx.lineWidth = 1.5;
    for (let c = -2; c <= 2; c++) {
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + c * 35, 220);
      ctx.lineTo(canvas.width / 2 + c * 35, 360);
      ctx.stroke();
    }
  } else {
    // Horizon or lines
    ctx.strokeStyle = 'rgba(23, 23, 32, 0.18)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 290);
    ctx.lineTo(canvas.width - 120, 290);
    ctx.stroke();
  }

  // Kanji & Subtitle
  if (topic.coverTheme?.kanji) {
    ctx.fillStyle = inkColor;
    ctx.font = '300 74px "Inter", "Space Grotesk", serif';
    ctx.fillText(topic.coverTheme.kanji, canvas.width / 2, 315);
  }

  if (topic.coverTheme?.japaneseSub) {
    ctx.fillStyle = 'rgba(23, 23, 32, 0.55)';
    ctx.font = '400 17px "Inter", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(topic.coverTheme.japaneseSub, canvas.width / 2, 400);
  }

  // 6. Title (Wrapped cleanly)
  ctx.fillStyle = inkColor;
  ctx.font = '600 38px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';

  const words = topic.title.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const w of words) {
    const testLine = currentLine ? `${currentLine} ${w}` : w;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > canvas.width - 120) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let titleY = 490;
  for (const line of lines) {
    ctx.fillText(line, canvas.width / 2, titleY);
    titleY += 46;
  }

  // 7. Divider Line
  ctx.strokeStyle = 'rgba(23, 23, 32, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, 680);
  ctx.lineTo(canvas.width - 140, 680);
  ctx.stroke();

  // 8. Footer Metadata: Subject & Difficulty
  ctx.textAlign = 'left';
  ctx.font = '500 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(23, 23, 32, 0.65)';
  ctx.fillText(topic.subject.toUpperCase(), 52, 795);

  ctx.textAlign = 'right';
  ctx.font = '600 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = topic.coverTheme?.accentColor || '#6554CB';
  ctx.fillText(topic.difficulty.toUpperCase(), canvas.width - 52, 795);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  textureCache.set(topic.id, texture);
  return texture;
}
