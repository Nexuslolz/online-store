import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';

interface IErrorMessage {
  styles: string;
  error: FetchBaseQueryError | SerializedError;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ error, styles }: IErrorMessage) => {
  const errorMessage = ('status' in error ? String(error.status) : error.message) ?? '';
  return <h1 className={styles}>Error has occured. {errorMessage}. Try again later.</h1>;
};

export default ErrorMessage;
