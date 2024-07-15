import csv


countries = ["AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA"]

results = []

with open('DATA/airport_data.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)
    next(csv_reader)

    for row in csv_reader:
        if row[0].strip() in countries:
            results.append(row)


# Open a CSV file in write mode
with open('DATA/european_airports.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Loop through result list
    for item in results:
        writer.writerow(item)


print("Writing to CSV file complete.")
