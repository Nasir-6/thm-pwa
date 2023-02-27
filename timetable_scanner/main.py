import cv2
from PIL import Image, ImageOps
import pytesseract

img_path = "Feb-2023.JPG"

im = Image.open(img_path)
# To prevent img from being auto rotated due to exif value
# https://github.com/python-pillow/Pillow/issues/4703
im = ImageOps.exif_transpose(im)
im.show("Feb-2023")
usr_res = input("Does the image look fine (y/n)?")
if(usr_res == "n"):
    exit("NOPE IMAGE IS NOT GOOD")


print("Converting image to string....")
ocr_result = pytesseract.image_to_string(im)

print("Printing Results")
print(ocr_result)
print("Finished Printing Results")