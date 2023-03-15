import React, { useState } from 'react';

import styles from './BuyForm.module.scss';

import { cardTypes } from './buyFormData/buyFormData';

import CompleteForm from './CompleteForm/CompleteForm';

import {
  isAddressValid,
  isCardDateValid,
  isCardNumValid,
  isCvvValid,
  isEmailValid,
  isNameValid,
  isTelValid,
} from '../../../../../utils/validateFunctions';
import Button from '../../../../Button/Button';
import FormInput from '../../../../FormInput/FormInput';

interface IBuyForm {
  isOpen: boolean;
  onClick(event: React.MouseEvent): void;
}

const BuyForm: React.FC<IBuyForm> = ({ onClick, isOpen }: IBuyForm) => {
  const [name, setName] = useState<string>('');
  const [tel, setTel] = useState('');
  const [adress, setAdress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cardNum, setCardNum] = useState<number | string>('');
  const [cardDate, setCardDate] = useState<number | string>('');
  const [cardCode, setCardCode] = useState<number | string>('');

  const [cardImg, setCardImg] = useState(cardTypes.NoData);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const choiseCardImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum(event.target.value);
    const num = event.target.value[0];

    if (num === '3') {
      setCardImg(cardTypes.AmericanExpress);
    } else if (num === '4') {
      setCardImg(cardTypes.Visa);
    } else if (num === '5') {
      setCardImg(cardTypes.MasterCard);
    } else {
      setCardImg(cardTypes.NoData);
    }
  };

  const resetValueImg = () => {
    setCardNum('');
    setCardImg(cardTypes.NoData);
    setIsChecked(false);
  };

  const setCardDateSlash = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardDate(event.target.value);
    const value = event.target.value;
    if (!value.includes('/')) {
      if (value.length === 2) setCardDate((prev) => (prev += '/'));
    } else {
      if (value.length === 3) {
        setCardDate((prev) => {
          if (typeof prev === 'number') return 0;
          return prev.slice(0, 2);
        });
      }
    }
  };
  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    setIsChecked(true);
    const validateFunctions: boolean[] = [
      isNameValid(name),
      isTelValid(tel),
      isAddressValid(adress),
      isEmailValid(email),
      isCardNumValid(cardNum),
      isCardDateValid(cardDate),
      isCvvValid(cardCode),
    ];

    validateFunctions.map((field) => {
      if (field === false) {
        console.error('Validate error');
      } else if (validateFunctions.every((element) => element === true)) {
        setIsValidForm(true);
        setTimeout(() => {
          window.location.reload();
        }, 350000000);
      }
      return undefined;
    });
  };

  return (
    <>
      <div
        onClick={onClick}
        className={isOpen ? `${styles.buyForm__wrapper} ${styles.buyForm__wrapper_active}` : styles.buyForm__wrapper}
      ></div>
      <form className={isOpen ? `${styles.buyForm} ${styles.buyForm_active}` : styles.buyForm}>
        {isValidForm ? (
          <CompleteForm />
        ) : (
          <>
            <div className={styles.buyForm__infoWrapper}>
              <ul className={styles.buyForm__info}>
                <h3 className={styles.buyForm__header}>Personal information</h3>
                <FormInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder='Name Surname'
                  type='text'
                  required={true}
                  onClickReset={() => setName('')}
                  additionalClass={isChecked ? (isNameValid(name) ? '' : styles.buyForm__validateError) : ''}
                />
                <FormInput
                  value={tel}
                  onChange={(event) => setTel(event.target.value)}
                  placeholder='Telephone'
                  type='tel'
                  required={true}
                  onClickReset={() => setTel('')}
                  additionalClass={isChecked ? (isTelValid(tel) ? '' : styles.buyForm__validateError) : ''}
                />
                <FormInput
                  value={adress}
                  onChange={(event) => setAdress(event.target.value)}
                  placeholder='Adress'
                  type='text'
                  required={true}
                  onClickReset={() => setAdress('')}
                  additionalClass={isChecked ? (isAddressValid(adress) ? '' : styles.buyForm__validateError) : ''}
                />
                <FormInput
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder='Email'
                  type='email'
                  required={true}
                  onClickReset={() => setEmail('')}
                  additionalClass={isChecked ? (isEmailValid(email) ? '' : styles.buyForm__validateError) : ''}
                />
              </ul>
              <ul className={styles.buyForm__info}>
                <h3 className={styles.buyForm__header}>Card details</h3>
                <FormInput
                  value={cardNum}
                  onChange={choiseCardImg}
                  placeholder='Card number'
                  type='number'
                  required={true}
                  onClickReset={resetValueImg}
                  additionalClass={isChecked ? (isCardNumValid(cardNum) ? '' : styles.buyForm__validateError) : ''}
                >
                  <img className={styles.buyForm__cardImg} src={cardImg} alt='card img' />
                </FormInput>
                <FormInput
                  value={cardDate}
                  onChange={setCardDateSlash}
                  placeholder='Expiration date'
                  type='text'
                  required={true}
                  onClickReset={() => setCardDate('')}
                  additionalClass={isChecked ? (isCardDateValid(cardDate) ? '' : styles.buyForm__validateError) : ''}
                />
                <FormInput
                  value={cardCode}
                  onChange={(event) => setCardCode(event.target.value)}
                  placeholder='CVV'
                  type='number'
                  required={true}
                  onClickReset={() => setCardCode('')}
                  additionalClass={isChecked ? (isCvvValid(cardCode) ? '' : styles.buyForm__validateError) : ''}
                />
              </ul>
            </div>
            <Button additionalClass={styles.buyForm__btn} text='Submit' onClick={(event) => sendForm(event)} />
          </>
        )}
      </form>
    </>
  );
};

export default BuyForm;
