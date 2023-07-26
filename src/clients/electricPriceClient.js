import axios from "axios";

export const getElectricPriceByDate = async (area, inputDate) => {
  const year = inputDate.getFullYear();
  const month = getMonth(inputDate);
  const date = inputDate.getDate();
  const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${date}_${area}.json`;

  try {
    const response = await axios.get(url);

    return response.data.map((price) => ({
      sek: price.SEK_per_kWh,
      start: price.time_start,
      end: price.time_end,
    }));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

const getMonth = (date) => {
  const month = (date.getMonth() + 1).toString();

  if (month.length === 1) return `0${month}`;

  return month;
};
