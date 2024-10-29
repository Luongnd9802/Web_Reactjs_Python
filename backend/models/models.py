from sqlalchemy import Table, Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.db import Base

# Bảng Product
class products(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    image = Column(String(255), nullable=False)
    type = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    count_in_stock = Column(Integer, nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(String(255), nullable=False)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
     
# Bảng User
class users(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    phone = Column(String(20), nullable=False)  
    address = Column(String(255))
    avatar = Column(String(255))

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

# Bảng OrderItem
class order_items(Base):
    __tablename__ = 'order_items'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    amount = Column(Integer, nullable=False)
    image = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)  # Khóa ngoại tới bảng Product
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)  # Khóa ngoại tới bảng Order

# Bảng ShippingAddress
class shipping_addresses(Base):
    __tablename__ = 'shipping_addresses'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)  # Khóa ngoại tới bảng Order

# Bảng Order
class orders(Base):
    __tablename__ = 'orders'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    payment_method = Column(String(255), nullable=False)
    items_price = Column(Float, nullable=False)
    shipping_price = Column(Float, nullable=False)
    tax_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Khóa ngoại tới bảng User
    is_paid = Column(Boolean, default=False, nullable=False)
    paid_at = Column(DateTime)
    is_delivered = Column(Boolean, default=False, nullable=False)
    delivered_at = Column(DateTime)
    
    order_items = relationship("order_items", backref="order")  # Quan hệ với OrderItem
    shipping_address = relationship("shipping_addresses", backref="order")  # Quan hệ với ShippingAddress
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Người dùng sở hữu giỏ hàng
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)  # Sản phẩm trong giỏ hàng
    quantity = Column(Integer, default=1, nullable=False)  # Số lượng sản phẩm
    product = relationship("products", backref="cart_product")  # Quan hệ với bảng sản phẩm
    user = relationship("users", backref="cart_user")  # Quan hệ với bảng người dùng    