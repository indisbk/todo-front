import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro';

@Injectable({
  providedIn: 'root'
})
// Class for working with intro.js(https://introjs.com/)
export class IntroService {

  private static INTRO_VIEWED_KEY = 'intro_viewed';
  private static INTRO_VIEWED_VALUE = 'done';

  introJS = introJs();

  constructor() { }

  // Start help intro
  public startIntroJS(checkViewed: boolean): void {
    if (checkViewed &&
      localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOptions({
      nextLabel: 'след. >',
      prevLabel: '< пред.',
      doneLabel: 'Выход',
      skipLabel: 'Выход',
      exitOnEsc: true,
      exitOnOverlayClick: false,
    });

    this.introJS.start();

    this.introJS.onexit(() => localStorage
      .setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));
  }
}
