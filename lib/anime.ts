import { ANIME } from '@consumet/extensions';

export const animeProvider = new ANIME.AnimePahe();
(animeProvider as any).baseUrl = 'https://animepahe.pw';

export async function getRecentEpisodes(page = 1) {
  try {
    const results = await animeProvider.fetchRecentEpisodes(page);
    return results;
  } catch (error) {
    console.error('Error fetching recent episodes:', error);
    return { results: [] };
  }
}

export async function getTopAiring() {
  try {
    // AnimePahe doesn't have a direct fetchTopAiring in its type defs,
    // and its search only takes 1 argument
    const results = await animeProvider.search('popular');
    return results;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return { results: [] };
  }
}

export async function searchAnime(query: string) {
  try {
    const results = await animeProvider.search(query);
    return results;
  } catch (error) {
    console.error('Error searching anime:', error);
    return { results: [] };
  }
}

export async function getAnimeInfo(id: string) {
  try {
    const info = await animeProvider.fetchAnimeInfo(id);
    return info;
  } catch (error) {
    console.error('Error fetching anime info:', error);
    return null;
  }
}

export async function getEpisodeSources(episodeId: string) {
  try {
    const sources = await animeProvider.fetchEpisodeSources(episodeId);
    return sources;
  } catch (error) {
    console.error('Error fetching episode sources:', error);
    return null;
  }
}
