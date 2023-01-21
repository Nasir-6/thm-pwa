# User Guide

## 1) Run CSVTimeConverter

Set the flag: isForWordPress = False
This is because we will be using it for our postgres DB

When you run it, it will create a new folder called mosques-new-DB

The above is incase you lose the mosques-new-DB-cleaned folder - THIS IS THE ONE WITH ALL THE NAMES Changed to match
the Google spreadsheet names (https://docs.google.com/spreadsheets/d/13cbCZHBn53eQIgf_HS8k8Al7P-pj8nDpt2pY0P0DCDU/edit#gid=860932484)
// Ignore above steps if you still have the folder - which you should otherwise you'll need to go through tedious process of renaming!

## 2) Run the prepare_csv_for_pg.py file

This Edits the csvs like so:

- New columns such as the timetable_uid, mosque_uid and mosque name are added
- removes any empty columns aswell as the "Day" column

### How to add more columns - FOR FUTURE SELF/DEVS

1. Change the extra_columns_added = 3 => to 3 + however many you added (3 is coz of timetable_uid, mosque_uid and mosque columns)
2. Add in the column name - follow pattern in that section of code

```python
if(singleRowIndex == 0):
    rows[singleRowIndex].insert(0, "timetable_uid")
    rows[singleRowIndex].insert(1, "mosque_uid")
    rows[singleRowIndex].insert(2, "mosque")  # insert the folder name at the start of the row
```

3. Also add in the generation of the values into the else statement see below:

```python
else:
    name = folder_name
    d = datetime.datetime.strptime(rows[singleRowIndex][1], "%d-%b-%y")
    s = d.strftime('%Y-%m-%d')

    words = name.split()
    first_letters = [word[0].upper() for word in words]
    first_letters[0] = words[0].upper()     #Use WHOLE FIRST WORD - so it is unique - no clashes with Locksley, Lansbury, Docklands, Dorset
    timetable_uid = ''.join(first_letters) + '-' + s
    mosque_uid = ''.join(first_letters)
    rows[singleRowIndex].insert(0, timetable_uid)  # insert the folder name at the start of the row
    rows[singleRowIndex].insert(1, mosque_uid)  # insert the mosque_uid at the start of the row
    rows[singleRowIndex].insert(2, folder_name)  # insert the folder name (mosque name) at the start of the row
```

## 3) Run the timetable_csv_combiner.py

This will combine all the CSV files depending on the flag isForSalahBeginningFolder:

1. False - Will create an all_mosque_combined.csv file
2. True - Will create an salah_beginning_combined.csv file
