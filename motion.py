from envirophat import light
from time import sleep
import sys
while True:
    print light.light()
    sys.stdout.flush()
    sleep(3) 