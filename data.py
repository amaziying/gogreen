import serial
import pymssql

# Establish connection with Azure SQL database
conn = pymssql.connect(server="syde-361-server.database.windows.net", user="group-11@syde-361-server",
                       password="Apple@123", database="syde_361_metrics")
cursor = conn.cursor()

# Establish connection with Arduino
ser = serial.Serial('/dev/cu.usbmodem1411', 9600)

def get_current_weight(voltage):
    return ((voltage  - 2.9953) / 0.0196)

def get_prev_weight():
    sqlcmd = "SELECT TOP 1 Weight from garbage_weight_table ORDER BY Garbage_Time DESC"
    cursor.execute(sqlcmd)
    conn.commit()
    if len(cursor.fetchall()) > 0:
        prev_weight = cursor.fetchall()[0]
    else:
        prev_weight = 0
    return prev_weight

prev_weight = get_prev_weight()

while True:
    current_voltage = float(ser.readline())
    current_weight = get_current_weight(current_voltage)
    if abs(current_weight - prev_weight) >= 0.85:
        sqlcmd = "INSERT INTO garbage_weight_table VALUES (%s, GETDATE())" % current_weight
        cursor.execute(sqlcmd)
        conn.commit()
        prev_weight = current_weight
        print "New Weight Updated!"

