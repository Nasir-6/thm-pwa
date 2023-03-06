import cv2
import numpy as np
from util import deskew

from PIL import Image, ImageOps

img_path = 'Redcoat-Mar-23.jpg'
img_path = 'IMG_4350.JPG'


im = Image.open(img_path)
# To prevent img from being auto rotated due to exif value
# https://github.com/python-pillow/Pillow/issues/4703
im = ImageOps.exif_transpose(im)

# SO can pass display image
im = np.asarray(im)

# Read the image
img = cv2.imread(img_path)
im = deskew(im)
im = np.asarray(img)
base_image = im.copy()
im_h, im_w, im_d = im.shape

# Convert to grayscale
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

# Apply Gaussian blur
blur = cv2.GaussianBlur(gray, (5, 5), 0)
cv2.imshow('blur', blur)

# Detect edges
edges = cv2.Canny(blur, 20, 100, apertureSize=3)
cv2.imshow('edges', edges)
# Detect lines
lines = cv2.HoughLinesP(edges, 1, np.pi/180, 100, minLineLength=100, maxLineGap=8)
# cv2.imshow('Lines', lines)

# Filter lines by slope
horizontal_lines = []
for line in lines:
    x1, y1, x2, y2 = line[0]
    if abs(y2 - y1) < 1 and abs(x2 - x1) > 10:
        horizontal_lines.append(line)

# Draw lines on a blank image
line_image = np.zeros_like(img)
for line in horizontal_lines:
    x1, y1, x2, y2 = line[0]
    cv2.line(line_image, (0, y1), (im_w, y1), (255, 255, 255), thickness=1)

#  NO NEED JUST CUT OUT THE IMAGE USING THE HORIZONTAL LINES!!
# # Draw 2 vertical lines
# # Draw one on the LHS
# cv2.line(line_image, (10,0), (10, im_h), (255, 255, 255), thickness=3)
# # Draw Another on the RHS
# cv2.line(line_image, (im_w-15,0), (im_w-15, im_h), (255, 255, 255), thickness=3)

# Sort the lines by their y-coordinates
lines = sorted(horizontal_lines, key=lambda x: x[0][1])

# Group the lines into clusters based on their y-coordinates
clusters = []
current_cluster = []
y_starting_value = 212
for line in lines:
    if line[0][1] < y_starting_value:
        continue
    if not current_cluster:
        current_cluster.append(line)
    else:
        y1 = current_cluster[-1][0][1]
        y2 = line[0][3]
        if abs(y1 - y2) < 100:
            print(line)
            # Set y2 of current cluster to line if not a new row - as want to accomadate for slightly skewed lines
            current_cluster[-1][0][3] = y2
            print("Dont store as it is not the next row line!")
            # current_cluster.append(line)
        else:
            clusters.append(current_cluster)
            current_cluster = [line]
clusters.append(current_cluster)

# Draw the detected rows as contours on the image
for cluster in clusters:
    x1, y1, x2, y2 = cluster[0][0]
    cv2.line(im, (0, y1), (im_w, y2), (0, 0, 255), 4)
    x1, y1, x2, y2 = cluster[-1][0]
    cv2.line(im, (0, y1), (im_w, y2), (0, 0, 255), 4)

# Display the result
cv2.imshow("Result", im)

# Display the result
# cv2.imshow('Horizontal lines', line_image)
cv2.namedWindow('Base Image')
# Move the second window to the right
cv2.moveWindow('Base Image', 700, 0)
cv2.imshow('Base Image', base_image)


# # Draw contours
# contours, hierarchy = cv2.findContours(line_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# cordinates = []
# for cnt in contours:
#     x, y, w, h = cv2.boundingRect(cnt)
#     # bounding the images
#     if True or w > im_w * 0.7:
#         cv2.rectangle(im, (x, y), (x + w, y + h), (0, 0, 255), 3)
#         # Only append the ones we want/drew boxes around!!!
#         cordinates.append((x, y, w, h))
#         # cordinates.insert(0, (x, y, w, h))




cv2.waitKey(0)
cv2.destroyAllWindows()
