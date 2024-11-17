// import { createServerClient, type CookieOptions } from "@supabase/ssr";

// export const createClient = (cookies: { [key: string]: string }) => {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return Object.entries(cookies).map(([name, value]) => ({
//             name,
//             value,
//           }));
//         },
//         setAll(cookiesToSet) {
//           // Handle setting cookies if needed
//         },
//       },
//     }
//   );
// };
