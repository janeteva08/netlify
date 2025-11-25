'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchResult {
  id: number;
  title: string;
  category: string;
  excerpt: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: SearchResult[];
  onSearch: (query: string) => void;
}

export default function SearchModal({ isOpen, onClose, searchResults, onSearch }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isHydrated]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl animate-fade-in">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-foreground">
              Search Knowledge Base
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
            >
              <Icon name="XMarkIcon" size={24} className="text-muted-foreground" />
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </form>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-6">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  className="w-full text-left p-4 bg-muted hover:bg-muted/70 rounded-xl transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground">
                      {result.title}
                    </h4>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.excerpt}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="MagnifyingGlassIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No results found. Try different keywords.' : 'Start typing to search our knowledge base'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}