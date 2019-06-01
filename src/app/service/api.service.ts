import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const API = `/api`

@Injectable()
export class ApiService {
    // 登录
    login(body: any) {
        return this.http.get(`${API}/login/cellphone?phone=${body.phone}&password=${body.password}`);
    }
    // 刷新登录状态
    refreshLoginStatus() {
      return this.http.get(`${API}/login/refresh`);
    }
    // 获取登录状态
    getLoginStatus() {
      return this.http.get(`${API}/login/status`);
    }
    // 获取用户详情
    getUserDetail(uid: string) {
      return this.http.get(`${API}/user/detail?uid=${uid}`);
    }
    // 获取用户歌单
    getUserSongList(uid: string) {
      return this.http.get(`${API}/user/playlist?uid=${uid}`);
    }
    // 新建歌单
    createSongList(name: string) {
      return this.http.get(`${API}/playlist/create?name=${name}`);
    }
    // 退出
    logout() {
      return this.http.get(`${API}/logout`);
    }
    getBanner() {
        return this.http.get(`${API}/banner`);
    }
    searchMusic(keyword: string) {
        return this.http.get(`${API}/search?keywords=${keyword}`);
    }
    // 歌单分类列表
    getCatlist() {
        return this.http.get(`${API}/playlist/catlist`);
    }
    // 热门歌单分类列表
    getHotClassifyList() {
        return this.http.get(`${API}/playlist/hot`);
    }
    // 推荐歌单
    getChosenList() {
        return this.http.get(`${API}/personalized`);
    }
    // 每个歌单的详情
    getChosenListDetail(id: string) {
        return this.http.get(`${API}/playlist/detail?id=${id}`);
    }
    // 歌手类型列表
    getSingerClassifyList() {
        return [
            {
              name: '华语男歌手',
              code: 1001
            },
            {
              name: '华语女歌手',
              code: 1002
            },
            {
              name: '华语组合/乐队',
              code: 1003
            },
            {
              name: '欧美男歌手',
              code: 2001
            },
            {
              name: '欧美女歌手',
              code: 2002
            },
            {
              name: '欧美组合/乐队',
              code: 2003
            },
            {
              name: '日本男歌手',
              code: 6001
            },
            {
              name: '日本女歌手',
              code: 6002
            },
            {
              name: '日本组合/乐队',
              code: 6003
            },
            {
              name: '韩国男歌手',
              code: 7001
            },
            {
              name: '韩国女歌手',
              code: 7002
            },
            {
              name: '韩国组合/乐队',
              code: 7003
            },
            {
              name: '其他男歌手',
              code: 4001
            },
            {
              name: '其他女歌手',
              code: 4002
            },
            {
              name: '其他组合/乐队',
              code: 4003
            }
          ];
    }
    // 某类型歌手列表
    getSingerList(cat: any) {
        return this.http.get(`${API}/artist/list?cat=${cat}`);
    }
    // 某歌手详情
    getSingerDetail(id: any) {
        return this.http.get(`${API}/artists?id=${id}`);
    }
    // 电台分类列表
    getRadioClassifyList() {
        return this.http.get(`${API}/dj/catelist`);
    }
    // 某一类别的电台下的列表
    getRaioList(type: any) {
        return this.http.get(`${API}/dj/recommend/type?type=${type}`);
    }
    // 获取mv
    getMvList() {
      return this.http.get(`${API}/mv/first`);
    }
    constructor(private http: HttpClient) {
    }



    // 歌曲详情 (可传多个)
    getSongDetail(ids: number) {
      return this.http.get(`${API}/song/detail?ids=${ids}`);
    }

    // 歌曲mp3资源
    getSongUrl(id: number) {
      return this.http.get(`${API}/song/url?id=${id}`);
    }
    
    // 歌曲歌词
    getSongLyric(id: number) {
      return this.http.get(`${API}/lyric?id=${id}`);
    }
}

