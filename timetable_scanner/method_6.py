import cv2
import numpy as np

# Read the image
img = cv2.imread('Redcoat-Mar-23.jpg')
im = np.asarray(img)
base_image = im.copy()
im_h, im_w, im_d = im.shape

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply Gaussian blur
blur = cv2.GaussianBlur(gray, (5, 5), 0)
cv2.imshow('blur', blur)

# Detect edges
edges = cv2.Canny(blur, 50, 100, apertureSize=3)
cv2.imshow('edges', edges)
# Detect lines
lines = cv2.HoughLinesP(edges, 1, np.pi/180, 100, minLineLength=100, maxLineGap=8)
# cv2.imshow('Lines', lines)

# Filter lines by slope
horizontal_lines = []
for line in lines:
    x1, y1, x2, y2 = line[0]
    if abs(y2 - y1) < 1 and abs(x2 - x1) > 100:
        horizontal_lines.append(line)

# Draw lines on a blank image
line_image = np.zeros_like(img)
for line in horizontal_lines:
    x1, y1, x2, y2 = line[0]
    cv2.line(line_image, (0, y1), (im_w, y1), (255, 255, 255), thickness=1)

# Draw 2 vertical lines
# Draw one on the LHS
cv2.line(line_image, (10,0), (10, im_h), (255, 255, 255), thickness=3)
# Draw Another on the RHS
cv2.line(line_image, (im_w-15,0), (im_w-15, im_h), (255, 255, 255), thickness=3)

# Display the result
cv2.imshow('Horizontal lines', line_image)
cv2.namedWindow('Base Image')
# Move the second window to the right
cv2.moveWindow('Base Image', 700, 0)
cv2.imshow('Base Image', base_image)




cv2.waitKey(0)
cv2.destroyAllWindows()
