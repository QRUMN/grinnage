import Fuse from 'fuse.js';

export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Pest Control',
    description: 'Learn the basics of our residential pest control services',
    content: 'Our residential pest control services are designed to protect your home...',
    category: 'basics',
    tags: ['getting started', 'introduction', 'basics'],
  },
  {
    id: '2',
    title: 'Scheduling Your First Service',
    description: 'How to schedule and prepare for your first pest control service',
    content: 'Scheduling your first service is easy. Simply follow these steps...',
    category: 'services',
    tags: ['scheduling', 'appointment', 'service'],
  },
  {
    id: '3',
    title: 'Understanding Your Treatment Plan',
    description: 'Detailed information about our treatment plans and methods',
    content: 'Our treatment plans are customized to your specific needs...',
    category: 'treatments',
    tags: ['treatment', 'plans', 'methods'],
  },
  {
    id: '4',
    title: 'Billing and Payment Options',
    description: 'Learn about our billing process and available payment methods',
    content: 'We offer various payment options to make billing convenient...',
    category: 'billing',
    tags: ['billing', 'payment', 'invoice'],
  },
  {
    id: '5',
    title: 'Safety Measures and Precautions',
    description: 'Important safety information about our pest control treatments',
    content: 'We prioritize the safety of your family and pets...',
    category: 'safety',
    tags: ['safety', 'precautions', 'health'],
  },
];

const fuseOptions = {
  keys: ['title', 'description', 'content', 'tags'],
  threshold: 0.3,
  includeScore: true,
};

const fuse = new Fuse(helpArticles, fuseOptions);

export const helpService = {
  searchArticles: (query: string): HelpArticle[] => {
    if (!query) return helpArticles;
    return fuse.search(query).map(result => result.item);
  },

  getArticleById: (id: string): HelpArticle | undefined => {
    return helpArticles.find(article => article.id === id);
  },

  getArticlesByCategory: (category: string): HelpArticle[] => {
    return helpArticles.filter(article => article.category === category);
  },

  getAllCategories: (): string[] => {
    return [...new Set(helpArticles.map(article => article.category))];
  },

  getRelatedArticles: (article: HelpArticle): HelpArticle[] => {
    const results = fuse.search(article.tags.join(' '));
    return results
      .filter(result => result.item.id !== article.id)
      .map(result => result.item)
      .slice(0, 3);
  },
};
