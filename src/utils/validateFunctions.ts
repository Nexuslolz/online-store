export const isNameValid = (value: string): boolean => {
  const words = value.split(/\s/);
  const isCorrectLength = words.every((word) => word.length >= 3);

  return words.length >= 2 && isCorrectLength;
};

export const isTelValid = (value: string): boolean => {
  return /^\+[0-9]{9,}$/.test(value);
};

export const isAddressValid = (value: string): boolean => {
  const words = value.split(/\s/).filter((word) => word.length >= 3);

  return words.length >= 2;
};

export const isEmailValid = (value: string): boolean => {
  return /^[a-z0-9]*@[a-z0-9]*\.[a-z]{2,}$/i.test(value);
};

export const isCardNumValid = (value: string | number): boolean => {
  const data = String(value);
  return /^[0-9]{16}$/.test(data);
};

export const isCardDateValid = (value: string | number): boolean => {
  const data = String(value);
  if (data.length !== 5) {
    return false;
  }

  if (!/^[0-9]{2}\/[0-9]{2}$/.test(data)) {
    return false;
  }

  const date = data.split('/');

  if (date.length !== 2) {
    return false;
  }

  const month = Number(date[0]);

  return month <= 12;
};

export const isCvvValid = (value: string | number): boolean => {
  const data = String(value);
  return /^[0-9]{3}$/.test(data);
};
