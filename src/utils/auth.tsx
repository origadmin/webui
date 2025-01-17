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
