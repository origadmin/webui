import { Query } from "@/utils";
import { get, post, put, del } from "@/utils/request";
import { QueryClient, useQuery, queryOptions, useMutation } from "@tanstack/react-query";

/** Query resource list GET /sys/resources */
export async function listResource(params: API.SearchParams, options?: API.RequestOptions) {
  return get<API.System.Resource[]>("/sys/resources", params, options);
}

/** Create resource record POST /sys/resources */
export async function addResource(body: API.Resource, options?: API.RequestOptions) {
  return post<API.System.Resource>("/sys/resources", body, options);
}

/** Get resource record by ID GET /sys/resources/${id} */
export async function getResource(id: string, options?: API.RequestOptions) {
  return get<API.System.Resource>(`/sys/resources/${id}`, undefined, options);
}

/** Update resource record by ID PUT /sys/resources/${id} */
export async function updateResource(id: string, body: API.Resource, options?: API.RequestOptions) {
  return put<never>(`/sys/resources/${id}`, body, options);
}

/** Delete resource record by ID DELETE /sys/resources/${id} */
export async function deleteResource(id: string, options?: API.RequestOptions) {
  return del<never>(`/sys/resources/${id}`, options);
}

export const useResourcesQuery = (opts?: API.SearchParams) => {
  console.log("useResourcesQuery", opts);
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", { ...opts }],
      queryFn: ({ queryKey: [, opts] }: { queryKey: [string, API.SearchParams] }) => listResource(opts),
    }),
  );
};

export const useResourceQuery = (id: string) => {
  return useQuery(
    queryOptions({
      queryKey: ["/sys/resources", id],
      queryFn: ({ queryKey: [, id] }) => getResource(id),
    }),
  );
};

export const useResourceCreate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => addResource(resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};

export const useResourceUpdate = (queryClient: QueryClient, id: string) => {
  return useMutation({
    mutationFn: (resource: Omit<API.System.Resource, "id">) => updateResource(id, resource),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};

export const useResourceDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSettled: () => Query.invalidateData(queryClient, ["/sys/resources"]),
  });
};

export const buildTree = (items?: API.System.Resource[]) => {
  const map = new Map<string, API.System.Resource>();
  const roots: API.System.Resource[] = [];

  if (!items) {
    return roots;
  }

  // create a map of id to item
  items.forEach((item) => {
    if (!item.id) {
      return;
    }
    item.children = [];
    map.set(item.id, item);
  });

  // build the tree
  items.forEach((item) => {
    if (!item.parent_id || !item.tree_path) {
      roots.push(item);
      return;
    }
    // const pathSegments = item.tree_path.split(".");
    // const parentId = pathSegments[pathSegments.length - 1];
    // console.log("parentId", parentId,"tree",item.tree_path,"pathSegments",pathSegments,"item",item,"item.parent_id",item.parent_id,"item.tree_path",item.tree_path,"item.id",item.id,"item.children",item.children,"map",map,"roots",roots,"item",item,"item.parent_id",item.parent_id,"item.tree_path",item.tree_path,"item.id",item.id,"item.children",item.children,"map",map,"roots");
    const parent = map.get(item.parent_id);
    if (!parent || !parent.children) {
      return;
    }
    parent.children.push(item);
  });
  console.log("tree", roots);
  return roots;
};
