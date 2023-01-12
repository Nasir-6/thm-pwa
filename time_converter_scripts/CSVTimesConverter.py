import csv
import os
from timeConverters import fajr_convert, zuhr_convert



# newpath = r'C:\Program Files\arbitrary'
cd = os.getcwd()
newFolderPath = cd + "/mosques-new"
if not os.path.exists(newFolderPath):
    os.makedirs(newFolderPath)


# Read in one csv file and make a new copy of it and adjust the values by writing to a new csv file
with open("./Apr-2022.csv", 'r') as file:
  csvreader = csv.DictReader(file)

  with open("./mosques-new/Apr-2022-New.csv", 'w') as newFile:
    fieldNames = csvreader.fieldnames
    csvWriter = csv.DictWriter(newFile, fieldnames=fieldNames)
    csvWriter.writeheader()
    for row in csvreader:
      newRow = {}
      for name in fieldNames:
        if(name == "Day"):
          newRow[name] = row[name]
          continue
        print(name)
        print(row[name])
        print(len(row[name]))
        isMissingFront0 = (len(row[name]) == 4)
        print(row[name][0])

        print(isMissingFront0)
        if(name.upper() == "FAJR"):
          newRow[name] = fajr_convert(row[name])

        elif(name.upper() == "ZOHAR"): # Maybe need to check for "Zuhr" spelling!
          newRow[name] = zuhr_convert(row[name])

        # Deal with Asr times
        else:
          newRow[name] = row[name]



      csvWriter.writerow(newRow)
