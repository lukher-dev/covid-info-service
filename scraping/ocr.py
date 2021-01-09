from PIL import Image
import pytesseract
import requests

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\s.maciejewski\scoop\apps\tesseract\5.0.0-alpha.20201127\tesseract.exe'

image_url = 'https://pbs.twimg.com/media/ErR2HbZXYAEbAib.jpg'

img = Image.open(requests.get(image_url, stream=True).raw)
print(pytesseract.image_to_string(img))
