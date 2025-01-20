// async function refreshToken(uri: string) {
//   // Assuming the refresh token is stored in localStorage
//   const refreshToken = getRefreshToken();
//   if (!refreshToken) {
//     throw new Error("No refresh token found");
//   }
//   try {
//     const response = await request(HOST + uri, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refresh_token: refreshToken }),
//     });
//
//     const data = await response.json();
//
//     if (!response.ok) {
//       if (data && "error" in data) {
//         const error = data.error as API.Error;
//         console.error("Refresh Token Error:", error.detail || "");
//         throw new Error(error.detail || "An unknown error occurred");
//       }
//     }
//     // Update localStorage with the new tokens
//     if (data && ACCESS_TOKEN_KEY in data) {
//       localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
//     }
//     if (data && REFRESH_TOKEN_KEY in data) {
//       localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
//     }
//     return data.access_token || "";
//   } catch (error) {
//     console.error("Refresh Token Error:", error);
//     throw error;
//   }
// }
// export function convertMenuItem<T>(
//   data: T[],
//   convertT?: (item: T) => {
//     id: string;
//     name: string;
//     parent_id?: string;
//     disabled?: boolean;
//     children: T[];
//   },
// ): API.MenuItem[] {
//   const menuItems: API.MenuItem[] = [];
//   data.forEach((item) => {
//     const dataItem = convertT
//       ? convertT(item)
//       : (item as {
//           id: string;
//           name: string;
//           parent_id?: string;
//           disabled?: boolean;
//           children: T[];
//         });
//
//     // todo: fix this
//     const menuItem: API.MenuItem = {
//       // id: dataItem.id,
//       keyword: dataItem.id,
//       title: dataItem.name,
//       // value: dataItem.id,
//       label: dataItem.name,
//       // parent_id: dataItem.parent_id,
//       items: dataItem.children ? convertMenuItem(dataItem.children, convertT) : [],
//     };
//
//     if (dataItem.disabled) {
//       menuItem.disabled = dataItem.disabled;
//     }
//     menuItems.push(menuItem);
//   });
//   return menuItems;
// }
import { HOST } from "@/types";
import { fetchRequest, Method } from "@/utils/service.tsx";
import { getRefreshToken } from "@/utils/storage.tsx";
import config from "@config";


export async function refreshToken() {
  const { url, method } = config.auth.refreshToken;
  // Assuming the refresh token is stored in localStorage
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  if (url === "") {
    return;
  }

  try {
    const response = await fetchRequest<API.Token>(
      HOST + url,
      method === "" ? "GET" : (method as Method),
      JSON.stringify({ refresh_token: refreshToken }),
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.data.success) {
      const { data } = await response.data;
      // Update localStorage with the new tokens
      if (data && "access_token" in data) {
        localStorage.setItem("access_token", data.access_token);
      }
      // if (data && "refresh_token" in data) {
      //   localStorage.setItem("refresh_token", data.refresh_token);
      // }
      return data?.access_token || "";
    }
  } catch (err) {
    console.error("Refresh Token Error:", err);
  }
  return "";
}
