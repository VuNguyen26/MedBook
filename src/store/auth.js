import { create } from 'zustand'

const AUTH_KEY = 'medbook-auth-v1'

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'),
  login: async (phone, password, api) => {
    const u = api.authenticate(phone, password)
    if (!u) return null
    localStorage.setItem(AUTH_KEY, JSON.stringify(u))
    set({ user: u })
    return u
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEY)
    set({ user: null })
  }
}))
