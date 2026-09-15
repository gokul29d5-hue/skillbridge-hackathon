from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    # Safely truncate password to 72 bytes to prevent bcrypt limitation crashes
    safe_password = password[:72]
    return pwd_context.hash(safe_password)

def verify_password(plain_password: str, hashed_password: str):
    safe_password = plain_password[:72]
    return pwd_context.verify(safe_password, hashed_password)
