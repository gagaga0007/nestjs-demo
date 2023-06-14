export interface ApiResultProps {
  code: number;
  msg: string;
}

export interface DataResultProps<T> extends ApiResultProps {
  data: T[] | T;
}

export interface ParamsProps {
  id: string;
}

export interface DataProps {
  id: number;
  createTime: string;
}
