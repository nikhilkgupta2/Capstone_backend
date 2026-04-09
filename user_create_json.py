import json
import random
import string
from faker import Faker

# Initialize Faker for Indian context
fake = Faker('en_IN')

# Config
NUM_USERS = 50
FILE_NAME = "users_seed.json"

EMAIL_PROVIDERS = ["gmail.com", "yahoo.co.in", "outlook.com", "icloud.com"]

users = []
used_emails = set()
used_phones = set()

def generate_strong_password():
    """Generate a strong password matching validator.isStrongPassword"""
    upper = random.choice(string.ascii_uppercase)
    lower = random.choice(string.ascii_lowercase)
    digit = random.choice(string.digits)
    special = random.choice("!@#$%^&*")
    
    others = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    
    password = upper + lower + digit + special + others
    return ''.join(random.sample(password, len(password)))


for i in range(NUM_USERS):
    full_name = fake.name()

    # Unique email
    email_name = full_name.lower().replace(" ", "")
    provider = random.choice(EMAIL_PROVIDERS)
    email = f"{email_name}{i}@{provider}"

    while email in used_emails:
        email = f"{email_name}{random.randint(1000,9999)}@{provider}"
    used_emails.add(email)

    # Unique Indian phone number
    phone = f"{random.randint(7, 9)}{random.randint(100000000, 999999999)}"
    while phone in used_phones:
        phone = f"{random.randint(7, 9)}{random.randint(100000000, 999999999)}"
    used_phones.add(phone)

    # Role logic (mostly vendor, few admins)
    role = "admin" if random.random() < 0.1 else "Vendar"

    user_entry = {
        # id NOT included (UUID auto generated in Sequelize)
        "full_name": full_name,
        "email": email,
        "password_hash": generate_strong_password(),  # plain for seed (hash later if needed)
        "phone": phone,
        "role": role,
        "is_active": True if random.random() < 0.9 else False
    }

    users.append(user_entry)


# Write JSON
with open(FILE_NAME, "w", encoding="utf-8") as f:
    json.dump(users, f, indent=2)

print(f"✅ {FILE_NAME} created with {NUM_USERS} users")