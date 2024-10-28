/**
 * รวม endpoint ที่ยิงไป backend ทั้งหมดในโปรเจค แล้วค่อยไปเรียนใ
 */

export const endpoints = {
  marker: {
    create: `/markers/create`,
    get: `/markers`,
    getId: (id: number) => `/markers/${id}`,
    delete: (id: number) => `/markers/${id}`,
  },
  user: {
    register: `/auth/signup`,
    login: `/auth/signin`,
    logout: `/auth/logout`,
    refresh: `/auth/refresh`,
    editProfile: `/user`,
    changePass: `/user/change-password`,
    forgotPass: ``,
  },
  reviews: {
    create: `/reviews/create`,
    get: (markerId: number) => `/reviews/marker/${markerId}/reviews`,
    delete: (markerId: string, Id: string) => `/reviews/delete/${markerId}/${Id}`,
  },
  bookmark: {
    get: `/bookmarks`,
    create: `/bookmarks`,
    update: (id: string) => `/bookmarks/${id}`,
    delete: (id: string) => `/bookmarks/${id}`,
  },
}