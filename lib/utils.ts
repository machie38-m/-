export function getTitle(title: any): string {
    if (!title) return 'Unknown Title';
    if (typeof title === 'string') return title;
    if (typeof title === 'object') {
        return title.english || title.romaji || title.native || 'Unknown Title';
    }
    return String(title);
}
