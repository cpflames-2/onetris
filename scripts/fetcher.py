import requests
from bs4 import BeautifulSoup
import os
import time
import random
from urllib.parse import urljoin

def scrape_tournament_reports(base_url, output_dir="tournament_reports"):
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
    
    # Find all links within the tournament report table
    links = soup.select('table.report a[href]')
    tournament_links = []
    
    for link in links:
        href = link['href']
        # Filter for links that likely point to tournament reports
        # This condition may need adjustment based on URL patterns
        if href.endswith('.html'):
            full_url = urljoin(base_url, href)
            tournament_links.append(full_url)
    
    print(f"Found {len(tournament_links)} tournament report links")

    # Reduce tournament_links to just the first 5
    tournament_links = tournament_links[:5]
    
    # Process each tournament report link
    for i, url in enumerate(tournament_links, 1):
        # Extract a filename from the URL
        filename = url.split('/')[-1]
        output_path = os.path.join(output_dir, filename)
        
        print(f"[{i}/{len(tournament_links)}] Downloading: {url}")
        try:
            # Get the tournament report page
            response = requests.get(url)
            if response.status_code == 200:
                # Parse the HTML and find all pre tags
                tournament_soup = BeautifulSoup(response.text, 'html.parser')
                pre_contents = tournament_soup.find_all('pre')
                
                if pre_contents:
                    # Save each pre tag content to a separate file
                    for j, pre in enumerate(pre_contents, 1):
                        # Create filename with index if multiple pre tags exist
                        base_name = os.path.splitext(filename)[0]
                        ext = os.path.splitext(filename)[1]
                        output_path = os.path.join(output_dir, f"{base_name}_{j}{ext}" if len(pre_contents) > 1 else filename)
                        
                        with open(output_path, 'w', encoding='utf-8') as f:
                            f.write(pre.text)
                        print(f"  Saved pre tag {j} to: {output_path}")
                else:
                    print(f"  No <pre> tags found in: {url}")
            else:
                print(f"  Failed to download. Status code: {response.status_code}")
        
        except Exception as e:
            print(f"  Error downloading {url}: {str(e)}")
        
        # Be polite and avoid overloading the server
        if i < len(tournament_links):
            delay = random.uniform(1.0, 3.0)
            print(f"  Waiting {delay:.2f} seconds before next request...")
            time.sleep(delay)
    
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