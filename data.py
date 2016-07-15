import serial
import time
import pymssql

# Establish connection with Azure SQL database
conn = pymssql.connect(server="syde-361-server.database.windows.net", user="group-11@syde-361-server", password="Apple@123", database="syde_361_metrics")
cursor = conn.cursor()

ser = serial.Serial('/dev/cu.usbmodem1411', 9600)

prev_weight = 0

def get_current_weight(voltage):
    return ((voltage  - 2.9953) / 0.0196)

def get_prev_weight():
    global prev_weight
    sqlcmd = "SELECT TOP 1 Weight from garbage_weight_table ORDER BY Garbage_Time DESC"
    cursor.execute(sqlcmd)
    conn.commit()
    if len(cursor.fetchall()) > 0:
        prev_weight = cursor.fetchall()[0]
    else:
        prev_weight = 0
    return prev_weight

prev_weight = get_prev_weight()


# cursor.execute("Delete from garbage_weight_table")
# conn.commit()


while True:
    current_voltage = float(ser.readline())
    print get_current_weight(current_voltage)

