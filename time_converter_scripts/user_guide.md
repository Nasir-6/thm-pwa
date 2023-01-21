1) Run CSVTimeConverter
Set the flag: isForWordPress = False
This is because we will be using it for our postgres DB

When you run it it will create a new folder called mosques-new-DB

// THe above is incase you lose the mosques-new-DB-cleaned folder - THIS IS THE ONE WITH ALL THE NAMES Changed to match
the Google spreadsheet names (https://docs.google.com/spreadsheets/d/13cbCZHBn53eQIgf_HS8k8Al7P-pj8nDpt2pY0P0DCDU/edit#gid=860932484)
// Ignore above steps if you still havbe the folder - which you should otherwise you'll need to go through tedious process of renaming!

2) Run the prepare_csv_for_pg.py file
This is where new columns such as the uid, mosque_uid and