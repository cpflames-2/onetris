import requests
from bs4 import BeautifulSoup
import os
import time
import random
from urllib.parse import urljoin
import json
from datetime import datetime

def scrape_tournament_reports(base_url, output_dir="../public/tournament_reports"):
    """
    Scrape tournament reports from the given base URL.
    
    Args:
        base_url: The URL of the page containing links to tournament reports
        output_dir: Directory to save downloaded reports
    """
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")
    
    # Get the main page
    print(f"Fetching main page: {base_url}")
    response = requests.get(base_url)
    if response.status_code != 200:
        print(f"Failed to fetch main page. Status code: {response.status_code}")
        return
    
    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find all rows within the tournament report table
    rows = soup.select('table.report tr')
    tournament_info = []
    
    # Process each row to extract all information
    for row in rows:
        cells = row.find_all('td')
        if len(cells) >= 4:  # Ensure row has all required cells
            link = cells[0].find('a')
            if link and link.get('href'):
                href = link['href']
                if href.endswith('.html'):
                    tournament_info.append({
                        'url': urljoin(base_url, href),
                        'director': cells[1].text.strip(),
                        'city': cells[2].text.strip(),
                        'date': cells[3].text.strip()
                    })
    
    print(f"Found {len(tournament_info)} tournament reports")
    
    # Reduce to just the first 15 tournaments
    # tournament_info = tournament_info[:15]
    
    # Process each tournament report
    for i, info in enumerate(tournament_info, 1):
        url = info['url']
        # parse the date into YYYY-MM-DD format
        try:
            date = datetime.strptime(info['date'], '%b %d, %Y').strftime('%Y-%m-%d')
        except ValueError:
            # Try full month name format as fallback
            date = datetime.strptime(info['date'], '%B %d, %Y').strftime('%Y-%m-%d')

        print(f"[{i}/{len(tournament_info)}] Downloading: {url}")
        print(f"  Director: {info['director']}")
        print(f"  City: {info['city']}")
        print(f"  Date: {info['date']} -> ({date})")
        
        try:
            # Get the tournament report page
            response = requests.get(url)
            if response.status_code == 200:
                # Parse the HTML and find all pre tags with their preceding h4 tags
                tournament_soup = BeautifulSoup(response.text, 'html.parser')
                pre_contents = tournament_soup.find_all('pre')
                
                if pre_contents:
                    for pre in pre_contents:
                        # Find the preceding h4 tag
                        h4 = pre.find_previous('h4')
                        if h4:
                            # Clean the h4 text to make it filename-safe
                            h4_text = h4.text.strip()
                            # Remove the "Rating report for " prefix if it exists
                            if h4_text.startswith("Rating report for "):
                                h4_text = h4_text[len("Rating report for "):]
                            filename = f"{date}_{h4_text.replace(' ', '_').replace('/', '_')}.txt"
                        else:
                            # Fallback if no h4 found
                            base_name = os.path.splitext(url.split('/')[-1])[0]
                            filename = f"{date}_{base_name}.txt"
                        
                        output_path = os.path.join(output_dir, filename)
                        
                        with open(output_path, 'w', encoding='utf-8') as f:
                            f.write(pre.text.strip())
                        print(f"  Saved tournament report to: {output_path}")
                else:
                    print(f"  No <pre> tags found in: {url}")
            else:
                print(f"  Failed to download. Status code: {response.status_code}")
        
        except Exception as e:
            print(f"  Error downloading {url}: {str(e)}")
        
        # Be polite and avoid overloading the server
        if i < len(tournament_info):
            delay = random.uniform(1.0, 3.0)
            print(f"  Waiting {delay:.2f} seconds before next request...")
            time.sleep(delay)
    
    # After all files are downloaded, generate index.json
    try:
        # Get list of all .txt files in the output directory
        report_files = [f for f in os.listdir(output_dir) if f.endswith('.txt')]
        
        # Sort files in reverse alphabetical order
        report_files.sort(reverse=True)
        
        # Write the index file
        index_path = os.path.join(output_dir, 'index.json')
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(report_files, f, indent=2)
        
        print(f"Generated index.json with {len(report_files)} reports")
    
    except Exception as e:
        print(f"Error generating index.json: {str(e)}")
    
    print("Scraping completed!")

def parse_tournament_data(html_file):
    """
    Parse tournament data from a downloaded HTML file.
    This function can be customized based on what data you want to extract.
    
    Args:
        html_file: Path to the downloaded HTML file
    
    Returns:
        Dictionary containing extracted tournament data
    """
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # Example extraction (adjust based on actual HTML structure)
    data = {
        'title': soup.title.text if soup.title else 'No title',
        # Add more fields as needed based on the structure of the tournament reports
    }
    
    return data

if __name__ == "__main__":
    # URL of the page containing tournament report links
    main_url = "https://ratingsnw.com/tournreports.html"
    
    # Scrape and download all tournament reports
    scrape_tournament_reports(main_url)
    
    # Example of how to process the downloaded files
    # downloaded_files = os.listdir("tournament_reports")
    # for file in downloaded_files:
    #     data = parse_tournament_data(os.path.join("tournament_reports", file))
    #     print(f"Processed {file}: {data['title']}")