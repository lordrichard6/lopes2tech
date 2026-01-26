import os
from pathlib import Path
from PIL import Image

def optimize_images(directory):
    target_dir = Path(directory)
    if not target_dir.exists():
        print(f"Directory {directory} does not exist.")
        return

    print(f"Scanning {target_dir}...")
    
    # Get all PNG files
    files = list(target_dir.glob('**/*.png'))
    total_saved = 0
    
    for file_path in files:
        output_path = file_path.with_suffix('.webp')
        
        try:
            with Image.open(file_path) as img:
                print(f"Converting {file_path.name}...")
                
                # Get original size
                original_size = file_path.stat().st_size
                
                # Convert to RGB (in case of RGBA) if saving as JPEG, but WebP handles RGBA.
                # However, for maximum compression we might want to resize if they are huge.
                # The audit said they are 6MB+, so they are likely huge dimensions.
                # Let's cap max dimension to 1920px (width or height)
                
                max_dimension = 1920
                if img.width > max_dimension or img.height > max_dimension:
                    img.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
                    print(f"  Resized to {img.size}")
                
                # Save as WebP
                img.save(output_path, 'WEBP', quality=85, optimize=True)
                
                new_size = output_path.stat().st_size
                saved = original_size - new_size
                total_saved += saved
                
                print(f"  Saved: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB")
                print(f"  Reduction: {(1 - new_size/original_size)*100:.1f}%")
                
                # Verify the new file exists and is smaller before deleting (optional, I won't delete automatically in this script yet)
        except Exception as e:
            print(f"Error converting {file_path}: {e}")
                
    print(f"\nTotal space saved: {total_saved/1024/1024:.2f} MB")

if __name__ == "__main__":
    # Correct relative path to assets/services
    services_dir = "./src/assets/services"
    optimize_images(services_dir)
