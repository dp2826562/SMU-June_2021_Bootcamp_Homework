import os
import csv

# filepath on computer 
csvpath = "Resources\\election_data.csv"

#csv as list of lists 
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

# read the header row 
csv_header = next(csvreader)
print(f"CSV Header: {csv_header}")

# store all rows as a lists of lists 
    total_rows = []
    for row in csvreader:
# clean rows and read second column as integer
    third_row = row
    third_row[1] = int(third_row[1]) 

    total_rows.append(third_row)
    total_rows.append(row)

vote_total = len(total_rows)

# dictionary for votes of each candidate 

votes = {}
    for row in total_rows: 
        person = row[2]

    if person in votes.key():
        votes[person] += 1 
    else
        votes[person] = 1 

    print(votes)

 
# return the person with top votes 
    max(votes, key=votes.get)


# create TXT file 

out_path = "pypoll_melendez.txt"
with open(out_path, "w") as f:
    f.write(f"Election Results\n")
    f.write(f"-----------------------------\n")
    f.write(f"Total Votes {votes}\n")
    f.write(f"-----------------------------\n")

    max(votes, key=votes.get)
        f.write(f"{person}: {round(votes[person]/votes * 100)}% ({votes[person]})")

    f.write(f"-----------------------------\n")
    f.write(f"Winner :{votes}"
    f.write(f"-----------------------------\n")