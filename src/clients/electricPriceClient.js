import axios from "axios";

export const getTodaysElectricPrices = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = getMonth(today);
  const date = today.getDate();
  const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${date}_SE4.json`;

  try {
    const response = await axios.get(url);

    return response.data.map((price) => ({
      sek: price.SEK_per_kWh,
      start: price.time_start,
      end: price.time_end,
    }));
  } catch (error) {
    return error;
  }
};

const getMonth = (date) => {
  const month = (date.getMonth() + 1).toString();

  if (month.length === 1) return `0${month}`;

  return month;
};
