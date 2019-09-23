import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IArticle } from '../interfaces';
import { Article } from '../models';
import { ArticlesResource } from '../resources/articles.resource';



@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private readonly resource: ArticlesResource) {}

  /**
   * Загрузка страницы статей с сервера
   * @param page - Порядковый номер страницы
   * @param articlesOnPage - Количество статей на старнице
   */
  getAdvertsPage(page: number, articlesOnPage: number): Observable<IServerResponse<IArticle[]>> {
    return from(this.resource.getArticles(null, {page, articlesOnPage}, null)).pipe(
      map((response: IServerResponse<IArticle[]>) => response)
    );
  }

  /**
   * Загрузка статьи с сервера
   * @param articleId - Идентификатор статьи
   */
  getArticle(articleId: number): Observable<IServerResponse<IArticle>> {
    return from(this.resource.getArticle(null, null, {id: articleId})).pipe(
      map((response: IServerResponse<IArticle>) => response)
    );
  }

  /**
   * Добавление статьи
   * @param article - Добавляемая статья
   */
  addAdvert(article: Article): Observable<IServerResponse<IArticle>> {
    return from(this.resource.addArticle(article)).pipe(
      map((response: IServerResponse<IArticle>) => response)
    );
  }

  /**
   * Изменение статьи
   * @param advert - Изменяемая статья
   */
  editArticle(article: Article): Observable<IServerResponse<IArticle>> {
    return from(this.resource.editArticle(article)).pipe(
      map((response: IServerResponse<IArticle>) => {
        return response;
      })
    );
  }

  /**
   * Удаление статьи
   * @param article - Удаляемая статья
   */
  removeArticle(article: Article): Observable<IServerResponse<boolean>> {
    return from(this.resource.deleteArticle(null, null, {id: article.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => response)
      );
  }

  /**
   * Поиск статей
   * @param query - Условие поиска
   */
  searchArticles(query: string): Observable<IServerResponse<IArticle[]>> {
    return from(this.resource.getArticles(null, {search: query}, null)).pipe(
      map((response: IServerResponse<IArticle[]>) => response)
    );
  }

  /**
   * Загрузка изображения на сервер
   * @param image - Загружаемое изображение
   * @param articleId - Идентификатор статьи
   * @param header - Загружается ли изображение в тело объявления либо в шапку
   */
  uploadImage(image: File, articleId: number, header: boolean): Promise<IServerResponse<{url: string, article: IArticle}|string>> {
    const data = new FormData();
    data.append('image', image);
    if (articleId && articleId !== 0) {
      return this.resource.uploadImageToArticle(data, {header}, {id: articleId});
    } else {
      return this.resource.uploadImageToNewArticle(data, {header}, null);
    }
  }

  /**
   * Загрузка вложения на сервер
   * @param file - Загружаемое вложение
   * @param articleId - Идентфиикатор статьи
   */
  uploadAttachment(file: File, articleId?: number): Observable<IServerResponse<IArticle>> {
    const data = new FormData();
    data.append('file', file);
    return articleId ?
      from(this.resource.uploadAttachmentToArticle(data, {userId: 7}, {id: articleId}))
        .pipe(
          map((response: IServerResponse<IArticle>) => response)
        )
      : from(this.resource.uploadAttachmentToNewArticle(data, {userId: 7}))
        .pipe(
          map((response: IServerResponse<IArticle>) => response)
        );
  }

  /**
   * Удаление вложения
   * @param attachmentId - Идентификатор удаляемого вложения
   */
  removeAttachment(attachmentId: number): Observable<IServerResponse<boolean>> {
    return from(this.resource.removeAttachment(null, null, {id: attachmentId}))
      .pipe(
        map((response: IServerResponse<boolean>) => response)
      );
  }
}
