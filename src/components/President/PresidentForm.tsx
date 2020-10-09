import React, { FormEvent, ReactElement, useRef } from 'react';
import { ECountry } from './President';

interface IInput {
  type: string;
  name: string;
}

interface IInputText extends IInput {
  required: boolean;
  refs: React.RefObject<HTMLInputElement>;
}
interface IInputNumber extends IInputText {
  max: number;
  refs: React.RefObject<HTMLInputElement>;
}
interface IInputSelect extends IInput {
  options: string[];
  refs: React.RefObject<HTMLSelectElement>;
}

export default function PresidentForm({ onAddPresident }: any): ReactElement {
  const firstname = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLSelectElement>(null);
  const inputs: Array<IInputSelect | IInputNumber | IInputText> = [
    {
      type: 'text',
      name: 'firstname',
      required: true,
      refs: firstname,
    },
    {
      type: 'number',
      name: 'age',
      required: true,
      max: 100,
      refs: age,
    },
    {
      type: 'select',
      name: 'Country',
      options: Object.keys(ECountry),
      refs: country,
    },
  ];
  const inputNumber = (input: IInputNumber) => {
    return (
      <label htmlFor={input.name}>
        {input.name} :
        <input
          ref={input.refs}
          type='number'
          max={input.max}
          id={input.name}
          required={input.required}
        />
      </label>
    );
  };

  const inputText = (input: IInputText) => {
    return (
      <label htmlFor={input.name}>
        {input.name} :
        <input
          ref={input.refs}
          type='text'
          id={input.name}
          required={input.required}
        />
      </label>
    );
  };

  const inputSelect = (input: IInputSelect) => {
    return (
      <label htmlFor={input.name}>
        {input.name} :
        <select ref={input.refs}>
          {input.options.map((option: any) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
    );
  };

  const Input = (inputProps: any) => {
    let result: any;
    switch (inputProps.type) {
      case 'number':
        result = inputNumber(inputProps);
        break;
      case 'select':
        result = inputSelect(inputProps);
        break;
      default:
        result = inputText(inputProps);
        break;
    }
    return result;
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddPresident(
      firstname.current?.value,
      age.current?.value,
      country.current?.value
    );
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Ajouter un président</h1>
      {inputs.map((inputProps, index) => {
        return <Input key={index} {...inputProps} />;
      })}
      <input type='submit' value='TOT' />
    </form>
  );
}
