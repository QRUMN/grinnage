import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useHelpService } from '@/lib/services/helpService';

export const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const { searchArticles, getCategories, getArticlesByCategory } = useHelpService();

  const categories = getCategories();
  const articles = selectedCategory
    ? getArticlesByCategory(selectedCategory)
    : searchQuery
    ? searchArticles(searchQuery)
    : [];

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search help articles..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchQuery('');
                  }}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name
                : searchQuery
                ? 'Search Results'
                : 'Help Center'}
            </h1>
          </div>

          {/* Articles */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {articles.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <HelpCircle className="h-12 w-12 text-muted-foreground/20" />
                  <h3 className="mt-4 text-lg font-medium">No articles found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or browse through our categories
                  </p>
                </motion.div>
              ) : (
                articles.map((article) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-auto p-4 flex flex-col items-start space-y-2",
                        selectedArticle?.id === article.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-medium text-left">{article.title}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground text-left line-clamp-2">
                        {article.excerpt}
                      </p>
                    </Button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Selected Article */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-4 md:p-6 overflow-y-auto"
              >
                <div className="container mx-auto max-w-3xl bg-background rounded-lg shadow-lg">
                  <div className="p-6 space-y-4">
                    <Button
                      variant="ghost"
                      className="mb-4"
                      onClick={() => setSelectedArticle(null)}
                    >
                      ← Back to articles
                    </Button>
                    <h2 className="text-2xl font-semibold">{selectedArticle.title}</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {selectedArticle.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
