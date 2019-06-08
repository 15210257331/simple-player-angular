import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const API = `/api`

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

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
    getUserDetail(userId: number) {
      return this.http.get(`${API}/user/detail?uid=${userId}`);
    }
    // 获取用户歌单
    getUserSongList(userId: string) {
      return this.http.get(`${API}/user/playlist?uid=${userId}`);
    }
    // 新建歌单
    createSongList(name: string) {
      return this.http.get(`${API}/playlist/create?name=${name}`);
    }
    // 退出
    logout() {
      return this.http.get(`${API}/logout`);
    }
    // 轮播图
    getBanner() {
        return this.http.get(`${API}/banner`);
    }
    // 搜索
    searchMusic(keyword: string) {
        return this.http.get(`${API}/search?keywords=${keyword}`);
    }

    // 搜索建议
    searchSuggest(keyword: string): Observable<any> {
        return this.http.get(`${API}/search/suggest?keywords=${keyword}`);
    }

    // 歌单分类列表
    getCatlist() {
        return this.http.get(`${API}/playlist/catlist`);
    }
    // 推荐歌单
    getChosenList() {
        return this.http.get(`${API}/personalized`);
    }
    // 每个歌单的详情
    getChosenListDetail(id: string): Observable<any> {
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

    // 歌曲详情 (可传多个)
    getSongDetail(ids: any) {
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

    // 获取最新mv  1
    getLatestMvList() {
      return this.http.get(`${API}/mv/first`);
    }

    // 获取推荐mv 2
    getReccomendMvList() {
      return this.http.get(`${API}/personalized/mv`);
    }

    // mv排行 3
    getMvRank(): Observable<any> {
      return this.http.get(`${API}/top/mv?limit=100`);
    }

    // 获取mv详情
    getMvDetail(mvid: number) {
      return this.http.get(`${API}/mv/detail?mvid=${mvid}`);
    }

    // 获取mv mp4 资源
    getMvUrl(mvid: number) {
      return this.http.get(`${API}/mv/url?id=${mvid}`);
    }

    // 喜欢该音乐
    likeSong(songId: number) {
      return this.http.get(`${API}/like?id=${songId}`);
    }

    // 我喜欢的音乐列表
    myLikeSongList(userId: number) {
      return this.http.get(`${API}/likelist?uid=${userId}`);
    }
}

