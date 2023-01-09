import { login } from '@/api/user';
import { getToken, setToken } from '@/utils/auth';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
    };
  },
  getters: {},
  actions: {
    async login(userInfo: any) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ username, password })
          .then((res) => {
            console.log(res);
            setToken(res.data.token);
            this.$state.token = res.data.token;
            resolve(res);
          })
          .then((err) => {
            reject(err);
          });
      });
    },
  },
});
