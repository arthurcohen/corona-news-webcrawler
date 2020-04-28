// eslint-disable-next-line no-unused-vars
import { Source } from '../interfaces/source';

const source: Source = {
    sourceName: 'Diário de Pernambuco',
    sitemapUrl: 'https://www.diariodepernambuco.com.br/noticia_ciencia-e-saude-sitemap.xml',
    language: 'pt-br',
    profile: {
        titlePattern: {
            pattern: 'meta[property="og:title"]',
            isProp: true
        },
        imagePattern: {
            pattern: 'meta[property="og:image"]',
            isProp: true
        },
        publicationDatePattern: {
            pattern: 'meta[property="article:published_time"]',
            isProp: true
        }
    }
};

export default source;
