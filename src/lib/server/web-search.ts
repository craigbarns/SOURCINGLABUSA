import 'server-only';

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export async function searchLiveWeb(query: string): Promise<WebSearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodedQuery}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const results: WebSearchResult[] = [];
    
    // Extract title & snippets from HTML results
    const snippetRegex = /<a class="result__snippet[^">]*>(.*?)<\/a>/g;
    const titleRegex = /<a class="result__url"[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g;
    
    let match;
    let count = 0;
    while ((match = snippetRegex.exec(html)) !== null && count < 3) {
      const cleanSnippet = match[1].replace(/<[^>]+>/g, '').trim();
      if (cleanSnippet) {
        results.push({
          title: `Source Sourcing Web #${count + 1}`,
          url: 'https://duckduckgo.com',
          snippet: cleanSnippet,
        });
        count++;
      }
    }

    return results;
  } catch (error) {
    console.warn('Recherche web live temporairement indisponible:', error);
    return [];
  }
}
