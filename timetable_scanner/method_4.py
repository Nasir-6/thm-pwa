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

canny = cv2.Canny(im, 125, 175)
cv2.imshow('Canny Edges', canny)

# Draw contours
contours, hierarchy = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cordinates = []
print(contours)
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    # bounding the images
    if w > im_w * 0.1:# and h > 50:
        cv2.rectangle(im, (x, y), (x + w, y + h), (0, 0, 255), 3)
        # Only append the ones we want/drew boxes around!!!
        cordinates.append((x, y, w, h))
        # cordinates.insert(0, (x, y, w, h))

showImgInWindow(im, "Final image with contour")