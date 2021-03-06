import os
import csv

# filepath on computer 
csvpath = os.path.join("budget_data.csv")

# Open the CSV
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

# store all rows as a lists of lists 
data_rows = []
for row in csvreader:
    data_rows.append(row)

#clean rows to set second column as integer 
    temp_introw = row
    temp_introw[1] = int(temp_introw[1])

    data_rows.append(temp_introw)

print(data_rows)

# to calculate without header 
csv_header = data_rows.pop(0)
print(f"CSV Header: {csv_header}")

# lenght of data file 
month_length = len(data_rows)

# total of second column 
total_profit = [x[1] for x in data_rows]
all_profit = sum(total_profit)


#profit changes 
net_difference = []
for i in range(len(data_rows)-1):
    old_profit = data_rows[i][1]
    new_profit = data_rows[i+1][1]

    difference = new_profit_ - old_profit 
    net_difference.append(difference)

mean_change = sum(net_difference)/len/(net_difference) 


max_change = max(net_difference)
min_change = min(net_difference)

# change indexes 

most_change_index = net_difference.index(max_change)+ 1
most_month = data_rows[most_change_index][0]

least_change_index = net_difference.index(max_change)+ 1
least_month = data_rows[least_change_index][0]

print(least_month)
print(most_month)

# create TXT file 

out_path = "pybank_melendez.txt"
with open(out_path, "w") as f:
    f.write(f"Financial Analysis\n")
    f.write(f"-----------------------------\n")
    f.write(f"Total Months {month_length}\n")
    f.write(f"Total: ${all_profit}\n")
    f.write(f"Average Change: ${round(net_difference, 2)}\n")
    f.write(f"Greatest Increase in Profits: {most_month} ({max_change})\n")
    f.write(f"Greatest Increase in Profits: {least_month} ({min_change})\n")







