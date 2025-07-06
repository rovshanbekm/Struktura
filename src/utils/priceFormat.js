export const formatPrice = (amount) => {
  if (amount == null || amount <= 0) return '';

  const floored = Math.floor(amount);
  return (
    floored
      .toLocaleString('en-US', { useGrouping: true })
      .replace(/\u00A0/g, ' ') + '$'
  );
};
