import httpx
from typing import Dict, Any

async def analyze_github_profile(username: str) -> Dict[str, Any]:
    """
    Scrapes the user's public GitHub repo data utilizing the standard GitHub REST API.
    Used for extracting tech stack evidence on top of their resume.
    """
    url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=10"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code != 200:
                return {"error": f"Failed to fetch profile. Status {response.status_code}"}
            
            repos = response.json()
            
            # Aggregate primary languages across recent 10 repos
            languages_used = {}
            total_stars = 0
            
            for repo in repos:
                lang = repo.get("language")
                stars = repo.get("stargazers_count", 0)
                total_stars += stars
                
                if lang:
                    languages_used[lang] = languages_used.get(lang, 0) + 1
                    
            # Sort languages by frequency
            top_languages = sorted(languages_used.items(), key=lambda x: x[1], reverse=True)
            
            return {
                "top_languages": [lang for lang, freq in top_languages],
                "total_recent_stars": total_stars,
                "profile_summary": f"Active developer in {', '.join([lang for lang, f in top_languages[:3]])} with {total_stars} stars globally."
            }
            
    except Exception as e:
        return {"error": str(e)}
