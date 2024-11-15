import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
 import Skeleton from 'react-loading-skeleton';


function FormField({ label, type, placeholder, id, onChange, name, value, disabled = false,loading=false, required=true, options,maxLength,min, as, rows}) {
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getFormattedPastDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  
  
  return (
    <Form.Group  className="mb-3 custom-input" controlId={id} >
     {label && <Form.Label className='' >{label}</Form.Label>}

      {
      loading?
      <Skeleton height={'2rem'} />
      :
        
      type === 'dropdown'?
      (
      <Form.Select  className="drop-option  "  name={name} value={value} onChange={onChange} disabled={disabled} >
      {options?.map((option, index) => (
        <option key={option?.value} value={option?.value}  className='custom-drop'>
          {option?.label}
        </option>
      ))}
    </Form.Select>
      )
    :
      type === 'password' ?
      (
      <InputGroup className=' rounded'>
        <Form.Control
          className={'form-field '}
          required={required}
          type={showPassword ? 'text' : 'password'}
          aria-label={showPassword ? 'Show password' : 'Hide password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
         
        />
        <Button variant="transparent" className='' style={{border: '2px solid rgba(0, 0,0, 0.3)'}}  onClick={togglePasswordVisibility}>
          {showPassword ? <HiOutlineEye color='black' />: <HiOutlineEyeOff color='black' /> }
        </Button>
      </InputGroup>
      ):
      type === 'tel' ? (
        <Form.Control
          className={'form-field  '}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => {
            const inputValue = e.target.value;
            const isValidNumber = /^-?\d*\.?\d*$/.test(inputValue);
      
            if (isValidNumber) {
              onChange({ target: { name, value: inputValue } });
            }
          }}
          pattern="[-]?\d*\.?\d+"
          disabled={disabled}
        />
      )

      :(
        <Form.Control
          className={'form-field '}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          as={as}
          rows={rows}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={type === 'date' ? getFormattedPastDate() : null}
          maxLength={maxLength}
        />
      )
      
    }

    </Form.Group>
  );
}

export default FormField;
