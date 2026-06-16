import xml.etree.ElementTree as ET
import requests
from flask import Flask, jsonify, render_template
from bs4 import BeautifulSoup

app = Flask(__name__)

def fetch_and_parse_release_notes():
    url = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"
    response = requests.get(url, timeout=15)
    if not response.ok:
        raise Exception(f"Failed to fetch feed: {response.status_code}")
    
    xml_data = response.content
    
    # Parse XML
    root = ET.fromstring(xml_data)
    
    # Atom namespace
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    
    entries = []
    
    for entry in root.findall('atom:entry', ns):
        # Date title
        title_elem = entry.find('atom:title', ns)
        date_str = title_elem.text if title_elem is not None else "Unknown Date"
        
        # Link to docs
        link_elem = entry.find('atom:link', ns)
        link = link_elem.attrib.get('href', '') if link_elem is not None else ''
        
        # Updated timestamp
        updated_elem = entry.find('atom:updated', ns)
        updated = updated_elem.text if updated_elem is not None else ''
        
        # HTML Content
        content_elem = entry.find('atom:content', ns)
        content_html = content_elem.text if content_elem is not None else ''
        
        # Parse HTML to separate features, issues, etc.
        soup = BeautifulSoup(content_html, 'html.parser')
        
        sub_updates = []
        current_type = None
        current_html = []
        current_text = []
        
        # Iterate over soup contents to split by <h3> elements
        for child in soup.children:
            if child.name == 'h3':
                # If we already have a type accumulated, save it first
                if current_type and (current_html or current_text):
                    sub_updates.append({
                        'type': current_type,
                        'description_html': "".join(current_html).strip(),
                        'description_text': " ".join(current_text).strip()
                    })
                current_type = child.get_text().strip()
                current_html = []
                current_text = []
            else:
                if child.name is not None:
                    current_html.append(str(child))
                    current_text.append(child.get_text())
        
        # Save the last one
        if current_type and (current_html or current_text):
            sub_updates.append({
                'type': current_type,
                'description_html': "".join(current_html).strip(),
                'description_text': " ".join(current_text).strip()
            })
            
        # Fallback if no <h3> headings found
        if not sub_updates and content_html.strip():
            sub_updates.append({
                'type': 'General',
                'description_html': content_html,
                'description_text': soup.get_text().strip()
            })
            
        entries.append({
            'date': date_str,
            'updated': updated,
            'link': link,
            'updates': sub_updates
        })
        
    return entries

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/release-notes')
def get_release_notes():
    try:
        notes = fetch_and_parse_release_notes()
        return jsonify({
            'success': True,
            'data': notes
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
