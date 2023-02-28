import cv2
from PIL import Image, ImageOps
import pytesseract
import numpy as np

def showImgInWindow(pil_img):
    # Convert to numpy array
    im_arr = np.asarray(pil_img)
    # Display image using OpenCV
    cv2.imshow("Image", im_arr)
    # Closing image
    cv2.waitKey(0)  # Wait for a key press before checking for user input
    cv2.destroyAllWindows()  # Close the OpenCV window
    # NEED TO ADD this so it waits for a sec!! and finsihes up closing
    # https://stackoverflow.com/questions/22274789/cv2-imshow-function-is-opening-a-window-that-always-says-not-responding-pyth
    cv2.waitKey(1)

img_path = "Feb-2023.JPG"

im = Image.open(img_path)
# To prevent img from being auto rotated due to exif value
# https://github.com/python-pillow/Pillow/issues/4703
im = ImageOps.exif_transpose(im)

showImgInWindow(im)

usr_res = input("Does the image look fine (y/n)?")
if(usr_res == "n"):
    exit("NOPE IMAGE IS NOT GOOD")

print("Converting image to string....")
ocr_result = pytesseract.image_to_string(im)
im.close()
print("Printing Results")
print(ocr_result)
print("Finished Printing Results")
