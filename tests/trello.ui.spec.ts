import {test, expect, PlaywrightTestConfig} from '@playwright/test';
import {TrelloPage} from "../core/web/trello_home";
import Credentials from "../core/manage_data/Credentials";
import BoardRequest from "../core/api/board_request";

test('is New Board displayed', async ({ page }) => {
  let trelloPage =  new TrelloPage(page);
  let loginPage = await trelloPage.goToLogin();
  let boardPage = await loginPage.loginUserByDefault();
  let titleBoard = await boardPage.createNewBoard();
  let isTitleDisplayed = await boardPage.isTitleBoardSideBarVisible(titleBoard);
  expect(isTitleDisplayed).toBeTruthy();
});


// test('is New Board displayed by API', async ({ page }) => {
//     let boardREquest = new BoardRequest(page);
//     await boardREquest.createBoard();
// });
//
// test('is New Board by API and verify by UI', async ({ page }) => {
//     //Precondition API
//     let boardREquest = new BoardRequest(page);
//     let titleBoard = await boardREquest.createBoard();
//
//     //Verify by UI
//     let trelloPage =  new TrelloPage(page);
//     let loginPage = await trelloPage.goToLogin();
//     let boardPage = await loginPage.loginUserByDefault();
//
//     let isTitleDisplayed = await boardPage.isTitleBoardDasboardVisible(titleBoard);
//     expect(isTitleDisplayed).toBeTruthy();
// });