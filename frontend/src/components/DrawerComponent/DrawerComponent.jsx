import { Drawer } from 'antd';
import React, { useState } from 'react';


const DrawerComponent = ({ title="Basic Drawer", placement="right", isOpen = false, children, ...rests }) => {
    return (
        <>
            <Drawer title={title} placement={placement}  open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
      );
    
}

export default DrawerComponent