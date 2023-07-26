import { getElectricPriceByDate } from "../clients/electricPriceClient.js";

export const getPrice = async (area) => {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  console.log({ today, yesterday });
  const todaysPrice = await getElectricPriceByDate(area, today);
  const yesterdaysPrice = await getElectricPriceByDate(area, yesterday);

  return toGetPriceResponse(todaysPrice, yesterdaysPrice);
};

const toGetPriceResponse = (todaysPrices, yesterdaysPrice) => {
  const todaysMedian = getMedian(todaysPrices);
  const yesterdaysMedian = getMedian(yesterdaysPrice);

  const low = getLowest(todaysPrices);

  const high = getHigh(todaysPrices);

  const difference = ((1 - todaysMedian / yesterdaysMedian) * 100).toFixed(2);

  return { median: todaysMedian, high, low, difference };
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
