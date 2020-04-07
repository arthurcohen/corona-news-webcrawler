class SourceProfile {
    source;
    url;
    depth;
    title_pattern;
    article_pattern;
    published_pattern;
    image_pattern;

    constructor(source, url, depth, title_pattern, article_pattern, published_pattern, image_pattern) {
        this.source = source;
        this.url = url;
        this.depth = depth;
        this.title_pattern = title_pattern;
        this.article_pattern = article_pattern;
        this.published_pattern = published_pattern;
        this.image_pattern = image_pattern;
    }
}