#!/usr/bin/python3
# id,ident,type,name,latitude_deg,longitude_deg,elevation,continent,iso_count,iso_region,municipal,scheduled_service,gps_code,iata_code,local_code,home_link,wikipedia,keywords

import json

def readCsv(f_name):
    rows = []
    fin = open(f_name, 'r')
    for line in fin:
        line = line.strip()
        line = line.split(',')
        if line[0] == 'id' or line[13] == '':
            continue
        d = {
            'id': line[0].replace('\"', ''),
            'name': line[3].replace('\"', ''),
            'continent': line[7].replace('\"', ''),
            'municipality': line[10].replace('\"', ''),
            'iata_code': line[13].replace('\"', ''),
        }
        rows.append(d)
    fin.close()
    return rows

def writeJson(f_name, rows):
    fout = open(f_name, 'w')
    json.dump(rows, fout)
    fout.close()

def main():
    csv = 'airports.csv'
    js = 'airports.json'
    rows = readCsv(csv)
    writeJson(js, rows)

if __name__ == '__main__':
    main()
