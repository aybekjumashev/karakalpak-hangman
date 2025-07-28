export interface WordCategory {
  category: string;
  words: string[];
}

// In Vite, static files are served from the public directory
const WORDS_JSON_URL = '/data/words.json';

export async function fetchKarakalpakWords(): Promise<WordCategory[]> {  
    try {
        console.log('Fetching words from:', WORDS_JSON_URL);
        
        const response = await fetch(WORDS_JSON_URL);
        
        if (!response.ok) {
            console.error("Failed to fetch words.json, status:", response.status, response.statusText);
            throw new Error(`Failed to load word data: ${response.status}`);
        }
        
        const data: WordCategory[] = await response.json();
        console.log('Successfully loaded words:', data);
        
        // Validate the data structure
        if (!Array.isArray(data) || data.length === 0) {
            console.error("Invalid data format or empty array");
            throw new Error("Invalid word data format");
        }
        
        return data;
    } catch (e) {
        console.error("Error fetching or parsing words.json:", e);
        // Return empty array so the App component can handle the error state
        return [];
    }
}