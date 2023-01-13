import csv
import os
from timeConverters import fajr_convert, zuhr_convert, asr_convert, maghrib_convert, isha_convert, period_to_colon


cd = os.getcwd()
newFolderPath = cd + "/mosques-new"
if not os.path.exists(newFolderPath):
    os.makedirs(newFolderPath)


# Read in one csv file and make a new copy of it and adjust the values by writing to a new csv file
csvFileName = "Apr-2022.csv"

# TODO: Extract this part into a function which takes in csvFileName
# TODO: learn to loop through mosque folder and the individual mosque folders
# TODO: create a copy of just the folders
# TODO: Adjust the extracted function to place the new copy in the copied mosque-new folders
with open("./" + csvFileName, 'r') as file:
  csvreader = csv.DictReader(file)

  with open(newFolderPath + "/" + csvFileName, 'w') as newFile:
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

        elif name.upper() == "ZOHAR":   # Spelt zohar in csvs!
          newRow[name] = zuhr_convert(row[name])

        elif name.upper() == "ASR":
          newRow[name] = asr_convert(row[name])

        elif name.upper() == "MAGHRIB":
          newRow[name] = maghrib_convert(row[name])

        elif name.upper() == "ESHA":    # Spelt esha in csvs
          newRow[name] = isha_convert(row[name])

        else:
          # TO catch any missing cases
          newRow[name] = row[name]
      csvWriter.writerow(newRow)