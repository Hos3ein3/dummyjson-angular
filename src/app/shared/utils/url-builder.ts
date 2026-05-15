export class UrlBuilder {
  /**
   * Combines any number of segments into a clean URL path.
   * Handles all slash inconsistencies automatically.
   *
   * UrlBuilder.combine('https://api.com', 'blogs', 42, 'comments')
   * → 'https://api.com/blogs/42/comments'
   *
   * UrlBuilder.combine('/api/', '/users/', '/123/')
   * → '/api/users/123'
   */
  static combine(...segments: (string | number | null | undefined)[]): string {
    const parts = segments
      .filter((s) => s !== null && s !== undefined && s !== '')
      .map((s) => String(s).trim());

    if (parts.length === 0) return '';

    // Preserve protocol prefix (https:// or http://)
    const first = parts[0];
    const hasProtocol = /^https?:\/\//i.test(first);

    const cleaned = parts.map((part, index) => {
      // First segment: strip trailing slash only
      if (index === 0) return part.replace(/\/+$/, '');
      // Middle/last: strip both leading and trailing slashes
      return part.replace(/^\/+|\/+$/g, '');
    });

    const joined = hasProtocol
      ? cleaned[0] + '/' + cleaned.slice(1).join('/')
      : '/' + cleaned.join('/');

    // Clean up any double slashes (except protocol)
    return joined.replace(/([^:])\/\/+/g, '$1/');
  }

  /**
   * Appends query string params to a URL.
   *
   * UrlBuilder.withQuery('https://api.com/blogs', { page: 1, search: 'angular' })
   * → 'https://api.com/blogs?page=1&search=angular'
   */
  static withQuery(url: string, params: Record<string, any>): string {
    const filtered = Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== '',
    );

    if (filtered.length === 0) return url;

    const query = filtered
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

    return `${url}?${query}`;
  }

  /**
   * Builds a clean router path from segments. Designed for Angular [routerLink].
   *
   * UrlBuilder.route('products', item.id)        → '/products/42'
   * UrlBuilder.route('products', item.id, 'edit') → '/products/42/edit'
   * UrlBuilder.route('/')                         → '/'
   */
  static route(...segments: (string | number | null | undefined)[]): string {
    const parts = segments
      .filter((s) => s !== null && s !== undefined && s !== '')
      .map((s) =>
        String(s)
          .trim()
          .replace(/^\/+|\/+$/g, ''),
      );

    if (parts.length === 0) return '/';

    return '/' + parts.join('/');
  }
}
