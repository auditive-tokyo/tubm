import os
import re

def process_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # すでにinclude文がある場合はスキップ
    if '{% include "_includes/header.njk" %}' in content:
        print(f'Skipping (already has include): {file_path}')
        return
    
    # <!DOCTYPE html>から</head>までを{% include %}に置換
    pattern = r'<!DOCTYPE html>.*?</head>'
    if re.search(pattern, content, flags=re.DOTALL):
        new_content = re.sub(pattern, '{% include "_includes/header.njk" %}', content, flags=re.DOTALL)
        
        # ファイルに書き戻し
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Converted: {file_path}')
    else:
        print(f'Skipping (no header found): {file_path}')

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        # _includesディレクトリをスキップ
        if '_includes' in dirs:
            dirs.remove('_includes')
        
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                process_html_file(file_path)

if __name__ == '__main__':
    # カレントディレクトリから開始
    process_directory('.')
    print('Conversion completed!')