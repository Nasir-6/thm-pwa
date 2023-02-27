import cv2
from PIL import Image
import pytesseract

img_path = "Feb-2023.JPG"

img = Image.open(img_path)

print("Converting image to string....")
ocr_result = pytesseract.image_to_string(img)

print("Printing Results")
print(ocr_result)
print("Finished Printing Results")