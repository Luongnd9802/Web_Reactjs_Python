from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models.models import users
from schema.schemas import UserCreate # Assuming you have a schema for the incoming data
from datetime import datetime, timedelta
from jose import JWTError, jwt

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash the password
def hash_password(password: str):
    return bcrypt_context.hash(password)

# Check if email already exists
def get_user_by_email(db: Session, email: str):
    return db.query(users).filter(users.email == email).first()

# Create a new user
def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = users(
        name=user.name,
        email=user.email,
        password=hashed_password,
        phone=user.phone,
        
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Mã hóa mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bí mật để tạo JWT (thay đổi giá trị này bằng một chuỗi ngẫu nhiên)
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180

def get_user_by_email(db: Session, email: str):
    return db.query(users).filter(users.email == email).first()

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


