from envirophat import light, motion, weather, leds

from time import sleep
import sys
while True:
	lux = light.light()
	r, g, b = light.rgb()
	acc = motion.accelerometer().z
	temp = weather.temperature()
	pressure = weather.pressure(unit='hPa')

	print [lux,acc,temp,pressure,r,g,b]
   	sys.stdout.flush()
    	sleep(2)
