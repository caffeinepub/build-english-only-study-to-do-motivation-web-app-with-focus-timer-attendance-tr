import { useState, useEffect, useCallback } from 'react';
import { CHOTU_QUOTES } from '../constants/chotuQuotes';
import { saveToStorage, loadFromStorage, STORAGE } from '../storage/localStore';

interface QuoteData {
  quote: string;
  lastUpdated: string; // YYYY-MM-DD
}

function getRandomQuote(): string {
  return CHOTU_QUOTES[Math.floor(Math.random() * CHOTU_QUOTES.length)];
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function useDailyQuote() {
  const [quoteData, setQuoteData] = useState<QuoteData>(() => {
    const saved = loadFromStorage<QuoteData | null>(STORAGE.QUOTE, null);
    const today = getTodayDate();
    
    if (!saved || saved.lastUpdated !== today) {
      const newData: QuoteData = {
        quote: getRandomQuote(),
        lastUpdated: today
      };
      saveToStorage(STORAGE.QUOTE, newData);
      return newData;
    }
    
    return saved;
  });

  useEffect(() => {
    const today = getTodayDate();
    if (quoteData.lastUpdated !== today) {
      const newData: QuoteData = {
        quote: getRandomQuote(),
        lastUpdated: today
      };
      setQuoteData(newData);
      saveToStorage(STORAGE.QUOTE, newData);
    }
  }, [quoteData.lastUpdated]);

  const refreshQuote = useCallback(() => {
    const newData: QuoteData = {
      quote: getRandomQuote(),
      lastUpdated: getTodayDate()
    };
    setQuoteData(newData);
    saveToStorage(STORAGE.QUOTE, newData);
  }, []);

  return {
    quote: quoteData.quote,
    refreshQuote
  };
}
