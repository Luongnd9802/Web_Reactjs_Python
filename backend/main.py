from fastapi import FastAPI, HTTPException, Depends, Body, File, UploadFile, Form
from schema.schemas import UserCreate, UserLogin, ProductSchema, UserSchema, AddToCartRequest
from config.db import SessionLocal
from sqlalchemy.orm import Session, joinedload
from services.services import get_user_by_email, create_user, verify_password, create_access_token
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from models.models import users, products, Cart
from fastapi.security import OAuth2PasswordBearer
from fastapi.staticfiles import StaticFiles
import shutil, os
from typing import List

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:3000",
                    "http://localhost:3003",
                    "http://localhost:3001",
                    "http://localhost:3002"               
                  ],  # URL của ứng dụng React
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP (GET, POST, v.v.)
    allow_headers=["*"],  # Cho phép tất cả các headers
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API for Register

@app.post('/register')
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Kiểm tra nếu email đã được sử dụng
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email đã được đăng ký")
    
    # Tạo người dùng mới
    new_user = create_user(db=db, user=user)
    
    return {"message": "Người dùng đã đăng ký thành công", "user": new_user}

# API đăng nhập
@app.post('/login')
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    # Tìm người dùng dựa trên email
    db_user = get_user_by_email(db, email=user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Email không tồn tại")

    # Xác thực mật khẩu
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Mật khẩu không đúng")

    # Tạo JWT token
    access_token = create_access_token(data={"sub": db_user.email})

    return {"access_token": access_token, "email" :db_user.email, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token không hợp lệ")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ")

    # Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
    user = get_user_by_email(db, email=email)
    if user is None:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    return user

# API để lấy thông tin người dùng dựa trên JWT token
@app.get("/api/user/profile")
def get_user_profile(current_user: users = Depends(get_current_user)):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "address": current_user.address,
        "avatar": current_user.avatar,
        "is_admin": current_user.is_admin,
        "id": current_user.id
    }
    
@app.patch("/api/user/profile/update")
def update_user_profile(updated_user: dict = Body(...), current_user: users = Depends(get_current_user), db: Session = Depends(get_db)):
    # Tìm người dùng trong cơ sở dữ liệu
    db_user = get_user_by_email(db, email=current_user.email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    
    # Cập nhật chỉ các trường được cung cấp
    for key, value in updated_user.items():
        if hasattr(db_user, key):
            setattr(db_user, key, value)

    # Lưu thay đổi vào cơ sở dữ liệu
    db.commit()
    db.refresh(db_user)

    return {"message": "Thông tin người dùng đã được cập nhật thành công"}

@app.post("/api/user/profile/upload")
def upload_user_avatar(
    avatar: UploadFile = File(...),  
    current_user: users = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Tìm người dùng trong cơ sở dữ liệu
        db_user = get_user_by_email(db, email=current_user.email)
        if db_user is None:
            raise HTTPException(status_code=404, detail="Người dùng không tồn tại")

        # Lưu file avatar
        upload_dir = "uploads"
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        avatar_filename = f"{upload_dir}/{avatar.filename}"
        with open(avatar_filename, "wb") as buffer:
            shutil.copyfileobj(avatar.file, buffer)

        # Cập nhật đường dẫn avatar vào cơ sở dữ liệu
        db_user.avatar = avatar_filename
        db.commit()
        db.refresh(db_user)

        return {"message": "Avatar đã được tải lên thành công", "avatar": db_user.avatar}
    except Exception as e:
        print(f"Error uploading avatar: {e}")  # Log lỗi vào console
        raise HTTPException(status_code=500, detail=f"Error uploading avatar: {str(e)}")

# Lấy danh sách tất cả các sản phẩm
@app.get("/api/products", response_model=List[dict])
def get_all_products(db: Session = Depends(get_db)):
    try:
        # Lấy tất cả các sản phẩm từ cơ sở dữ liệu
        products_list = db.query(products).all()
        
        # Trả về danh sách sản phẩm
        return [
            {
                "id": product.id,
                "name": product.name,
                "image": product.image,
                "type": product.type,
                "price": product.price,
                "count_in_stock": product.count_in_stock,
                "rating": product.rating,
                "description": product.description,
                "created_at": product.created_at,
                "updated_at": product.updated_at
            }
            for product in products_list
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving products: {str(e)}")

# Tạo dữ liệu về sản phẩm
@app.post("/api/products/create")
async def create_product(
    name: str = Form(...),
    type: str = Form(...),
    price: float = Form(...),
    count_in_stock: int = Form(...),
    rating: float = Form(...),
    description: str = Form(...),
    image_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Save the image file
        upload_dir = "uploads"
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        image_filename = f"{upload_dir}/{image_file.filename}"
        with open(image_filename, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)

        # Create the product in the database
        new_product = products(
            name=name,
            type=type,
            price=price,
            count_in_stock=count_in_stock,
            rating=rating,
            description=description,
            image=image_filename
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi tạo sản phẩm: {str(e)}")
    
# Lấy dữ liệu về sản phẩm

@app.get("/api/products-info", response_model=List[ProductSchema])
def get_all_products(db: Session = Depends(get_db)):
    try:
        # Lấy tất cả các sản phẩm từ cơ sở dữ liệu
        products_list = db.query(products).all()
        
        # Trả về danh sách sản phẩm
        return products_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi lấy danh sách sản phẩm: {str(e)}")
    
# FastAPI endpoint để lấy sản phẩm theo id
@app.get('/api/products/{product_id}', response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(products).filter(products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    return product

@app.patch("/api/products/{product_id}")
async def update_product(
    product_id: int,
    name: str = Form(None),
    type: str = Form(None),
    price: float = Form(None),
    count_in_stock: int = Form(None),
    rating: float = Form(None),
    description: str = Form(None),
    image_file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Tìm sản phẩm trong cơ sở dữ liệu
    product = db.query(products).filter(products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")

    # Cập nhật sản phẩm chỉ với những giá trị được cung cấp
    if name:
        product.name = name
    if type:
        product.type = type
    if price:
        product.price = price
    if count_in_stock:
        product.count_in_stock = count_in_stock
    if rating:
        product.rating = rating
    if description:
        product.description = description
    if image_file:
        # Save the new image file
        upload_dir = "uploads"
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        image_filename = f"{upload_dir}/{image_file.filename}"
        with open(image_filename, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)
        
        # Update image path
        product.image = image_filename

    # Commit changes to the database
    db.commit()
    db.refresh(product)

    return {"message": "Sản phẩm đã được cập nhật thành công", "product": product}

# API xóa sản phẩm dựa trên product_id
@app.delete("/api/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(products).filter(products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    
    # Xóa sản phẩm khỏi cơ sở dữ liệu
    db.delete(product)
    db.commit()

    return {"message": "Sản phẩm đã được xóa thành công"}

@app.get("/api/users/information", response_model=List[UserSchema])
def get_all_users(db: Session = Depends(get_db)):
    try:
        # Lấy tất cả các sản phẩm từ cơ sở dữ liệu
        users_list = db.query(users).all()
        
        # Trả về danh sách sản phẩm
        return users_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi lấy danh sách người dùng: {str(e)}")
    
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(users).filter(users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    
    # Xóa sản phẩm khỏi cơ sở dữ liệu
    db.delete(user)   
    db.commit()
    
# API lấy thông tin người dùng theo id
@app.get('/api/users/{user_id}', response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(users).filter(users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    return user

@app.patch("/api/users/{user_id}")
async def update_user(
    user_id: int,
    name: str = Form(None),
    email: str = Form(None),
    address: str = Form(None),
    phone: str = Form(None),
    db: Session = Depends(get_db)
):
    # Tìm sản phẩm trong cơ sở dữ liệu
    user = db.query(users).filter(users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")

    # Cập nhật sản phẩm chỉ với những giá trị được cung cấp
    if name:
        user.name = name
    if email:
        user.email = email
    if address:
        user.address = address
    if phone:
        user.phone = phone

    # Commit changes to the database
    db.commit()
    db.refresh(user)

    return {"message": "Người dùng đã được cập nhật thành công"}

@app.post("/api/cart/add")
def add_to_cart(request: AddToCartRequest, db: Session = Depends(get_db)):
    user_id = request.user_id
    product_id = request.product_id
    quantity = request.quantity

    # Kiểm tra xem sản phẩm có tồn tại hay không
    product = db.query(products).filter(products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    
    # Kiểm tra xem giỏ hàng của người dùng đã có sản phẩm này chưa
    cart_item = db.query(Cart).filter(Cart.user_id == user_id, Cart.product_id == product_id).first()

    if cart_item:
        # Nếu đã có sản phẩm này trong giỏ, cập nhật số lượng
        cart_item.quantity += quantity
    else:
        # Nếu chưa có, thêm mới vào giỏ hàng
        new_cart_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
        db.add(new_cart_item)

    db.commit()

    return {"message": "Sản phẩm đã được thêm vào giỏ hàng"}

# @app.get("/api/cart-items")
# def get_cart_items(user_id: int, db: Session = Depends(get_db)):
#     cart_items = db.query(Cart).filter(Cart.user_id == user_id).all()
#     return cart_items

@app.get("/api/cart-items")
def get_cart_items(user_id: int, db: Session = Depends(get_db)):
    # Truy vấn để lấy các mục trong giỏ hàng, kèm thông tin sản phẩm
    cart_items = (
        db.query(Cart, products.name, products.price)
        .join(products, Cart.product_id == products.id)
        .filter(Cart.user_id == user_id)
        .all()
    )

    # Định dạng lại dữ liệu trả về để bao gồm thông tin sản phẩm
    result = [
        {
            "cart_item_id": item.Cart.id,
            "product_id": item.Cart.product_id,
            "product_name": item.name,
            "product_price": item.price,
            "quantity": item.Cart.quantity,
            "total_price": item.Cart.quantity * item.price
        }
        for item in cart_items
    ]

    return result

@app.delete("/api/cart/{cart_item_id}")
def delete_cart_item(cart_item_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
    Xóa một mục trong giỏ hàng dựa trên cart_item_id.
    """
    # Truy vấn mục giỏ hàng dựa trên cart_item_id và user_id của người dùng hiện tại
    cart_item = db.query(Cart).filter(Cart.id == cart_item_id, Cart.user_id == current_user.id).first()
    
    # Kiểm tra nếu mục giỏ hàng không tồn tại
    if not cart_item:
        raise HTTPException(status_code=404, detail="Mục trong giỏ hàng không tồn tại")

    # Xóa mục giỏ hàng khỏi cơ sở dữ liệu
    db.delete(cart_item)
    db.commit()

    return {"message": "Mục đã được xóa khỏi giỏ hàng"}