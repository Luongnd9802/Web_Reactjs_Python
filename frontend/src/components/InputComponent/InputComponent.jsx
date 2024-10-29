import React from 'react'
import { Input } from 'antd';

// import { Props } from 'antd/es/transfer/ListBody';
  

const InputComponent = ({size, placeholder, bordered, style, ...rests}) => {
    return (
            <Input 
                size = {size} 
                placeholder={placeholder} 
                bordered = {bordered} 
                style = {style}
                {...rests}
            />
    )
    
}
export default InputComponent