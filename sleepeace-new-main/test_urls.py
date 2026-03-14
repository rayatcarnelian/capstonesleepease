
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
  'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg',
  'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
  'https://actions.google.com/sounds/v1/water/rain_drops.ogg',
  'https://actions.google.com/sounds/v1/ambiences/barn_drips.ogg',
  'https://actions.google.com/sounds/v1/weather/thunderstorm_short.ogg',
  'https://actions.google.com/sounds/v1/science_fiction/space_engine.ogg'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, context=ctx, timeout=10)
        print('OK: ' + url + ' - ' + str(response.status))
    except Exception as e:
        print('FAIL: ' + url + ' - ' + str(e))

