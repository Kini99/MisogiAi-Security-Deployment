from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
from database import UserRole

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        
        has_special = any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in v)
        has_digit = any(c.isdigit() for c in v)
        has_alpha = any(c.isalpha() for c in v)
        
        if not (has_special and has_digit and has_alpha):
            raise ValueError('Password must contain at least one letter, one digit, and one special character')
        
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    role: UserRole

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserInDB(UserBase):
    id: int
    hashed_password: str
    role: UserRole
    is_active: bool 