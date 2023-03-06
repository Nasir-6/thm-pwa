import cv2

def showImgInWindow(pil_img, filename):
    # Convert to numpy array
    # im_arr = np.asarray(pil_img)
    # Display image using OpenCV
    cv2.imshow(filename, pil_img)
    # Closing image
    # cv2.waitKey(0)  # Wait for a key press before checking for user input
    # cv2.destroyAllWindows()  # Close the OpenCV window
    # NEED TO ADD this so it waits for a sec!! and finsihes up closing
    # https://stackoverflow.com/questions/22274789/cv2-imshow-function-is-opening-a-window-that-always-says-not-responding-pyth
    cv2.waitKey(1)

def showImgAndReturnIfMeetsCriteria(pil_img, filename):
    while True:
        cv2.imshow(filename, pil_img)
        print("Does img meet criteria? Press q to quit, r to redo, Enter to move on")
        # Wait for a key press
        key = cv2.waitKey(0)
        # Close the OpenCV window - after input
        if key == 13:  # Enter key
            return True
        elif key == ord('q'):  # 'q' key
            cv2.destroyAllWindows()
            exit()  # Stop the process
        elif key == ord('r'):  # 'r' key
            cv2.destroyAllWindows()
            # Add a small delay to allow the window to close properly
            cv2.waitKey(1)
            return False


def returnGrayscaleImg(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def checkIfUserInputIsANumber(userInput):
    if userInput.isdigit():
        return True
    else:
        print("User Input is not a number! Please try again")
        return False

def getThresholdFromUserInput():
    isValidThreshold = False
    while not isValidThreshold:
        usrThreshold = input("Please pick a new threshold: ")
        isValidThreshold = checkIfUserInputIsANumber(usrThreshold)
    return int(usrThreshold)



# Calculate skew angle of an image
def getSkewAngle(cvImage) -> float:
    # Prep image, copy, convert to gray scale, blur, and threshold
    newImage = cvImage.copy()
    gray = cv2.cvtColor(newImage, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Apply dilate to merge text into meaningful lines/paragraphs.
    # Use larger kernel on X axis to merge characters into single line, cancelling out any spaces.
    # But use smaller kernel on Y axis to separate between different blocks of text
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (30, 5))
    dilate = cv2.dilate(thresh, kernel, iterations=5)

    # Find all contours
    contours, hierarchy = cv2.findContours(dilate, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key = cv2.contourArea, reverse = True)

    # Find largest contour and surround in min area box
    largestContour = contours[0]
    minAreaRect = cv2.minAreaRect(largestContour)

    # Determine the angle. Convert it to the value that was originally used to obtain skewed image
    angle = minAreaRect[-1]
    if angle < -45:
        angle = 90 + angle
    return -1.0 * angle


# Rotate the image around its center
def rotateImage(cvImage, angle: float):
    newImage = cvImage.copy()
    (h, w) = newImage.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    newImage = cv2.warpAffine(newImage, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return newImage

# Deskew image
def deskew(cvImage):
    angle = getSkewAngle(cvImage)
    return rotateImage(cvImage, -1.0 * angle)