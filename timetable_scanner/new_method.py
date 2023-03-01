# This one will try to draw the horizontal and vertical table lines
# Then use those to identify blocks!
import cv2
from PIL import Image, ImageOps
import pytesseract
import numpy as np
from util import showImgInWindow, returnGrayscaleImg

# Step 1 : First read in file and make grayscale, also grab img shape, copy and store a base_img for later, show img
img_path = "IMG_4350.JPG"

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