// src/context/FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    country: '',
    postcode: '',
    description: '',
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: '',
    step6: ''
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
