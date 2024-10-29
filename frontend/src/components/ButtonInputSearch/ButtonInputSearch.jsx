import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { Button } from 'antd';
// import { Props } from 'antd/es/transfer/ListBody';
  

const ButtonInputSearch = (props) => {
    const { 
        size, 
        placeholder, 
        textButton, 
        bordered, 
        backgroundColorInput = '#fff', 
        backgroundColorButton = 'rgb(13, 92, 182)', 
        colorButton = '#fff'
    } = props

    return (
        <div style = {{display: 'flex', }}>
            <InputComponent 
                size = {size} 
                placeholder={placeholder} 
                bordered = {bordered} 
                style = {{backgroundColor: backgroundColorInput}}
            />
            <Button
                size = {size} 
                style = {{background: 'rgb(13, 92, 182)', border: !bordered && 'none'}} 
                icon = {<SearchOutlined color = {colorButton} style={{color: '#fff'}} />}
                stlyeTextButton = {{ color: colorButton }} 
            ><span style = {{color: '#fff'}}>{textButton}</span></Button>
        </div>
    )
    
}
export default ButtonInputSearch