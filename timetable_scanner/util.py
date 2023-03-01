import cv2

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

def showImgAndReturnIfMeetsCriteria(pil_img, filename):
    while True:
        cv2.imshow(filename, pil_img)
        print("Does img meet criteria? Press q to quit, r to redo, Enter to move on")
        # Wait for a key press
        key = cv2.waitKey(0)
        # Close the OpenCV window - after input
        cv2.destroyAllWindows()
        # Add a small delay to allow the window to close properly
        cv2.waitKey(1)
        if key == 13:  # Enter key
            return True
        elif key == ord('q'):  # 'q' key
            cv2.destroyAllWindows()
            exit()  # Stop the process
        elif key == ord('r'):  # 'r' key
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