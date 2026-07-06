export const ARTICLES_QUERY = `
  *[_type == "article" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    featured,
    author-> {
      name,
      "slug": slug.current,
      avatar
    },
    category-> {
      name,
      "slug": slug.current,
      color
    },
    tags[]-> {
      name,
      "slug": slug.current
    }
  }
`;

export const FEATURED_ARTICLES_QUERY = `
  *[_type == "article" && status == "published" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    featured,
    author-> {
      name,
      avatar
    },
    category-> {
      name,
      "slug": slug.current,
      color
    }
  }
`;

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    content,
    publishedAt,
    readingTime,
    featured,
    seoTitle,
    seoDescription,
    seoImage,
    author-> {
      name,
      "slug": slug.current,
      avatar,
      bio,
      social {
        twitter,
        facebook,
        linkedin
      }
    },
    category-> {
      name,
      "slug": slug.current,
      color
    },
    tags[]-> {
      name,
      "slug": slug.current
    },
    relatedArticles[]-> {
      _id,
      title,
      "slug": slug.current,
      coverImage,
      publishedAt,
      readingTime,
      category-> {
        name,
        "slug": slug.current,
        color
      }
    }
  }
`;

export const ARTICLES_BY_CATEGORY_QUERY = `
  *[_type == "article" && status == "published" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    author-> {
      name,
      avatar
    },
    category-> {
      name,
      "slug": slug.current,
      color
    }
  }
`;

export const ARTICLES_BY_TAG_QUERY = `
  *[_type == "article" && status == "published" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    readingTime,
    author-> {
      name,
      avatar
    },
    category-> {
      name,
      "slug": slug.current,
      color
    }
  }
`;

export const ALL_SLUGS_QUERY = `
  *[_type == "article" && status == "published"].slug.current
`;

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] {
    name,
    "slug": slug.current,
    color
  }
`;

export const ALL_TAGS_QUERY = `
  *[_type == "tag"] {
    name,
    "slug": slug.current
  }
`;
