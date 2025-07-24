// src/appwriteConfig.js
import { Client, Databases, Query, ID } from "appwrite";


const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);


const databases = new Databases(client);
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


export const updateSearchCount = async (searchTerm, movieData) => {
  const documentId = searchTerm.toLowerCase().replace(/\s+/g, "-");

  try {
  
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
      count: movieData.count ? movieData.count + 1 : 1,
      timestamp: new Date().toISOString(),
    });
  } catch {
  
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        {
          title: movieData.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          searchTerm,
          count: 1,
          timestamp: new Date().toISOString(),
        }
      );
    } catch (createError) {
      console.error("❌ Appwrite createDocument error:", createError);
    }
  }
};


export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return result.documents;
  } catch (error) {
    console.error("❌ Error fetching trending movies:", error);
    return [];
  }
};

export { client };

