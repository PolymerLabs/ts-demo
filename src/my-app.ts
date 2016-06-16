/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />

// import * as polymer from '../bower_components/polymer-ts/polymer-ts';

import {repeat} from './my-module';

@component('my-app')
export class MyApp extends polymer.Base {

  @property({
    type: String,
    reflectToAttribute: true,
    observer: '_pageChanged'
  })
  page: string;

  @observe('routeData.page')
  _routePageChanged(page: string) {
    this.page = page || 'view1';
  }

  _pageChanged(page: string) {
    console.log('_pageChanged', repeat(page));
    // load page import on demand.
    this.importHref(
      this.resolveUrl('my-' + page + '.html'), null, null, true);
  }

}

MyApp.register();
