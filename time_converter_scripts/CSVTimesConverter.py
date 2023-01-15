import csv
import os
import shutil
from timeConverters import fajr_convert, zuhr_convert, asr_convert, maghrib_convert, isha_convert, period_to_colon

# set to true if making files for WP, false if making files for own DB
isForWordPress = True


cd = os.getcwd()
newFolderPath = cd + "/mosques-new"
if not os.path.exists(newFolderPath):
    os.makedirs(newFolderPath)

# TODO: Extract this part into a function which takes in csvFileName
# TODO: learn to loop through mosque folder and the individual mosque folders
# TODO: create a copy of just the folders
# TODO: Adjust the extracted function to place the new copy in the copied mosque-new folders
def convertAndCreateAndPlaceANewCSVFile(csvFileName, src_folder_path, target_folder_path):
  print("Inside function")

  # with open deals with closing file aswell as better exception handling - using open() by itself you need to deal with closing file aswell!
  with open(os.path.join(src_folder_path, csvFileName), 'r') as file:
    csvreader = csv.DictReader(file)

    with open(os.path.join(target_folder_path, csvFileName), 'w') as newFile:
      fieldNames = csvreader.fieldnames
      csvWriter = csv.DictWriter(newFile, fieldnames=fieldNames)
      csvWriter.writeheader()
      for row in csvreader:
        newRow = {}
        for name in fieldNames:
          if name.upper() == "DAY" or name.upper() == "DATE" or name == "" or row[name] == "":
            newRow[name] = row[name]
            # continue to prevent issue with period_to_colon function
            continue

          row[name] = period_to_colon(row[name])
          if name.upper() == "FAJR":
            newRow[name] = fajr_convert(row[name])

          elif name.upper() == "ZOHAR":  # Spelt zohar in csvs!
            newRow[name] = zuhr_convert(row[name], isForWordPress)

          elif name.upper() == "ASR":
            newRow[name] = asr_convert(row[name], isForWordPress)

          elif name.upper() == "MAGHRIB":
            newRow[name] = maghrib_convert(row[name], isForWordPress)

          elif name.upper() == "ESHA":  # Spelt esha in csvs
            newRow[name] = isha_convert(row[name], isForWordPress)

          else:
            # TO catch any missing cases
            newRow[name] = row[name]
        csvWriter.writerow(newRow)

# Read in one csv file and make a new copy of it and adjust the values by writing to a new csv file

# csvFileName = "./mosques/Apr-2022.csv"
# print("about to run function")
# convertAndCreateAndPlaceANewCSVFile(csvFileName)

print("testing new file function")


def main():
  mosques_folder_src = "mosques"
  if isForWordPress:
    mosques_folder_target = "mosques-new-WP"
  else:
    mosques_folder_target = "mosques-new-DB"
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
        # Want to keep cleartemp file incase wp breaks
        if file.endswith(".txt"):
          shutil.copy2(os.path.join(path_to_mosque_folder_src, file), path_to_mosque_folder_target)
          continue

        # Only keep cleartemp file for wp-site
        if  file == "cleartemp":
          if isForWordPress:
            shutil.copy2(os.path.join(path_to_mosque_folder_src, file), path_to_mosque_folder_target)
          else:
            continue

        # This is a csv file with the timetable
        elif file.endswith(".csv"):
          print("currently converting - " + path_to_mosque_folder_src + file)

          # Deal with the empty csv file - just copy it over incase it breaks wp site
          # Only copy for WP site else leave alone
          if(path_to_mosque_folder_src == "mosques/AberfeldyIslamicCulturalCentre"):
            if isForWordPress:
              shutil.copy2(os.path.join(path_to_mosque_folder_src, file), path_to_mosque_folder_target)
              continue
            else:
              continue

          # Extra if statements so if it's for WP it converts all of them
          # Else if it's for DB only saves 2023 csv files
          if file.endswith("2023.csv"):
            convertAndCreateAndPlaceANewCSVFile(file, path_to_mosque_folder_src, path_to_mosque_folder_target)
          elif isForWordPress:
            convertAndCreateAndPlaceANewCSVFile(file, path_to_mosque_folder_src, path_to_mosque_folder_target)
          else:
            continue

        # Odd case with an extra folder inside to hold the address
        else:
          print("This is another folder - most likely the masjid address folder go deeper and grab the .txt file")
          print(file)
          extra_masjid_address_folder_path = os.path.join(path_to_mosque_folder_src, file)
          extra_masjid_address_folder_target_path = os.path.join(path_to_mosque_folder_target, file)
          # Make sure to create the folder! first before copy and pasting the file inside!!
          if not os.path.exists(extra_masjid_address_folder_target_path):
            os.makedirs(extra_masjid_address_folder_target_path)
          for extra_address_file in os.listdir(extra_masjid_address_folder_path):
            if extra_address_file.endswith(".txt"):
              shutil.copy2(os.path.join(extra_masjid_address_folder_path, extra_address_file), extra_masjid_address_folder_target_path)
            else:
              # Shouldn't see this but just incase!
              print("THIS IS A RANDOM FILE I HAVEN'T ENCOUNTERED")
              print(extra_address_file)

      continue

main()