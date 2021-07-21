export enum Lang {
  cs = 'cs',
  da = 'da',
  de = 'de',
  en = 'en',
  es = 'es',
  fr = 'fr',
  id = 'id',
  it = 'it',
  hu = 'hu',
  nl = 'nl',
  no = 'no',
  pl = 'pl',
  pt = 'pt',
  ro = 'ro',
  sk = 'sk',
  fi = 'fi',
  sv = 'sv',
  tr = 'tr',
  vi = 'vi',
  th = 'th',
  bg = 'bg',
  ru = 'ru',
  el = 'el',
  ja = 'ja',
  ko = 'ko',
  zh = 'zh',
}

export enum ImageType {
  all = 'all',
  photo = 'photo',
  illustration = 'illustration',
  vector = 'vector',
}

export enum Orientation {
  all = 'all',
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum Category {
  backgrounds = 'backgrounds',
  fashion = 'fashion',
  nature = 'nature',
  science = 'science',
  education = 'education',
  feelings = 'feelings',
  health = 'health',
  people = 'people',
  religion = 'religion',
  places = 'places',
  animals = 'animals',
  industry = 'industry',
  computer = 'computer',
  food = 'food',
  sports = 'sports',
  transportation = 'transportation',
  travel = 'travel',
  buildings = 'buildings',
  business = 'business',
  music = 'music',
}

export enum Colors {
  grayscale = 'grayscale',
  transparent = 'transparent',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  turquoise = 'turquoise',
  blue = 'blue',
  lilac = 'lilac',
  pink = 'pink',
  white = 'white',
  gray = 'gray',
  black = 'black',
  brown = 'brown',
}

export enum Order {
  popular = 'popular',
  latest = 'latest',
}

export interface SearchImagesParams {
  q?: string;
  lang?: Lang; // default: "en"
  id?: string;
  image_type?: ImageType; // default = 'all'
  orientation?: Orientation; // default = 'all'
  category?: Category;
  min_width?: number; // default = 0
  min_height?: number; // default = 0
  colors?: Colors;
  editors_choice?: boolean; // default = false
  safesearch?: boolean; // default = false
  order?: Order; //default = 'popular'
  page?: number; // default = 20
  per_page?: number; // default = 20
  callback?: string;
  pretty: boolean; // default = false
}

export interface Image {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface Images {
  total: number;
  totalHits: number;
  hits: Image[];
}
