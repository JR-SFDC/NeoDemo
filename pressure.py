from envirophat import weather
from time import sleep
import sys
while True:
    print (weather.pressure(unit='hPa'))
    sys.stdout.flush()
    sleep(3)