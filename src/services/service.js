import { getTodaysElectricPrices } from "../clients/electricPriceClient.js";

export const getPrice = async (area) => {
  const todaysPrices = await getTodaysElectricPrices(area);

  return toGetPriceResponse(todaysPrices);
};

const toGetPriceResponse = (todaysPrices) => {
  const median = getMedian(todaysPrices);

  const low = getLowest(todaysPrices);

  const high = getHigh(todaysPrices);

  return { median, high, low };
};

const getMedian = (todaysPrices) => {
  const sortedPriceList = todaysPrices
    .map((priceData) => priceData.sek)
    .sort()
    .filter((_, index, array) => {
      const length = array.length;
      const isEven = length % 2 === 0;
      const newIndex = index + 1;
      const half = length / 2;

      if (isEven) {
        if (newIndex === half || newIndex === half + 1) return true;
      } else {
        const halfUp = Math.ceil(half);

        if (newIndex === halfUp) return true;
      }
      return false;
    });

  const median =
    sortedPriceList.length > 1
      ? (sortedPriceList[0] + sortedPriceList[1]) / 2
      : sortedPriceList[0];

  return median.toFixed(4);
};

const getHigh = (todaysPrices) => {
  const prices = todaysPrices.map((price) => price.sek);

  return Math.max(...prices);
};

const getLowest = (todaysPrices) => {
  const prices = todaysPrices.map((price) => price.sek);

  return Math.min(...prices);
};
