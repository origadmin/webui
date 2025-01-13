declare namespace API {
  type Params = {
    current?: number;
    page_size?: number;
    [key: string]: unknown;
  };

  type ResponseResult<T> = {
    success?: boolean;
    data?: T;
    total?: number;
    error?: ErrorResult;
  };

  type ErrorResult = {
    id?: string;
    code?: number;
    detail?: string;
    status?: string;
  };

  type TreeItem = {
    id: string;
    key: string;
    value: string;
    title: string;
    parent_id?: string;
    disabled?: boolean;
    children?: TreeItem[];
    [key: string]: never;
  };

  type Route = {
    path: string;
  };
}
