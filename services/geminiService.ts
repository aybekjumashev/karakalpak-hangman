
export interface WordCategory {
  category: string;
  words: string[];
}

const WORDS_JSON_URL = '/data/words.json';

export async function fetchKarakalpakWords(): Promise<WordCategory[]> {  
    try {
        const response = await fetch(WORDS_JSON_URL);
        if (!response.ok) {
            console.error("Failed to fetch words.json, status:", response.statusText);
            throw new Error("Failed to load word data.");
        }
        const data: WordCategory[] = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching or parsing words.json:", e);
        // The App component will handle the error state if an empty array is returned.
        return [];
    }
}