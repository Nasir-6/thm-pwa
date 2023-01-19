import os
import csv
import datetime


def add_mosque_name_and_uid_column_and_remove_empty_header_columns(path, new_folder):
    for dirpath, dirnames, filenames in os.walk(path):
        for file in filenames:
            if file.endswith('.csv'):
                # construct the full file path
                file_path = os.path.join(dirpath, file)

                # read the CSV file
                with open(file_path, 'r') as f:
                    reader = csv.reader(f)
                    rows = [row for row in reader]
                # columns to remove
                columns_to_remove = ["day"]
                # lower case the header
                headers = [header.lower() for header in rows[0]]
                # columns to remove indexes
                columns_to_remove_index = [i for i, header in enumerate(headers) if len(header) == 0]
                # print(headers)
                # print(columns_to_remove)
                columns_to_remove_index = [i + 2 for i in columns_to_remove_index]
                columns_to_remove_index.append(2)
                # L = [1] * 5
                # >> > [x + 1 for x in L]
                # [2, 2, 2, 2, 2]
                # print(columns_to_remove_index[0] + 1)
                # add the new column
                folder_name = os.path.basename(dirpath)
                print("PRINTING ROW")
                print(rows)
                for singleRowIndex in range(len(rows)):
                    if(singleRowIndex == 0):
                        rows[singleRowIndex].insert(0, "uid")
                        rows[singleRowIndex].insert(1, "mosque")  # insert the folder name at the start of the row
                    else:
                        name = folder_name
                        d = datetime.datetime.strptime(rows[singleRowIndex][1], "%d-%b-%y")
                        s = d.strftime('%Y-%m-%d')

                        words = name.split()
                        first_letters = [word[0].upper() for word in words]
                        uid = ''.join(first_letters) + '-' + s
                        rows[singleRowIndex].insert(0, uid)  # insert the folder name at the start of the row
                        rows[singleRowIndex].insert(1, folder_name)  # insert the folder name at the start of the row
                # update the header of the first column
                # rows[0][0] = "mosque"
                # remove the columns "day"
                for singleRowIndex in range(len(rows)):
                    rows[singleRowIndex] = [x for j, x in enumerate(rows[singleRowIndex]) if j not in columns_to_remove_index]
                # Create new folder if it doesn't exist
                if not os.path.exists(new_folder):
                    os.makedirs(new_folder)
                # create subfolder based on the current folder name
                sub_folder = os.path.join(new_folder, folder_name)
                if not os.path.exists(sub_folder):
                    os.makedirs(sub_folder)

                # write the CSV file to the new folder
                new_file_path = os.path.join(sub_folder, file)
                with open(new_file_path, 'w', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerows(rows)


# Add the new column to all CSV files in the directory and save them to a new folder
add_mosque_name_and_uid_column_and_remove_empty_header_columns("mosques-new-DB-cleaned", "chatGPT-mosques-new-DB-cleaned")
