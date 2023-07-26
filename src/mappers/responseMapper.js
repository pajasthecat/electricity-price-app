export const toResponse = (priceData) => {
  const { median, high, low } = priceData;

  const response = {
    frames: [
      {
        text: `${median} kr/kwh`,
        icon: 16484,
      },
      {
        text: `${high} kr/kwh`,
        icon: 54389,
      },
      {
        text: `${low} kr/kwh`,
        icon: 54390,
      },
    ],
  };

  return response;
};
