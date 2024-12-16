import React, { useState, useEffect } from 'react';
import { Search, Book, Phone, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageTransition } from '@/components/ui/page-transition';
import { helpService, type HelpArticle } from '@/lib/services/helpService';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategories(helpService.getAllCategories());
    setArticles(helpService.searchArticles(''));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const results = helpService.searchArticles(searchQuery);
      setArticles(selectedCategory 
        ? results.filter(article => article.category === selectedCategory)
        : results
      );
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <PageTransition>
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Help Center</h2>
          <p className="text-sm text-muted-foreground">
            Find answers to your questions and get support
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="pl-9"
          />
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <ScrollArea className="h-[calc(100vh-20rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'all'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4"
            >
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card
                    className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {article.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>

        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-2xl">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedArticle.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedArticle.content}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Related Articles</h4>
                    <div className="space-y-2">
                      {helpService.getRelatedArticles(selectedArticle).map((related) => (
                        <Button
                          key={related.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setSelectedArticle(related)}
                        >
                          {related.title}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setSelectedArticle(null)}>
                      Close
                    </Button>
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
