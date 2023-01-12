import csv
import os

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
        # Deal with all Fajr values
        if(isMissingFront0 and name.upper() == "FAJR"):
          newRow[name] = "0" + row[name]

        # Deal with Zuhr values - 3 scenarios
        elif(name.upper() == "ZOHAR"):
          if(isMissingFront0 or row[name][0] == "0"):
            # If missingFront0 - 1:00
            # or if 01:00 - Need to convert to 13:00 - i.e chnage 1 to 13
            # Grab last 3 chars e.g :00 and add 13 to it!
            print("13" + row[name][-3:])
            newRow[name] = "13" + row[name][-3:]
          else:
            # 1) 12:45 - This is fine leave as is
            newRow[name] = row[name];
        # Deal with Asr times
        else:
          newRow[name] = row[name]



      csvWriter.writerow(newRow)
