import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';
import FileUpload from './FileUpload';

// GET
const absence = (STAFF_ID, TOKEN) =>
  Get(Config.absence + '=' + STAFF_ID, false, TOKEN);

const getLocation = TOKEN => Get(Config.getLocation, false, TOKEN);

const absenceHistory = (USER_ID, date, date2, TOKEN) =>
  Get(
    Config.absenceHistory + '=' + USER_ID + '&from=' + date + '&to=' + date2,
    false,
    TOKEN,
  );

const absenceHistoryExtra = (USER_ID, date, date2, TOKEN) =>
  Get(
    Config.absenceHistoryExtra +
      '=' +
      USER_ID +
      '&from=' +
      date +
      '&to=' +
      date2,
    false,
    TOKEN,
  );

const absenceHistoryRequests = (USER_ID, page, date, date2, TOKEN) =>
  Get(
    Config.absenceHistoryRequests +
      '=' +
      USER_ID +
      '&page=' +
      page +
      '&from=' +
      date +
      '&to=' +
      date2,
    false,
    TOKEN,
  );

const menu = (STAFF_ID, TOKEN) =>
  Get(Config.menu + '=' + STAFF_ID + '&version=2024-04-18', false, TOKEN);

const chart = (STAFF_ID, TOKEN) =>
  Get(Config.chart + '=' + STAFF_ID, false, TOKEN);

const absenceLCheck = (USER_ID, requests_id, TOKEN) =>
  Get(
    Config.absenceLCheck + '=' + USER_ID + '&requests_id=' + requests_id,
    false,
    TOKEN,
  );

const shift_staff = (USER_ID, date, shift, TOKEN) =>
  Get(
    Config.shift_staff +
      '=' +
      USER_ID +
      '&start=' +
      date +
      '&shift_id=' +
      shift,
    false,
    TOKEN,
  );

const shiftChange = (USER_ID, staff_id, TOKEN) =>
  Get(
    Config.shiftChange + '=' + USER_ID + '&staff_id=' + staff_id,
    false,
    TOKEN,
  );

const getPermissionCat = TOKEN => Get(Config.getPermissionCat, false, TOKEN);

const myShift = (id, TOKEN) => Get(Config.myShift + '=' + id, false, TOKEN);

const listChangeShift = (id, TOKEN) =>
  Get(Config.listChangeShift + '=' + id, false, TOKEN);

const listRequest = (id, TOKEN) =>
  Get(Config.listRequest + '=' + id, false, TOKEN);

const listFile = (id, TOKEN) => Get(Config.listFile + '=' + id, false, TOKEN);

const absenceSchedule = (id, TOKEN) =>
  Get(Config.absenceSchedule + '=' + id, false, TOKEN);

const changeShiftProposal = (id, page, date, date2, TOKEN) =>
  Get(
    Config.changeShiftProposal +
      '=' +
      id +
      '&page=' +
      page +
      '&from=' +
      date +
      '&to=' +
      date2,
    false,
    TOKEN,
  );
const changeShift = (id, page, date, date2, TOKEN) =>
  Get(
    Config.changeShift +
      '=' +
      id +
      '&page=' +
      page +
      '&from=' +
      date +
      '&to=' +
      date2,
    false,
    TOKEN,
  );
const message = (id, page, TOKEN) =>
  Get(Config.message + '=' + id + '&page=' + page, false, TOKEN);
const Holiday = (id, page, TOKEN) =>
  Get(Config.holiday + '=' + id + '&page=' + page, false, TOKEN);

const getDataStaff = (currentPage, search, TOKEN) =>
  Get(
    Config.getDataStaff + '=' + currentPage + '&name=' + search,
    false,
    TOKEN,
  );

const getDataCbox = TOKEN => Get(Config.getDataCbox, false, TOKEN);
//POST
const requestsStore = (data, TOKEN) =>
  Post(Config.requestsStore, false, data, TOKEN);
const login = data => Post(Config.login, false, data);
const leaveEnd = (data, TOKEN) => Post(Config.leaveEnd, false, data, TOKEN);
const scanCode = (data, TOKEN) => Post(Config.scanCode, false, data, TOKEN);
const updateShiftStaff = (data, TOKEN) =>
  Post(Config.updateShiftStaff, false, data, TOKEN);
const shiftChangeStore = (data, TOKEN) =>
  Post(Config.shiftChangeStore, false, data, TOKEN);
const changeShiftApprove = (data, TOKEN) =>
  Post(Config.changeShiftApprove, false, data, TOKEN);
const readMessage = (data, TOKEN) =>
  Post(Config.readMessage, false, data, TOKEN);
const checkStaff = (data, TOKEN) => Post(Config.checkStaff, false, data, TOKEN);

const closeLocation = (data, TOKEN) =>
  Post('close/absence/requests/closeLocation', false, data, TOKEN);

// DELETE
const deleteImage = (id, token) =>
  Delete(`close/absence/requests/imageDelete/${id}`, false, token);

//  UPLOAD FILE
const visitEtc = (data, TOKEN) => FileUpload(Config.visitEtc, data, TOKEN);

const report = (STAFF_ID, type, date, date2, TOKEN) =>
  Get(
    Config.report +
      '=' +
      STAFF_ID +
      '&type=' +
      type +
      '&from=' +
      date +
      '&to=' +
      date2,
    false,
    TOKEN,
  );

const nextAbsence = (STAFF_ID, TOKEN) =>
  Get(Config.nextAbsence + '=' + STAFF_ID, false, TOKEN);

const API = {
  login,
  scanCode,
  absence,
  requestsStore,
  menu,
  absenceLCheck,
  absenceHistory,
  absenceHistoryExtra,
  absenceHistoryRequests,
  shift_staff,
  updateShiftStaff,
  shiftChange,
  getPermissionCat,
  myShift,
  shiftChangeStore,
  listChangeShift,
  listRequest,
  leaveEnd,
  listFile,
  deleteImage,
  absenceSchedule,
  changeShiftApprove,
  changeShift,
  changeShiftProposal,
  message,
  Holiday,
  readMessage,
  checkStaff,
  chart,
  getDataStaff,
  getDataCbox,
  visitEtc,
  getLocation,
  closeLocation,
  report,
  nextAbsence,
};

export default API;
