import type { Quote } from '@/types';

export const initialQuotes: Quote[] = [
  {
    id: '1',
    text: 'The only way to do great work is to love what you do.',
    source: {
      name: 'Steve Jobs',
      imageUrl: 'https://placehold.co/80x80.png',
      data_ai_hint: 'portrait steve jobs',
    },
    image: {
      url: 'https://placehold.co/400x200.png',
      data_ai_hint: 'inspiration work',
    },
  },
  {
    id: '2',
    text: 'Strive not to be a success, but rather to be of value.',
    source: {
      name: 'Albert Einstein',
      imageUrl: 'https://placehold.co/80x80.png',
      data_ai_hint: 'portrait albert einstein',
    },
    image: {
      url: 'https://placehold.co/400x200.png',
      data_ai_hint: 'wisdom success',
    },
  },
  {
    id: '3',
    text: 'The mind is everything. What you think you become.',
    source: {
      name: 'Buddha',
      imageUrl: 'https://placehold.co/80x80.png',
      data_ai_hint: 'statue buddha',
    },
    image: {
      url: 'https://placehold.co/400x200.png',
      data_ai_hint: 'mindfulness meditation',
    },
  },
];
