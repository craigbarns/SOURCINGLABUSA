import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  author: string;
  content: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    updated: data.updated,
    author: data.author || 'SourcingLab USA',
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

/** Split editorial H2 sections once so the navigation and section anchors stay aligned. */
export function getPostSections(content: string) {
  const headings = [...content.matchAll(/^## (.+)$/gm)];
  return {
    intro: content.slice(0, headings[0]?.index ?? content.length),
    sections: headings.map((heading, index) => ({
      id: `section-${index + 1}`,
      title: heading[1].trim(),
      content: content.slice(
        heading.index! + heading[0].length,
        headings[index + 1]?.index ?? content.length,
      ),
    })),
  };
}

export function getPostVisual(slug: string) {
  if (/textile|apparel/.test(slug))
    return {
      src: '/images/textile-collection.webp',
      alt: 'Concept arrangement of cotton clothing, a canvas tote and textile swatches',
    };
  if (/packaging/.test(slug))
    return {
      src: '/images/packaging-collection.webp',
      alt: 'Concept collection of paper bags, custom boxes and branded packaging',
    };
  return {
    src: '/images/brand-still-life.webp',
    alt: 'Concept still life of custom packaging and textile materials',
  };
}
