import csv
import os
import shutil
from timeConverters import fajr_convert, zuhr_convert, asr_convert, maghrib_convert, isha_convert, period_to_colon


cd = os.getcwd()
newFolderPath = cd + "/mosques-new"
if not os.path.exists(newFolderPath):
    os.makedirs(newFolderPath)

# TODO: Extract this part into a function which takes in csvFileName
# TODO: learn to loop through mosque folder and the individual mosque folders
# TODO: create a copy of just the folders
# TODO: Adjust the extracted function to place the new copy in the copied mosque-new folders
def convertAndCreateAndPlaceANewCSVFile(csvFileName):
  print("Inside function")
  with open("./" + csvFileName, 'r') as file:
    csvreader = csv.DictReader(file)

    with open(os.join.path(newFolderPath, csvFileName), 'w') as newFile:
      fieldNames = csvreader.fieldnames
      csvWriter = csv.DictWriter(newFile, fieldnames=fieldNames)
      csvWriter.writeheader()
      for row in csvreader:
        newRow = {}
        for name in fieldNames:
          if name.upper() == "DAY" or name.upper() == "DATE":
            newRow[name] = row[name]
            # continue to prevent issue with period_to_colon function
            continue

          row[name] = period_to_colon(row[name])
          if name.upper() == "FAJR":
            newRow[name] = fajr_convert(row[name])

          elif name.upper() == "ZOHAR":  # Spelt zohar in csvs!
            newRow[name] = zuhr_convert(row[name])

          elif name.upper() == "ASR":
            newRow[name] = asr_convert(row[name])

          elif name.upper() == "MAGHRIB":
            newRow[name] = maghrib_convert(row[name])

          elif name.upper() == "ESHA":  # Spelt esha in csvs
            newRow[name] = isha_convert(row[name])

          else:
            # TO catch any missing cases
            newRow[name] = row[name]
        csvWriter.writerow(newRow)

# Read in one csv file and make a new copy of it and adjust the values by writing to a new csv file
csvFileName = "Apr-2022.csv"
print("about to run function")
# convertAndCreateAndPlaceANewCSVFile(csvFileName)

print("testing new file function")


def main():
  mosques_folder_src = "mosques"
  mosques_folder_target = "mosques-new"
  for folder in os.listdir(mosques_folder_src):

    if folder.endswith(".DS_Store"):
      continue

    if folder.endswith(".xml"):
      # Just copy this folder over to new folder
      xml_file = folder
      shutil.copy2(os.path.join(mosques_folder_src, xml_file), mosques_folder_target)
      continue
    else:
      # This is a mosque folder
      a_mosque_folder = folder
      path_to_mosque_folder_src = os.path.join(mosques_folder_src, a_mosque_folder)
      path_to_mosque_folder_target = os.path.join(mosques_folder_target, a_mosque_folder)

      # Make the mosque folder if it doesn't exists - IMPORTANT otherwise csv file will be written to a file with mosque_folder name!!!
      if not os.path.exists(path_to_mosque_folder_target):
        os.makedirs(path_to_mosque_folder_target)

      # Loop through the src folder
      for file in os.listdir(path_to_mosque_folder_src):
        if file.endswith(".DS_Store"):
          continue
        # Check if file is a .txt address file if, so copy and paste it into target folder
        if file.endswith(".txt"):
          shutil.copy2(os.path.join(path_to_mosque_folder_src, file), path_to_mosque_folder_target)
        elif file.endswith(".csv"):
          print(file)
          print("this is a csv file do convert it")
          # Rather than copy files take csv files and covert
          shutil.copy2(os.path.join(path_to_mosque_folder_src, file), path_to_mosque_folder_target)
        else:
          print("This is another folder - most likely the masjid address folder go deeper and grab the .txt file")
          print(file)
          extra_masjid_address_folder_path = os.path.join(path_to_mosque_folder_src, file)
          extra_masjid_address_folder_target_path = os.path.join(path_to_mosque_folder_target, file)
          if not os.path.exists(extra_masjid_address_folder_target_path):
            os.makedirs(extra_masjid_address_folder_target_path)
          for extra_address_file in os.listdir(extra_masjid_address_folder_path):
            if extra_address_file.endswith(".txt"):
              shutil.copy2(os.path.join(extra_masjid_address_folder_path, extra_address_file), extra_masjid_address_folder_target_path)
            else:
              print("THIS IS A RANDOM FILE I HAVEN'T ENCOUNTERED")
              print(extra_address_file)
          # Make sure to create the folder! first before copy and pasting the file inside!!

      continue

main()