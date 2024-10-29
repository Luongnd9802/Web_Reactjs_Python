from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProductSchema(BaseModel):
    
    id: int
    name: str
    type: str
    price: float
    count_in_stock: int
    rating: float
    description: str
    image: Optional[str]

    class Config:
        orm_mode = True


class CreateProductSchema(BaseModel):
    
    name: str
    image: str
    type: str
    price: float
    count_in_stock: int
    rating: float
    description: str

##### Product Schemas End #####


##### User Schemas Start #####

class UserSchema(BaseModel):
    id: int
    name: str
    email: str
    address: Optional[str]
    is_admin: bool
    phone: str
    
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone: str

class UserUpdate(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    avatar: str


##### User Schemas End #####


##### OrderItem Schemas Start #####

class OrderItemSchema(BaseModel):
    id: Optional[int]
    name: str
    amount: int
    image: str
    price: float
    product_id: int
    order_id: Optional[int]



class CreateOrderItemSchema(BaseModel):
    name: str
    amount: int
    image: str
    price: float
    product_id: int

  

##### OrderItem Schemas End #####


##### ShippingAddress Schemas Start #####

class ShippingAddressSchema(BaseModel):
    id: Optional[int]
    full_name: str
    address: str
    city: str
    phone: str
    order_id: Optional[int]


class CreateShippingAddressSchema(BaseModel):
    full_name: str
    address: str
    city: str
    phone: str


##### ShippingAddress Schemas End #####


##### Order Schemas Start #####

class OrderSchema(BaseModel):
    id: Optional[int]
    payment_method: str
    items_price: float
    shipping_price: float
    tax_price: float
    total_price: float
    user_id: int
    is_paid: Optional[bool] = False
    paid_at: Optional[datetime]
    is_delivered: Optional[bool] = False
    delivered_at: Optional[datetime]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    
    order_items: Optional[List[OrderItemSchema]]
    shipping_address: Optional[ShippingAddressSchema]

    

class CreateOrderSchema(BaseModel):
    payment_method: str
    items_price: float
    shipping_price: float
    tax_price: float
    total_price: float
    user_id: int
    order_items: List[CreateOrderItemSchema]
    shipping_address: CreateShippingAddressSchema



##### Order Schemas End #####


##### Response Models Start #####

class OnlyOrderItem(BaseModel):
    name: str
    amount: int
    price: float


class OnlyShippingAddress(BaseModel):
    full_name: str
    address: str
    city: str
    phone: str


class OrderDetailSchema(OrderSchema):
    order_items: List[OnlyOrderItem]
    shipping_address: OnlyShippingAddress  

class UserLogin(BaseModel):
    email: str
    password: str


class AddToCartRequest(BaseModel):
    user_id: int
    product_id: int
    quantity: int
