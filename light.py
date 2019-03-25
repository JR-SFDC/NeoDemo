from envirophat import leds

from time import sleep
import sys

light = sys.argv[1]

if light == 'false':
	leds.off()
elif light== 'true':
	leds.on()


