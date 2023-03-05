# This one will try to draw the horizontal and vertical table lines by:
# By Diluting the times and making each row/column one blob to be able to draw the row/column lines
# Then use those to identify blocks!

import cv2
from PIL import Image, ImageOps
import pytesseract
import numpy as np
from util import showImgInWindow, returnGrayscaleImg, showImgAndReturnIfMeetsCriteria, getThresholdFromUserInput

# Step 1 : First read in file and make grayscale, also grab img shape, copy and store a base_img for later, show img
# img_path = "IMG_4350.JPG"
img_path = "Redcoat-Mar-23.jpg"
im = Image.open(img_path)
im = ImageOps.exif_transpose(im)

# SO can pass display image
im = np.asarray(im)
base_image = im.copy()
im_h, im_w, im_d = im.shape

# showImgInWindow(im, "pre-processed PIL img")
gray_img = returnGrayscaleImg(im)
showImgInWindow(gray_img, "greyscaled Image")

# Step 2: Binarise img - pick a threshold such that table lines can be seen!
# Use threshold of ~ 50 so faint table lines don't show - want only text and smudge text!
imgMeetsCriteria = False
while not imgMeetsCriteria:
    usrThreshold = getThresholdFromUserInput()
    ret, thresh_value = cv2.threshold(gray_img, usrThreshold, 255, cv2.THRESH_BINARY_INV)
    print("Does current threshold of '" + str(usrThreshold) + "' meet the criteria?")
    imgMeetsCriteria = showImgAndReturnIfMeetsCriteria(thresh_value, "Binary Img")


# Step 3: Dilate all the text horizontally so as to produce singular blob allowing for row identification
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (100, 1))     # Use 50 to spread in x and join times, but 5 in y so as to add padding in y to box
dilated_value = cv2.dilate(thresh_value,kernel,iterations = 1)
showImgInWindow(dilated_value, "Dilated img")

# Draw contours
contours, hierarchy = cv2.findContours(dilated_value, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cordinates = []
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    # bounding the images
    if w > im_w * 0.90:# and h > 50:
        cv2.rectangle(im, (x, y), (x + w, y + h), (0, 0, 255), 3)
        # Only append the ones we want/drew boxes around!!!
        cordinates.append((x, y, w, h))
        # cordinates.insert(0, (x, y, w, h))

showImgInWindow(im, "Final image with contour")