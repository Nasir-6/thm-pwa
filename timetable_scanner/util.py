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


def grayscale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)