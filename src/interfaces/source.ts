export interface Pattern {
    pattern: string,
    isProp: boolean
};

export interface Source {
    sourceName: string,
    sitemapUrl: string,
    profile: {
        titlePattern: Pattern,
        imagePattern: Pattern,
        publicationDatePattern: Pattern
    }
};
