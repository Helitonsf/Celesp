import os
import re

def split_project():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    css_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
    js_match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)

    if css_match and js_match:
        os.makedirs('css', exist_ok=True)
        os.makedirs('js', exist_ok=True)

        with open('css/style.css', 'w', encoding='utf-8') as f:
            f.write(css_match.group(1).strip())

        with open('js/app.js', 'w', encoding='utf-8') as f:
            f.write(js_match.group(1).strip())

        new_html = html.replace(css_match.group(0), '<link rel="stylesheet" href="css/style.css">')
        new_html = new_html.replace(js_match.group(0), '<script src="js/app.js"></script>')

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print("Arquivos divididos com sucesso!")
    else:
        print("Erro: Não foi possível encontrar as tags style e script.")

if __name__ == "__main__":
    split_project()
