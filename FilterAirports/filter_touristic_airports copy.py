import csv


airports = [
  "ATH", "SKG", "HER", "RHO", "CFU", "CHQ", "ZTH", "JTR", "JMK", "KGS",
  "FCO", "MXP", "VCE", "NAP", "FLR", "PMO", "BLQ", "CTA", "PSA", "OLB", "VRN", "BGY", "TRN", "BRI",
  "MAD", "BCN", "PMI", "AGP", "ALC", "LPA", "TFS", "VLC", "IBZ", "SVQ", "BIO", "SCQ", "FUE", "ACE",
  "CDG", "ORY", "NCE", "LYS", "MRS", "TLS", "BOD", "NTE", "BVA", "SXB", "MPL", "LIL",
  "FRA", "MUC", "BER", "DUS", "HAM", "CGN", "STR", "HAJ", "NUE", "LEJ", "DRS", "BRE", "FMM",
  "LHR", "LGW", "MAN", "STN", "LTN", "EDI", "BHX", "GLA", "BRS", "BFS", "NCL", "LPL",
  "IST", "SAW", "AYT", "ESB", "ADB", "DLM", "BJV", "TZX", "GZP", "ADA", "ASR", "GZT",
  "LIS", "OPO", "FAO", "FNC", "PXO", "PDL", "TER", "HOR",
  "ZAG", "SPU", "DBV", "ZAD", "PUY", "RJK",
  "VIE", "SZG", "INN"
]

results = []

with open('DATA/airport_data.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)
    next(csv_reader)

    for row in csv_reader:
        if row[2].strip() in airports:
            results.append(row)


# Open a CSV file in write mode
with open('DATA/target_airports.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Loop through result list
    for item in results:
        writer.writerow(item)


print("Writing to CSV file complete.")
