import csv
with open("FilterAirports/top_airports.txt","r") as f:
    content = f.readlines()

def has_numbers(inputString):
    return any(char.isdigit() for char in inputString)

result = [element.strip().split(" ")[0]+" " for element in content if len(element.strip()) > 4 or not has_numbers(element.strip())]

associated_airports = {}

for item in result:
    associated_airports[item.strip()] = []

with open('DATA/airport_data.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)
    next(csv_reader)

    for row in csv_reader:
        for top_airport in result:
            if top_airport in row[4].strip():
                associated_airports[top_airport.strip()] = row
                break


unique_rows = set()

# Open a CSV file in write mode
with open('DATA/top_airports.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Loop through result list
    for item in result:
        airports = associated_airports.get(item.strip(), [])
        
        # Ensure airports is a tuple to use as a hashable key
        airports_tuple = tuple(airports)
        
        # Check if the row is unique
        if airports_tuple not in unique_rows:
            if airports:
                writer.writerow(airports)
                unique_rows.add(airports_tuple)
        else:
            print(f"Duplicate row found and skipped: {airports}")

print("Writing to CSV file complete.")
