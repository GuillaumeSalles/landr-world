function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function formatNumber(number) {
  if (number == null) {
    number = getRandomInt(100, 10000000);
  }

  if (number < 1000) {
    return number;
  }

  if (number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  }

  return (number / 1000000).toFixed(1) + "m";
}
