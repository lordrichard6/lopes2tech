from PIL import Image
import os

# Source is the artifact path known from previous step
source_path = "/Users/paulolopes/.gemini/antigravity/brain/f1684f13-ec48-4b87-8d05-3c35c20337b3/swiss_hiking_contact_1769461542472.png"
dest_path = "src/assets/contact/paulo-hiking.webp"

try:
    with Image.open(source_path) as img:
        print(f"Converting {source_path}...")
        
        # Resize if huge (e.g. max 1920 wide)
        if img.width > 1920:
            ratio = 1920 / img.width
            new_height = int(img.height * ratio)
            img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
            print(f"Resized to 1920x{new_height}")
            
        img.save(dest_path, 'WEBP', quality=90)
        print(f"Saved to {dest_path}")
        
except Exception as e:
    print(f"Error: {e}")
