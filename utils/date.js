const getToday = () => {
  const today = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  return today.toLocaleDateString('en-US', options);
};

const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return yesterday.toLocaleDateString('en-US', options);
};

module.exports = { getToday, getYesterday };
