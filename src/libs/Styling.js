/**
 * Shade a color by an amount [-100 - 100] (negative is darker, positive is ligher).
 */
export const shadeColor = (color, amount) => {
  return "#" + color.replace(/^#/, "").replace(/../g, color => ("0" + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
