import cv2
from PIL import Image, ImageOps
import pytesseract
import numpy as np


def showImgInWindow(pil_img, filename):
    # Convert to numpy array
    # im_arr = np.asarray(pil_img)
    # Display image using OpenCV
    cv2.imshow(filename, pil_img)
    # Closing image
    cv2.waitKey(0)  # Wait for a key press before checking for user input
    cv2.destroyAllWindows()  # Close the OpenCV window
    # NEED TO ADD this so it waits for a sec!! and finsihes up closing
    # https://stackoverflow.com/questions/22274789/cv2-imshow-function-is-opening-a-window-that-always-says-not-responding-pyth
    cv2.waitKey(1)

def grayscale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

img_path = "IMG_4350.JPG"

im = Image.open(img_path)
# To prevent img from being auto rotated due to exif value
# https://github.com/python-pillow/Pillow/issues/4703
im = ImageOps.exif_transpose(im)

# SO can pass display image
im = np.asarray(im)
base_image = im.copy() # COPY IMAGE HERE
im_h, im_w, im_d = im.shape # Grab image shape here

showImgInWindow(im, "pre-processed PIL img")

# usr_res = input("Does the image look fine? Enter n to stop:")
# if(usr_res == "n"):
#     exit("NOPE IMAGE IS NOT GOOD")

gray_img = grayscale(im)
showImgInWindow(gray_img, "greyscaled Image")
# usr_res = input("Does the greyscale image look fine? Enter n to stop: ")
# if(usr_res == "n"):
#     exit("NOPE IMAGE IS NOT GOOD")

# Now converting to binary
ret,thresh_value = cv2.threshold(gray_img,60,255,cv2.THRESH_BINARY_INV)
showImgInWindow(thresh_value, "Binary image")

# Dilating image
kernel = np.ones((5,5),np.uint8)
dilated_value = cv2.dilate(thresh_value,kernel,iterations = 5)

showImgInWindow(dilated_value, "Dilated img")


# Draw contours on original image
contours, hierarchy = cv2.findContours(dilated_value, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
cordinates = []
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    # bounding the images
    if x > 100 and y > 300 and w > 50 and h > 50 and y < (im_h - 400) :
        cv2.rectangle(im, (x, y), (x + w, y + h), (0, 0, 255), 3)
        # Only append the ones we want/drew boxes around!!!
        # cordinates.append((x, y, w, h))
        cordinates.insert(0, (x, y, w, h))

showImgInWindow(im, "Final image with contour")

## Now use contours to read each time

# print("Printing coordinates")
# print(cordinates)
print("Printing ocr results")
# MAKE SURE NOT TO set to digits only - as need to identify ":" character!!!
custom_config = r'--psm 6 tessedit_char_whitelist=0123456789:'
i = 1
row = []
time_arr = []
dayNum = 1
indexes_to_grab = [4, 7, 9, 11, 13]

# TODO: Figure out how to get correct order i.e top left to bottom right when looping through coordinates
for x, y, w, h in cordinates:
    if(i == 1):
        if dayNum < 10:
            row = ["0" + str(dayNum) + "-Feb-23"]
        else:
            row = [str(dayNum) + "-Feb-23"]
    elif i in indexes_to_grab:
        roi = thresh_value[y:y + h, x:x + w]
        kernel = np.ones((2, 2), np.uint8)
        dilated_value = cv2.dilate(roi, kernel, iterations=1)
        ocr_result = pytesseract.image_to_string(dilated_value, config=custom_config)

        print(ocr_result)
        showImgInWindow(dilated_value, ocr_result)
        row.append(ocr_result)

    if i == 13:
        time_arr.append(row)
        i = 1
        dayNum = dayNum + 1
    else:
        i = i + 1
    # while len(ocr_result) == 0:
    #     print("Couldn't read properly")
    #     showImgInWindow(roi, "current region of interest")
    #     # Dilate image to fill in gaps
    #     kernel = np.ones((2, 2), np.uint8)
    #     dilated_value = cv2.dilate(roi, kernel, iterations=1)
    #     showImgInWindow(dilated_value, "dilated img")
    #     # Set the custom configuration string for identifying times in the form hh:mm
    #     custom_config = r'--psm 6 outputbase digits tessedit_char_whitelist=0123456789:'
    #     ocr_result = pytesseract.image_to_string(dilated_value, config=custom_config)

    # print("result: " + ocr_result)
    # showImgInWindow(roi, "current region of interest")


print("Final array")
print(time_arr)
# print("Converting image to string....")
# ocr_result = pytesseract.image_to_string(thresh_value)
# print("Printing Results")
# print(ocr_result)
# print("Finished Printing Results")
