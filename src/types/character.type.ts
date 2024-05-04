export type CharacterType = {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
  };
  
  export type PageableCharacterType = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: CharacterType[] | [];
  };
  
  