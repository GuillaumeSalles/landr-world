export default function formatNumber(number) {
  if (number < 1000) {
    return Math.floor(number);
  }

  if (number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  }

  return (number / 1000000).toFixed(1) + "m";
}
