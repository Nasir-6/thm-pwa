import cv2
import numpy as np
from util import deskew, openAndReturnImageArray
from PIL import Image, ImageOps

img_path = 'Redcoat-Mar-23.jpg'

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
detected_horizontal_lines = cv2.HoughLinesP(edges, 1, np.pi / 180, 100, minLineLength=100, maxLineGap=8)

# Filter lines by slope
max_y_diff = 1
min_horizontal_length = 10
horizontal_lines = []
for current_line in detected_horizontal_lines:
    x1, line1_y1, x2, line2_y1 = current_line[0]
    if abs(line2_y1 - line1_y1) < max_y_diff and abs(x2 - x1) > min_horizontal_length:
        horizontal_lines.append(current_line)

# Sort the lines by their y-coordinates
sorted_lines = sorted(horizontal_lines, key=lambda x: x[0][1])

# Filter lines which are close to each other - to avoid duplicate lines for table lines
filtered_list = []
prev_line = []
pixels_from_top_of_image = 180
pixels_from_bottom_of_image = 100
max_y_difference = 30
for line in sorted_lines:
    current_line = line[0]  # To make code more readable later - Only need the array - as no longer clusters
    if current_line[1] < pixels_from_top_of_image:
        continue
    if len(prev_line) == 0:
        prev_line = current_line
    else:
        print(prev_line)
        line1_y1 = prev_line[1]
        line2_y1 = current_line[1]
        if abs(line1_y1 - line2_y1) < max_y_difference:
            continue
        else:
            # New row line
            filtered_list.append(prev_line)
            prev_line = current_line
filtered_list.append(prev_line)

print("The Final List")
print(filtered_list)
# Draw the detected rows as contours on the image
for row_line in filtered_list:
    x1, line1_y1, x2, line2_y1 = row_line
    cv2.line(im, (0, line1_y1), (im_w, line1_y1), (0, 0, 255), 4)

# Display the result
cv2.imshow("Horizontal lines", im)


cv2.waitKey(0)
cv2.destroyAllWindows()
