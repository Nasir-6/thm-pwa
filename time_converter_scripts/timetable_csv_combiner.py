import os
import csv

path = 'chatGPT-mosques-new-DB-cleaned'

# Get all subdirectories in the path
subdirectories = [f.path for f in os.scandir(path) if f.is_dir()]

isForSalahBeginningFolder = False

if(isForSalahBeginningFolder):
    # Create a new file in the parent directory to store the combined CSV
    combined_csv = open(os.path.join(path, 'salah_beginning_combined.csv'), 'w')
    csv_writer = csv.writer(combined_csv)
    header_saved = False
    for subdir in subdirectories:
        # Get all CSV files in the subdir
        if (os.path.basename(subdir) != "_Salah Beginning"):
            continue
        csv_files = [f for f in os.listdir(subdir) if f.endswith('.csv')]

        for csv_file in csv_files:
            with open(os.path.join(subdir, csv_file)) as f:
                csv_reader = csv.reader(f)
                for i, row in enumerate(csv_reader):
                    if i == 0 and not header_saved:
                        csv_writer.writerow(row)
                        header_saved = True
                    elif i != 0:
                        csv_writer.writerow(row)
    combined_csv.close()
else:
    # Create a new file in the parent directory to store the combined CSV
    combined_csv = open(os.path.join(path, 'all_mosque_combined.csv'), 'w')
    csv_writer = csv.writer(combined_csv)
    header_saved = False
    for subdir in subdirectories:
        # Get all CSV files in the subdir
        if (os.path.basename(subdir) == "_Salah Beginning"):
            continue
        csv_files = [f for f in os.listdir(subdir) if f.endswith('.csv')]

        for csv_file in csv_files:
            with open(os.path.join(subdir, csv_file)) as f:
                csv_reader = csv.reader(f)
                for i, row in enumerate(csv_reader):
                    if i == 0 and not header_saved:
                        csv_writer.writerow(row)
                        header_saved = True
                    elif i != 0:
                        csv_writer.writerow(row)
    combined_csv.close()

