import os
from PIL import Image

search_dir = 'src/assets/services/'
output_dir = 'src/assets/services/'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

files = [f for f in os.listdir(search_dir) if f.endswith('.png')]

for filename in files:
    try:
        img_path = os.path.join(search_dir, filename)
        with Image.open(img_path) as img:
            base_name = os.path.splitext(filename)[0]
            out_path = os.path.join(output_dir, base_name + '.webp')
            img.save(out_path, 'WEBP', quality=80)
            print(f"Converted {filename} to {base_name}.webp")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")
