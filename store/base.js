import Vuex from 'vuex';
import API from '~/api/client-api.js';

import {
  handleError
} from '../utils/handles';
import {
  saveToLocal
} from '@/utils/js/utils';


export const state = () => ({
  siteInfo: {},
  bloggerInfo: {},
  allCategorysInfo: [],
  siteTheme: 'default',
  ExpandLeftColumn: false
})

export const mutations = {
  UPDATE_SITE_INFO(state, siteInfo) {
    state.siteInfo = siteInfo;
  },
  UPDATE_BLOGGER_INFO(state, bloggerInfo) {
    state.bloggerInfo = bloggerInfo;
  },
  UPDATE_ALL_CATEGORYS(state, categorysInfo) {
    state.allCategorysInfo = categorysInfo;
  },
  UPDATE_SITE_THEME(state, siteTheme) {
    if (siteTheme === state.siteTheme) return;
    try {
      // 更改皮肤
      document.body.classList.remove(state.siteTheme);
      document.body.classList.add(siteTheme);
      // 持久化
      saveToLocal('siteConfig', 'theme', siteTheme);
    } catch (exception) {
      console.log(exception);
    }
    state.siteTheme = siteTheme;
  },
  UPDATE_EXPAND_LEFT_COLUMN(state, ExpandLeftColumn) {
    state.ExpandLeftColumn = ExpandLeftColumn;
  },
  RESET_EXPAND_COLUMN(state) {
    state.ExpandLeftColumn = false;
  }
};
export const actions = {
  // 获取站点信息
  GET_SITE_INFO({
    state,
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      API.getSiteInfo({
        params
      }).then((response) => {
        commit('UPDATE_SITE_INFO', response.data[0]);
        resolve(response);
      }).catch((error) => {
        handleError(error);
        reject(error);
      });
    });
  },
  // 获取博主信息
  GET_BLOGGER_INFO({
    state,
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      API.getBloggerInfo({
        params: {}
      }).then((response) => {
        commit('UPDATE_BLOGGER_INFO', response.data[0]);
        resolve(response);
      }).catch((error) => {
        handleError(error);
        reject(error);
      });
    });
  },
  // 获取所有的分类
  GET_ALL_CATEGORYS({
    state,
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      API.getCategorys({
        params: {
          level_min: 1,
          level_max: 1
        }
      }).then((response) => {
        commit('UPDATE_ALL_CATEGORYS', response.data.results);
        resolve(response);
      }).catch((error) => {
        handleError(error);
        reject(error);
      });
    });
  }
};
