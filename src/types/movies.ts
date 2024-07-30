export type Movie = {
  id: number;
  title: string;
  synopsis: string;
  is_released: boolean;
  released_at: string;
  director: {
    name: string;
  };
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: number | null;
};
