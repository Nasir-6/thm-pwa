import cv2
import numpy as np
from util import deskew
from PIL import Image, ImageOps

img_path = 'Redcoat-Mar-23.jpg'
# img_path = 'IMG_4350.JPG'

def openAndReturnImageArray(img_path):
    im = Image.open(img_path)
    # To prevent img from being auto rotated due to exif value
    # https://github.com/python-pillow/Pillow/issues/4703
    im = ImageOps.exif_transpose(im)
    # SO can pass display image
    im = np.asarray(im)
    return im


im = openAndReturnImageArray(img_path)
base_image = im.copy()
im_h, im_w, im_d = im.shape

# Convert to grayscale
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

# Apply Gaussian blur
blur = cv2.GaussianBlur(gray, (5, 5), 0)
# cv2.imshow('blur', blur)

# Detect edges
edges = cv2.Canny(blur, 20, 100, apertureSize=3)
# cv2.imshow('edges', edges)

# Detect Horizontal lines
sorted_lines = cv2.HoughLinesP(edges, 1, np.pi / 180, 100, minLineLength=100, maxLineGap=8)

# Filter lines by slope
max_y_diff = 1
min_horizontal_length = 10
horizontal_lines = []
for line in sorted_lines:
    x1, y1, x2, y2 = line[0]
    if abs(y2 - y1) < max_y_diff and abs(x2 - x1) > min_horizontal_length:
        horizontal_lines.append(line)

# Sort the lines by their y-coordinates
sorted_lines = sorted(horizontal_lines, key=lambda x: x[0][1])

# Group the lines into clusters based on their y-coordinates
clusters = []
current_cluster = []
y_starting_value = 180
max_slope_difference = 30
for line in sorted_lines:
    if line[0][1] < y_starting_value:
        continue
    if not current_cluster:
        current_cluster.append(line)
    else:
        y1 = current_cluster[-1][0][1]
        y2 = line[0][3]
        if abs(y1 - y2) < max_slope_difference:
            # print(line)
            # Set y2 of current cluster to line if not a new row - as want to accomadate for slightly skewed lines
            # current_cluster[-1][0][3] = y2
            # print("Dont store as it is not the next row line!")
            # current_cluster.append(line)
            continue
        else:
            clusters.append(current_cluster)
            current_cluster = [line]
clusters.append(current_cluster)

# Draw the detected rows as contours on the image
for cluster in clusters:
    x1, y1, x2, y2 = cluster[0][0]
    cv2.line(im, (0, y1), (im_w, y2), (0, 0, 255), 4)
    # x1, y1, x2, y2 = cluster[-1][0]
    # cv2.line(im, (0, y1), (im_w, y2), (0, 0, 255), 4)

print(clusters)
# Display the result
cv2.imshow("Result", im)

# Display the result
cv2.namedWindow('Base Image')
# Move the second window to the right
cv2.moveWindow('Base Image', 700, 0)
cv2.imshow('Base Image', base_image)




cv2.waitKey(0)
cv2.destroyAllWindows()
