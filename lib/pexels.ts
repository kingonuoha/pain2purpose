/**
 * Pexels API Service
 * Fetches high-quality dynamic images for categories and articles.
 */

const PEXELS_URL = "https://api.pexels.com/v1";

export async function getDynamicImages(query: string, limit: number = 5, page: number = 1): Promise<string[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.warn(
      "PEXELS_API_KEY is missing. Falling back to Unsplash placeholders.",
    );
    return [`https://images.unsplash.com/photo-1579546123306-9e3eb6a5fb7f?q=80&w=1000&auto=format&fit=crop`];
  }

  try {
    const response = await fetch(
      `${PEXELS_URL}/search?query=${encodeURIComponent(query)}&per_page=${limit}&page=${page}&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      },
    );

    if (!response.ok) throw new Error("Pexels API error");

    const data = await response.json();

    if (data.photos && data.photos.length > 0) {
      return data.photos.map((p: { src: { large2x: string } }) => p.src.large2x);
    }

    return ["https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"];
  } catch (error) {
    console.error("Error fetching Pexels images:", error);
    return ["https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"];
  }
}

export async function getDynamicImage(query: string): Promise<string> {
   const images = await getDynamicImages(query, 5);
   const randomIndex = Math.floor(Math.random() * images.length);
   return images[randomIndex];
}


