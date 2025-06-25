export type Quote = {
  id: string;
  text: string;
  source: {
    name: string;
    imageUrl?: string;
    data_ai_hint?: string;
  };
  image?: {
    url: string;
    data_ai_hint?: string;
  };
};
