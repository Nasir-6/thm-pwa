import csv
import os

# newpath = r'C:\Program Files\arbitrary'
cd = os.getcwd()
newFolderPath = cd + "/mosques-new"
if not os.path.exists(newFolderPath):
    os.makedirs(newFolderPath)


# Read in one csv file and make a new copy of it and adjust the values by writing to a new csv file
with open("./Apr-2023.csv", 'r') as file:
  csvreader = csv.DictReader(file)

  with open("./mosques-new/Apr-2023-New.csv", 'w') as newFile:
    fieldNames = csvreader.fieldnames
    csvWriter = csv.DictWriter(newFile, fieldnames=fieldNames)
    csvWriter.writeheader()
    for row in csvreader:
      newRow = {}
      for name in fieldNames:
        newRow[name] = row[name] + "Added this"

      csvWriter.writerow(newRow)
