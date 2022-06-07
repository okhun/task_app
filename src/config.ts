export const url = 'https://toko.ox-sys.com/'
export function headers(token: any) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  }
}
