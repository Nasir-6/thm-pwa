# This one will try to draw the horizontal and vertical table lines
# Then use those to identify blocks!

# ISSUE WIth this is if the border lines are too thin and can't be picked up on!!!
import cv2
from PIL import Image, ImageOps
import pytesseract
import numpy as np
from util import showImgInWindow, returnGrayscaleImg, showImgAndReturnIfMeetsCriteria, getThresholdFromUserInput

# Step 1 : First read in file and make grayscale, also grab img shape, copy and store a base_img for later, show img
# img_path = "IMG_4350.JPG"
img_path = "../Redcoat-Mar-23.jpg"

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
imgMeetsCriteria = False
while not imgMeetsCriteria:
    usrThreshold = getThresholdFromUserInput()
    ret, thresh_value = cv2.threshold(gray_img, usrThreshold, 255, cv2.THRESH_BINARY_INV)
    print("Does current threshold of '" + str(usrThreshold) + "' meet the criteria?")
    imgMeetsCriteria = showImgAndReturnIfMeetsCriteria(thresh_value, "Binary Img")


# Step 3: Extract all vertical lines by eroding anything apart from vertical lines


horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (np.array(im).shape[1] // 150, 1))
eroded_image = cv2.erode(thresh_value, horizontal_kernel, iterations=1)
showImgAndReturnIfMeetsCriteria(eroded_image, "eroded img")

thick_horizontal_kernal = horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1,10))
horizontal_lines = cv2.dilate(eroded_image, thick_horizontal_kernal, iterations=1)
showImgInWindow(horizontal_lines, "Vertical lines after dilation")

vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, im_w//150))
eroded_image = cv2.erode(thresh_value, vertical_kernel, iterations=1)
showImgAndReturnIfMeetsCriteria(eroded_image, "eroded img")

thick_vertical_kernal = horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (10,1))
vertical_lines = cv2.dilate(eroded_image, thick_vertical_kernal, iterations=1)
showImgInWindow(vertical_lines, "Vertical lines after dilation")


# Combining
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
vertical_horizontal_lines = cv2.addWeighted(vertical_lines, 0.5, horizontal_lines, 0.5, 0.0)
vertical_horizontal_lines = cv2.erode(~vertical_horizontal_lines, kernel, iterations=3)


thresh, vertical_horizontal_lines = cv2.threshold(vertical_horizontal_lines,128,255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
b_image = cv2.bitwise_not(cv2.bitwise_xor(im,thresh))


showImgInWindow(b_image, "b_image")
showImgInWindow(vertical_horizontal_lines, "combo")

inverted_combo = cv2.bitwise_not(vertical_horizontal_lines)
showImgInWindow(inverted_combo, "Inverted combo")

canny = cv2.Canny(inverted_combo, 125, 175)
cv2.imshow('Inverted Canny', canny)
# canny = cv2.GaussianBlur(vertical_horizontal_lines, (7,7), cv2.BORDER_DEFAULT)
# cv2.imshow('BLURRED Lines', canny)

# canny = cv2.Canny(vertical_horizontal_lines, 125, 175)
# cv2.imshow('Canny Edges', canny)

# Draw contours
contours, hierarchy = cv2.findContours(canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cordinates = []
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    # bounding the images
    if True and w > im_w * 0.7:
        cv2.rectangle(im, (x, y), (x + w, y + h), (0, 0, 255), 3)
        # Only append the ones we want/drew boxes around!!!
        cordinates.append((x, y, w, h))
        # cordinates.insert(0, (x, y, w, h))


showImgAndReturnIfMeetsCriteria(im, "Final image with contour")