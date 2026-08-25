import { API_BASE } from '../app/config';

export async function apiGet<T>(path:string): Promise<T>{
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if(!res.ok){
    const text = await res.text();
    throw new Error(`API ${res.status} ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}
