import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(("", 3000), handler)
httpd.serve_forever()
