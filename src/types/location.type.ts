export type LocationType = {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export type PageableLocationType = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: LocationType[] | [];
}
