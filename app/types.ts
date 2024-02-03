export type BroadGameType = {
  id: string;
  name: string;
  nextPartyIn?: number;
  manifest: {
    tags: {
      categories: string[];
    };
  };
};
