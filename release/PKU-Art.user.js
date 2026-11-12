// ==UserScript==
// @name         PKU-Art
// @namespace    arthals/pku-art
// @version      2.6.27.1
// @author       Arthals
// @description  给你一个足够好看的北大网站。
// @license      GPL-3.0 license
// @icon         http://cdn.arthals.ink/Arthals-mcskin.png
// @supportURL   https://github.com/zhuozhiyongde/PKU-Art/issues
// @downloadURL  none
// @updateURL    none
// @match        *://*.pku.edu.cn/*
// @connect      pku.edu.cn
// @grant        GM_addValueChangeListener
// @grant        GM_download
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_setValue
// @inject-into  page
// @run-at       document-start
// @author-blog  https://arthals.ink
// @date         2026/11/12
// ==/UserScript==

(function () {
  'use strict';

  const mainStyles = ":root,:root.pku-art-light{--red-1: #ffece8;--red-2: #fdcdc5;--red-3: #fbaca3;--red-4: #f98981;--red-5: #f76560;--red-6: #f53f3f;--red-7: #cb272d;--red-8: #a1151e;--red-9: #770813;--red-10: #4d000a;--orangered-1: #fff3e8;--orangered-2: #fdddc3;--orangered-3: #fcc59f;--orangered-4: #faac7b;--orangered-5: #f99057;--orangered-6: #f77234;--orangered-7: #cc5120;--orangered-8: #a23511;--orangered-9: #771f06;--orangered-10: #4d0e00;--orange-1: #fff7e8;--orange-2: #ffe4ba;--orange-3: #ffcf8b;--orange-4: #ffb65d;--orange-5: #ff9a2e;--orange-6: #ff7d00;--orange-7: #d25f00;--orange-8: #a64500;--orange-9: #792e00;--orange-10: #4d1b00;--gold-1: #fffce8;--gold-2: #fdf4bf;--gold-3: #fce996;--gold-4: #fadc6d;--gold-5: #f9cc45;--gold-6: #f7ba1e;--gold-7: #cc9213;--gold-8: #a26d0a;--gold-9: #774b04;--gold-10: #4d2d00;--yellow-1: #feffe8;--yellow-2: #fefebe;--yellow-3: #fdfa94;--yellow-4: #fcf26b;--yellow-5: #fbe842;--yellow-6: #fadc19;--yellow-7: #cfaf0f;--yellow-8: #a38408;--yellow-9: #785d03;--yellow-10: #4d3800;--lime-1: #fcffe8;--lime-2: #edf8bb;--lime-3: #dcf190;--lime-4: #c9e968;--lime-5: #b5e241;--lime-6: #9fdb1d;--lime-7: #7eb712;--lime-8: #5f940a;--lime-9: #437004;--lime-10: #2a4d00;--green-1: #e8ffea;--green-2: #aff0b5;--green-3: #7be188;--green-4: #4cd263;--green-5: #23c343;--green-6: #00b42a;--green-7: #009a29;--green-8: #008026;--green-9: #006622;--green-10: #004d1c;--cyan-1: #e8fffb;--cyan-2: #b7f4ec;--cyan-3: #89e9e0;--cyan-4: #5edfd6;--cyan-5: #37d4cf;--cyan-6: #14c9c9;--cyan-7: #0da5aa;--cyan-8: #07828b;--cyan-9: #03616c;--cyan-10: #00424d;--blue-1: #e8f7ff;--blue-2: #c3e7fe;--blue-3: #9fd4fd;--blue-4: #7bc0fc;--blue-5: #57a9fb;--blue-6: #3491fa;--blue-7: #206ccf;--blue-8: #114ba3;--blue-9: #063078;--blue-10: #001a4d;--arcoblue-1: #e8f3ff;--arcoblue-2: #bedaff;--arcoblue-3: #94bfff;--arcoblue-4: #6aa1ff;--arcoblue-5: #4080ff;--arcoblue-6: #165dff;--arcoblue-7: #0e42d2;--arcoblue-8: #072ca6;--arcoblue-9: #031a79;--arcoblue-10: #000d4d;--purple-1: #f5e8ff;--purple-2: #ddbef6;--purple-3: #c396ed;--purple-4: #a871e3;--purple-5: #8d4eda;--purple-6: #722ed1;--purple-7: #551db0;--purple-8: #3c108f;--purple-9: #27066e;--purple-10: #16004d;--pinkpurple-1: #ffe8fb;--pinkpurple-2: #f7baef;--pinkpurple-3: #f08ee6;--pinkpurple-4: #e865df;--pinkpurple-5: #e13edb;--pinkpurple-6: #d91ad9;--pinkpurple-7: #b010b6;--pinkpurple-8: #8a0993;--pinkpurple-9: #650370;--pinkpurple-10: #42004d;--magenta-1: #ffe8f1;--magenta-2: #fdc2db;--magenta-3: #fb9dc7;--magenta-4: #f979b7;--magenta-5: #f754a8;--magenta-6: #f5319d;--magenta-7: #cb1e83;--magenta-8: #a11069;--magenta-9: #77064f;--magenta-10: #4d0034;--gray-1: #f7f8fa;--gray-2: #f2f3f5;--gray-3: #e5e6eb;--gray-4: #c9cdd4;--gray-5: #a9aeb8;--gray-6: #86909c;--gray-7: #6b7785;--gray-8: #4e5969;--gray-9: #272e3b;--gray-10: #1d2129}:root.pku-art-dark{--red-1: #4d000a;--red-2: #770611;--red-3: #a1161f;--red-4: #cb2e34;--red-5: #f54e4e;--red-6: #f76965;--red-7: #f98d86;--red-8: #fbb0a7;--red-9: #fdd1ca;--red-10: #fff0ec;--orangered-1: #4d0e00;--orangered-2: #771e05;--orangered-3: #a23714;--orangered-4: #cc5729;--orangered-5: #f77e45;--orangered-6: #f9925a;--orangered-7: #faad7d;--orangered-8: #fcc6a1;--orangered-9: #fddec5;--orangered-10: #fff4eb;--orange-1: #4d1b00;--orange-2: #793004;--orange-3: #a64b0a;--orange-4: #d26913;--orange-5: #ff8d1f;--orange-6: #ff9626;--orange-7: #ffb357;--orange-8: #ffcd87;--orange-9: #ffe3b8;--orange-10: #fff7e8;--gold-1: #4d2d00;--gold-2: #774b04;--gold-3: #a26f0f;--gold-4: #cc961f;--gold-5: #f7c034;--gold-6: #f9cc44;--gold-7: #fadc6c;--gold-8: #fce995;--gold-9: #fdf4be;--gold-10: #fffce8;--yellow-1: #4d3800;--yellow-2: #785e07;--yellow-3: #a38614;--yellow-4: #cfb325;--yellow-5: #fae13c;--yellow-6: #fbe94b;--yellow-7: #fcf374;--yellow-8: #fdfa9d;--yellow-9: #fefec6;--yellow-10: #fefff0;--lime-1: #2a4d00;--lime-2: #447006;--lime-3: #629412;--lime-4: #84b723;--lime-5: #a8db39;--lime-6: #b8e24b;--lime-7: #cbe970;--lime-8: #def198;--lime-9: #eef8c2;--lime-10: #fdffee;--green-1: #004d1c;--green-2: #046625;--green-3: #0a802d;--green-4: #129a37;--green-5: #1db440;--green-6: #27c346;--green-7: #50d266;--green-8: #7ee18b;--green-9: #b2f0b7;--green-10: #ebffec;--cyan-1: #00424d;--cyan-2: #06616c;--cyan-3: #11838b;--cyan-4: #1fa6aa;--cyan-5: #30c9c9;--cyan-6: #3fd4cf;--cyan-7: #66dfd7;--cyan-8: #90e9e1;--cyan-9: #bef4ed;--cyan-10: #f0fffc;--blue-1: #001a4d;--blue-2: #052f78;--blue-3: #134ca3;--blue-4: #2971cf;--blue-5: #469afa;--blue-6: #5aaafb;--blue-7: #7dc1fc;--blue-8: #a1d5fd;--blue-9: #c6e8fe;--blue-10: #eaf8ff;--arcoblue-1: #000d4d;--arcoblue-2: #041b79;--arcoblue-3: #0e32a6;--arcoblue-4: #1d4dd2;--arcoblue-5: #306fff;--arcoblue-6: #3c7eff;--arcoblue-7: #689fff;--arcoblue-8: #93beff;--arcoblue-9: #bedaff;--arcoblue-10: #eaf4ff;--purple-1: #16004d;--purple-2: #27066e;--purple-3: #3e138f;--purple-4: #5a25b0;--purple-5: #7b3dd1;--purple-6: #8e51da;--purple-7: #a974e3;--purple-8: #c59aed;--purple-9: #dfc2f6;--purple-10: #f7edff;--pinkpurple-1: #42004d;--pinkpurple-2: #650370;--pinkpurple-3: #8a0d93;--pinkpurple-4: #b01bb6;--pinkpurple-5: #d92ed9;--pinkpurple-6: #e13ddb;--pinkpurple-7: #e866df;--pinkpurple-8: #f092e6;--pinkpurple-9: #f7c1f0;--pinkpurple-10: #fff2fd;--magenta-1: #4d0034;--magenta-2: #770850;--magenta-3: #a1176c;--magenta-4: #cb2b88;--magenta-5: #f545a6;--magenta-6: #f756a9;--magenta-7: #f97ab8;--magenta-8: #fb9ec8;--magenta-9: #fdc3db;--magenta-10: #ffe8f1;--gray-10: #f7f8fa;--gray-9: #f2f3f5;--gray-8: #e5e6eb;--gray-7: #c9cdd4;--gray-6: #a9aeb8;--gray-5: #86909c;--gray-4: #6b7785;--gray-3: #4e5969;--gray-2: #272e3b;--gray-1: #1d2129}:root{--c-pku: #9b0000;--i-alarm: url(https://cdn.arthals.ink/css/src/alarm-clock.svg);--i-idcard: url(https://cdn.arthals.ink/css/src/id-card-v.svg);--i-tip: url(https://cdn.arthals.ink/css/src/tip.svg);--i-comment: url(https://cdn.arthals.ink/css/src/comment.svg);--i-clover: url(https://cdn.arthals.ink/css/src/clover.svg);--i-sandclock: url(https://cdn.arthals.ink/css/src/sandclock.svg);--i-calendar: url(https://cdn.arthals.ink/css/src/calendar.svg);--i-calendar-tab: url(https://cdn.arthals.ink/css/src/calendar-tab.svg);--i-verified: url(https://cdn.arthals.ink/css/src/verified.svg)}:root,:root.pku-art-light{--c-title: #212121;--c-text: #666;--c-border: #d0d7de;--c-background: #f6f8fa;--c-input-bg: #f6f8fa;--c-card: #fff;--c-hover: rgba(230, 230, 230, .5);--c-focus: #fff;--c-box-shadow: rgba(0, 0, 0, .1) 0px 10px 50px;--c-accent: #9b0000;--c-navbar: #fff;--c-sidebar: #fff;--c-subtitle: #82a3ac;--c-label: #f6f8fa;--c-link: #fcc59f;--c-primary: #165dff;--c-primary-light: #e8f3ff;--c-secondary: #89a2ac;--c-button: #f7f8fa;--c-card-hover: #66ecf331;--c-scrollbar: #c1c1c1;--c-tip: #e5e7eb;--c-title-icon: #333;--c-button-hover: #ffece8;--i-logo: url(https://cdn.arthals.ink/css/src/PKU_Logo.svg);--i-remind: url(https://cdn.arthals.ink/css/src/remind.svg);--i-exit: url(https://cdn.arthals.ink/css/src/exit.svg);--i-watch: url(https://cdn.arthals.ink/css/src/stopwatch-start.svg);--i-file: url(https://cdn.arthals.ink/css/src/file.svg);--i-folder: url(https://cdn.arthals.ink/css/src/folder.svg);--i-link: url(https://cdn.arthals.ink/css/src/link.svg);--i-setting: url(https://cdn.arthals.ink/css/src/setting.svg);--i-check: url(https://cdn.arthals.ink/css/src/check.svg);--i-check-simple: url(https://cdn.arthals.ink/css/src/check-simple.svg);--i-download: url(https://cdn.arthals.ink/css/src/download.svg);--i-warning: url(https://cdn.arthals.ink/css/src/warning.svg);--i-student: url(https://cdn.arthals.ink/css/src/student.svg);--i-refresh: url(https://cdn.arthals.ink/css/src/refresh.svg);--i-search: url(https://cdn.arthals.ink/css/src/search.svg);--i-arrow: url(https://cdn.arthals.ink/css/src/arrow.svg);--i-calendar-day: url(https://cdn.arthals.ink/css/src/calendar-day.svg);--i-calendar-week: url(https://cdn.arthals.ink/css/src/calendar-week.svg);--i-calendar-month: url(https://cdn.arthals.ink/css/src/calendar-month.svg);--i-add: url(https://cdn.arthals.ink/css/src/add.svg);--i-resize: url(https://cdn.arthals.ink/css/src/resize.svg)}:root.pku-art-dark{--c-title: #e2e2e2;--c-text: #bababa;--c-border: #30363d;--c-background: #020409;--c-input-bg: #020409;--c-hover: rgba(29, 33, 41, .5);--c-card: #0e1017;--c-focus: #010409;--c-box-shadow: none;--c-accent: #e44c47;--c-navbar: #171a22;--c-sidebar: #0e1017;--c-subtitle: #86909c;--c-label: #22252d;--c-link: #f9925a;--c-primary: #7dc1fc;--c-primary-light: #262947;--c-secondary: #00879d;--c-button: #22262d;--c-card-hover: rgba(23, 231, 242, .23);--c-scrollbar: #6b6b6b;--c-tip: #22262d;--c-title-icon: #e2e2e2;--c-button-hover: #54121c;--i-logo: url(https://cdn.arthals.ink/css/src/PKU_Logo_Dark.svg);--i-remind: url(https://cdn.arthals.ink/css/src/remind_dark.svg);--i-exit: url(https://cdn.arthals.ink/css/src/exit_dark.svg);--i-watch: url(https://cdn.arthals.ink/css/src/stopwatch-start_dark.svg);--i-file: url(https://cdn.arthals.ink/css/src/file_dark.svg);--i-folder: url(https://cdn.arthals.ink/css/src/folder_dark.svg);--i-link: url(https://cdn.arthals.ink/css/src/link_dark.svg);--i-setting: url(https://cdn.arthals.ink/css/src/setting_dark.svg);--i-check: url(https://cdn.arthals.ink/css/src/check_dark.svg);--i-check-simple: url(https://cdn.arthals.ink/css/src/check-simple_dark.svg);--i-download: url(https://cdn.arthals.ink/css/src/download_dark.svg);--i-warning: url(https://cdn.arthals.ink/css/src/warning_dark.svg);--i-student: url(https://cdn.arthals.ink/css/src/student_dark.svg);--i-refresh: url(https://cdn.arthals.ink/css/src/refresh_dark.svg);--i-search: url(https://cdn.arthals.ink/css/src/search_dark.svg);--i-arrow: url(https://cdn.arthals.ink/css/src/arrow_dark.svg);--i-calendar-day: url(https://cdn.arthals.ink/css/src/calendar-day_dark.svg);--i-calendar-week: url(https://cdn.arthals.ink/css/src/calendar-week_dark.svg);--i-calendar-month: url(https://cdn.arthals.ink/css/src/calendar-month_dark.svg);--i-add: url(https://cdn.arthals.ink/css/src/add_dark.svg);--i-resize: url(https://cdn.arthals.ink/css/src/resize_dark.svg)}body,html{background:var(--c-background)!important}*{outline:none!important}@keyframes fadeInUpTransition{0%{opacity:0;-webkit-transform:translateY(100px);transform:translateY(100px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpStablePixel{0%{opacity:0;-webkit-transform:translateY(200px);transform:translateY(200px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUpStablePixelForContentBox{0%{margin-left:min(25%,300px);opacity:0;-webkit-transform:translateY(200px);transform:translateY(200px)}to{margin-left:min(25%,300px);opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeftStablePixel{0%{color:#fff;transform:translate(-72px);-webkit-transform:translateX(-72px)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}to{opacity:1}}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background-color:transparent}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background-color:var(--c-scrollbar);border-radius:9999px}.pku-art-theme-toggle-bar{display:flex;align-items:center;justify-content:center}.pku-art-theme-toggle{width:32px;height:32px;padding:0;margin:0;border:none;border-radius:8px;background-color:transparent;cursor:pointer;line-height:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;transition:background-color .2s ease,box-shadow .2s ease,color .2s ease;position:relative;touch-action:manipulation;display:flex;align-items:center;justify-content:center;color:var(--c-title-icon)}.pku-art-theme-toggle:hover,.pku-art-theme-toggle:focus-visible{background-color:var(--c-hover)}.pku-art-theme-toggle svg{width:28px;height:28px;display:block}.pku-art-theme-toggle[data-mode=light]:hover{color:#fdb022}.pku-art-theme-toggle[data-mode=dark]:hover{color:#7dc1fc}.pku-art-theme-toggle[data-mode=auto]:hover{color:var(--gray-5)}";
  const arcoPaletteStyles = ":root,:root.pku-art-light{--red-1: #ffece8;--red-2: #fdcdc5;--red-3: #fbaca3;--red-4: #f98981;--red-5: #f76560;--red-6: #f53f3f;--red-7: #cb272d;--red-8: #a1151e;--red-9: #770813;--red-10: #4d000a;--orangered-1: #fff3e8;--orangered-2: #fdddc3;--orangered-3: #fcc59f;--orangered-4: #faac7b;--orangered-5: #f99057;--orangered-6: #f77234;--orangered-7: #cc5120;--orangered-8: #a23511;--orangered-9: #771f06;--orangered-10: #4d0e00;--orange-1: #fff7e8;--orange-2: #ffe4ba;--orange-3: #ffcf8b;--orange-4: #ffb65d;--orange-5: #ff9a2e;--orange-6: #ff7d00;--orange-7: #d25f00;--orange-8: #a64500;--orange-9: #792e00;--orange-10: #4d1b00;--gold-1: #fffce8;--gold-2: #fdf4bf;--gold-3: #fce996;--gold-4: #fadc6d;--gold-5: #f9cc45;--gold-6: #f7ba1e;--gold-7: #cc9213;--gold-8: #a26d0a;--gold-9: #774b04;--gold-10: #4d2d00;--yellow-1: #feffe8;--yellow-2: #fefebe;--yellow-3: #fdfa94;--yellow-4: #fcf26b;--yellow-5: #fbe842;--yellow-6: #fadc19;--yellow-7: #cfaf0f;--yellow-8: #a38408;--yellow-9: #785d03;--yellow-10: #4d3800;--lime-1: #fcffe8;--lime-2: #edf8bb;--lime-3: #dcf190;--lime-4: #c9e968;--lime-5: #b5e241;--lime-6: #9fdb1d;--lime-7: #7eb712;--lime-8: #5f940a;--lime-9: #437004;--lime-10: #2a4d00;--green-1: #e8ffea;--green-2: #aff0b5;--green-3: #7be188;--green-4: #4cd263;--green-5: #23c343;--green-6: #00b42a;--green-7: #009a29;--green-8: #008026;--green-9: #006622;--green-10: #004d1c;--cyan-1: #e8fffb;--cyan-2: #b7f4ec;--cyan-3: #89e9e0;--cyan-4: #5edfd6;--cyan-5: #37d4cf;--cyan-6: #14c9c9;--cyan-7: #0da5aa;--cyan-8: #07828b;--cyan-9: #03616c;--cyan-10: #00424d;--blue-1: #e8f7ff;--blue-2: #c3e7fe;--blue-3: #9fd4fd;--blue-4: #7bc0fc;--blue-5: #57a9fb;--blue-6: #3491fa;--blue-7: #206ccf;--blue-8: #114ba3;--blue-9: #063078;--blue-10: #001a4d;--arcoblue-1: #e8f3ff;--arcoblue-2: #bedaff;--arcoblue-3: #94bfff;--arcoblue-4: #6aa1ff;--arcoblue-5: #4080ff;--arcoblue-6: #165dff;--arcoblue-7: #0e42d2;--arcoblue-8: #072ca6;--arcoblue-9: #031a79;--arcoblue-10: #000d4d;--purple-1: #f5e8ff;--purple-2: #ddbef6;--purple-3: #c396ed;--purple-4: #a871e3;--purple-5: #8d4eda;--purple-6: #722ed1;--purple-7: #551db0;--purple-8: #3c108f;--purple-9: #27066e;--purple-10: #16004d;--pinkpurple-1: #ffe8fb;--pinkpurple-2: #f7baef;--pinkpurple-3: #f08ee6;--pinkpurple-4: #e865df;--pinkpurple-5: #e13edb;--pinkpurple-6: #d91ad9;--pinkpurple-7: #b010b6;--pinkpurple-8: #8a0993;--pinkpurple-9: #650370;--pinkpurple-10: #42004d;--magenta-1: #ffe8f1;--magenta-2: #fdc2db;--magenta-3: #fb9dc7;--magenta-4: #f979b7;--magenta-5: #f754a8;--magenta-6: #f5319d;--magenta-7: #cb1e83;--magenta-8: #a11069;--magenta-9: #77064f;--magenta-10: #4d0034;--gray-1: #f7f8fa;--gray-2: #f2f3f5;--gray-3: #e5e6eb;--gray-4: #c9cdd4;--gray-5: #a9aeb8;--gray-6: #86909c;--gray-7: #6b7785;--gray-8: #4e5969;--gray-9: #272e3b;--gray-10: #1d2129}:root.pku-art-dark{--red-1: #4d000a;--red-2: #770611;--red-3: #a1161f;--red-4: #cb2e34;--red-5: #f54e4e;--red-6: #f76965;--red-7: #f98d86;--red-8: #fbb0a7;--red-9: #fdd1ca;--red-10: #fff0ec;--orangered-1: #4d0e00;--orangered-2: #771e05;--orangered-3: #a23714;--orangered-4: #cc5729;--orangered-5: #f77e45;--orangered-6: #f9925a;--orangered-7: #faad7d;--orangered-8: #fcc6a1;--orangered-9: #fddec5;--orangered-10: #fff4eb;--orange-1: #4d1b00;--orange-2: #793004;--orange-3: #a64b0a;--orange-4: #d26913;--orange-5: #ff8d1f;--orange-6: #ff9626;--orange-7: #ffb357;--orange-8: #ffcd87;--orange-9: #ffe3b8;--orange-10: #fff7e8;--gold-1: #4d2d00;--gold-2: #774b04;--gold-3: #a26f0f;--gold-4: #cc961f;--gold-5: #f7c034;--gold-6: #f9cc44;--gold-7: #fadc6c;--gold-8: #fce995;--gold-9: #fdf4be;--gold-10: #fffce8;--yellow-1: #4d3800;--yellow-2: #785e07;--yellow-3: #a38614;--yellow-4: #cfb325;--yellow-5: #fae13c;--yellow-6: #fbe94b;--yellow-7: #fcf374;--yellow-8: #fdfa9d;--yellow-9: #fefec6;--yellow-10: #fefff0;--lime-1: #2a4d00;--lime-2: #447006;--lime-3: #629412;--lime-4: #84b723;--lime-5: #a8db39;--lime-6: #b8e24b;--lime-7: #cbe970;--lime-8: #def198;--lime-9: #eef8c2;--lime-10: #fdffee;--green-1: #004d1c;--green-2: #046625;--green-3: #0a802d;--green-4: #129a37;--green-5: #1db440;--green-6: #27c346;--green-7: #50d266;--green-8: #7ee18b;--green-9: #b2f0b7;--green-10: #ebffec;--cyan-1: #00424d;--cyan-2: #06616c;--cyan-3: #11838b;--cyan-4: #1fa6aa;--cyan-5: #30c9c9;--cyan-6: #3fd4cf;--cyan-7: #66dfd7;--cyan-8: #90e9e1;--cyan-9: #bef4ed;--cyan-10: #f0fffc;--blue-1: #001a4d;--blue-2: #052f78;--blue-3: #134ca3;--blue-4: #2971cf;--blue-5: #469afa;--blue-6: #5aaafb;--blue-7: #7dc1fc;--blue-8: #a1d5fd;--blue-9: #c6e8fe;--blue-10: #eaf8ff;--arcoblue-1: #000d4d;--arcoblue-2: #041b79;--arcoblue-3: #0e32a6;--arcoblue-4: #1d4dd2;--arcoblue-5: #306fff;--arcoblue-6: #3c7eff;--arcoblue-7: #689fff;--arcoblue-8: #93beff;--arcoblue-9: #bedaff;--arcoblue-10: #eaf4ff;--purple-1: #16004d;--purple-2: #27066e;--purple-3: #3e138f;--purple-4: #5a25b0;--purple-5: #7b3dd1;--purple-6: #8e51da;--purple-7: #a974e3;--purple-8: #c59aed;--purple-9: #dfc2f6;--purple-10: #f7edff;--pinkpurple-1: #42004d;--pinkpurple-2: #650370;--pinkpurple-3: #8a0d93;--pinkpurple-4: #b01bb6;--pinkpurple-5: #d92ed9;--pinkpurple-6: #e13ddb;--pinkpurple-7: #e866df;--pinkpurple-8: #f092e6;--pinkpurple-9: #f7c1f0;--pinkpurple-10: #fff2fd;--magenta-1: #4d0034;--magenta-2: #770850;--magenta-3: #a1176c;--magenta-4: #cb2b88;--magenta-5: #f545a6;--magenta-6: #f756a9;--magenta-7: #f97ab8;--magenta-8: #fb9ec8;--magenta-9: #fdc3db;--magenta-10: #ffe8f1;--gray-10: #f7f8fa;--gray-9: #f2f3f5;--gray-8: #e5e6eb;--gray-7: #c9cdd4;--gray-6: #a9aeb8;--gray-5: #86909c;--gray-4: #6b7785;--gray-3: #4e5969;--gray-2: #272e3b;--gray-1: #1d2129}";
  const iaaaOAuthPageStyles = '.top,.bottom{display:none}.main{display:flex;flex-direction:column;justify-content:center;background:transparent}.mid{background-image:none!important;display:flex;justify-content:center}.single_col_panel{margin-top:20vh;display:flex;height:max(fit-content,400px);width:300px!important;align-items:center;flex-direction:column;box-shadow:var(--c-box-shadow);background-color:var(--c-card);background-image:var(--i-logo);border:1px solid var(--c-border);background-size:50%;background-position:top center;background-position-y:25px;background-repeat:no-repeat;float:none;border-radius:10px;padding:90px 20px 20px;text-align:center}.row .row-title{border-bottom:1px solid var(--c-border)}.row .row-title a{color:var(--c-text)}.row .row-title .current{color:var(--c-accent)}input:nth-last-child(n+2){background-color:var(--c-input-bg);border:1px solid var(--c-border);color:var(--c-text)}input:nth-last-child(n+2):focus{background-color:transparent;border:2px solid var(--c-accent)}input[type=submit]{background-color:var(--c-accent)}#remember_text{margin-top:4px;color:var(--c-text)!important}#remember_text.pku-art-remember-toggle{display:flex;align-items:center;justify-content:center;text-align:center;width:100%;gap:8px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:13px}#remember_text.pku-art-remember-toggle>i{position:absolute;width:0;height:0;overflow:hidden}#remember_text.pku-art-remember-toggle .pku-art-remember-icon{width:16px;height:16px;border-radius:3px;border:1px solid var(--c-border);background:var(--c-input-bg);display:inline-flex;align-items:center;justify-content:center;transition:border-color .08s ease,background-color .08s ease;flex-shrink:0}#remember_text.pku-art-remember-toggle .pku-art-remember-icon:after{content:"";width:10px;height:10px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:#fff;opacity:0;transition:opacity .08s ease}#remember_text.pku-art-remember-toggle.is-checked .pku-art-remember-icon{border-color:var(--c-accent);background:var(--c-accent)}#remember_text.pku-art-remember-toggle.is-checked .pku-art-remember-icon:after{opacity:1}.pku-art-remember-checkbox{position:absolute!important;opacity:0!important;pointer-events:none!important;width:0!important;height:0!important}div:has(>input#user_name):before{content:"账号";display:block;height:25px;position:absolute;top:-30px;left:0;font:700 13pt arial,sans-serif;text-align:left;margin-left:5px;margin-bottom:3px;color:var(--c-title)}div:has(>input#password):before{content:"密码";display:block;position:absolute;top:-30px;left:0;font:700 13pt arial,sans-serif;text-align:left;margin-left:5px;margin-bottom:3px;color:var(--c-title)}div:has(>input#user_name),div:has(>input#password){position:relative;margin-top:35px;display:flex;align-items:center;justify-content:center}.fa.fa-times-circle{display:none}.pad-tip{color:var(--c-title);font-weight:400}input[type=password]::placeholder,input[type=text]::placeholder{color:transparent}input{border-radius:6px!important;height:40px!important;box-sizing:border-box}#msg{display:flex;justify-content:center;text-align:center;width:100%;color:var(--c-accent)}';
  const courseLoginPageStyles = '.container>div:nth-child(1),.ad,#footer,iframe{display:none}.container{background:none;width:fit-content;height:fit-content}.container>div{padding:0!important;display:flex;justify-content:center}#login form{padding:0!important}#login{background:none;display:flex;justify-content:center;align-items:center;margin:0;padding:0;height:fit-content}body>div>div>#login>form :not(:first-child){display:none}body>div>div>#login>form{width:100%;height:10px;display:block;text-align:center!important;margin-top:min(20vh,300px)}.login_stu{background-color:var(--c-card);border:1px solid var(--c-border);background-image:var(--i-logo);background-size:50%;background-position:top center;background-position-y:20px;background-repeat:no-repeat;float:none;border-radius:10px;margin:0 auto!important;width:200px!important;height:100px;padding:10px;text-align:center;box-shadow:var(--c-box-shadow)}.login_stu a:before{display:block;content:"";color:#0000;height:1px;width:200px;margin:0 auto;background-color:var(--c-border);position:relative;bottom:17px}.login_stu a{display:block;margin:2px auto;width:100%;height:25px;text-decoration:none;padding-top:5px;color:#fff;position:relative;top:65px;background-color:var(--c-accent);border-radius:10px;font-size:10pt}';
  const courseHomePageStyles = 'body{position:relative}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{overflow:hidden;color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}#global-nav-link>#badgeTotal>.badge{top:0!important;right:0!important;border-radius:3px;background-color:var(--c-accent);color:#fff}.global-nav-bar.logout a.logout-link,.global-nav-bar.logout a.logout-link:hover,.global-nav-bar.logout a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane{background-color:var(--c-background)}#globalNavPageNavArea{position:fixed;width:100%;z-index:30}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border)}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:fixed;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#globalNavPageContentArea,.locationPane,.contentPaneWide,#content,#content>div,#content>div>div,#content>div>div>div,#content>div>div>div>div{height:fit-content;min-height:100vh;padding:0}.container{margin:0;padding:0;border:none;height:fit-content}.containerPortal{display:flex;flex-direction:row}.locationPane .paneTabs{position:absolute;display:none}#column0{margin:60px 0 0;background-color:var(--c-sidebar);border-right:1px solid var(--c-border);width:min(25%,300px)!important;position:fixed;height:100%}#column0:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:80px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}html #global-nav-bar-wrap{display:flex;justify-content:flex-end}.clearfix:after,.clearfixParent>div:after,.clearfixParent>li:after{display:none}.portlet{padding:1em;background-color:var(--c-sidebar)}#column0>div:first-child h2{background-color:var(--c-sidebar);font-size:14pt;color:var(--c-title)}#column0>div:first-child{border:none}#column0>div:first-child h2:after{z-index:1;content:"";color:transparent;visibility:visible;display:block;height:10px;position:relative;top:5px;width:60px;border-radius:50px;background-color:var(--c-accent)}#column0>div:first-child div.collapsible{border:none}.portlet .portletList li{border-top:none}.portlet .portletList-img>li{border:none}.portlet .portletList li a{position:relative;color:var(--c-text);font-size:11pt}.portlet .portletList li a:hover{color:var(--red-5)}.portlet .portletList li a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}.portlet .portletList li a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}#column0>div:not(:first-child){display:none}#column0{-webkit-animation:fadeInLeftStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards;animation:fadeInLeftStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards}#column1,#column2{-webkit-animation:fadeInUpStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards;animation:fadeInUpStablePixel 1s cubic-bezier(.25,.46,.45,.94) forwards}#column1{margin-left:calc(min(25%,300px) + 1rem)!important}#column1,#column2{margin-top:60px;margin-left:1em;height:fit-content}#column1 .portlet,#column2 .portlet{border:1px solid var(--c-border);border-radius:5px;background-color:var(--c-card);margin-top:1em}.portlet h2{font-size:14pt;background-color:transparent;color:var(--c-title);border:none}.containerPortal>div:not(:first-child) .portlet .portletList-img>li{padding:7px 10px!important;border-radius:5px;margin-bottom:.25em;position:relative}.collapsible{border-top:none}.containerPortal>div:not(:first-child) .portlet .portletList-img>li:hover{background-color:var(--c-hover)}.containerPortal>div:not(:first-child) .portlet .portletList-img>li>a{display:block;color:var(--c-subtitle);font-size:11pt}.containerPortal>div:not(:first-child) .portlet .portletList-img>li>a:hover{color:var(--blue-5)}.portlet .noItems{text-align:left}#column2 .collapsible div,#column2 .collapsible h3,#column2 .collapsible a,.portlet h3{font-style:normal;color:var(--c-text)}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover,#global-list-tools>.more-link a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}div.edit_controls>a:before,div.edit_controls>a:hover:before{background:var(--i-setting);background-repeat:no-repeat;background-size:contain;color:transparent}';
  const courseContentStyles = 'body{position:relative;display:flex;flex-direction:column;min-height:100%}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none!important}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat!important;background-position:center center!important}.container,.locationPane,.contentPane,.contentBox{background-color:var(--c-background)}#containerdiv{border:none}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)!important}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background:var(--c-navbar) var(--i-logo) no-repeat 2em center / auto 30px!important;border-bottom:1px solid var(--c-border);position:fixed;width:100%;z-index:30}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}body .global-nav-bar-wrap{position:fixed;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none!important;height:60px!important;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#breadcrumbs{float:right;width:calc(100% - min(25%,300px));padding:1.2em 1em 1em;box-sizing:border-box;height:80px;margin-bottom:1em;margin-top:60px;z-index:10;color:var(--c-title);background-color:var(--c-background);display:flex;text-align:center;justify-content:center;border:none}#breadcrumbs .coursePath{padding:0;margin:0;border-right:none}#breadcrumbs .coursePath .courseArrow a{height:1em;width:1em;background:var(--i-arrow) no-repeat center center;background-size:100%}body>div.cmdiv{border-color:var(--c-border);background:var(--c-card);max-height:30em;width:20em;overflow:hidden auto;border-radius:.6em;padding:.5em;box-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a}body>div.cmdiv ul{width:100%;padding:.6em 0;margin:0;border-top:var(--c-border) solid 1px}body>div.cmdiv ul:first-child{display:none}body>div.cmdiv ul:nth-child(2){border-top:none;padding-top:0}body>div.cmdiv ul:last-child{padding-bottom:0}body>div.cmdiv ul li span.labelMenuItem{margin-left:.6em;color:var(--c-title)}body>div.cmdiv ul li a{padding:.6em;color:var(--c-subtitle);font-weight:700;font-size:1rem}body>div.cmdiv ul li a:hover{color:var(--blue-5);background-color:var(--c-hover)}#breadcrumb_controls_id,#breadcrumbs li:not([class*=coursePath]){display:none}#breadcrumbs span{font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}#globalNavPageContentArea{flex-grow:1}.locationPane{min-height:100%}#globalNavPageNavArea{flex-shrink:0}nav.navigationPane{height:100%;transition:none!important}nav.navigationPane:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:80px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}.locationPane nav{width:min(25%,300px)!important;position:fixed;margin-top:60px}#menuWrap{border-right:1px solid var(--c-border)}#menuWrap>#puller{display:none}.navcollapsed{margin-left:0}#menuWrap,.navPaletteContent,#courseMenuPalette_contents li,#courseMenuPalette div.navPaletteContent{background-color:var(--c-sidebar)!important;border-top:none}#menuWrap .navPalette.tools{border-top:none}.actionBarMicro,li.divider,#copyright,#menuWrap li>hr{display:none!important}#courseMenuPalette_contents li *{color:var(--c-text)!important;font-size:11pt}#menuWrap a[title]{background:none;font-size:12pt;font-weight:700!important;color:var(--c-title)}#courseMenuPalette_paletteTitleHeading h3{background:none!important;border-left:6px solid var(--c-accent)}#menuWrap li a,#menuWrap li span{background:none!important}#menuWrap span{color:var(--c-text);font-size:11pt}#menuWrap a[title]:before,#menuWrap .submenuLink,#menuWrap .submenuLink_active{display:none}#menuWrap h3.navPaletteCol>a{border-left:4px solid var(--c-accent);margin-left:10px;padding-left:16px}#menuWrap>.menuWrap-inner a:hover,#menuWrap>.menuWrap-inner span:not(.reorder):hover{color:var(--red-5)!important;text-decoration:none}#menuWrap h3 a:hover{background-color:var(--c-hover);transition:all ease-in-out .15s}#menuWrap a span{display:inline;position:relative}#menuWrap a span:nth-child(1):after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menuWrap a span:nth-child(1):hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}.navPalette.tools{border:none}#globalNavPageContentArea .locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none!important;background-color:var(--c-background)}#pageTitleDiv{margin:0!important}#contentPanel{z-index:10;margin-top:60px;margin-left:min(25%,300px)}#content{width:min(100%,1200px);margin:0 auto}#contentPanel{-webkit-animation:fadeInUpStablePixelForContentBox .7s cubic-bezier(.215,.61,.355,1) both;animation-delay:.5s;animation:fadeInUpStablePixelForContentBox .7s cubic-bezier(.215,.61,.355,1) both}.localViewToggle{display:none}#pageTitleHeader{color:var(--blue-7)!important;background-color:var(--blue-2);padding:.3em 1em;border-radius:5px;font-size:20px!important}#pageTitleHeader *{color:var(--blue-7)!important}#pageTitleText{font-weight:700}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0!important;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}#pageList a.individualContent-link{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#pageList a.individualContent-link span{text-decoration:none;color:var(--c-text)!important}#pageList .liItem,#pageList .buildList>li{padding:1rem 1.5rem;border-radius:.5rem;border:1px solid var(--c-border);width:fit-content;transition:all ease-in .15s}#pageList .liItem:hover,#pageList .buildList>li:hover{background:var(--c-hover);border:1px solid var(--c-border)}.pageTitle h1+.contextMenuContainer{display:none!important}.ineditmode div.listCm ul.courseMenu li{border:none!important}#pageList{color:var(--c-text);line-height:1.6rem}';
  const courseAnnouncementStyles = '#containerdiv,#announcementList{border:none}#announcementList>li{border:1px solid var(--c-border);background:var(--c-card);margin-bottom:2em;border-radius:5px;position:relative}#announcementList>li>h3:first-child{color:var(--c-title)!important;font-size:18px}#announcementList>li>.announcementInfo{position:absolute;top:50px;left:30px;height:60px;border:none;display:flex;flex-direction:row;width:fit-content;justify-content:flex-start;padding:0;margin-top:5px}#announcementList>li>.announcementInfo>p{display:inline;width:fit-content;height:fit-content;border-radius:1000px;border:1px solid var(--c-border);background-color:var(--c-label);padding:.2em 1em;color:var(--c-text);margin-right:1em}#announcementList>li>.announcementInfo>p>span{display:none}#announcementList>li>.details{margin:40px 0 0}#announcementList>li>.details *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px!important;line-height:1.6}#announcementList>li>.details *[style*=background-color],#announcementList>li>.details *[style*=text-decoration]{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#announcementList>li>.details *[style*="text-decoration-style: initial;"]:not([style*=background-color]){background:none!important}#announcementList>li>.details strong{color:var(--c-accent)!important;font-weight:400}#announcementList>li>.details a{color:var(--c-accent)!important;background:linear-gradient(180deg,transparent 90%,var(--c-link) 90%)!important}#announcementList>li>.details a:hover{background:linear-gradient(180deg,var(--c-hover) 90%,var(--c-link) 90%)!important}#announcementList>li>.details>p:first-child span{display:flex;flex-direction:flex-start;justify-content:center;align-items:center;width:fit-content}#announcementList>li>.details>p:first-child span:before{content:"";display:inline-block;background:var(--i-watch);margin-right:1em;background-size:100%;background-position:center center;width:20px;height:20px;background-repeat:no-repeat}';
  const courseTeachingStaffListStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseClassinStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseBlankPageStyles = '#containerdiv{border:1px solid var(--c-border);background:var(--c-card);margin-bottom:2em;border-radius:5px;padding:20px 30px;color:var(--c-text)}#containerdiv *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px!important;line-height:1.6}#containerdiv *[style*=background-color],#containerdiv *[style*=text-decoration]{background-color:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#containerdiv *[style*="text-decoration-style: initial;"]:not([style*=background-color]){background:none!important}';
  const courseVideolistStyles = ".container{margin-top:0;padding-top:0}.searchbar{display:none}#listContainer{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px;padding:5px 0}#listContainer_datatable{padding:0 10px;background:var(--c-card)}#listContainer_datatable .inventoryListHead *{color:var(--c-title);font-weight:700;padding-left:12px}#listContainer_datatable>.inventoryListHead *{border-bottom:1px solid var(--c-border)!important}#listContainer_databody{border-bottom:none}#listContainer_databody>tr{background:var(--c-card)}#listContainer_databody>tr:nth-child(2n){background:var(--gray-1)}#containerdiv{width:inherit}#listContainer_databody>tr>*:first-child{border-radius:5px 0 0 5px}#listContainer_databody>tr>*:last-child{border-radius:0 5px 5px 0;border-bottom:none!important}#listContainer_databody>tr:last-child>*{border-bottom:none!important}#listContainer_databody>tr>*{line-height:24px;margin-top:5px;border:none}#listContainer_databody>tr *{color:var(--c-text)}#listContainer_databody>tr .table-data-cell-value>a{color:var(--cyan-7);border-radius:3px;padding:0 1em}#listContainer_databody>tr .table-data-cell-value>a:hover{text-decoration:none;background:var(--cyan-2)}#listContainer>.rumble_top{display:none}#listContainer_nav_batch_bot{display:flex;justify-content:center;padding:10px 0 0}#listContainer_nav_batch_bot>.inventory_paging{margin:0;padding:0}#listContainer_navpaging_bot .jumpToLinkContainer,#listContainer_navpaging_bot .jumpToLinkContainer *{background:var(--c-primary-light);color:var(--c-primary);border:none;box-shadow:none}#listContainer_navpaging_bot .jumpToLinkContainer{border-radius:5px;padding:5px 8px;display:inline-flex;justify-content:center}#listContainer_navpaging_bot>a{background-color:transparent;border:none;box-shadow:none}#listContainer_pagingcontrols{display:flex;justify-content:center;width:100%;margin-bottom:5px}#listContainer_pagingcontrols #listContainer_itemcount>span{border:none;padding:0;margin:0;color:var(--c-text)}#listContainer_pagingcontrols #listContainer_itemcount>span>strong{color:var(--c-title);display:inline;padding:0 5px}#listContainer_pagingcontrols #listContainer_itemcount>span>strong:last-child{padding-right:0}";
  const courseOtherStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);background:var(--c-background);outline:none;border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#actionbar .secondaryButton>a.liveAreaTab{border-bottom:2px solid var(--c-accent)!important}#actionbar+.containerOptions{padding-right:30px;padding-left:30px}#actionbar+.containerOptions .liveArea{border-radius:0 0 5px 5px;border:1px solid var(--c-border);border-top:none}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseClassGradeStyles = '#containerdiv{border:none;background:var(--c-background)}.filterBarHorizontal{background:var(--c-background);border-bottom:1px solid var(--c-border)}#filterby{display:inline-flex;height:100%;padding-top:0;padding-bottom:0}#filterby>li{height:100%;position:relative}#filterby a{box-sizing:border-box;height:100%;display:flex;padding:10px 15px;box-shadow:none!important;font-size:11pt;font-weight:700;color:var(--c-text);border-radius:5px 5px 0 0;border:none;border-bottom:2px solid transparent}#filterby a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)}#filterby a.active{color:var(--c-accent);background:var(--c-background);border-bottom:2px solid var(--c-accent)}.filterBarHorizontal select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-radius:3px;outline:none}.filterBarHorizontal select:hover{background:var(--c-hover);color:var(--c-title)}.gradeTableNew{display:flex;flex-direction:column;margin-top:50px}.gradeTableNew .grades_header{position:relative;width:100%;left:0;right:0;top:0;margin-top:1em;border:1px solid var(--c-border);border-bottom:none;border-radius:5px 5px 0 0;background:var(--c-card);display:flex;padding:0 10px;height:fit-content;box-sizing:border-box}.gradeTableNew .grades_header>div{color:var(--c-title);font-weight:700;font-size:11pt!important;margin-top:10px;border-bottom:1px solid var(--c-border);padding-bottom:10px!important;margin-bottom:4px;height:fit-content!important}.gradeTableNew>#grades_wrapper{width:100%;display:block;margin-top:0;border:1px solid var(--c-border);border-top:none;border-radius:0 0 5px 5px;background:var(--c-card);padding:0 10px 10px;box-sizing:border-box}#grades_wrapper>div{border-radius:5px;padding:5px 0;border:none;box-sizing:border-box;height:65px}#grades_wrapper>div:not(.calculatedRow):nth-child(2n){background:var(--gray-1)}#grades_wrapper>div:not(.calculatedRow):hover{background:var(--c-hover)}#grades_wrapper .calculatedRow{box-shadow:none;border:none;box-sizing:border-box;border-left:6px solid var(--gray-4);border-radius:0 5px 5px 0;background:var(--gray-2);background:linear-gradient(90deg,var(--gray-2) 10%,var(--c-card) 90%);margin-bottom:10px}#grades_wrapper .calculatedRow input{box-shadow:none;text-decoration:none!important;border:none;color:var(--c-text)}#grades_wrapper>div>div.gradable{height:100%}#grades_wrapper>div>div.gradable,#grades_wrapper>div>div.gradable>a{color:var(--gray-7);font-weight:700;font-size:14px}#grades_wrapper>div>div.gradable>a{width:fit-content;display:block;color:var(--blue-6);overflow:visible;margin-bottom:8px}#grades_wrapper>div>div.gradable>div{font-size:12px;display:inline;color:var(--c-text)}#grades_wrapper>div>div.gradable>div:first-child:before{display:block;margin-bottom:8px;content:""}#grades_wrapper>div>div.gradable>a+div:before{display:none}#grades_wrapper>div>div.gradable>div{margin-right:8px}#grades_wrapper>div>div.activity span{color:var(--c-text)}#grades_wrapper>div>div.grade span.grade{color:var(--cyan-7)}#grades_wrapper>div>div.grade span.pointsPossible{color:var(--c-text)}#grades_wrapper>div>div img.tooltip-icon{width:18px;content:var(--i-tip)}#grades_wrapper>div>div i.icon-comment:before{width:18px;background:var(--i-comment);background-size:contain!important;background-repeat:no-repeat;background-position:center center;content:".";color:transparent}#grades_wrapper>div>div .tooltip{background:var(--c-card);border:1px solid var(--c-border);box-shadow:none!important;color:var(--c-title);text-shadow:none}#grades_wrapper>div>div .tooltipContainer-left .tooltip:after{text-shadow:none}#submissionReceipts{background:var(--c-card);color:var(--c-text);font-family:sans-serif}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}div.lb-overlay{z-index:2000}body div.lb-wrapper{background-color:var(--c-card)!important}body div.lb-wrapper div.lb-header{color:var(--c-text);background:transparent}body div.lb-wrapper div.lb-content{background:transparent}body div.lb-wrapper div.lb-content .container{color:var(--c-text);border:none}';
  const courseListContentStyles = '#content_listContainer>li{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;margin-bottom:16px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;align-content:center;height:fit-content}#content_listContainer>li:after{display:none}#content_listContainer>li>img{position:relative;top:0;left:0;padding:5px;border-radius:5px;height:32px;width:32px;box-sizing:border-box;margin-right:10px}#content_listContainer>li>img[src*=document],#content_listContainer>li>img[src*=file],#content_listContainer>li>img{content:var(--i-file);background:var(--red-3)}#content_listContainer>li>img[src*=folder]{content:var(--i-folder);background:var(--orange-3)}#content_listContainer>li>img[src*=link]{content:var(--i-link);background:var(--yellow-3)}#content_listContainer>li>div img[alt=链接的项目]{display:none}#content_listContainer>li>div.item{display:inline;flex-basis:calc(100% - 42px);padding:0}#content_listContainer>li>div.item h3 *{text-decoration:none;color:var(--c-title)!important}#content_listContainer>li>div.details{padding-left:0;flex-basis:100%}#content_listContainer>li>div.details>*:not(.alignPanel):first-child{margin-top:10px!important;border-top:1px solid var(--c-border);padding-top:5px!important}#content_listContainer>li>div.details *{background:var(--c-card);border:none;color:var(--c-text)!important;line-height:1.6!important;font-family:inherit!important;font-size:14px!important;text-decoration:none!important;font-style:normal!important}#content_listContainer>li>div.details img{border-radius:5px}#content_listContainer>li>div.details img[alt=文件]{display:none}#content_listContainer>li>div.details *[style*=background]{background:none!important}#content_listContainer>li>div.details span[style*=text-decoration],#content_listContainer>li>div.details span[style*=color],#content_listContainer>li>div.details span[style*=background]{color:var(--c-text)!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#content_listContainer>li>div.details a,#content_listContainer>li>div.details span[style*="color: #0000ff"]{color:var(--blue-5)!important;text-decoration:none}.pku-art-batch-download-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--c-border);border-radius:5px;background:var(--c-card);color:var(--c-text);font-size:13px;cursor:pointer;transition:all .2s ease;white-space:nowrap;flex-shrink:0}.pku-art-batch-download-btn:hover{background:var(--blue-2);border-color:var(--blue-4);color:var(--blue-6)}.pku-art-batch-download-btn svg{width:16px;height:16px;flex-shrink:0;fill:currentColor}.pku-art-download-all-btn{background:var(--c-button)}#pageTitleDiv{display:flex!important;align-items:center}#pageTitleDiv>.pku-art-download-all-btn{margin-left:auto}#content_listContainer>li>div.item{display:flex!important;align-items:center;justify-content:space-between}#content_listContainer>li>div.item h3{flex:1;margin:0}';
  const courseViewAttemptStyles = "#containerdiv{border-radius:5px;background:var(--c-card);padding:16px;border:1px solid var(--c-border)}#containerdiv h3{padding:0;background:none;margin:0 0 10px;font-size:16px;top:0;color:var(--c-title)}#containerdiv>.stepcontent{background:var(--gray-1);box-sizing:border-box;border-radius:5px;margin-bottom:16px}#containerdiv>.stepcontent .label{color:var(--c-text);border-left:3px solid var(--c-accent);padding-left:6px}#containerdiv>.stepcontent .field{color:var(--c-title)}#containerdiv>.stepcontent li:last-child{padding-bottom:0;margin-bottom:0}#containerdiv>.columnStep>div{background:var(--gray-1);padding:5px;box-sizing:border-box;border-radius:5px;margin-bottom:16px}#containerdiv>.columnStep .attachments tr:first-child{border:none}#containerdiv>.columnStep .attachments tr:first-child *{color:var(--c-title);font-weight:700}#containerdiv>.columnStep .attachments tr:not(:first-child){border-top:1px solid var(--c-border)}#containerdiv>.columnStep .attachments tr:not(:first-child) *{padding-top:5px;padding-bottom:5px;color:var(--c-text)}#containerdiv>.iconlegend a{background:var(--c-label);border:1px solid var(--c-border);border-radius:5px;color:var(--c-text);box-shadow:none}#containerdiv>.backLink a{border-radius:5px 0;background:var(--c-card);box-shadow:none;color:var(--c-text)}#containerdiv>.backLink a:hover{background:var(--c-hover);color:var(--c-primary)}";
  const courseToolFrameStyles = '.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane,.contentPane{background-color:var(--c-background)}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border)}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:absolute;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,#content,#containerdiv,#containerdiv>div,#iframe_wrap{height:fit-content!important}#globalNavPageContentArea{height:calc(100vh - 60px)!important;top:0}nav.navigationPane{height:100%}#side_nav:after{content:"PKU Art @ Arthals";display:block;background-color:var(--c-sidebar);position:absolute;bottom:20px;left:50%;transform:translate(-50%);color:var(--c-text);height:20px;z-index:99999;opacity:.3;visibility:visible!important}.locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none}#pageTitleDiv{margin:0!important}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}#globalNavPageNavArea .bouncer *{vertical-align:middle;font-weight:700!important;overflow:visible;border:none}#globalNavPageNavArea a{margin:0}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,#content{background:var(--c-background)}#side_nav{background:var(--c-sidebar);border-right:1px solid var(--c-border);width:min(25%,300px)!important;padding:1em}#side_nav:before{content:"工具";display:block;width:100%;font-size:19px;text-align:left;color:var(--c-title);font-weight:700;padding:7px 18px 0}#side_nav #mybbListTools{display:flex;flex-direction:column;box-sizing:border-box;width:100%;padding:0 18px;margin-top:0}#side_nav #mybbListTools:before{z-index:1;content:"";color:transparent;visibility:visible;display:block;height:10px;position:relative;top:5px;width:60px;border-radius:50px;box-sizing:border-box;background-color:var(--c-accent);margin-bottom:21px}#side_nav #mybbListTools li{display:none;border:none;border-left:6px solid transparent}#side_nav #mybbListTools li[id*=Alerts],#side_nav #mybbListTools li[id*=MyGrades],#side_nav #mybbListTools li[id*=calendar]{display:block}#side_nav #mybbListTools li *{background-color:transparent;box-shadow:none;outline:none;text-decoration:none}#side_nav #mybbListTools li.active{border-left:6px solid var(--c-accent)}#side_nav #mybbListTools li span.menu-icon{padding-left:50px;border-radius:5px;display:flex;justify-content:left;flex-direction:row;justify-items:flex-start;align-items:center;text-decoration:none!important}#side_nav #mybbListTools li.active span.menu-icon{border-radius:0 5px 5px 0}#side_nav #mybbListTools li[id*=Alerts] span.menu-icon{background:var(--i-sandclock);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=Alerts] span.menu-icon:after{content:"禁止摸鱼";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li[id*=MyGrades] span.menu-icon{background:var(--i-clover);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=MyGrades] span.menu-icon:after{content:"绩点高高";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li[id*=calendar] span.menu-icon{background:var(--i-calendar);background-repeat:no-repeat;background-size:25px 25px;background-position:10px;transition:all ease-in-out .15s}#side_nav #mybbListTools li[id*=calendar] span.menu-icon:after{content:"晨钟暮鼓";color:var(--c-text);display:block;font-size:16px}#side_nav #mybbListTools li span.menu-icon:hover:after{color:var(--c-accent)}#side_nav #mybbListTools li span.menu-icon:hover{background-color:var(--c-hover)!important}#side_nav #mybbListTools li[id*=Alerts] img{display:none}#iframe_wrap{margin-left:min(25%,300px);position:relative;left:0;box-shadow:none;border:none;display:flex;align-items:center;justify-content:center;height:100%;padding-top:calc(10vh - 30px)}#iframe_wrap iframe{width:min(100%,1200px);height:80vh!important;border-radius:5px;border:1px solid var(--c-border);padding:5px;background:var(--c-card)}';
  const courseToolAlertStyles = 'html,body,#outer_left_stream_alerts{background:var(--c-card)!important}*{box-shadow:none!important}html,.locationPane,#contentPanel{padding:0;height:fit-content}#streamHeader_alerts,#streamHeader_alerts *{background:var(--c-card);text-shadow:none}#settingsContainer_alerts,#outer_left_stream_alerts{border:none}#settingsContainer_alerts{background:var(--c-card);border:1px solid var(--c-border);margin:10px}#settingsContainer_alerts *{color:var(--c-text)}#settingsContainer_alerts .streamSettingHelpLinks{border-top:1px solid var(--c-border)}#streamSettingButtons a{color:var(--cyan-5);border:none;border-radius:3px;font-size:12px;background:var(--c-label)}#streamSettingButtons a:hover{background:var(--cyan-2);color:var(--cyan-7)}#streamHeader_alerts{padding-bottom:0;height:100%;border:none}#streamHeader_alerts span.current-page,#streamHeader_alerts span.icon{display:none}#filter_by_alerts button{color:var(--c-text);border:1px solid var(--c-border);border-radius:.2rem}#filter_by_alerts button:hover{background:var(--c-hover);color:var(--c-accent)}#streamHeader_alerts .title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}#streamHeader_alerts li{padding:0}#streamHeader_alerts a[id*=filter_type_all]{background:var(--c-label);border:1px solid var(--c-border)}#streamHeader_alerts h5{color:var(--c-title);font-weight:700}#streamHeader_alerts a{color:var(--c-text);line-height:1.6;text-decoration:none;border-radius:0;border:none;border-left:4px solid transparent}#streamHeader_alerts a.active{box-shadow:none;border-left:4px solid var(--c-accent)}#streamHeader_alerts a:hover{color:var(--red-5);background:var(--c-hover)}#stream_alerts #stream_currentFilterText_alerts,#stream_alerts .left_stream_wrapper{box-shadow:none;background:var(--c-card);border:none}#stream_currentFilterText_alerts{color:var(--c-text);font-weight:700;text-shadow:none}#left_stream_alerts>div,#left_stream_alerts>div *{color:var(--c-text);font-style:normal;font-family:sans-serif!important;border-radius:5px;border:none}#left_stream_alerts>div.stream_new_entry{background:inherit}#left_stream_alerts>div.stream_new_entry .stream_context:before{content:"New";color:var(--c-accent);font-size:12px;font-weight:700;padding:0 5px;background:var(--c-label);border-radius:5px;margin-right:5px}#left_stream_alerts>div:nth-child(2n){background:var(--gray-1)}#left_stream_alerts>div:hover{background:var(--c-card-hover)!important;transition:all ease-in .2s}#left_stream_alerts>div span.stream_area_name{color:var(--c-secondary)}#left_stream_alerts>div span.inlineContextMenu>a{color:var(--cyan-5);border:none;border-radius:3px;font-size:12px}#left_stream_alerts>div span.inlineContextMenu>a:hover{background:var(--cyan-2);color:var(--cyan-7)}#left_stream_alerts>div div.stream_details *{font-size:14px;line-height:1em;max-width:100%}span.open_stream_settings{background:var(--i-setting)!important;background-repeat:no-repeat;background-position:center center}.streamError{display:none}';
  const courseToolGradeStyles = ".stream_pages{display:flex;justify-content:space-between;width:100%}*{background:var(--c-card);box-shadow:none!important;outline:none!important;font-style:normal!important;font-family:sans-serif!important}.stream_page_left,.stream_right,html,body{border:none!important;background:var(--c-card)!important}.stream_page_left{width:400px!important;flex-basis:400px;box-sizing:border-box}.stream_header>h1 span.current-page,.stream_header span.icon{display:none}.stream_header>h1 span.title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}.stream_list_filter{display:flex;flex-wrap:wrap;height:fit-content}.stream_list_filter>li{background:transparent!important}.stream_list_filter>li:nth-child(1),.stream_list_filter>li:nth-child(2){flex-basis:50%;margin-bottom:10px;padding:10px 8px 5px;box-sizing:border-box;border-bottom:1px solid var(--c-border)}.stream_list_filter>li:nth-child(1) a,.stream_list_filter>li:nth-child(2) a{background:transparent;color:var(--c-text);border-bottom:2px solid transparent;transition:all ease-in-out .15s}.stream_list_filter>li:nth-child(1) a:hover,.stream_list_filter>li:nth-child(2) a:hover{border-bottom:2px solid var(--c-accent);background:var(--c-hover);border-radius:5px 5px 0 0}.stream_list_filter>li.stream_filterlinks_divider{border:none}.stream_list_filter>li a:hover{color:var(--c-accent)!important}.stream_list_filter>li:nth-child(4) button,.stream_list_filter>li:nth-child(5) button,.stream_list_filter>li:nth-child(6) button{color:var(--c-text);border-bottom:2px solid transparent;background:transparent;border:none!important}.stream_list_filter>li button.active{background:var(--c-hover)}.stream_header{border:none}.stream_dynamic_filters{background-color:var(--c-card)!important;border:1px solid var(--c-border);padding:10px;box-shadow:var(--c-box-shadow)!important}.stream_dynamic_filters h5{color:var(--c-title);font-size:15px!important;font-weight:700}.stream_dynamic_filters li a{color:var(--c-text);border-radius:3px;margin-bottom:2px}.stream_dynamic_filters li a:hover{background:var(--c-hover)}.stream_left>div{border:none!important;border-radius:6px}.stream_left>div:last-child{margin-bottom:50px}.stream_left>div *{background:transparent}.stream_left>div.active_stream_item{background:var(--c-hover)}.stream_left>div .grade-value{color:var(--c-secondary)}.stream_left>div.active_stream_item .grade-value{color:var(--cyan-7)}.stream_left>div .stream_context{color:var(--c-text)!important;font-size:14px!important}.stream_left>div .stream_area_name{background-color:var(--c-secondary);border-radius:100px;padding:0 5px;color:var(--c-card)}.stream_left>div.active_stream_item .stream_area_name{background-color:var(--cyan-7)}.stream_pages>.stream_settings{position:absolute;display:none!important}.stream_pages:after{position:absolute;display:none!important}iframe.stream_right{width:calc(100% - 420px)!important;flex-basis:calc(100% - 420px);padding:5px!important;box-sizing:border-box}.streamError{display:none}";
  const courseToolGradeClassStyles = '*{box-shadow:none!important;text-shadow:none!important}body,html,.container{border:none;background:var(--c-card)!important}#streamDetailHeaderRight>span{display:none}#streamDetailHeaderRight h2.streamHeader a{color:var(--cyan-8);border:none}#streamDetailHeaderRight{height:fit-content;min-height:0;border-bottom:none;padding-bottom:0;margin-bottom:10px}.filterBarHorizontal{background:var(--c-card);border-bottom:1px solid var(--c-border)}#filterby{display:inline-flex;height:100%;padding-top:0;padding-bottom:0}#filterby>li{height:100%;position:relative}#filterby a{box-sizing:border-box;height:100%;display:flex;padding:10px 15px;box-shadow:none!important;font-size:11pt;font-weight:700;color:var(--c-text);border-radius:5px 5px 0 0;border:none;border-bottom:2px solid transparent}#filterby a:hover{background:var(--c-hover)!important;border-bottom:2px solid var(--c-secondary)}#filterby a.active{color:var(--c-secondary);background:var(--c-card);border-bottom:2px solid var(--c-secondary)}.filterBarHorizontal select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-radius:5px;outline:none;padding:3px 10px}.filterBarHorizontal select:hover{background:var(--c-hover)!important;color:var(--c-title)!important}.gradeTableNew .grades_header{border-bottom:none;border-radius:5px 5px 0 0;background:var(--c-card);display:flex;padding:0 10px;height:fit-content;box-sizing:border-box}.gradeTableNew .grades_header .cell.grade{font-size:12px}.gradeTableNew .grades_header>div{color:var(--c-title);font-weight:700;font-size:11pt!important;font-family:sans-serif;margin-top:10px;border-bottom:1px solid var(--c-border);padding-bottom:10px!important;margin-bottom:4px;height:fit-content!important}.gradeTableNew #grades_wrapper{margin-top:90px!important}#grades_wrapper>div{border-radius:5px;padding:5px 0;border:none;box-sizing:border-box;height:65px;transition:all ease-in .2s}#grades_wrapper>div:last-child{margin-bottom:50px}#grades_wrapper>div:not(.calculatedRow):nth-child(2n){background:var(--gray-1)}#grades_wrapper>div:not(.calculatedRow):hover{background:var(--c-card-hover)}#grades_wrapper>div:first-child{margin-top:10px}#grades_wrapper .calculatedRow{box-shadow:none;border:none;box-sizing:border-box;border-left:6px solid var(--gray-4);border-radius:0 5px 5px 0;background:var(--gray-2);background:linear-gradient(90deg,var(--gray-2) 10%,var(--c-card) 90%);margin-bottom:10px}#grades_wrapper .calculatedRow input{box-shadow:none;text-decoration:none!important;border:none;color:var(--c-text)}#grades_wrapper>div>div.gradable{height:100%}#grades_wrapper>div>div.gradable,#grades_wrapper>div>div.gradable>a{color:var(--gray-7);font-weight:700;font-size:14px}#grades_wrapper>div>div.gradable>a{width:fit-content;display:block;color:var(--cyan-6);overflow:visible;margin-bottom:8px}#grades_wrapper>div>div.gradable>div{font-size:12px;display:inline;color:var(--c-text)}#grades_wrapper>div>div.gradable>div:first-child:before{display:block;margin-bottom:8px;content:""}#grades_wrapper>div>div.gradable>a+div:before{display:none}#grades_wrapper>div>div.gradable>div{margin-right:8px}#grades_wrapper>div>div.activity span{color:var(--c-text)}#grades_wrapper>div>div.grade span.grade{color:var(--cyan-7)}#grades_wrapper>div>div.grade span.pointsPossible{color:var(--c-text)}#grades_wrapper>div>div img.tooltip-icon{width:18px;content:var(--i-tip)}#grades_wrapper>div>div i.icon-comment:before{width:18px;background:var(--i-comment);background-size:contain!important;background-repeat:no-repeat;background-position:center center;content:".";color:transparent}#grades_wrapper>div>div .tooltip{background:var(--c-card);border:1px solid var(--c-border);box-shadow:none!important;color:var(--c-title);text-shadow:none}#grades_wrapper>div>div .tooltipContainer-left .tooltip:after{text-shadow:none}#submissionReceipts{background:var(--c-card);color:var(--c-text);font-family:sans-serif}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}div.lb-overlay{z-index:2000}body div.lb-wrapper{background-color:var(--c-card)!important}body div.lb-wrapper div.lb-header{color:var(--c-text);background:transparent}body div.lb-wrapper div.lb-content{background:transparent}body div.lb-wrapper div.lb-content .container{color:var(--c-text);border:none}';
  const courseToolGradeItemStyles = "*{box-shadow:none!important;text-shadow:none!important}body,html,.container{border:none;background:var(--c-card)!important}#streamDetailHeaderRight>span{display:none}#streamDetailHeaderRight h2.streamHeader a{color:var(--cyan-8);border:none}#streamDetailHeaderRight{height:fit-content;min-height:0;border-bottom:none;padding-bottom:0;margin-bottom:10px}.gb_feedback{border-left:6px solid var(--cyan-2);height:fit-content;padding:5px 10px;margin-bottom:10px}.gb_feedback:before{display:none}.gb_feedback p{font-family:sans-serif;font-size:14px;color:var(--c-text);line-height:1.6}.gb_feedback p:last-child{margin-bottom:0}.gradeTable *{background:var(--c-card);border:none!important;color:var(--c-text)!important}.gradeTable .gradeCellGrade{color:var(--cyan-7)!important}.gradesByDate input[type=button]{color:var(--c-text)!important;padding:3px 8px;text-decoration:none;border-radius:3px}.gradesByDate input[type=button]:hover{background:var(--cyan-2)}#grades_wrapper>div{position:relative}#grades_wrapper .itemStats{position:absolute;top:0;right:0;padding:5px}";
  const courseFileEmbedStyles = "ul#content_listContainer{background:var(--cyan-1)}ul#content_listContainer>li:hover{background:var(--cyan-1);border:none;border-left:6px solid var(--cyan-6)}ul#content_listContainer>li{border-left:6px solid var(--cyan-6);border-top:none;border-bottom:none;padding:5px 10px;color:var(--c-text);display:flex;justify-content:center;align-items:center;flex-direction:column;transition:none;margin:0}ul#content_listContainer>li>*{padding:0;width:100%}ul#content_listContainer>li a{color:var(--cyan-6)}#pageTitleBar span.contextMenuContainer{display:none!important}embed{margin-top:50px;position:relative;height:min(1000px,80vh)!important;background:var(--c-card);border-radius:10px;border:1px solid var(--c-border);padding:10px;box-sizing:border-box}";
  const courseAssignmentUploadStyles = "#containerdiv{border:none}.container>form{background:var(--c-card);border-radius:5px;border:1px solid var(--c-border);padding:10px}.container>form *{background:var(--c-card);color:var(--c-text);font-style:normal;font-family:sans-serif}.container>form #instructions *[style*=color]{color:var(--c-text)!important;background:transparent!important;background:linear-gradient(180deg,transparent 90%,var(--red-2) 90%)!important}#dataCollectionContainer,#dataCollectionContainer>div{background:var(--c-card)}#dataCollectionContainer>div[id^=step]{border-top:none;background:var(--c-card)!important;padding-bottom:16px}#dataCollectionContainer>div[id^=step]>.steptitle{position:relative;top:0;margin:0 0 10px;padding:0;font-size:18px;color:var(--c-title)}div[id*=stepcontent]{border-bottom:1px solid var(--c-border);background:var(--c-card)!important}#metadata div.metaSection{border:none;border-left:6px solid var(--cyan-6);background:var(--cyan-2)!important}#metadata div[class*=meta],#metadata div[class*=meta] span.metaSubInfo{background:transparent}#metadata div.metaField{color:var(--cyan-8);font-size:16px}form[name=uploadAssignmentForm] a#submissionLink,form[name=uploadAssignmentForm] input[type=file],form[name=uploadAssignmentForm] input[type=button]{border-radius:5px;background:var(--c-button);box-shadow:none;color:var(--c-text)}form[name=uploadAssignmentForm] a#submissionLink:hover,form[name=uploadAssignmentForm] input[type=file]:hover,form[name=uploadAssignmentForm] input[type=button]:hover{background:var(--gray-2);color:var(--c-title);font-weight:700}form[name=uploadAssignmentForm] input[type=submit].submit{border-radius:5px;background:var(--c-primary-light);box-shadow:none;color:var(--c-primary)}form[name=uploadAssignmentForm] input[type=submit].submit:hover{background:var(--blue-2);color:var(--blue-7);font-weight:700}form[name=uploadAssignmentForm] ol[role=presentation]>li{display:flex;justify-content:space-between;align-items:flex-start;padding-left:20px;border:2px solid transparent;margin:10px}form[name=uploadAssignmentForm] ol[role=presentation]>li div.label{width:40px;min-width:none;max-width:none}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone{border:2px dashed var(--c-border)!important}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone.hover{background:var(--c-hover)!important}form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone div,form[name=uploadAssignmentForm] ol[role=presentation]>li.dropzone label{background:transparent}form[name=uploadAssignmentForm] #newFile_table *{border-color:var(--c-border)!important}form[name=uploadAssignmentForm] #newFile_table img{display:none}form[name=uploadAssignmentForm] li#newFile_listHtmlDiv{margin-top:30px!important}form[name=uploadAssignmentForm] table.mceLayout{border:1px solid var(--c-border)!important;border-radius:5px;padding:5px}form[name=uploadAssignmentForm] table.mceLayout *{border:none!important;background:transparent!important;box-shadow:none!important}form[name=uploadAssignmentForm] .vtbehelp{margin-bottom:5px}form[name=uploadAssignmentForm] .mceFirst:hover,form[name=uploadAssignmentForm] .mceLast:hover{background:transparent}form[name=uploadAssignmentForm] .defaultSkin .mceSplitButton span.mceAction{background-image:var(--i-check);background-repeat:no-repeat;background-position:center center;background-size:contain}form[name=uploadAssignmentForm] div[role=listbox]{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;padding:5px;box-shadow:var(--c-box-shadow)}form[name=uploadAssignmentForm] div[role=listbox] *{border:none!important}form[name=uploadAssignmentForm] .defaultSkin .mceMenu{top:0;left:0;position:relative}.defaultSkin .mceMenu table,.defaultSkin .mceMenuItemTitle a{background:var(--c-card)}.defaultSkin .mceMenu .mceMenuItemEnabled a:hover,.defaultSkin .mceMenu .mceMenuItemActive{background:var(--c-hover)}@media screen and (prefers-color-scheme:dark){.tox.tox-tinymce{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}.tox.tox-tinymce svg{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}}#inlineReceipt_good{background:var(--c-accent)}#inlineGrader{border:1px solid var(--c-border);border-radius:5px;background:var(--c-card)}#inlineGrader *{color:var(--c-text);border:none;box-shadow:none;background:transparent;text-decoration:none;line-height:1.6}#inlineGrader .fileTile{background:var(--c-card)!important}#inlineGrader .fileTile>img{content:var(--i-file);width:50px;height:50px}#inlineGrader .fileTile>h5{color:var(--c-title)}#inlineGrader .fileTile>a{background:var(--c-button);border-radius:5px}#inlineGrader .fileTile>a:hover{background:var(--cyan-2);color:var(--c-title);font-weight:700}#inlineGrader #gradingPanel{border-left:1px solid var(--c-border);padding:15px 0}#inlineGrader #gradingPanel .gradingPanelHeader{border-left:6px solid var(--cyan-5);height:auto}#inlineGrader #gradingPanel .gradingPanelHeader h2{margin:5px 0}#inlineGrader #gradingPanel .gradingPanelHeader span{color:var(--c-title);font-weight:700;font-size:16px}#inlineGrader .resizeControls{top:17px;border-radius:5px}#inlineGrader .resizeControls a{border-radius:5px}#inlineGrader .resizeControls a:hover{background:var(--c-hover)}#inlineGrader .resizeControls #maximizer_btn{display:none}#inlineGrader #gradingPanel h3,#inlineGrader #gradingPanel h4,#inlineGrader #gradingPanel span.mainLabel{color:var(--c-title);font-weight:700;font-size:14px}#inlineGrader #gradingPanel .attemptHeader{background:var(--cyan-2)!important}#inlineGrader #gradingPanel div.attemptHeaderLabel{margin-left:15px}#inlineGrader #gradingPanel .attemptContent .segment{margin:35px 0}#inlineGrader #gradingPanel .genericFile{background-image:var(--i-file);background-repeat:no-repeat;background-size:15px;background-position:5px center}#inlineGrader #gradingPanel .filesList .dwnldBtn{background-image:var(--i-download);background-repeat:no-repeat;background-size:15px;background-position:center center}#inlineGrader #gradingPanel .backLink a{background:var(--c-card);border-radius:5px 0}#inlineGrader #gradingPanel .backLink a:hover{background:var(--c-hover)}#inlineGrader div.contentDetailsHeader{margin-top:15px}";
  const courseGlobalPageStyles = "body{position:relative}.brandingImgWrap,#appTabList>tbody>tr,.hideoff,#quick_links_wrap,#global-avatar,#global-toggle-img{display:none}#global-nav-link>*{display:none}#global-nav-link,#global-nav-link:hover,#global-nav-link:focus{color:transparent;overflow:hidden;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-remind)!important;background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;outline:none}.global-nav-bar a.logout-link,.global-nav-bar a.logout-link:hover,.global-nav-bar a.logout-link:focus{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit)!important;background-size:80%;background-repeat:no-repeat;background-position:center center}.container,.locationPane,.contentPane{background-color:var(--c-background)}.tabWrapper-right,#globalNavPageNavArea,#topTabs{background-color:var(--c-navbar)}#globalNavPageNavArea{padding:1em 140px 1em 0;height:60px;top:0!important;box-sizing:border-box;display:flex;text-align:right;justify-content:flex-end;flex-direction:row;background-image:var(--i-logo);background-repeat:no-repeat;background-size:auto 30px;background-position:2em center;border-bottom:1px solid var(--c-border);position:fixed;width:100%;z-index:20}.tabWrapper-right,.bouncer[role=presentation]{width:fit-content}.global-nav-bar-wrap{position:fixed;z-index:30;right:50px;display:flex;justify-content:flex-end;flex-direction:row-reverse;background-color:var(--c-navbar);width:100px;height:60px;box-sizing:border-box;margin:0;padding:0;border-bottom:1px solid var(--c-border)}.global-nav-bar{margin:0;float:none;height:60px;display:flex;flex-direction:row-reverse;justify-content:center;align-items:center}.global-nav-bar:not(:first-child){margin:0 5px}table.bouncer,.appTabs td.active,.appTabs a:hover span,.appTabs a:focus span{border:none}.topTabs .tabWrapper-right{height:fit-content;padding:0}#globalNavPageNavArea a,#globalNavPageNavArea td{padding:0!important}#breadcrumbs{padding:1.2em 1em 1em;box-sizing:border-box;height:80px;margin-bottom:1em;margin-top:60px;z-index:10;color:var(--c-title);background-color:var(--c-background);display:flex;text-align:center;justify-content:center;border:none}#breadcrumbs .coursePath{padding:0;margin:0}#breadcrumbs span{font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}#globalNavPageContentArea{margin-top:60px}#globalNavPageContentArea,#globalNavPageContentArea .locationPane,#contentPanel,div#content,div.container{height:fit-content!important}.locationPane{background-color:var(--c-background)}.contentPane .shadow{border:none}#pageTitleDiv{margin:0!important}#content{width:min(100%,1200px);margin:0 auto}#contentPanel{-webkit-animation:fadeInUpStablePixel .7s cubic-bezier(.215,.61,.355,1) both;animation-delay:.5s;animation:fadeInUpStablePixel .7s cubic-bezier(.215,.61,.355,1) both}.localViewToggle{display:none}#pageTitleHeader{color:var(--blue-7)!important;background-color:var(--blue-2);padding:.3em 1em;border-radius:5px;font-size:20px!important}#pageTitleHeader *{color:var(--blue-7)!important}#pageTitleText{font-weight:700}#vertical_container,#bottomButtons{display:none}#global-nav-tools{z-index:9999;height:inherit!important}#global-nav-flyout{box-shadow:none;border-radius:5px;width:40px!important;height:150px!important;transform:translateY(34px);background-color:transparent}#global-nav-tools{background-color:transparent}#global-list-tools{margin:0;box-shadow:var(--c-box-shadow);border:1px solid var(--c-border);padding:5px;border-radius:5px;background-color:var(--c-card)}#global-list-tools>.overview,#global-list-tools>.stream,#global-list-tools>.risktracker{display:none}#global-list-tools>.alerts,#global-list-tools>.grade,#global-list-tools>.calendar{background-color:var(--c-card)}#global-list-tools>.alerts>a:hover,#global-list-tools>.grades>a:hover,#global-list-tools>.calendar>a:hover{background-color:var(--c-hover)}#global-list-tools>.alerts>a{border-radius:5px;background:var(--i-alarm);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.grades>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.calendar>a{border-radius:5px;background:var(--i-calendar-tab);background-size:60%;background-repeat:no-repeat;background-position:center center;margin:0 auto}#global-list-tools>.more-link>a{border-radius:5px;background:var(--i-idcard);background-size:60%;background-repeat:no-repeat;background-position:center center}#global-more-tools{display:none!important}.mybb-tools li a{opacity:1;background-color:var(--c-card)}.mybb-tools li a:focus,.mybb-tools li a:focus img{outline:none}";
  const courseGlobalAnnouncementStyles = ".announcementFilter,.announcementList{margin:0}#containerdiv{margin-top:0;padding-top:0}.announcementFilter{display:flex;align-items:center;justify-content:center;border-bottom:none;margin-bottom:10px}.announcementFilter select#searchSelectId{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--c-card);color:var(--c-text);border:1px solid var(--c-border);border-right:none;border-radius:5px 0 0 5px;outline:none;padding:3px 10px;box-sizing:border-box;height:30px;margin:0}.announcementFilter a.genericButton{background:var(--c-button);color:var(--c-title);border:1px solid var(--c-border);border-left:none;border-radius:0 5px 5px 0;outline:none;padding:3px 10px;box-sizing:border-box;height:30px;box-shadow:none}.announcementFilter a.genericButton:hover{background:var(--cyan-2);color:var(--cyan-6)}";
  const courseVideoPlayStyles = "#content,.container{border:none;width:auto!important}iframe{min-height:100vh;height:fit-content}";
  const courseVideoPlayFrameStyles = 'body{position:relative}html,body,#app{background:var(--c-background)!important}.course-info__wrapper{margin-bottom:0}.course-info__header{display:flex;justify-content:center!important;align-items:center}.course-info__header span{font-weight:700;font-size:18pt;color:var(--c-title);-webkit-animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both;animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1) both}.course-info__wrapper .course-info__main{background:var(--c-card);padding:5px;border-radius:5px;border:1px solid var(--c-border)}.course-info__wrapper .course-info__footer{display:grid;width:min(100%,960px);grid-template-columns:repeat(3,minmax(0,1fr));justify-content:center;align-items:center;gap:10px;margin:10px auto;box-sizing:border-box}.course-info__wrapper .course-info__footer.rename-unsupported{grid-template-columns:repeat(2,minmax(0,1fr))}.course-info__wrapper .course-info__footer.hls-download{grid-template-columns:minmax(0,1fr)}.course-info__wrapper .course-info__footer.hls-download:has(#injectMagicLink){grid-template-columns:repeat(2,minmax(0,1fr))}.course-info__wrapper .course-info__footer.hls-download:not(:has(#injectMagicLink))>#injectDownloadButton{width:min(100%,360px);justify-self:center}.course-info__wrapper .course-info__footer button{background:var(--c-tip);border:none;color:var(--c-text);margin-left:0;height:35px;cursor:pointer}#injectDownloadSwitchArea{background:var(--c-tip);color:var(--c-text);padding:8px 16px;border-radius:4px;display:inline-flex;flex-direction:row;justify-content:center;align-items:center;gap:.65rem;line-height:14px;font-size:14px;box-sizing:border-box;border:none;font-weight:700;border-image-width:0;transition:.1s;height:35px!important}#injectDownloadRenameUnsupported{background:var(--c-tip);color:var(--c-text);padding:10px 20px;border-radius:4px;display:inline-flex;flex-direction:row;justify-content:center;align-items:center;gap:.5rem;height:35px;line-height:14px;font-size:14px;box-sizing:border-box;border:none;font-weight:700;grid-column:span 2}#injectDownloadRenameUnsupported .i-warning{display:inline-block;width:16px;height:16px;background-image:var(--i-warning);background-size:100% 100%;background-position:center;background-repeat:no-repeat}#injectDownloadSwitch{display:none}#injectDownloadSwitch:checked+label{background-color:var(--c-text);mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);mask-size:80% 80%;-webkit-mask-size:80% 80%;mask-position:center;-webkit-mask-position:center;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}label[for=injectDownloadSwitch]{display:inline-block;width:16px;height:16px;background:var(--c-tip);border:1px solid var(--c-border);border-radius:4px}label[for=injectDownloadSwitch]:before{content:"";transition:.1s}#injectDownloadButton,#injectCopyDownloadUrlButton,#injectMagicLink{background:var(--c-tip);border:none;color:var(--c-text);margin-left:0;height:35px;font-size:14px;font-weight:700;border-radius:4px;display:flex;align-items:center;justify-content:center;gap:10px;width:100%}#injectDownloadButton .i-download,#injectCopyDownloadUrlButton .i-link,#injectMagicLink .i-magic{width:16px;height:16px;background-size:100% 100%;background-position:center;background-repeat:no-repeat;color:var(--c-text)}#injectDownloadTip{--download-status-color: var(--cyan-6);background:var(--c-card);border:1px solid var(--c-border);color:var(--c-text);padding:14px 16px;border-radius:6px;font-size:14px;box-sizing:border-box;transition:.1s;line-height:1.5;grid-column:1 / -1;width:100%;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;column-gap:16px;row-gap:0}#injectDownloadTip[data-state=success]{--download-status-color: var(--green-6)}#injectDownloadTip[data-state=warning]{--download-status-color: var(--orange-6)}#injectDownloadTip[data-state=error]{--download-status-color: var(--red-6)}#injectDownloadTip[data-state=neutral]{--download-status-color: var(--c-border)}#injectDownloadTipText{display:contents;min-width:0;-webkit-user-select:text;user-select:text}.inject-download-status-title{display:flex;align-items:center;gap:9px;color:var(--c-title);font-size:14px;font-weight:700;grid-column:1;grid-row:1}.inject-download-status-title:before{width:8px;height:8px;border-radius:50%;background:var(--download-status-color);content:"";flex:0 0 auto}#injectDownloadTip[data-state=active] .inject-download-status-title:before{animation:pku-art-download-pulse 1.5s ease-in-out infinite}.inject-download-status-detail{margin-top:2px;opacity:.78;overflow-wrap:anywhere;grid-column:1;grid-row:2}.inject-download-progress{width:100%;height:6px;margin-top:12px;overflow:hidden;border-radius:999px;background:var(--c-tip);grid-column:1 / -1}.inject-download-progress>span{display:block;height:100%;border-radius:inherit;background:var(--download-status-color);transition:width .2s ease}.inject-download-metrics{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:7px;font-size:12px;font-variant-numeric:tabular-nums;opacity:.82;grid-column:1 / -1}.inject-download-info{display:grid;gap:2px;margin-top:10px;padding-top:8px;border-top:1px solid var(--c-border);font-size:12px;font-weight:400;grid-column:1 / -1}.inject-download-info-row{display:grid;grid-template-columns:42px minmax(0,1fr);gap:8px;align-items:baseline}.inject-download-info-label{opacity:.62}.inject-download-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.inject-download-notice{margin-top:10px;padding:8px 10px;border-radius:4px;background:var(--c-tip);font-size:12px;font-weight:400;line-height:1.5;opacity:.88;grid-column:1 / -1}#injectDownloadTip a{color:var(--c-accent);text-decoration:underline}#injectDownloadTipActions{display:flex;flex-direction:row;gap:10px;flex-shrink:0;align-self:start;grid-column:2;grid-row:1 / span 2;justify-self:end}#injectDownloadTipActions button{background:var(--c-card);border:1px solid var(--c-border);color:var(--c-text);height:32px;padding:0 12px;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;transition:.1s;white-space:nowrap;display:flex;align-items:center;gap:6px}#injectDownloadTipActions button svg{width:14px;height:14px;flex-shrink:0}#injectDownloadTipActions button:hover{background:var(--cyan-2);color:var(--cyan-6);border-color:var(--cyan-6)}#injectDownloadTipActions button:disabled{opacity:.5;cursor:not-allowed}#injectDownloadTipActions button:disabled:hover{background:var(--c-card);color:var(--c-text);border-color:var(--c-border)}#injectDownloadButton:hover,#injectCopyDownloadUrlButton:hover,#injectMagicLink:hover,#injectDownloadSwitchArea:hover{background:var(--cyan-2);color:var(--cyan-6);cursor:pointer}#injectMagicLink:hover *,#injectDownloadButton:hover *,#injectCopyDownloadUrlButton:hover *,#injectDownloadSwitchArea:hover *{background:var(--cyan-2);color:var(--cyan-6);font-weight:700;transition:.1s}#injectDownloadSwitchArea:has(#injectDownloadSwitch:checked):hover label[for=injectDownloadSwitch]{background-color:var(--cyan-6)}#injectDownloadSwitchArea:hover label[for=injectDownloadSwitch]{border-color:var(--cyan-6)}#injectDownloadUrlInput:hover::placeholder,#injectMagicLink:hover::placeholder{color:var(--cyan-6);transition:.1s}@media(max-width:680px){.course-info__wrapper .course-info__footer,.course-info__wrapper .course-info__footer.rename-unsupported{grid-template-columns:minmax(0,1fr)}.course-info__wrapper .course-info__footer.hls-download:has(#injectMagicLink){grid-template-columns:repeat(2,minmax(0,1fr))}#injectDownloadRenameUnsupported,#injectDownloadTip{grid-column:1 / -1}#injectDownloadTip{grid-template-columns:minmax(0,1fr)}#injectDownloadTipActions{grid-column:1;grid-row:3;justify-content:flex-end;justify-self:end;margin-top:10px}}@keyframes pku-art-download-pulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.82)}}';
  const courseTaskStyles = "";
  const courseDiscussionStyles = `*[var=nameFormatEnum] #breadcrumbs{margin-top:0}#containerdiv form table.inventory{background-color:var(--c-card)}#conferenceFormId th,#conferenceFormId td{vertical-align:middle!important}#conferenceFormId th{background-color:var(--c-card)}.inventory>tbody tr{background:var(--c-card)!important}.inventory>tbody tr td,.inventory>tbody tr th,.inventory>thead tr th,.splashTable thead tr th{border-color:var(--c-border)!important}table.inventory>tbody tr:last-child td,table.inventory>tbody tr:last-child th{border-bottom:1px solid var(--c-border)!important}.inventory>tbody .gray td,.inventory>tbody .gray th{background-color:var(--c-hover)!important}table.inventory a.cmimg{display:none}table.inventory .vtbegenerated tbody tr td,table.inventory .vtbegenerated tbody tr th,table.reorderable .vtbegenerated tbody tr td,table.reorderable .vtbegenerated tbody tr th,table.inventory .vtbegenerated tbody tr:hover td,table.inventory .vtbegenerated tbody tr:hover th,table.reorderable .vtbegenerated tbody tr:hover td,table.reorderable .vtbegenerated tbody tr:hover th,table.reorderable .vtbegenerated tbody tr:hover{background:transparent!important}table.inventory .gray .vtbegenerated tbody tr td,table.inventory .gray .vtbegenerated tbody tr th,table.reorderable .gray .vtbegenerated tbody tr td,table.reorderable .gray .vtbegenerated tbody tr th,table.inventory .gray .vtbegenerated tbody tr:hover td,table.inventory .gray .vtbegenerated tbody tr:hover th,table.reorderable .gray .vtbegenerated tbody tr:hover td,table.reorderable .gray .vtbegenerated tbody tr:hover th,table.reorderable .gray .vtbegenerated tbody tr:hover{background-color:var(--c-hover)!important}table.inventory .vtbegenerated tbody tr:last-child td{border-bottom:none!important}table.inventory .unread-count:not(.none){color:#fff!important;background:#e44c47!important}table.inventory .unread-count.none{background:transparent!important;color:var(--c-text)!important}#containerdiv.container{border:1px solid var(--c-border)!important;background-color:var(--c-card)}.inventory>thead tr th.sorted,th.sorted,.splashTable thead tr th.sorted{background-color:var(--c-card)!important;color:var(--c-text)!important}.inventory>thead tr th.sorted a{color:var(--c-text)!important}.genericButton,.genericButtonImg,input[type=submit].genericButton,.browse,.browseIcon,.rumble h3+ul>li>a,.rumble_top h3+ul>li>a,.paging a,.itemHeaderControl>a,.actionMenuButton,.button-3,.button-3-img,.button-4,.button-4-img,#toolsSearchBox+.button-4,.treeContainer .tree li a.button-4-img,.rumble a,.rumble_top a,.rumble .abutton,.rumble_top .abutton{background:var(--c-button)!important;box-shadow:none!important}.nav .sub ul,.nav.gb_currView .sub>ul,.menumini ul,.quickAddPal,.keyboardAccess,span.currentTags,.liveArea,.liveArea-slim,.previewArea,.jumptopage,.panelTabs li.active a.edit,.panelTabs li.active a.edit:hover,.panelTabs li.active a.edit:focus,.flyout,.bcContent .flyout,ul.tree li a+img+a:focus,ul.tree li img+img+a:focus,div.treeContainer ul.tree li a.itemActive,#learningUnitToc ul.tree li a.itemActive,ul.tree li a.itemActive,#loginLang ul,.unread-posts,.need-moderation,.unread-replies-to-me-posts{background:var(--c-button)!important;border:1px solid var(--c-border)!important;border-radius:5px}.thread-detail-page .contentBox{background:var(--c-background)}.db-message-wrapper{box-shadow:none;background:var(--c-card);border:1px solid var(--c-border)!important;border-radius:5px}.reply-lvl-0 .message-wrapper-inner,.db-head-message .message-wrapper-inner{background:var(--c-card);border:none!important;box-shadow:none}.db-reply-block,.reply-lvl-0 .messageTemplate{border:none;box-shadow:none;background:var(--c-card)}.db-collapse-control{display:none}.reply-lvl-0 .threadButtons .browse,.threadButtons .browse,.threadButtons .reply{background:var(--c-button)!important;border:1px solid var(--c-border)!important;border-radius:5px!important;width:fit-content;height:100%;display:block;margin:0}.threadButtons{display:flex!important;flex-direction:row;width:fit-content;gap:5px}.db-message .profileCardAvatarThumb img{height:64px;width:64px;border:1px solid var(--c-border)!important;display:inline-block;padding:1px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:10px;box-shadow:none;background:transparent}.db-message-wrapper .profileCardAvatarThumb{color:var(--c-title)!important}.profileCardAvatarThumb img{box-shadow:none;background:transparent;border:1px solid var(--c-border)!important}img[src="/images/ci/ng/default_profile_avatar.svg"]{content:var(--i-student)!important}.msg-fringe.db-message-fringe-show{display:none}#inlinePost{margin-top:30px}.steptitle,div[id*=step],div[id*=Step],#dataCollectionContainer,.container{background:var(--c-card)}div[id*=stepcontent]{background:var(--c-card)!important}input[type=text],input[type=password],select{border:1px solid var(--c-border)!important;background:var(--c-card)!important}@media screen and (prefers-color-scheme:dark){.tox.tox-tinymce{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}.tox.tox-tinymce svg{-webkit-filter:invert(100%) hue-rotate(180deg);filter:invert(100%) hue-rotate(180deg)}}.taskbuttondiv_wrapper{background:var(--c-card)}#bottom_submitButtonRow{display:flex;gap:10px}form[id=inlineMessageForm] a#submissionLink,form[id=inlineMessageForm] input[type=file],form[id=inlineMessageForm] input[type=button]{border-radius:5px;background:var(--c-button);box-shadow:none;color:var(--c-text);font-size:12px}form[id=inlineMessageForm] a#submissionLink:hover,form[id=inlineMessageForm] input[type=file]:hover,form[id=inlineMessageForm] input[type=button]:hover{background:var(--gray-2);color:var(--c-title);font-weight:700}form[id=inlineMessageForm] input[type=submit].submit{border-radius:5px;background:var(--c-primary-light);box-shadow:none;color:var(--c-primary);font-size:12px}form[id=inlineMessageForm] input[type=submit].submit:hover{background:var(--blue-2);color:var(--blue-7);font-weight:700}.nav .sub ul li a,.cmdiv a,.menumini a,#loginLang ul li a{color:var(--c-text)}div[id*=step],.submittitle,#infoStep,#taskStatusStep,#linkedContentStep,div[id*=stepcontent]{border:none!important}h3.steptitle,span.reqfield{display:none!important}.submitStepTop:has(span.reqfield:only-child){height:20px!important}input[type=text][name=title]{width:100%}input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:16px;height:16px;background-color:var(--c-card);border:1px solid var(--c-border);border-radius:3px}input[type=checkbox]:checked{background-color:var(--c-accent);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");background-size:80%;background-position:center;background-repeat:no-repeat}.vtbegenerated::-webkit-scrollbar{width:10px;height:10px}.vtbegenerated::-webkit-scrollbar-track{background-color:transparent}.vtbegenerated::-webkit-scrollbar{height:5px}.vtbegenerated::-webkit-scrollbar-thumb{background-color:var(--c-scrollbar);border-radius:9999px}.author_props .highlight-pop{background:var(--i-verified);background-repeat:no-repeat;background-position:center;background-size:100% 100%;width:20px;height:20px}img[src="../images/paperclip.png"]{display:none}img[src="/images/ci/ng/cal_year_event.gif"]{content:var(--i-file)}.dbAttachment{border:1px solid var(--c-border);border-radius:5px;width:fit-content;padding:3px 5px}.dbAttachment img{width:20px;height:20px}.dbAttachment:hover{background-color:var(--c-hover)}.navigationBar div>button{border:1px solid var(--c-border);display:inline-block;box-shadow:none;background:var(--c-button);border-radius:3px;color:var(--c-text);text-shadow:none;margin:0;padding:0}a.reply-count-link{bottom:3px;position:absolute;background:transparent;display:block;border-radius:3px!important;border:1px solid var(--c-border)!important}.db_msg_metadata,.reply-lvl-0 .db_msg_metadata{border:1px solid var(--c-border)!important;box-shadow:none;background:var(--c-card);border-radius:0 0 0 2px;line-height:1.5;top:3px;right:3px;min-width:140px;text-align:right}#actionbar{position:relative;padding-right:60px;box-shadow:none;opacity:1!important;background:transparent!important;border-bottom:none!important}.collapsedMessage .db-message .profileCardAvatarThumb:after{display:none}.thread-detail-page #actionbar .mainButton>a,.thread-detail-page #actionbar .secondaryButton>a{color:var(--c-text)!important}.thread-detail-page #actionbar .mainButton>a:hover,.thread-detail-page #actionbar .secondaryButton>a:hover{background:var(--c-hover)!important}.thread-detail-page #navsecondary a#refreshTreeActionButtonId:before{content:"";display:inline-block;height:20px;width:20px;background-image:var(--i-refresh);background-size:contain;background-repeat:no-repeat;background-position:center}.thread-detail-page #navsecondary #searchActionButtonId a:before{content:"";display:inline-block;height:20px;width:20px;background-image:var(--i-search);background-size:contain;background-repeat:no-repeat;background-position:center}img[src="/images/ci/actionbar/flag.gif"]{display:none}img[src="/images/ci/ng/sort_on2.gif"]{content:var(--i-arrow);width:16px;height:16px}img[src="/images/ci/ng/sort_on_up2.gif"]{content:var(--i-arrow);transform:rotate(180deg);width:16px;height:16px}`;
  const courseExternalLinkStyles = "body{height:auto}.locationPane{background-color:var(--c-background)}#pageTitleDiv,#pageTitleDiv *{color:var(--c-title)}#containerdiv{border:1px solid var(--c-border);background-color:var(--c-card);border-radius:5px;padding:20px}#containerdiv *{color:var(--c-text);font-size:14px;line-height:1.6}#containerdiv a{color:var(--blue-5)!important;text-decoration:none}";
  const courseToolCalendarStyles = "html,#outer_left_stream_calendar,body{background:var(--c-card)!important}*{box-shadow:none!important;text-shadow:none!important}html,.locationPane,#contentPanel{padding:0;height:fit-content}#streamHeader_calendar{background:var(--c-card);text-shadow:none}#streamHeader_calendar a{color:var(--c-text);line-height:1.6;text-decoration:none;border-radius:0;border:none;border-left:4px solid transparent}#streamHeader_calendar a.active{box-shadow:none;border-left:4px solid var(--c-accent)}#streamHeader_calendar a:hover{color:var(--red-5);background:var(--c-hover)}#calendar_content{border:none;background:var(--c-card)}#streamHeader_calendar{padding-bottom:0;height:inherit!important;border:none}#streamHeader_calendar span.current-page,#streamHeader_calendar span.icon{display:none}#streamHeader_calendar .title-text{color:var(--c-title);font-weight:700;text-shadow:none;padding-left:12px}#calendar_content{border:none}#streamHeader_calendar ul.cal-nav li#agendaDay{background-image:var(--i-calendar-day);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li#agendaWeek{background-image:var(--i-calendar-week);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li#month{background-image:var(--i-calendar-month);background-repeat:no-repeat;background-size:25px 25px;background-position:center center}#streamHeader_calendar ul.cal-nav li.active,#streamHeader_calendar ul.cal-nav a{border-radius:5px}#streamHeader_calendar ul.cal-nav li.active{border:1px solid var(--c-border)}#streamHeader_calendar ul.cal-nav a:hover{background:none}#streamHeader_calendar ul.cal-nav li:hover{background-color:var(--c-hover)}#streamHeader_calendar div.filter-content-wrapper a[data-handler=prev] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:90deg}#streamHeader_calendar div.filter-content-wrapper a[data-handler=next] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:270deg}#streamHeader_calendar div.filter-content-wrapper div.ui-datepicker-title{color:var(--c-text);transform:translateY(-2px)}#datepicker td[data-handler=selectDay] a{background:var(--c-button)}#datepicker th{font-size:8px;color:var(--c-text)}#calendarList,#calendarList *{color:var(--c-text)}#calendarsForm{max-height:350px;overflow-y:auto}#calendarsForm #checkUncheckAll{display:flex;justify-content:center;align-items:center;gap:5px;margin-bottom:10px;position:sticky;top:0;background:var(--c-card);z-index:100}#calendarsForm #checkUncheckAll a{width:fit-content;padding:2px 5px;border-radius:5px;font-weight:700}#calendars{display:flex;flex-wrap:wrap;align-items:flex-start;gap:5px}#calendars div.calendar-item.calendar-name{width:100%}#calendars div.calendar-item.calendar-name label{border:1px solid var(--c-border);border-radius:5px}#calendars div.calendar-item.calendar-name label:hover{background:var(--c-hover);color:var(--c-accent)}#calendars div.calendar-item.calendar-name span.colorPicker-picker{display:none}#streamHeader_calendar h3{color:var(--c-subtitle);font-weight:700}#ical{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 15px;color:var(--c-text);font-weight:700}#ical:hover{background:var(--c-hover);color:var(--c-accent)}#outer_left_stream_alerts{display:flex;background:var(--c-card);border:none}#calendar_content{flex:1;margin:0}#calendar{background:var(--c-card)}#calendar,#calendar *{font-weight:400;border-color:var(--c-border)}#calendar thead *,#calendar .fc-day-number{color:var(--c-text)}#calendar td.fc-header-left{display:flex;justify-content:start;align-items:center}#calendar td.fc-header-left button{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#calendar td.fc-header-left button:hover{background:var(--cyan-2);color:var(--cyan-7)}#calendar td.fc-header-left button[title=上一个时段] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:90deg}#calendar td.fc-header-left button[title=下一个时段] span{background:var(--i-arrow);background-repeat:no-repeat;background-size:25px 25px;background-position:center center;rotate:270deg}#calendar td.fc-header-left .fc-header-title h2{margin:0;color:var(--cyan-8);font-weight:700}#calendar td.fc-header-right{text-align:right}#calendar td.fc-header-right button{float:right;background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#calendar td.fc-header-right button span{background:var(--i-add);background-repeat:no-repeat;background-size:20px 20px;background-position:center center}#calendar td.fc-header-right button:hover{background:var(--cyan-2);color:var(--cyan-7)}#calendar .fc-state-highlight{background:var(--cyan-2)}#calendar .fc-event *{color:normal!important}#calendar .fc-agenda-divider-inner{background:var(--c-subtitle)}#calendar .fc-event-inner img{display:none}div.ui-widget-overlay.ui-front{background:var(--c-card)}div[role=dialog]{background:var(--c-card)!important;border:1px solid var(--c-border)!important;border-radius:10px!important;color:var(--c-text)}div[role=dialog] *{color:var(--c-text)}div.ui-dialog>div.ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se{background:var(--i-resize);background-repeat:no-repeat;background-size:20px 20px;background-position:center center}div.ui-dialog-titlebar span.ui-dialog-title{color:var(--c-title);font-weight:700;font-size:1.5rem;margin-top:10px}#eventtitle,#eventdesc{background:var(--c-input-bg);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}#eventdesc{margin-top:10px}div[role=dialog] label{color:var(--c-text);font-weight:700}div[role=dialog] .ui-dialog-buttonset button{background:var(--c-button);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}div[role=dialog] .ui-dialog-buttonset button:hover{background:var(--cyan-2);color:var(--cyan-7)}select[disabled]{display:none}#create-new-event fieldset{display:flex;flex-direction:column;row-gap:10px}div[role=dialog] input[type=datetime]{background:var(--c-input-bg);border:1px solid var(--c-border);border-radius:5px;padding:5px 10px;color:var(--c-text);font-weight:700}";
  const courseOralTrainingStyles = "#pageTitleDiv>*:not([id=pageTitleBar]){display:none}#pageTitleDiv{color:transparent}#actionbar{border:none;border-bottom:1px solid var(--c-border)}#actionbar .mainButton>a,#actionbar .secondaryButton>a{color:var(--c-text);border-radius:5px 5px 0 0;border-bottom:2px solid transparent!important}#actionbar .mainButton>a:hover,#actionbar .secondaryButton>a:hover{background:var(--c-hover);border-bottom:2px solid var(--c-accent)!important}#searchForm{display:none}.container{border:1px solid var(--c-border);background:var(--c-card);border-radius:5px}.container *{font-family:inherit!important;color:var(--c-text)!important;text-decoration:none!important;font-style:normal!important;font-size:14px;line-height:1.6}.container .backLink a{background:var(--c-card)}.container .backLink a:hover{background-color:var(--c-hover)}";
  const courseViewGroupStyles = "#column0 div.portlet{background:var(--c-card);border:1px solid var(--c-border);border-radius:5px;padding:16px}#column0 div.portlet h2{color:var(--c-title);background:transparent;font-size:1.5rem;border-bottom:1px solid var(--c-border)}#column0 div.portlet div.collapsible{border:none;color:var(--c-text)}#column0 div.portlet div.collapsible ul.userEmailLabel{display:flex!important;flex-direction:column;justify-content:center;align-items:start;list-style:none;row-gap:10px}#column0 div.portlet div.collapsible ul.userEmailLabel li span img{display:none}#column0 div.portlet div.collapsible h3{color:var(--c-title);font-size:1.2rem;font-weight:600;margin-bottom:10px}#column0 div.portlet div.collapsible h3:not(:first-child){margin-top:15px}";
  const electiveSsoLoginStyles = 'body{background:var(--c-background)!important;display:flex!important;flex-direction:column;height:100svh;justify-content:center;align-items:center;position:relative;overflow:hidden}body #div{background-image:var(--i-logo)!important;background-color:var(--c-card)!important;background-size:150px 42px!important;background-repeat:no-repeat!important;background-position:50% 20px!important;padding-top:90px!important;border-radius:10px!important;border:1px solid var(--c-border)!important;left:inherit;margin:0!important;height:fit-content;position:relative;overflow:visible;transition:none!important;animation:none!important}body #div>div{background:var(--c-button);color:var(--c-text);font-weight:700;border-radius:10px;bottom:inherit!important;transition:none!important;animation:none!important}.overClass{border:none!important;color:var(--c-accent)!important;background:var(--c-button-hover)!important;transition:none!important;animation:none!important}body #div3{position:absolute;margin:0!important;left:50%;transform:translate(-50%) translateY(-40px);transition:none!important;animation:none!important;border:1px solid var(--red-4)!important;background:var(--red-1)!important;color:var(--red-6)!important;border-radius:999px!important;display:flex!important;align-items:center;justify-content:center;gap:10px;padding:4px 12px!important;width:fit-content!important;font-size:18px!important}body #div3:before{content:"";display:block;width:28px;height:28px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}';
  const electiveMainStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.5}body{position:relative}body>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>table:last-of-type{margin:10px auto!important}body>table:last-of-type td{background:transparent;color:var(--c-text)!important}body>table:last-of-type td:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px}';
  const electivePlanStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"选课计划列表";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}p.pkuportal-remark{display:none}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}img[src*=arrow_red]{display:none!important}.subTitle{display:none}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;margin-bottom:10px}.errmsg:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}';
  const electiveResultsStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2) td{padding:0;border:none}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"选课结果";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td[colspan="0"] div{gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px!important;margin-bottom:10px;display:flex;width:fit-content;align-items:center;justify-content:center}body>table:nth-of-type(2) td[colspan="0"] div:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}body>table:nth-of-type(2) td[colspan="0"] .message_success{display:none}.pkuportal-remark{display:none}a:link,a:visited{color:inherit;text-decoration:none}a:link{color:var(--blue-5)}img[src*=arrow_red]{display:none!important}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}#classAssignment{border:none;color:#000;border-collapse:collapse}#classAssignment caption{border:none;margin-bottom:10px}#classAssignment caption span{color:var(--c-title)!important;font-weight:700;font-size:20px!important}#classAssignment tr.course-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border)}#classAssignment tr.course-header .course{border:none;padding:5px 0}#classAssignment tr:not(.course-header) td:first-of-type{color:var(--c-title)!important}#classAssignment tbody{border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border)}';
  const electiveHelpStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body>table:not(:first-of-type):not(:last-of-type){background:var(--c-card);border-width:0px 1px 0px 1px;border-style:solid;border-color:var(--c-border);padding:20px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px 14px 0 0;padding:20px;margin-top:28px;border-bottom:0;border-top:1px solid var(--c-border)!important}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"帮助页面";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}body>table:nth-last-of-type(2){border-radius:0 0 14px 14px;border-bottom:1px solid var(--c-border)!important}tbody{position:relative}tr:has(.red){position:relative}.red{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;width:fit-content!important;white-space:nowrap;position:absolute;left:50%;transform:translate(-50%)}.red:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}td:has(+.red){display:none}.red+td{display:none}td.pkuportal-important{color:var(--c-title)!important;font-weight:700;font-size:1.2rem!important;text-indent:-.5ch;padding:10px 0}td.pkuportal-important img{display:none}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2))){padding:10px 0;color:transparent;height:0px;overflow:hidden}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2)))>img{display:none}td:has(>img[src="/elective2008/resources/images/s.jpg"]):not(:has(>*:nth-of-type(2))):before{content:"";display:block;width:100%;color:transparent;border-bottom:1px solid var(--c-border)}.pkuportal-remark{color:var(--gray-7)!important}a.titlelink2:link,a.titlelink2:visited,a.titlelink2:active{color:var(--blue-6)!important;text-decoration:none}a.titlelink2:hover{color:var(--blue-7)!important;text-decoration:none;top:0!important;left:0!important}img[src*="/elective2008/resources/images/1-4.jpg"]{display:none}.pkuportal-table-portlet td,span,div,input{font-size:14px}.pkuportal-important{color:var(--red-6)!important}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text);border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px;border:none}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}';
  const electiveDetailStyles = 'body{position:relative}body:before{position:sticky;content:"";background-image:var(--i-logo);background-size:auto 30px;background-repeat:no-repeat;background-position:2em center;background-color:var(--c-card);border-bottom:1px solid var(--c-border);overflow:hidden;padding:1em 2em;height:60px;box-sizing:border-box;display:block}p[style*="color: #39961D"]{color:var(--c-title)!important;font-size:24px!important;font-weight:700;margin:10px auto}body>table:has(.pkuportal-table-portlet){width:min(1180px,calc(100vw - 64px))!important}td:has(>.pkuportal-table-portlet){background:var(--c-card);padding:20px;border-radius:14px;border:1px solid var(--c-border)}.pkuportal-table-portlet{border-collapse:collapse;border-width:2px 0px 2px 0px;border-style:solid;border-color:var(--c-border);margin:0 auto}.pkuportal-table-portlet th,.pkuportal-table-portlet td{padding:5px;color:var(--c-text);font-size:14px;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--c-border)}.pkuportal-table-portlet .pkuportal-td-title{color:var(--c-title);background:transparent;font-weight:700;margin:10px auto}.pkuportal-table-portlet>tbody>tr.datagrid-even,.pkuportal-table-portlet>tbody>tr.datagrid-even:hover,.pkuportal-table-portlet>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}.pkuportal-table-portlet>tbody>tr.datagrid-odd,.pkuportal-table-portlet>tbody>tr.datagrid-odd:hover,.pkuportal-table-portlet>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}body:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px;visibility:visible!important;margin:10px auto;width:fit-content}';
  const electiveCourseQueryStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.2rem}body{position:relative}body>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>table:not(:first-of-type),body>table:last-of-type{margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"添加选课计划课程";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>table:nth-of-type(2) td{padding:0;border:none}.pkuportal-remark{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}#qyForm tr:has(>#kcfl){padding:10px;display:flex;justify-content:center;align-items:center}#qyForm tr:has(>#kcfl) *{font-size:14px;color:var(--c-text);width:fit-content}#kcfl{gap:12px!important;flex-wrap:wrap}#kcfl span{display:none}#kcfl input[type=radio]{-moz-appearance:none;appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;background:var(--c-button);border:1px solid var(--c-border);color:var(--ui-text);font-size:12px;font-weight:500;cursor:pointer;-webkit-user-select:none;user-select:none;position:relative;margin:0;box-sizing:border-box}#kcfl input[type=radio]:before{content:"";width:14px;height:14px;border:1px solid var(--c-border);border-radius:50%;background:var(--gray-4);margin-right:8px;flex-shrink:0;box-sizing:border-box;transition:all .2s ease}#kcfl input[type=radio]:after{color:var(--c-text);transition:color .2s ease}#education_plan_bk:after{content:"培养方案"}#speciality:after{content:"专业课"}#politics:after{content:"政治课"}#english:after{content:"英语课"}#gym:after{content:"体育课"}#tsk_choice:after{content:"通识课"}#pub_choice:after{content:"公选课"}#liberal_computer:after{content:"计算机基础课"}#ldjyk:after{content:"劳动教育课"}#szxzxbx:after{content:"思政选择性必修课"}#kcfl input[type=radio]:hover{border-color:var(--red-4);background:var(--red-1)}#kcfl input[type=radio]:hover:before{border-color:var(--red-4);background-color:var(--red-4)}#kcfl input[type=radio]:checked{background:var(--red-5);border-color:var(--red-5)}#kcfl input[type=radio]:checked:before{background-size:11px 11px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:#fff}#kcfl input[type=radio]:checked:after{color:#fff}#kcfl input[type=radio]:focus-visible{outline:2px solid var(--ui-primary);outline-offset:2px}#kcfl input[type=radio]:disabled{opacity:.5;cursor:not-allowed}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}tr[valign=left]{display:grid;grid-template-columns:repeat(3,80px 1fr);flex-wrap:wrap;gap:10px;padding:0;border-radius:12px;align-items:center}tr[valign=left]>td:nth-child(2),tr[valign=left]>td:nth-child(4),tr[valign=left]>td:nth-child(6),tr[valign=left]>td:nth-child(2)>*[style*="width:"],tr[valign=left]>td:nth-child(4)>*[style*="width:"],tr[valign=left]>td:nth-child(6)>*[style*="width:"]{box-sizing:border-box;width:100%!important;height:100%!important}tr[valign=left]>td:nth-child(8){grid-column:span 3;display:block;width:100%}tr[valign=left]>td:nth-child(8) tr{display:flex;justify-content:space-between;gap:10px;align-items:center}tr[valign=left]>td:nth-child(8) tr td{padding:0}tr[valign=left]>td{display:flex!important;align-items:center;gap:8px;margin:0;padding:0;flex-shrink:0}tr[valign=left]>td:not(:has(input)):not(:has(select)):not(:has(table)){color:var(--c-title);font-size:14px;font-weight:500;white-space:nowrap}tr[valign=left] div[style*="font-size:15px"]{color:var(--red-5);font-size:16px;font-weight:600;float:none;margin:0 2px 0 0}tr[valign=left] input[type=text].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 12px;border:1px solid var(--c-border);border-radius:8px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;outline:none;box-sizing:border-box}tr[valign=left] input[type=text].selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] input[type=text].selectize-input:focus{background:var(--c-focus)}tr[valign=left] select.selectized{display:none}tr[valign=left] .selectize-control{min-width:150px}tr[valign=left] .selectize-input:before{display:none}tr[valign=left] .selectize-input{padding:8px 12px;border:1px solid var(--c-border)!important;border-radius:8px;background:var(--c-input-bg)!important;color:var(--c-title);font-size:14px;box-shadow:none;min-height:auto;line-height:1.5}tr[valign=left] .selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] .selectize-input.focus,tr[valign=left] .selectize-input.dropdown-active{border-color:var(--red-5);background:var(--c-focus)}tr[valign=left] .selectize-input .item{padding:0;margin:0;background:transparent;border:none;color:var(--c-title);font-size:14px}tr[valign=left] .selectize-dropdown{border:1px solid var(--c-border);border-radius:8px;background:var(--c-card);margin-top:4px;padding:4px;max-height:300px;overflow-y:auto;z-index:1000}tr[valign=left] .selectize-dropdown .option{padding:8px 12px;border-radius:6px;color:var(--c-text);font-size:14px;cursor:pointer;margin:2px 0}tr[valign=left] .selectize-dropdown .option:hover,tr[valign=left] .selectize-dropdown .option.active{background:var(--red-1);color:var(--red-6)}tr[valign=left] .selectize-dropdown .option.selected{background:var(--red-5);color:#fff;font-weight:500}tr[valign=left] td:has(>table[width="90%"]){flex:1;min-width:300px}tr[valign=left] td table[width="90%"]{width:100%!important;border-collapse:collapse}tr[valign=left] input[type=checkbox]{-moz-appearance:none;appearance:none;-webkit-appearance:none;width:18px;height:18px;border:2px solid var(--c-border);border-radius:4px;background:var(--c-input-bg);cursor:pointer;position:relative;margin:0;flex-shrink:0}tr[valign=left] input[type=checkbox]:hover{border-color:var(--red-4);background:var(--red-1)}tr[valign=left] input[type=checkbox]:checked{background:var(--red-5);border-color:var(--red-5)}tr[valign=left] input[type=checkbox]:checked:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;background:#fff;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}tr[valign=left] td:has(input[type=checkbox])+td{font-size:13px!important;color:var(--c-text)!important}tr[valign=left] input[type=button].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 20px;border:none!important;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap}tr[valign=left] input[type=button]#b_query{background:var(--red-5)!important;color:#fff!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_query:hover{background:var(--red-6)!important}tr[valign=left] input[type=button]#b_cancel{width:fit-content;background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_cancel:hover{background:var(--c-button-hover)!important;border-color:var(--red-4)!important;color:var(--red-5)!important}tr[valign=left] input[type=button]#b_cancel:active{border:1px solid var(--c-border);border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap;padding:8px 20px;box-sizing:border-box;background:var(--c-button)}tr[valign=left] input[type=hidden]{display:none!important}tr[valign=left] input:focus-visible,tr[valign=left] .selectize-input.focus{outline:none}tr[valign=left] input:disabled,tr[valign=left] .selectize-input.disabled{opacity:.5!important;cursor:not-allowed!important}.pku-art-navigation-area{display:flex!important;gap:12px;background:var(--c-card)!important;border-radius:12px!important;margin-top:16px;justify-content:flex-end;align-items:center;width:100%!important;font-size:0!important}.pku-art-navigation-area>*:not(form){font-size:14px!important;color:var(--c-text)!important;display:inline-flex!important;align-items:center;gap:8px}.pku-art-navigation-area a,.pku-art-navigation-area span:not(:has(select)){display:inline-flex!important;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 12px;border-radius:6px;font-size:14px!important;font-weight:500;text-decoration:none!important;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;box-sizing:border-box}.pku-art-navigation-area a{background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)}.pku-art-navigation-area a:hover{background:var(--red-1)!important;color:var(--red-5)!important;border-color:var(--red-4)}.pku-art-navigation-area span:not(:has(select)){background:transparent!important;color:var(--c-subtitle)!important;cursor:default;border:1px solid transparent}.pku-art-navigation-area:after{content:"";width:1px;height:20px;background:var(--c-border);margin:0 4px}.pku-art-navigation-area form[name=pageForm]{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;padding:0!important}.pku-art-navigation-area form:before{content:"跳转到:";color:var(--c-text);font-size:14px!important;font-weight:500;white-space:nowrap}.pku-art-navigation-area form{font-size:0!important}.pku-art-navigation-area script{display:none!important}.pku-art-navigation-area select[name=netui_row]{-moz-appearance:none;appearance:none;-webkit-appearance:none;min-width:80px;height:32px;padding:0 32px 0 12px;border:1px solid var(--c-border);border-radius:6px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;font-weight:500;cursor:pointer;outline:none;background-image:var(--i-arrow)!important;background-repeat:no-repeat;background-position:right 8px center;background-size:16px}.pku-art-navigation-area select[name=netui_row]:hover{border-color:var(--red-4)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row]:focus{border-color:var(--red-5)!important;box-shadow:0 0 0 3px var(--red-1)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row] option{padding:8px 12px;background:var(--c-card);color:var(--c-title);font-size:14px}.pku-art-navigation-area select[name=netui_row] option:hover,.pku-art-navigation-area select[name=netui_row] option:checked{background:var(--red-1);color:var(--red-5)}.pku-art-navigation-area:after{content:none}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}';
  const electiveFaqStyles = 'body>table:not(:first-of-type),body>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid{background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid td{padding:0;border:none}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table.datagrid:before{content:"选课 FAQ";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}table.datagrid{padding:20px;display:flex;flex-direction:column;position:relative}table.datagrid td{font-size:14px}table.datagrid tbody{display:flex;flex-direction:column;gap:10px}.pagehead,.datagrid-header{display:none}table.datagrid tr.datagrid-even{background:var(--c-card)!important}table.datagrid tr.datagrid-even td{font-size:1.2rem!important;font-weight:700!important;color:var(--c-title)!important}';
  const electiveWorkStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.5}body{position:relative}body>#scopeOneSpan>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>#scopeOneSpan>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>#scopeOneSpan>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>#scopeOneSpan>table:last-of-type{margin:10px auto!important}body>#scopeOneSpan>table:last-of-type td{background:transparent;color:var(--c-text)!important}body>#scopeOneSpan>table:last-of-type td:after{content:"PKU Art @ Arthals";display:block;color:var(--c-text);padding-top:5px;height:20px}body>#scopeOneSpan>table:not(:first-of-type),body>#scopeOneSpan>table:last-of-type{width:min(1180px,calc(100vw - 64px))!important;margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>#scopeOneSpan>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>#scopeOneSpan>table:nth-of-type(2):before{content:"预选";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body>#scopeOneSpan>table:nth-of-type(2) td{padding:0;border:none}p.pkuportal-remark{font-size:0}td.message_success{display:none}td.pku-art-elective-notice{display:flex;flex-direction:column;gap:5px;background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;margin:0 auto}td.pku-art-elective-notice>span:first-child{font-size:13px;font-weight:700;color:var(--c-title)}span.errmsg{width:fit-content}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}img[src*=arrow_red]{display:none!important}.subTitle{display:none}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6);font-size:12px;margin-bottom:10px}.errmsg:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:12px 8px!important;text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px!important;line-height:1.6!important}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px!important}body:has(.pku-art-navigation-area) table.datagrid>tbody>tr:last-of-type td[align=right]{display:none!important}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}span.pkuportal-remark:not(:has(span)){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:10px 0 0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}span.pkuportal-remark:not(:has(span)):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}font.pkuportal-remark:not(:has(span)){display:inline-flex!important;color:var(--blue-6);padding:0 12px!important;font-size:12px!important;font-weight:500}.pku-art-navigation-area{display:flex!important;align-items:center;gap:12px;background:var(--c-card)!important;border-radius:12px!important;margin-top:16px;justify-content:flex-end;width:100%!important;font-size:0!important}.pku-art-navigation-area>*:not(form){font-size:14px!important;color:var(--c-text)!important;display:inline-flex!important;align-items:center;gap:8px}.pku-art-navigation-area a,.pku-art-navigation-area span:not(:has(select)){display:inline-flex!important;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 12px;border-radius:6px;font-size:14px!important;font-weight:500;text-decoration:none!important;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;box-sizing:border-box}.pku-art-navigation-area a{background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)}.pku-art-navigation-area a:hover{background:var(--red-1)!important;color:var(--red-5)!important;border-color:var(--red-4)}.pku-art-navigation-area span:not(:has(select)){background:transparent!important;color:var(--c-subtitle)!important;cursor:default;border:1px solid transparent}.pku-art-navigation-area form[name=pageForm]{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;padding:0!important}.pku-art-navigation-area form:before{content:"跳转到:";color:var(--c-text);font-size:14px!important;font-weight:500;white-space:nowrap}.pku-art-navigation-area form{font-size:0!important}.pku-art-navigation-area script{display:none!important}.pku-art-navigation-area select[name=netui_row]{-moz-appearance:none;appearance:none;-webkit-appearance:none;min-width:80px;height:32px;padding:0 32px 0 12px;border:1px solid var(--c-border);border-radius:6px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;font-weight:500;cursor:pointer;outline:none;background-image:var(--i-arrow)!important;background-repeat:no-repeat;background-position:right 8px center;background-size:16px}.pku-art-navigation-area select[name=netui_row]:hover{border-color:var(--red-4)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row]:focus{border-color:var(--red-5)!important;box-shadow:0 0 0 3px var(--red-1)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row] option{padding:8px 12px;background:var(--c-card);color:var(--c-title);font-size:14px}.pku-art-navigation-area select[name=netui_row] option:hover,.pku-art-navigation-area select[name=netui_row] option:checked{background:var(--red-1);color:var(--red-5)}';
  const electiveSupplementStyles = 'body{background:var(--c-background)!important;color:var(--c-text);font-size:14px;line-height:1.6;padding-bottom:48px}*,*:before,*:after{text-shadow:none!important;box-shadow:none!important;line-height:1.2rem}body{position:relative}body>table:first-of-type{margin:0!important;width:100%;position:sticky;top:0;height:60px!important;overflow:hidden;z-index:9999}body>table:first-of-type td{background-image:var(--i-logo)!important;background-size:auto 30px!important;background-repeat:no-repeat!important;background-position:2em center!important;background-color:var(--c-card)!important;border-bottom:1px solid var(--c-border);display:flex;justify-content:end;align-items:center;position:relative;overflow:hidden;padding:1em 2em;height:100%!important;box-sizing:border-box}body>table:first-of-type td img{display:none}#menu{margin:0;padding:0 90px 0 0!important;list-style:none;display:flex!important;flex-wrap:wrap;flex-direction:row-reverse;gap:28px;justify-content:flex-start;float:right;width:fit-content!important;position:relative}#menu li:first-of-type{position:absolute;right:0!important;top:50%!important;transform:translateY(-50%);height:fit-content;width:fit-content}#menu li:first-of-type a{color:transparent;width:32px;height:32px;padding:0;background:transparent;background-image:var(--i-exit);background-size:80%;background-repeat:no-repeat;background-position:center center;border:none;display:block}.pku-art-theme-toggle-bar{position:absolute;right:42px;top:50%;transform:translateY(-50%)}#menu li a{padding:5px 2px;border-radius:8px;border:none;background:transparent;color:var(--c-text);font-size:13px;font-weight:500;text-decoration:none;transition:none;float:none;position:relative}#menu li:not(:first-child) a:hover{background:transparent;color:var(--c-accent);transition:all .3s ease-in-out}#menu li:not(:first-child) a:after{content:"";color:transparent;visibility:visible!important;position:absolute;border-bottom:2px solid var(--red-5);border-radius:2px;bottom:-2px;left:100%;width:0;-webkit-transition:width .35s,left .35s;-moz-transition:width .35s,left .35s;transition:width .35s,left .35s}#menu li:not(:first-child) a:hover:after{visibility:visible!important;left:0;width:100%;-webkit-transition:width .35s;-moz-transition:width .35s;transition:width .35s}body div[style*="pku_view.jpg"]{background:transparent!important}td[background*="/elective2008/resources/images/11-1.png"]{background:var(--c-card)!important;border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px;position:relative}td[background*="/elective2008/resources/images/11-1.png"]:before{content:"";display:block;width:50px;height:50px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6);position:absolute;top:50%;transform:translateY(-50%);padding-left:50px}td[background*="/elective2008/resources/images/11-1.png"] *{color:var(--c-text)}.errmsg{display:inline-flex;align-items:center;gap:10px;padding:4px 12px!important;border-radius:999px;border:1px solid var(--red-4);background:var(--red-1);color:var(--red-6)!important;font-size:12px;margin:10px 0}body>table:not(:first-of-type),body>table:last-of-type{margin:0 auto;border-spacing:0}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2){background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:20px;margin-top:28px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2):before{content:"补退选";display:block;font-size:24px;font-weight:700;color:var(--c-title);margin:12px 0 24px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2) .errmsg:has(br){border-radius:10px}body:not(:has(*[background="/elective2008/resources/images/11-1.png"]))>table:nth-of-type(2) .errmsg:has(br):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}body>table:nth-of-type(2) td{padding:0;border:none}.pkuportal-remark{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--red-1);border:1px solid var(--red-4);color:var(--red-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/error.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-warning);-webkit-mask-image:var(--i-warning);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--red-6)}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]){float:none!important;width:auto!important;display:inline-flex!important;align-items:center;gap:5px;padding:4px 12px!important;margin:0 0 8px;border-radius:999px;background:var(--green-1);border:1px solid var(--green-4);color:var(--green-6);font-size:12px;font-weight:500}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) img{display:none}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]) td{width:fit-content!important}tr:has(>td>img[src="/elective2008/resources/images/success.gif"]):before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--green-6)}td>img[src="/elective2008/resources/images/warning.gif"]{display:none}td>img[src="/elective2008/resources/images/arrow_red.gif"]{display:none}.subTitle{font-size:18px;font-weight:700;color:var(--c-title);margin:25px 0 5px;display:block;width:fit-content}.subTitle+b>.errmsg{border:none;background:transparent;padding:0!important;color:var(--c-subtitle)!important}tr:has(#validCode){display:flex;flex-wrap:wrap;align-items:center;gap:0}tr:has(#validCode)>td:first-child{flex:0 0 100%}td:has(#validCode){display:flex!important;align-items:center;gap:8px;font-size:14px!important;color:var(--c-text)!important;white-space:nowrap;padding:0!important}td:has(#validCode) span[style]{color:var(--red-5)!important;font-weight:600!important}#validCode{-moz-appearance:none;appearance:none;-webkit-appearance:none;width:90px!important;height:36px!important;padding:0 10px!important;border:1px solid var(--c-border)!important;border-radius:8px!important;background:var(--c-input-bg)!important;color:var(--c-title)!important;font-size:16px!important;font-weight:500;outline:none!important;box-sizing:border-box;transition:border-color .2s ease,background-color .2s ease}#validCode:hover{border-color:var(--red-4)!important;background:var(--c-focus)!important}#validCode:focus{border-color:var(--red-5)!important;background:var(--c-focus)!important}#validCodeImg{padding:0 8px!important;display:flex!important;align-items:center}#validCodeImg img,#validCodeImg #imgname{border-radius:8px!important;height:36px!important;object-fit:cover;vertical-align:middle;filter:contrast(100%) saturate(100%)!important}td:has(>a[href*=changeValid]){padding:0!important;display:flex!important;align-items:center}td>a[href*=changeValid]{display:inline-flex!important;align-items:center;gap:4px;padding:6px 12px!important;border-radius:8px!important;background:var(--c-button)!important;border:1px solid var(--c-border)!important;color:var(--c-text)!important;font-size:13px!important;font-weight:500!important;text-decoration:none!important;cursor:pointer;white-space:nowrap;height:36px;box-sizing:border-box;transition:all .2s ease}td>a[href*=changeValid]:hover{background:var(--red-1)!important;border-color:var(--red-4)!important;color:var(--red-5)!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) img[src="/elective2008/resources/images/attention.jpg"]{display:none!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child{padding:2px 1px!important}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a{float:none!important;display:inline-flex!important;align-items:center;gap:10px;padding:4px 12px!important;margin:0;border-radius:999px;background:var(--blue-1);border:1px solid var(--blue-4);color:var(--blue-6);font-size:12px;font-weight:500}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:before{content:"";display:block;width:16px;height:16px;mask-image:var(--i-tip);-webkit-mask-image:var(--i-tip);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:var(--blue-6)}td:has(img[src="/elective2008/resources/images/attention.jpg"]) div:last-child a:hover{background:var(--blue-2);border:1px solid var(--blue-5);color:var(--blue-7);transition:all .3s ease-in-out}a:link,a:visited{color:inherit;text-decoration:none}#qyForm tr:has(>#kcfl){padding:10px;display:flex;justify-content:center;align-items:center}#qyForm tr:has(>#kcfl) *{font-size:14px;color:var(--c-text);width:fit-content}#kcfl{gap:12px!important;flex-wrap:wrap}#kcfl span{display:none}#kcfl input[type=radio]{-moz-appearance:none;appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;background:var(--c-button);border:1px solid var(--c-border);color:var(--ui-text);font-size:12px;font-weight:500;cursor:pointer;-webkit-user-select:none;user-select:none;position:relative;margin:0;box-sizing:border-box}#kcfl input[type=radio]:before{content:"";width:14px;height:14px;border:1px solid var(--c-border);border-radius:50%;background:var(--gray-4);margin-right:8px;flex-shrink:0;box-sizing:border-box;transition:all .2s ease}#kcfl input[type=radio]:after{color:var(--c-text);transition:color .2s ease}#education_plan_bk:after{content:"培养方案"}#speciality:after{content:"专业课"}#politics:after{content:"政治课"}#english:after{content:"英语课"}#gym:after{content:"体育课"}#tsk_choice:after{content:"通识课"}#pub_choice:after{content:"公选课"}#liberal_computer:after{content:"计算机基础课"}#ldjyk:after{content:"劳动教育课"}#szxzxbx:after{content:"思政选择性必修课"}#kcfl input[type=radio]:hover{border-color:var(--red-4);background:var(--red-1)}#kcfl input[type=radio]:hover:before{border-color:var(--red-4);background-color:var(--red-4)}#kcfl input[type=radio]:checked{background:var(--red-5);border-color:var(--red-5)}#kcfl input[type=radio]:checked:before{background-size:11px 11px;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;background:#fff}#kcfl input[type=radio]:checked:after{color:#fff}#kcfl input[type=radio]:focus-visible{outline:2px solid var(--ui-primary);outline-offset:2px}#kcfl input[type=radio]:disabled{opacity:.5;cursor:not-allowed}table.datagrid{border:none;border-collapse:collapse;margin-top:10px;color:var(--c-text)}table.datagrid tr.datagrid-header{color:var(--c-title);font-weight:700;padding-left:12px;background:transparent;border:none}table.datagrid tr.datagrid-header th.datagrid{border-width:2px 0px 1px 0px;border-style:solid;border-color:var(--c-border);background:transparent!important;padding:5px 0}table.datagrid tr.datagrid-header th.datagrid{text-align:center;vertical-align:middle}table.datagrid>tbody>tr.datagrid-even,table.datagrid>tbody>tr.datagrid-even:hover,table.datagrid>tbody>tr:nth-child(2n):not(.datagrid-header):not(:last-of-type){background:var(--c-card)!important}table.datagrid>tbody>tr.datagrid-odd,table.datagrid>tbody>tr.datagrid-odd:hover,table.datagrid>tbody>tr:nth-child(odd):not(.datagrid-header):not(:last-of-type){background:var(--gray-1)!important}table.datagrid>tbody td.datagrid{padding:5px}table.datagrid>tbody>tr.datagrid-footer{border:1px solid var(--c-border);height:1px}table.datagrid>tbody>tr:last-of-type td{padding-top:10px}table.datagrid>tbody>tr a{color:var(--blue-5)}table.datagrid>tbody>tr span[style="color:red"]{color:var(--red-6)!important}tr[valign=left]{display:grid;grid-template-columns:repeat(3,80px 1fr);flex-wrap:wrap;gap:10px;padding:0;border-radius:12px;align-items:center}tr[valign=left]>td:nth-child(2),tr[valign=left]>td:nth-child(4),tr[valign=left]>td:nth-child(6),tr[valign=left]>td:nth-child(2)>*[style*="width:"],tr[valign=left]>td:nth-child(4)>*[style*="width:"],tr[valign=left]>td:nth-child(6)>*[style*="width:"]{box-sizing:border-box;width:100%!important;height:100%!important}tr[valign=left]>td:nth-child(8){grid-column:span 3;display:block;width:100%}tr[valign=left]>td:nth-child(8) tr{display:flex;justify-content:space-between;gap:10px;align-items:center}tr[valign=left]>td:nth-child(8) tr td{padding:0}tr[valign=left]>td{display:flex!important;align-items:center;gap:8px;margin:0;padding:0;flex-shrink:0}tr[valign=left]>td:not(:has(input)):not(:has(select)):not(:has(table)){color:var(--c-title);font-size:14px;font-weight:500;white-space:nowrap}tr[valign=left] div[style*="font-size:15px"]{color:var(--red-5);font-size:16px;font-weight:600;float:none;margin:0 2px 0 0}tr[valign=left] input[type=text].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 12px;border:1px solid var(--c-border);border-radius:8px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;outline:none;box-sizing:border-box}tr[valign=left] input[type=text].selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] input[type=text].selectize-input:focus{background:var(--c-focus)}tr[valign=left] select.selectized{display:none}tr[valign=left] .selectize-control{min-width:150px}tr[valign=left] .selectize-input:before{display:none}tr[valign=left] .selectize-input{padding:8px 12px;border:1px solid var(--c-border)!important;border-radius:8px;background:var(--c-input-bg)!important;color:var(--c-title);font-size:14px;box-shadow:none;min-height:auto;line-height:1.5}tr[valign=left] .selectize-input:hover{border-color:var(--red-4);background:var(--c-focus)}tr[valign=left] .selectize-input.focus,tr[valign=left] .selectize-input.dropdown-active{border-color:var(--red-5);background:var(--c-focus)}tr[valign=left] .selectize-input .item{padding:0;margin:0;background:transparent;border:none;color:var(--c-title);font-size:14px}tr[valign=left] .selectize-dropdown{border:1px solid var(--c-border);border-radius:8px;background:var(--c-card);margin-top:4px;padding:4px;max-height:300px;overflow-y:auto;z-index:1000}tr[valign=left] .selectize-dropdown .option{padding:8px 12px;border-radius:6px;color:var(--c-text);font-size:14px;cursor:pointer;margin:2px 0}tr[valign=left] .selectize-dropdown .option:hover,tr[valign=left] .selectize-dropdown .option.active{background:var(--red-1);color:var(--red-6)}tr[valign=left] .selectize-dropdown .option.selected{background:var(--red-5);color:#fff;font-weight:500}tr[valign=left] td:has(>table[width="90%"]){flex:1;min-width:300px}tr[valign=left] td table[width="90%"]{width:100%!important;border-collapse:collapse}tr[valign=left] input[type=checkbox]{-moz-appearance:none;appearance:none;-webkit-appearance:none;width:18px;height:18px;border:2px solid var(--c-border);border-radius:4px;background:var(--c-input-bg);cursor:pointer;position:relative;margin:0;flex-shrink:0}tr[valign=left] input[type=checkbox]:hover{border-color:var(--red-4);background:var(--red-1)}tr[valign=left] input[type=checkbox]:checked{background:var(--red-5);border-color:var(--red-5)}tr[valign=left] input[type=checkbox]:checked:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;background:#fff;mask-image:var(--i-check-simple);-webkit-mask-image:var(--i-check-simple);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center}tr[valign=left] td:has(input[type=checkbox])+td{font-size:13px!important;color:var(--c-text)!important}tr[valign=left] input[type=button].selectize-input{-moz-appearance:none;appearance:none;-webkit-appearance:none;padding:8px 20px;border:none!important;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap}tr[valign=left] input[type=button]#b_query{background:var(--red-5)!important;color:#fff!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_query:hover{background:var(--red-6)!important}tr[valign=left] input[type=button]#b_cancel{width:fit-content;background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)!important;box-sizing:border-box;height:38px}tr[valign=left] input[type=button]#b_cancel:hover{background:var(--c-button-hover)!important;border-color:var(--red-4)!important;color:var(--red-5)!important}tr[valign=left] input[type=button]#b_cancel:active{border:1px solid var(--c-border);border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;outline:none;-webkit-user-select:none;user-select:none;white-space:nowrap;padding:8px 20px;box-sizing:border-box;background:var(--c-button)}tr[valign=left] input[type=hidden]{display:none!important}tr[valign=left] input:focus-visible,tr[valign=left] .selectize-input.focus{outline:none}tr[valign=left] input:disabled,tr[valign=left] .selectize-input.disabled{opacity:.5!important;cursor:not-allowed!important}.pku-art-navigation-area{display:flex!important;gap:12px;background:var(--c-card)!important;border-radius:12px!important;margin-top:16px;justify-content:flex-end;align-items:center;width:100%!important;font-size:0!important}.pku-art-navigation-area>*:not(form){font-size:14px!important;color:var(--c-text)!important;display:inline-flex!important;align-items:center;gap:8px}.pku-art-navigation-area a,.pku-art-navigation-area span:not(:has(select)){display:inline-flex!important;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 12px;border-radius:6px;font-size:14px!important;font-weight:500;text-decoration:none!important;cursor:pointer;-webkit-user-select:none;user-select:none;white-space:nowrap;box-sizing:border-box}.pku-art-navigation-area a{background:var(--c-button)!important;color:var(--c-text)!important;border:1px solid var(--c-border)}.pku-art-navigation-area a:hover{background:var(--red-1)!important;color:var(--red-5)!important;border-color:var(--red-4)}.pku-art-navigation-area span:not(:has(select)){background:transparent!important;color:var(--c-subtitle)!important;cursor:default;border:1px solid transparent}.pku-art-navigation-area:after{content:"";width:1px;height:20px;background:var(--c-border);margin:0 4px}.pku-art-navigation-area form[name=pageForm]{display:inline-flex!important;align-items:center;gap:8px;margin:0!important;padding:0!important}.pku-art-navigation-area form:before{content:"跳转到:";color:var(--c-text);font-size:14px!important;font-weight:500;white-space:nowrap}.pku-art-navigation-area form{font-size:0!important}.pku-art-navigation-area script{display:none!important}.pku-art-navigation-area select[name=netui_row]{-moz-appearance:none;appearance:none;-webkit-appearance:none;min-width:80px;height:32px;padding:0 32px 0 12px;border:1px solid var(--c-border);border-radius:6px;background:var(--c-input-bg);color:var(--c-title);font-size:14px;font-weight:500;cursor:pointer;outline:none;background-image:var(--i-arrow)!important;background-repeat:no-repeat;background-position:right 8px center;background-size:16px}.pku-art-navigation-area select[name=netui_row]:hover{border-color:var(--red-4)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row]:focus{border-color:var(--red-5)!important;box-shadow:0 0 0 3px var(--red-1)!important;background-color:var(--c-focus)!important}.pku-art-navigation-area select[name=netui_row] option{padding:8px 12px;background:var(--c-card);color:var(--c-title);font-size:14px}.pku-art-navigation-area select[name=netui_row] option:hover,.pku-art-navigation-area select[name=netui_row] option:checked{background:var(--red-1);color:var(--red-5)}.pku-art-navigation-area:after{content:none}table.datagrid>tbody td.pku-art-pnp-valid,table.datagrid>tbody td.pku-art-pnp-invalid{text-align:center;vertical-align:middle}table.datagrid>tbody td.pku-art-pnp-valid svg,table.datagrid>tbody td.pku-art-pnp-invalid svg{width:18px;height:18px;vertical-align:middle}';
  function injectStyles(styleString, cssFileName) {
    const styleElement = document.createElement("style");
    styleElement.textContent = styleString;
    styleElement.dataset.cssFileName = cssFileName;
    styleElement.dataset.author = "Arthals";
    styleElement.className = "PKU-Art";
    document.documentElement.appendChild(styleElement);
  }
  const currentUrl = window.location.href;
  const globalStyleScopes = [
    /^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/course\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/onlineroomse\.pku\.edu\.cn\/\S*$/,
    /^https:\/\/elective\.pku\.edu\.cn\/\S*$/

];
  const styleRules = [
    {
      patterns: globalStyleScopes,
      excludePatterns: [],
      styleContent: mainStyles,
      fileName: "main.css"
    },
    {
      patterns: globalStyleScopes,
      excludePatterns: [],
      styleContent: arcoPaletteStyles,
      fileName: "arco-palette.css"
    },
    {
      patterns: [/^https:\/\/iaaa\.pku\.edu\.cn\/\S*$/],
      excludePatterns: [],
      styleContent: iaaaOAuthPageStyles,
      fileName: "iaaaOAuthPage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/login\S*$/, /^https:\/\/course\.pku\.edu\.cn[\/]?$/],
      excludePatterns: [],
      styleContent: courseLoginPageStyles,
      fileName: "courseLoginPage.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/
      ],
      excludePatterns: [],
      styleContent: courseHomePageStyles,
      fileName: "courseHomePage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*$/],
      excludePatterns: [],
      styleContent: courseContentStyles,
      fileName: "courseContent.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\S*announcement\S*$/],
      excludePatterns: [],
      styleContent: courseAnnouncementStyles,
      fileName: "courseAnnouncement.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*getTeachingStaffList\S*$/],
      excludePatterns: [],
      styleContent: courseTeachingStaffListStyles,
      fileName: "courseTeachingStaffList.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*classinCourseClass\S*$/],
      excludePatterns: [],
      styleContent: courseClassinStyles,
      fileName: "courseClassin.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*blankPage\S*$/],
      excludePatterns: [],
      styleContent: courseBlankPageStyles,
      fileName: "courseBlankPage.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*videoList\S*$/],
      excludePatterns: [],
      styleContent: courseVideolistStyles,
      fileName: "courseVideolist.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*((discussionboard)|(groupContentList))\S*$/],
      excludePatterns: [],
      styleContent: courseOtherStyles,
      fileName: "courseOther.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*myGrades\S*course_id\S*is_stream=false\S*$/],
      excludePatterns: [],
      styleContent: courseClassGradeStyles,
      fileName: "courseClassGrade.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*listContent\S*$/],
      excludePatterns: [],
      styleContent: courseListContentStyles,
      fileName: "courseListContent.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*viewAttempts\S*$/],
      excludePatterns: [],
      styleContent: courseViewAttemptStyles,
      fileName: "courseViewAttempt.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\S*toolId\S*$/],
      excludePatterns: [],
      styleContent: courseToolFrameStyles,
      fileName: "courseToolFrame.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/],
      excludePatterns: [],
      styleContent: courseToolAlertStyles,
      fileName: "courseToolAlert.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=mygrades\S*$/],
      excludePatterns: [],
      styleContent: courseToolGradeStyles,
      fileName: "courseToolGrade.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades$/],
      excludePatterns: [],
      styleContent: courseToolGradeClassStyles,
      fileName: "courseToolGradeClass.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*course_id\S*stream_name=mygrades_d\S*gradable_item_id\S*$/
      ],
      excludePatterns: [],
      styleContent: courseToolGradeItemStyles,
      fileName: "courseToolGradeItem.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*content\/file\?cmd=view\S*$/],
      excludePatterns: [],
      styleContent: courseFileEmbedStyles,
      fileName: "courseFileEmbed.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*assignment\/uploadAssignment\?\S*$/],
      excludePatterns: [],
      styleContent: courseAssignmentUploadStyles,
      fileName: "courseAssignmentUpload.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*context=mybb\S*$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/
      ],
      excludePatterns: [],
      styleContent: courseGlobalPageStyles,
      fileName: "courseGlobalPage.css"
    },
    {
      patterns: [
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*announcement\S*context=mybb\S*$/,
        /^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/execute\/announcement$/
      ],
      excludePatterns: [],
      styleContent: courseGlobalAnnouncementStyles,
      fileName: "courseGlobalAnnouncement.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*playVideo\S*$/],
      excludePatterns: [],
      styleContent: courseVideoPlayStyles,
      fileName: "courseVideoPlay.css"
    },
    {
      patterns: [/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/],
      excludePatterns: [],
      styleContent: courseVideoPlayFrameStyles,
      fileName: "courseVideoPlayFrame.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*taskView\S*$/],
      excludePatterns: [],
      styleContent: courseTaskStyles,
      fileName: "courseTask.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*discussionboard\S*$/],
      excludePatterns: [],
      styleContent: courseDiscussionStyles,
      fileName: "courseDiscussion.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*contentWrapperNoFrame\S*$/],
      excludePatterns: [],
      styleContent: courseExternalLinkStyles,
      fileName: "courseExternalLink.css"
    },
{
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/calendar\/\S*$/],
      excludePatterns: [],
      styleContent: courseToolCalendarStyles,
      fileName: "courseToolCalendar.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*oralTraining\S*$/],
      excludePatterns: [],
      styleContent: courseOralTrainingStyles,
      fileName: "courseOralTraining.css"
    },
    {
      patterns: [/^https:\/\/course\.pku\.edu\.cn\/webapps\/\S*viewGroup\S*$/],
      excludePatterns: [],
      styleContent: courseViewGroupStyles,
      fileName: "courseViewGroup.css"
    },
{
      patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/ssoLogin\.do\?_rand\S*$/],
      excludePatterns: [],
      styleContent: electiveSsoLoginStyles,
      fileName: "electiveSsoLogin.css"
    },
    {
      patterns: [/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\S*$/],
      excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*courseQuery\S*$/, /^\S*getCourseDetail\.do\S*$/],
      styleContent: electiveMainStyles,
      fileName: "electiveMain.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/\S*$/
      ],
      excludePatterns: [],
      styleContent: electivePlanStyles,
      fileName: "electivePlan.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/showResults\.do\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveResultsStyles,
      fileName: "electiveResults.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/HelpController\.jpf\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveHelpStyles,
      fileName: "electiveHelp.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/goNested\.do\S*$/,
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/\S*\/getCourseDetail.do\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveDetailStyles,
      fileName: "electiveDetail.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/
      ],
      excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*getCourseDetail\.do\S*$/],
      styleContent: electiveCourseQueryStyles,
      fileName: "electiveCourseQuery.css"
    },
    {
patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveFaqStyles,
      fileName: "electiveFaq.css"
    },
    {


patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)\S*$/
      ],
      excludePatterns: [],
      styleContent: electiveWorkStyles,
      fileName: "electiveWork.css"
    },
    {
      patterns: [
        /^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/supplement\/\S*$/
      ],
      excludePatterns: [/^\S*goNested\.do\S*$/, /^\S*courseQuery\S*$/, /^\S*getCourseDetail\.do\S*$/],
      styleContent: electiveSupplementStyles,
      fileName: "electiveSupplement.css"
    }
  ];
  function matchesAnyPattern(patterns, url) {
    return patterns.some((pattern) => pattern.test(url));
  }
  function applyStylesForCurrentPage(url = currentUrl) {
    styleRules.forEach(({ patterns, excludePatterns, styleContent, fileName }) => {
      if (matchesAnyPattern(patterns, url) && !matchesAnyPattern(excludePatterns, url)) {
        injectStyles(styleContent, fileName);
        console.log(`[PKU Art] ${fileName} imported`);
      }
    });
  }
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414m-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094zM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12m0 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-8 3a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414m14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1"/></g></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12.477 4.546a1.01 1.01 0 0 1 1.097-1.409A9 9 0 0 1 12 21c-4.434 0-8.118-3.206-8.863-7.426a1.01 1.01 0 0 1 1.409-1.097a6 6 0 0 0 7.931-7.931m2.404 1.072a8 8 0 0 1-9.263 9.263A7.002 7.002 0 0 0 19 12.001a7 7 0 0 0-4.12-6.383ZM5.565 7.716l.064.14a3.26 3.26 0 0 0 1.237 1.363l.1.059a.068.068 0 0 1 0 .118l-.1.058a3.26 3.26 0 0 0-1.237 1.364l-.064.14a.071.071 0 0 1-.13 0l-.064-.14a3.26 3.26 0 0 0-1.237-1.364l-.1-.058a.068.068 0 0 1 0-.118l.1-.059A3.26 3.26 0 0 0 5.37 7.855l.064-.14a.071.071 0 0 1 .13 0Zm2.832-4.859c.04-.09.166-.09.206 0l.102.222a5.2 5.2 0 0 0 1.97 2.172l.157.092a.108.108 0 0 1 0 .189l-.158.092a5.2 5.2 0 0 0-2.07 2.394a.113.113 0 0 1-.207 0l-.102-.222a5.2 5.2 0 0 0-1.97-2.172l-.158-.092a.108.108 0 0 1 0-.189l.158-.092a5.2 5.2 0 0 0 1.97-2.172z"/></g></svg>`;
  const autoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" fill-rule="nonzero" d="M19 3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4v1h1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h1v-1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-6 15h-2v1h2zm6-13H5v11h14z"/></g></svg>`;
  const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="PKU-Art i-download" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M20 15a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a1 1 0 1 1 2 0v4h14v-4a1 1 0 0 1 1-1M12 2a1 1 0 0 1 1 1v10.243l2.536-2.536a1 1 0 1 1 1.414 1.414l-4.066 4.066a1.25 1.25 0 0 1-1.768 0L7.05 12.121a1 1 0 1 1 1.414-1.414L11 13.243V3a1 1 0 0 1 1-1"/></g></svg>`;
  const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="PKU-Art i-link" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M1 10a5 5 0 0 1 5-5h6a5 5 0 0 1 0 10a1 1 0 1 1 0-2a3 3 0 1 0 0-6H6a3 3 0 0 0-.75 5.906a1 1 0 0 1-.5 1.936A5 5 0 0 1 1 10m11 1a3 3 0 1 0 0 6h6a3 3 0 0 0 .75-5.905a1 1 0 0 1 .5-1.937A5.002 5.002 0 0 1 18 19h-6a5 5 0 0 1 0-10a1 1 0 1 1 0 2"/></g></svg>`;
  const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M20 9a1 1 0 0 1 1 1v1a8 8 0 0 1-8 8H9.414l.793.793a1 1 0 0 1-1.414 1.414l-2.496-2.496a1 1 0 0 1-.287-.567L6 17.991a1 1 0 0 1 .237-.638l.056-.06l2.5-2.5a1 1 0 0 1 1.414 1.414L9.414 17H13a6 6 0 0 0 6-6v-1a1 1 0 0 1 1-1m-4.793-6.207l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5a1 1 0 1 1-1.414-1.414L14.586 7H11a6 6 0 0 0-6 6v1a1 1 0 1 1-2 0v-1a8 8 0 0 1 8-8h3.586l-.793-.793a1 1 0 0 1 1.414-1.414"/></g></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"/></g></svg>`;
  const validIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M21.192 5.465a1 1 0 0 1 0 1.414L9.95 18.122a1.1 1.1 0 0 1-1.556 0l-5.586-5.586a1 1 0 1 1 1.415-1.415l4.95 4.95L19.777 5.465a1 1 0 0 1 1.414 0Z"/></g></svg>`;
  const invalidIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"/></g></svg>`;
  var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_download = (() => typeof GM_download != "undefined" ? GM_download : void 0)();
  var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setClipboard = (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
  var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  class ThemeManager {
    constructor() {
      this.themeModes = {
        LIGHT: "light",
        DARK: "dark",
        AUTO: "auto"
      };
      this.storageKeys = {
        primary: "pku-art-theme-mode",
        legacy: "themeMode"
      };
      this.currentMode = this.getStoredTheme() || this.themeModes.AUTO;
      this.isDark = false;
      this.init();
    }
    init() {
      if (window.matchMedia) {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.mediaQuery.addEventListener("change", () => {
          if (this.currentMode === this.themeModes.AUTO) {
            this.updateTheme();
          }
        });
      }
      this.setupSyncListeners();
      this.updateTheme();
      console.log("[PKU Art] ThemeManager initialized with mode:", this.currentMode);
    }
    getStoredTheme() {
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      if (typeof _GM_getValue === "function") {
        for (const key of keys) {
          try {
            const value = _GM_getValue(key, null);
            if (this.isValidMode(value)) {
              return value;
            }
          } catch (error) {
          }
        }
      }
      try {
        for (const key of keys) {
          const value = localStorage.getItem(key);
          if (this.isValidMode(value)) {
            return value;
          }
        }
      } catch (error) {
        console.warn("[PKU Art] localStorage unavailable when reading theme mode:", error);
      }
      return null;
    }
    setStoredTheme(mode) {
      if (!this.isValidMode(mode)) {
        return;
      }
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      let gmStored = false;
      if (typeof _GM_setValue === "function") {
        for (const key of keys) {
          try {
            _GM_setValue(key, mode);
            gmStored = true;
          } catch (error) {
          }
        }
      }
      let localStored = false;
      for (const key of keys) {
        try {
          localStorage.setItem(key, mode);
          localStored = true;
        } catch (error) {
        }
      }
      if (!gmStored && !localStored) {
        console.warn("[PKU Art] Failed to persist theme mode. Manual sync may not propagate to other frames.");
      }
    }
    setTheme(mode) {
      if (!Object.values(this.themeModes).includes(mode)) {
        console.warn("[PKU Art] Invalid theme mode:", mode);
        return;
      }
      this.currentMode = mode;
      this.setStoredTheme(mode);
      this.updateTheme();
      console.log("[PKU Art] Theme changed to:", mode);
    }
    updateTheme() {
      const shouldBeDark = this.resolveShouldBeDark(this.currentMode);
      this.isDark = shouldBeDark;
      this.applyTheme(shouldBeDark);
    }
    applyTheme(isDark, broadcast = true) {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("pku-art-dark");
        root.classList.remove("pku-art-light");
      } else {
        root.classList.add("pku-art-light");
        root.classList.remove("pku-art-dark");
      }
      window.dispatchEvent(
        new CustomEvent("pku-art-theme-change", {
          detail: { isDark, mode: this.currentMode }
        })
      );
      if (broadcast) {
        this.broadcastThemeToIframes();
      }
    }
    getCurrentMode() {
      return this.currentMode;
    }
    isDarkMode() {
      return this.isDark;
    }
    resolveShouldBeDark(mode) {
      switch (mode) {
        case this.themeModes.LIGHT:
          return false;
        case this.themeModes.DARK:
          return true;
        case this.themeModes.AUTO:
          return this.mediaQuery ? this.mediaQuery.matches : false;
        default:
          return false;
      }
    }
    isValidMode(mode) {
      return Object.values(this.themeModes).includes(mode);
    }
    setupSyncListeners() {
      this.setupGMValueListeners();
      this.setupLocalStorageListener();
      this.setupPostMessageListener();
    }
    setupLocalStorageListener() {
      window.addEventListener("storage", (event) => {
        if (!event || !event.key) {
          return;
        }
        if (![this.storageKeys.primary, this.storageKeys.legacy].includes(event.key)) {
          return;
        }
        this.handleExternalThemeChange(event.newValue);
      });
    }
    setupGMValueListeners() {
      if (typeof _GM_addValueChangeListener !== "function") {
        return;
      }
      const keys = [this.storageKeys.primary, this.storageKeys.legacy];
      keys.forEach((key) => {
        try {
          _GM_addValueChangeListener(key, (_name, _oldValue, newValue, remote) => {
            if (!remote) {
              return;
            }
            this.handleExternalThemeChange(newValue);
          });
        } catch (error) {
          console.warn("[PKU Art] GM_addValueChangeListener unavailable for key:", key, error);
        }
      });
    }
    handleExternalThemeChange(rawValue) {
      const incomingMode = this.isValidMode(rawValue) ? rawValue : this.themeModes.AUTO;
      if (incomingMode !== this.currentMode) {
        this.currentMode = incomingMode;
        this.updateTheme();
        return;
      }
      const shouldBeDark = this.resolveShouldBeDark(incomingMode);
      if (shouldBeDark !== this.isDark) {
        this.isDark = shouldBeDark;
        this.applyTheme(shouldBeDark);
      }
    }
    setupPostMessageListener() {
      window.addEventListener("message", (event) => {
        var _a;
        if (!event.data || typeof event.data !== "object") {
          return;
        }
        if (event.data.type === "pku-art-theme-request") {
          (_a = event.source) == null ? void 0 : _a.postMessage(
            {
              type: "pku-art-theme-sync",
              mode: this.currentMode,
              isDark: this.isDark
            },
            "*"
          );
          return;
        }
        if (event.data.type === "pku-art-theme-sync") {
          const { mode, isDark } = event.data;
          if (this.isValidMode(mode) && mode !== this.currentMode) {
            this.currentMode = mode;
            this.isDark = isDark;
            this.applyTheme(isDark, false);
            if (window.parent === window) {
              this.broadcastThemeToIframes(event.source);
            }
          }
        }
      });
      this.requestThemeFromParent();
    }
    broadcastThemeToIframes(excludeSource = null) {
      const message = {
        type: "pku-art-theme-sync",
        mode: this.currentMode,
        isDark: this.isDark
      };
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        try {
          if (iframe.contentWindow && iframe.contentWindow !== excludeSource) {
            iframe.contentWindow.postMessage(message, "*");
          }
        } catch (e) {
        }
      });
    }
    requestThemeFromParent() {
      if (window.parent !== window) {
        try {
          window.parent.postMessage({ type: "pku-art-theme-request" }, "*");
        } catch (e) {
        }
      }
    }
  }
  const themeToggleIcons = {
    light: sunIcon,
    dark: moonIcon,
    auto: autoIcon
  };
  function initializeThemeManager() {
    const userThemeMode = themeManager.getStoredTheme() || "auto";
    themeManager.setTheme(userThemeMode);
    console.log("[PKU Art] Theme manager initialized with mode:", userThemeMode);
  }
  function initializeThemeToggleButton() {
    if (!/^https:\/\/(course|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    let attempts = 0;
    const maxAttempts = 20;
    const attachToggle = () => {
      if (document.querySelector(".pku-art-theme-toggle")) {
        return;
      }
      const remindLink = document.querySelector("#global-nav-link");
      const navWrap = document.querySelector(".global-nav-bar-wrap");
      if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        if (!remindLink || !navWrap) {
          if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(attachToggle, 300);
          }
          return;
        }
      }
      const menuExit = document.querySelector('#menu li:first-of-type:has(a[href="/elective2008/logout.do"])');
      if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
        if (!menuExit) {
          if (attempts < maxAttempts) {
            attempts += 1;
            setTimeout(attachToggle, 300);
          }
          return;
        }
      }
      const wrapper = document.createElement("div");
      wrapper.className = "pku-art-theme-toggle-bar";
      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.className = "pku-art-theme-toggle";
      toggleButton.setAttribute("aria-label", "切换日夜模式");
      const setIconMarkup = (mode) => {
        const normalizedMode = themeToggleIcons[mode] ? mode : "auto";
        if (toggleButton.dataset.icon !== normalizedMode) {
          toggleButton.innerHTML = themeToggleIcons[normalizedMode];
          toggleButton.dataset.icon = normalizedMode;
        }
      };
      const updateButtonState = () => {
        const currentMode = themeManager.getCurrentMode();
        const isDark = themeManager.isDarkMode();
        let tooltipText = "切换主题";
        if (currentMode === "auto") {
          toggleButton.dataset.mode = "auto";
          toggleButton.dataset.state = isDark ? "dark" : "light";
          tooltipText = isDark ? "跟随系统（当前：黑夜模式）" : "跟随系统（当前：日间模式）";
          setIconMarkup("auto");
        } else if (currentMode === "dark") {
          tooltipText = "黑夜模式";
          toggleButton.dataset.mode = "dark";
          toggleButton.removeAttribute("data-state");
          setIconMarkup("dark");
        } else {
          tooltipText = "日间模式";
          toggleButton.dataset.mode = "light";
          toggleButton.removeAttribute("data-state");
          setIconMarkup("light");
        }
        toggleButton.setAttribute("title", tooltipText);
      };
      const persistThemeMode = (mode) => {
        try {
          if (typeof _GM_setValue !== "undefined") {
            _GM_setValue("themeMode", mode);
            return;
          }
        } catch (error) {
          console.warn("[PKU Art] GM_setValue unavailable for themeMode persistence:", error);
        }
        try {
          localStorage.setItem("themeMode", mode);
        } catch (storageError) {
          console.warn("[PKU Art] localStorage unavailable for themeMode persistence:", storageError);
        }
      };
      const cycleThemeMode = () => {
        const currentMode = themeManager.getCurrentMode();
        let nextMode = "light";
        if (currentMode === "light") {
          nextMode = "dark";
        } else if (currentMode === "dark") {
          nextMode = "auto";
        }
        themeManager.setTheme(nextMode);
        persistThemeMode(nextMode);
        updateButtonState();
      };
      toggleButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        cycleThemeMode();
      });
      wrapper.appendChild(toggleButton);
      if (/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
        const navBarItem = remindLink.closest(".global-nav-bar");
        wrapper.classList.add("global-nav-bar");
        if (navBarItem && navBarItem.parentElement) {
          navBarItem.parentElement.insertBefore(wrapper, navBarItem.nextSibling);
        } else {
          navWrap.appendChild(wrapper);
        }
      }
      if (/^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
        if (menuExit && menuExit.parentElement) {
          menuExit.parentElement.insertBefore(wrapper, menuExit.nextSibling);
        }
      }
      updateButtonState();
      window.addEventListener("pku-art-theme-change", updateButtonState);
    };
    attachToggle();
    document.addEventListener("DOMContentLoaded", attachToggle);
    window.addEventListener("load", attachToggle);
  }
  window.PKUArtThemeManager = new ThemeManager();
  const themeManager = window.PKUArtThemeManager;
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var mux$1 = { exports: {} };
  var window_1;
  var hasRequiredWindow;
  function requireWindow() {
    if (hasRequiredWindow) return window_1;
    hasRequiredWindow = 1;
    var win;
    if (typeof window !== "undefined") {
      win = window;
    } else if (typeof commonjsGlobal !== "undefined") {
      win = commonjsGlobal;
    } else if (typeof self !== "undefined") {
      win = self;
    } else {
      win = {};
    }
    window_1 = win;
    return window_1;
  }
  /*! @name mux.js @version 7.1.0 @license Apache-2.0 */
  var mux = mux$1.exports;
  var hasRequiredMux;
  function requireMux() {
    if (hasRequiredMux) return mux$1.exports;
    hasRequiredMux = 1;
    (function(module, exports$1) {
      (function(global2, factory) {
        module.exports = factory(requireWindow());
      })(mux, (function(window2) {
        function _interopDefaultLegacy(e) {
          return e && typeof e === "object" && "default" in e ? e : { "default": e };
        }
        var window__default = _interopDefaultLegacy(window2);
        var Stream = function Stream2() {
          this.init = function() {
            var listeners = {};
            this.on = function(type2, listener) {
              if (!listeners[type2]) {
                listeners[type2] = [];
              }
              listeners[type2] = listeners[type2].concat(listener);
            };
            this.off = function(type2, listener) {
              var index;
              if (!listeners[type2]) {
                return false;
              }
              index = listeners[type2].indexOf(listener);
              listeners[type2] = listeners[type2].slice();
              listeners[type2].splice(index, 1);
              return index > -1;
            };
            this.trigger = function(type2) {
              var callbacks, i, length, args;
              callbacks = listeners[type2];
              if (!callbacks) {
                return;
              }
              if (arguments.length === 2) {
                length = callbacks.length;
                for (i = 0; i < length; ++i) {
                  callbacks[i].call(this, arguments[1]);
                }
              } else {
                args = [];
                i = arguments.length;
                for (i = 1; i < arguments.length; ++i) {
                  args.push(arguments[i]);
                }
                length = callbacks.length;
                for (i = 0; i < length; ++i) {
                  callbacks[i].apply(this, args);
                }
              }
            };
            this.dispose = function() {
              listeners = {};
            };
          };
        };
        Stream.prototype.pipe = function(destination) {
          this.on("data", function(data) {
            destination.push(data);
          });
          this.on("done", function(flushSource) {
            destination.flush(flushSource);
          });
          this.on("partialdone", function(flushSource) {
            destination.partialFlush(flushSource);
          });
          this.on("endedtimeline", function(flushSource) {
            destination.endTimeline(flushSource);
          });
          this.on("reset", function(flushSource) {
            destination.reset(flushSource);
          });
          return destination;
        };
        Stream.prototype.push = function(data) {
          this.trigger("data", data);
        };
        Stream.prototype.flush = function(flushSource) {
          this.trigger("done", flushSource);
        };
        Stream.prototype.partialFlush = function(flushSource) {
          this.trigger("partialdone", flushSource);
        };
        Stream.prototype.endTimeline = function(flushSource) {
          this.trigger("endedtimeline", flushSource);
        };
        Stream.prototype.reset = function(flushSource) {
          this.trigger("reset", flushSource);
        };
        var stream = Stream;
        var ONE_SECOND_IN_TS$5 = 9e4, secondsToVideoTs, secondsToAudioTs, videoTsToSeconds, audioTsToSeconds, audioTsToVideoTs, videoTsToAudioTs, metadataTsToSeconds;
        secondsToVideoTs = function secondsToVideoTs2(seconds) {
          return seconds * ONE_SECOND_IN_TS$5;
        };
        secondsToAudioTs = function secondsToAudioTs2(seconds, sampleRate) {
          return seconds * sampleRate;
        };
        videoTsToSeconds = function videoTsToSeconds2(timestamp) {
          return timestamp / ONE_SECOND_IN_TS$5;
        };
        audioTsToSeconds = function audioTsToSeconds2(timestamp, sampleRate) {
          return timestamp / sampleRate;
        };
        audioTsToVideoTs = function audioTsToVideoTs2(timestamp, sampleRate) {
          return secondsToVideoTs(audioTsToSeconds(timestamp, sampleRate));
        };
        videoTsToAudioTs = function videoTsToAudioTs2(timestamp, sampleRate) {
          return secondsToAudioTs(videoTsToSeconds(timestamp), sampleRate);
        };
        metadataTsToSeconds = function metadataTsToSeconds2(timestamp, timelineStartPts, keepOriginalTimestamps) {
          return videoTsToSeconds(keepOriginalTimestamps ? timestamp : timestamp - timelineStartPts);
        };
        var clock = {
          ONE_SECOND_IN_TS: ONE_SECOND_IN_TS$5,
          secondsToVideoTs,
          secondsToAudioTs,
          videoTsToSeconds,
          audioTsToSeconds,
          audioTsToVideoTs,
          videoTsToAudioTs,
          metadataTsToSeconds
        };
        var ONE_SECOND_IN_TS$4 = clock.ONE_SECOND_IN_TS;
        var _AdtsStream;
        var ADTS_SAMPLING_FREQUENCIES$1 = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
        _AdtsStream = function AdtsStream(handlePartialSegments) {
          var buffer, frameNum = 0;
          _AdtsStream.prototype.init.call(this);
          this.skipWarn_ = function(start, end) {
            this.trigger("log", {
              level: "warn",
              message: "adts skiping bytes " + start + " to " + end + " in frame " + frameNum + " outside syncword"
            });
          };
          this.push = function(packet) {
            var i = 0, frameLength, protectionSkipBytes, oldBuffer, sampleCount, adtsFrameDuration;
            if (!handlePartialSegments) {
              frameNum = 0;
            }
            if (packet.type !== "audio") {
              return;
            }
            if (buffer && buffer.length) {
              oldBuffer = buffer;
              buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
              buffer.set(oldBuffer);
              buffer.set(packet.data, oldBuffer.byteLength);
            } else {
              buffer = packet.data;
            }
            var skip;
            while (i + 7 < buffer.length) {
              if (buffer[i] !== 255 || (buffer[i + 1] & 246) !== 240) {
                if (typeof skip !== "number") {
                  skip = i;
                }
                i++;
                continue;
              }
              if (typeof skip === "number") {
                this.skipWarn_(skip, i);
                skip = null;
              }
              protectionSkipBytes = (~buffer[i + 1] & 1) * 2;
              frameLength = (buffer[i + 3] & 3) << 11 | buffer[i + 4] << 3 | (buffer[i + 5] & 224) >> 5;
              sampleCount = ((buffer[i + 6] & 3) + 1) * 1024;
              adtsFrameDuration = sampleCount * ONE_SECOND_IN_TS$4 / ADTS_SAMPLING_FREQUENCIES$1[(buffer[i + 2] & 60) >>> 2];
              if (buffer.byteLength - i < frameLength) {
                break;
              }
              this.trigger("data", {
                pts: packet.pts + frameNum * adtsFrameDuration,
                dts: packet.dts + frameNum * adtsFrameDuration,
                sampleCount,
                audioobjecttype: (buffer[i + 2] >>> 6 & 3) + 1,
                channelcount: (buffer[i + 2] & 1) << 2 | (buffer[i + 3] & 192) >>> 6,
                samplerate: ADTS_SAMPLING_FREQUENCIES$1[(buffer[i + 2] & 60) >>> 2],
                samplingfrequencyindex: (buffer[i + 2] & 60) >>> 2,
samplesize: 16,
data: buffer.subarray(i + 7 + protectionSkipBytes, i + frameLength)
              });
              frameNum++;
              i += frameLength;
            }
            if (typeof skip === "number") {
              this.skipWarn_(skip, i);
              skip = null;
            }
            buffer = buffer.subarray(i);
          };
          this.flush = function() {
            frameNum = 0;
            this.trigger("done");
          };
          this.reset = function() {
            buffer = void 0;
            this.trigger("reset");
          };
          this.endTimeline = function() {
            buffer = void 0;
            this.trigger("endedtimeline");
          };
        };
        _AdtsStream.prototype = new stream();
        var adts = _AdtsStream;
        var ExpGolomb;
        ExpGolomb = function ExpGolomb2(workingData) {
          var workingBytesAvailable = workingData.byteLength, workingWord = 0, workingBitsAvailable = 0;
          this.length = function() {
            return 8 * workingBytesAvailable;
          };
          this.bitsAvailable = function() {
            return 8 * workingBytesAvailable + workingBitsAvailable;
          };
          this.loadWord = function() {
            var position = workingData.byteLength - workingBytesAvailable, workingBytes = new Uint8Array(4), availableBytes = Math.min(4, workingBytesAvailable);
            if (availableBytes === 0) {
              throw new Error("no bytes available");
            }
            workingBytes.set(workingData.subarray(position, position + availableBytes));
            workingWord = new DataView(workingBytes.buffer).getUint32(0);
            workingBitsAvailable = availableBytes * 8;
            workingBytesAvailable -= availableBytes;
          };
          this.skipBits = function(count) {
            var skipBytes;
            if (workingBitsAvailable > count) {
              workingWord <<= count;
              workingBitsAvailable -= count;
            } else {
              count -= workingBitsAvailable;
              skipBytes = Math.floor(count / 8);
              count -= skipBytes * 8;
              workingBytesAvailable -= skipBytes;
              this.loadWord();
              workingWord <<= count;
              workingBitsAvailable -= count;
            }
          };
          this.readBits = function(size) {
            var bits = Math.min(workingBitsAvailable, size), valu = workingWord >>> 32 - bits;
            workingBitsAvailable -= bits;
            if (workingBitsAvailable > 0) {
              workingWord <<= bits;
            } else if (workingBytesAvailable > 0) {
              this.loadWord();
            }
            bits = size - bits;
            if (bits > 0) {
              return valu << bits | this.readBits(bits);
            }
            return valu;
          };
          this.skipLeadingZeros = function() {
            var leadingZeroCount;
            for (leadingZeroCount = 0; leadingZeroCount < workingBitsAvailable; ++leadingZeroCount) {
              if ((workingWord & 2147483648 >>> leadingZeroCount) !== 0) {
                workingWord <<= leadingZeroCount;
                workingBitsAvailable -= leadingZeroCount;
                return leadingZeroCount;
              }
            }
            this.loadWord();
            return leadingZeroCount + this.skipLeadingZeros();
          };
          this.skipUnsignedExpGolomb = function() {
            this.skipBits(1 + this.skipLeadingZeros());
          };
          this.skipExpGolomb = function() {
            this.skipBits(1 + this.skipLeadingZeros());
          };
          this.readUnsignedExpGolomb = function() {
            var clz = this.skipLeadingZeros();
            return this.readBits(clz + 1) - 1;
          };
          this.readExpGolomb = function() {
            var valu = this.readUnsignedExpGolomb();
            if (1 & valu) {
              return 1 + valu >>> 1;
            }
            return -1 * (valu >>> 1);
          };
          this.readBoolean = function() {
            return this.readBits(1) === 1;
          };
          this.readUnsignedByte = function() {
            return this.readBits(8);
          };
          this.loadWord();
        };
        var expGolomb = ExpGolomb;
        var _H264Stream, _NalByteStream;
        var PROFILES_WITH_OPTIONAL_SPS_DATA;
        _NalByteStream = function NalByteStream() {
          var syncPoint = 0, i, buffer;
          _NalByteStream.prototype.init.call(this);
          this.push = function(data) {
            var swapBuffer;
            if (!buffer) {
              buffer = data.data;
            } else {
              swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
              swapBuffer.set(buffer);
              swapBuffer.set(data.data, buffer.byteLength);
              buffer = swapBuffer;
            }
            var len = buffer.byteLength;
            for (; syncPoint < len - 3; syncPoint++) {
              if (buffer[syncPoint + 2] === 1) {
                i = syncPoint + 5;
                break;
              }
            }
            while (i < len) {
              switch (buffer[i]) {
                case 0:
                  if (buffer[i - 1] !== 0) {
                    i += 2;
                    break;
                  } else if (buffer[i - 2] !== 0) {
                    i++;
                    break;
                  }
                  if (syncPoint + 3 !== i - 2) {
                    this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
                  }
                  do {
                    i++;
                  } while (buffer[i] !== 1 && i < len);
                  syncPoint = i - 2;
                  i += 3;
                  break;
                case 1:
                  if (buffer[i - 1] !== 0 || buffer[i - 2] !== 0) {
                    i += 3;
                    break;
                  }
                  this.trigger("data", buffer.subarray(syncPoint + 3, i - 2));
                  syncPoint = i - 2;
                  i += 3;
                  break;
                default:
                  i += 3;
                  break;
              }
            }
            buffer = buffer.subarray(syncPoint);
            i -= syncPoint;
            syncPoint = 0;
          };
          this.reset = function() {
            buffer = null;
            syncPoint = 0;
            this.trigger("reset");
          };
          this.flush = function() {
            if (buffer && buffer.byteLength > 3) {
              this.trigger("data", buffer.subarray(syncPoint + 3));
            }
            buffer = null;
            syncPoint = 0;
            this.trigger("done");
          };
          this.endTimeline = function() {
            this.flush();
            this.trigger("endedtimeline");
          };
        };
        _NalByteStream.prototype = new stream();
        PROFILES_WITH_OPTIONAL_SPS_DATA = {
          100: true,
          110: true,
          122: true,
          244: true,
          44: true,
          83: true,
          86: true,
          118: true,
          128: true,

138: true,
          139: true,
          134: true
        };
        _H264Stream = function H264Stream2() {
          var nalByteStream = new _NalByteStream(), self2, trackId, currentPts, currentDts, discardEmulationPreventionBytes2, readSequenceParameterSet, skipScalingList;
          _H264Stream.prototype.init.call(this);
          self2 = this;
          this.push = function(packet) {
            if (packet.type !== "video") {
              return;
            }
            trackId = packet.trackId;
            currentPts = packet.pts;
            currentDts = packet.dts;
            nalByteStream.push(packet);
          };
          nalByteStream.on("data", function(data) {
            var event = {
              trackId,
              pts: currentPts,
              dts: currentDts,
              data,
              nalUnitTypeCode: data[0] & 31
            };
            switch (event.nalUnitTypeCode) {
              case 5:
                event.nalUnitType = "slice_layer_without_partitioning_rbsp_idr";
                break;
              case 6:
                event.nalUnitType = "sei_rbsp";
                event.escapedRBSP = discardEmulationPreventionBytes2(data.subarray(1));
                break;
              case 7:
                event.nalUnitType = "seq_parameter_set_rbsp";
                event.escapedRBSP = discardEmulationPreventionBytes2(data.subarray(1));
                event.config = readSequenceParameterSet(event.escapedRBSP);
                break;
              case 8:
                event.nalUnitType = "pic_parameter_set_rbsp";
                break;
              case 9:
                event.nalUnitType = "access_unit_delimiter_rbsp";
                break;
            }
            self2.trigger("data", event);
          });
          nalByteStream.on("done", function() {
            self2.trigger("done");
          });
          nalByteStream.on("partialdone", function() {
            self2.trigger("partialdone");
          });
          nalByteStream.on("reset", function() {
            self2.trigger("reset");
          });
          nalByteStream.on("endedtimeline", function() {
            self2.trigger("endedtimeline");
          });
          this.flush = function() {
            nalByteStream.flush();
          };
          this.partialFlush = function() {
            nalByteStream.partialFlush();
          };
          this.reset = function() {
            nalByteStream.reset();
          };
          this.endTimeline = function() {
            nalByteStream.endTimeline();
          };
          skipScalingList = function skipScalingList2(count, expGolombDecoder) {
            var lastScale = 8, nextScale = 8, j, deltaScale;
            for (j = 0; j < count; j++) {
              if (nextScale !== 0) {
                deltaScale = expGolombDecoder.readExpGolomb();
                nextScale = (lastScale + deltaScale + 256) % 256;
              }
              lastScale = nextScale === 0 ? lastScale : nextScale;
            }
          };
          discardEmulationPreventionBytes2 = function discardEmulationPreventionBytes3(data) {
            var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;
            while (i < length - 2) {
              if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
                emulationPreventionBytesPositions.push(i + 2);
                i += 2;
              } else {
                i++;
              }
            }
            if (emulationPreventionBytesPositions.length === 0) {
              return data;
            }
            newLength = length - emulationPreventionBytesPositions.length;
            newData = new Uint8Array(newLength);
            var sourceIndex = 0;
            for (i = 0; i < newLength; sourceIndex++, i++) {
              if (sourceIndex === emulationPreventionBytesPositions[0]) {
                sourceIndex++;
                emulationPreventionBytesPositions.shift();
              }
              newData[i] = data[sourceIndex];
            }
            return newData;
          };
          readSequenceParameterSet = function readSequenceParameterSet2(data) {
            var frameCropLeftOffset = 0, frameCropRightOffset = 0, frameCropTopOffset = 0, frameCropBottomOffset = 0, expGolombDecoder, profileIdc, levelIdc, profileCompatibility, chromaFormatIdc, picOrderCntType, numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1, picHeightInMapUnitsMinus1, frameMbsOnlyFlag, scalingListCount, sarRatio = [1, 1], aspectRatioIdc, i;
            expGolombDecoder = new expGolomb(data);
            profileIdc = expGolombDecoder.readUnsignedByte();
            profileCompatibility = expGolombDecoder.readUnsignedByte();
            levelIdc = expGolombDecoder.readUnsignedByte();
            expGolombDecoder.skipUnsignedExpGolomb();
            if (PROFILES_WITH_OPTIONAL_SPS_DATA[profileIdc]) {
              chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();
              if (chromaFormatIdc === 3) {
                expGolombDecoder.skipBits(1);
              }
              expGolombDecoder.skipUnsignedExpGolomb();
              expGolombDecoder.skipUnsignedExpGolomb();
              expGolombDecoder.skipBits(1);
              if (expGolombDecoder.readBoolean()) {
                scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
                for (i = 0; i < scalingListCount; i++) {
                  if (expGolombDecoder.readBoolean()) {
                    if (i < 6) {
                      skipScalingList(16, expGolombDecoder);
                    } else {
                      skipScalingList(64, expGolombDecoder);
                    }
                  }
                }
              }
            }
            expGolombDecoder.skipUnsignedExpGolomb();
            picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();
            if (picOrderCntType === 0) {
              expGolombDecoder.readUnsignedExpGolomb();
            } else if (picOrderCntType === 1) {
              expGolombDecoder.skipBits(1);
              expGolombDecoder.skipExpGolomb();
              expGolombDecoder.skipExpGolomb();
              numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();
              for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
                expGolombDecoder.skipExpGolomb();
              }
            }
            expGolombDecoder.skipUnsignedExpGolomb();
            expGolombDecoder.skipBits(1);
            picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
            picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
            frameMbsOnlyFlag = expGolombDecoder.readBits(1);
            if (frameMbsOnlyFlag === 0) {
              expGolombDecoder.skipBits(1);
            }
            expGolombDecoder.skipBits(1);
            if (expGolombDecoder.readBoolean()) {
              frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
              frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
              frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
              frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
            }
            if (expGolombDecoder.readBoolean()) {
              if (expGolombDecoder.readBoolean()) {
                aspectRatioIdc = expGolombDecoder.readUnsignedByte();
                switch (aspectRatioIdc) {
                  case 1:
                    sarRatio = [1, 1];
                    break;
                  case 2:
                    sarRatio = [12, 11];
                    break;
                  case 3:
                    sarRatio = [10, 11];
                    break;
                  case 4:
                    sarRatio = [16, 11];
                    break;
                  case 5:
                    sarRatio = [40, 33];
                    break;
                  case 6:
                    sarRatio = [24, 11];
                    break;
                  case 7:
                    sarRatio = [20, 11];
                    break;
                  case 8:
                    sarRatio = [32, 11];
                    break;
                  case 9:
                    sarRatio = [80, 33];
                    break;
                  case 10:
                    sarRatio = [18, 11];
                    break;
                  case 11:
                    sarRatio = [15, 11];
                    break;
                  case 12:
                    sarRatio = [64, 33];
                    break;
                  case 13:
                    sarRatio = [160, 99];
                    break;
                  case 14:
                    sarRatio = [4, 3];
                    break;
                  case 15:
                    sarRatio = [3, 2];
                    break;
                  case 16:
                    sarRatio = [2, 1];
                    break;
                  case 255: {
                    sarRatio = [expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte(), expGolombDecoder.readUnsignedByte() << 8 | expGolombDecoder.readUnsignedByte()];
                    break;
                  }
                }
                if (sarRatio) {
                  sarRatio[0] / sarRatio[1];
                }
              }
            }
            return {
              profileIdc,
              levelIdc,
              profileCompatibility,
              width: (picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2,
              height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - frameCropTopOffset * 2 - frameCropBottomOffset * 2,
sarRatio
            };
          };
        };
        _H264Stream.prototype = new stream();
        var h264 = {
          H264Stream: _H264Stream,
          NalByteStream: _NalByteStream
        };
        var codecs = {
          Adts: adts,
          h264
        };
        var MAX_UINT32$1 = Math.pow(2, 32);
        var getUint64$5 = function getUint642(uint8) {
          var dv = new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
          var value;
          if (dv.getBigUint64) {
            value = dv.getBigUint64(0);
            if (value < Number.MAX_SAFE_INTEGER) {
              return Number(value);
            }
            return value;
          }
          return dv.getUint32(0) * MAX_UINT32$1 + dv.getUint32(4);
        };
        var numbers = {
          getUint64: getUint64$5,
          MAX_UINT32: MAX_UINT32$1
        };
        var MAX_UINT32 = numbers.MAX_UINT32;
        var box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, mvex, mvhd, trak, tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, traf, trex, trun$1, types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR, AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS;
        (function() {
          var i;
          types = {
            avc1: [],
avcC: [],
            btrt: [],
            dinf: [],
            dref: [],
            esds: [],
            ftyp: [],
            hdlr: [],
            mdat: [],
            mdhd: [],
            mdia: [],
            mfhd: [],
            minf: [],
            moof: [],
            moov: [],
            mp4a: [],
mvex: [],
            mvhd: [],
            pasp: [],
            sdtp: [],
            smhd: [],
            stbl: [],
            stco: [],
            stsc: [],
            stsd: [],
            stsz: [],
            stts: [],
            styp: [],
            tfdt: [],
            tfhd: [],
            traf: [],
            trak: [],
            trun: [],
            trex: [],
            tkhd: [],
            vmhd: []
          };
          if (typeof Uint8Array === "undefined") {
            return;
          }
          for (i in types) {
            if (types.hasOwnProperty(i)) {
              types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
            }
          }
          MAJOR_BRAND = new Uint8Array(["i".charCodeAt(0), "s".charCodeAt(0), "o".charCodeAt(0), "m".charCodeAt(0)]);
          AVC1_BRAND = new Uint8Array(["a".charCodeAt(0), "v".charCodeAt(0), "c".charCodeAt(0), "1".charCodeAt(0)]);
          MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
          VIDEO_HDLR = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            0,
118,
            105,
            100,
            101,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
86,
            105,
            100,
            101,
            111,
            72,
            97,
            110,
            100,
            108,
            101,
            114,
            0
]);
          AUDIO_HDLR = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            0,
115,
            111,
            117,
            110,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
83,
            111,
            117,
            110,
            100,
            72,
            97,
            110,
            100,
            108,
            101,
            114,
            0
]);
          HDLR_TYPES = {
            video: VIDEO_HDLR,
            audio: AUDIO_HDLR
          };
          DREF = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            1,
0,
            0,
            0,
            12,
117,
            114,
            108,
            32,
0,
0,
            0,
            1
]);
          SMHD = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
0,
            0
]);
          STCO = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            0
]);
          STSC = STCO;
          STSZ = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0
]);
          STTS = STCO;
          VMHD = new Uint8Array([
            0,
0,
            0,
            1,
0,
            0,
0,
            0,
            0,
            0,
            0,
            0
]);
        })();
        box = function box2(type2) {
          var payload = [], size = 0, i, result, view;
          for (i = 1; i < arguments.length; i++) {
            payload.push(arguments[i]);
          }
          i = payload.length;
          while (i--) {
            size += payload[i].byteLength;
          }
          result = new Uint8Array(size + 8);
          view = new DataView(result.buffer, result.byteOffset, result.byteLength);
          view.setUint32(0, result.byteLength);
          result.set(type2, 4);
          for (i = 0, size = 8; i < payload.length; i++) {
            result.set(payload[i], size);
            size += payload[i].byteLength;
          }
          return result;
        };
        dinf = function dinf2() {
          return box(types.dinf, box(types.dref, DREF));
        };
        esds = function esds2(track) {
          return box(types.esds, new Uint8Array([
            0,
0,
            0,
            0,

3,
25,
0,
            0,
0,

4,
17,
64,
21,
0,
            6,
            0,
0,
            0,
            218,
            192,
0,
            0,
            218,
            192,

5,
2,


track.audioobjecttype << 3 | track.samplingfrequencyindex >>> 1,
            track.samplingfrequencyindex << 7 | track.channelcount << 3,
            6,
            1,
            2
]));
        };
        ftyp = function ftyp2() {
          return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
        };
        hdlr = function hdlr2(type2) {
          return box(types.hdlr, HDLR_TYPES[type2]);
        };
        mdat = function mdat2(data) {
          return box(types.mdat, data);
        };
        mdhd = function mdhd2(track) {
          var result = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            2,
0,
            0,
            0,
            3,
0,
            1,
            95,
            144,
track.duration >>> 24 & 255,
            track.duration >>> 16 & 255,
            track.duration >>> 8 & 255,
            track.duration & 255,
85,
            196,
0,
            0
          ]);
          if (track.samplerate) {
            result[12] = track.samplerate >>> 24 & 255;
            result[13] = track.samplerate >>> 16 & 255;
            result[14] = track.samplerate >>> 8 & 255;
            result[15] = track.samplerate & 255;
          }
          return box(types.mdhd, result);
        };
        mdia = function mdia2(track) {
          return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
        };
        mfhd = function mfhd2(sequenceNumber) {
          return box(types.mfhd, new Uint8Array([
            0,
            0,
            0,
            0,
(sequenceNumber & 4278190080) >> 24,
            (sequenceNumber & 16711680) >> 16,
            (sequenceNumber & 65280) >> 8,
            sequenceNumber & 255
]));
        };
        minf = function minf2(track) {
          return box(types.minf, track.type === "video" ? box(types.vmhd, VMHD) : box(types.smhd, SMHD), dinf(), stbl(track));
        };
        moof = function moof2(sequenceNumber, tracks) {
          var trackFragments = [], i = tracks.length;
          while (i--) {
            trackFragments[i] = traf(tracks[i]);
          }
          return box.apply(null, [types.moof, mfhd(sequenceNumber)].concat(trackFragments));
        };
        moov = function moov2(tracks) {
          var i = tracks.length, boxes = [];
          while (i--) {
            boxes[i] = trak(tracks[i]);
          }
          return box.apply(null, [types.moov, mvhd(4294967295)].concat(boxes).concat(mvex(tracks)));
        };
        mvex = function mvex2(tracks) {
          var i = tracks.length, boxes = [];
          while (i--) {
            boxes[i] = trex(tracks[i]);
          }
          return box.apply(null, [types.mvex].concat(boxes));
        };
        mvhd = function mvhd2(duration) {
          var bytes = new Uint8Array([
            0,
0,
            0,
            0,
0,
            0,
            0,
            1,
0,
            0,
            0,
            2,
0,
            1,
            95,
            144,
(duration & 4278190080) >> 24,
            (duration & 16711680) >> 16,
            (duration & 65280) >> 8,
            duration & 255,
0,
            1,
            0,
            0,
1,
            0,
0,
            0,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            64,
            0,
            0,
            0,
0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
255,
            255,
            255,
            255
]);
          return box(types.mvhd, bytes);
        };
        sdtp = function sdtp2(track) {
          var samples2 = track.samples || [], bytes = new Uint8Array(4 + samples2.length), flags, i;
          for (i = 0; i < samples2.length; i++) {
            flags = samples2[i].flags;
            bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
          }
          return box(types.sdtp, bytes);
        };
        stbl = function stbl2(track) {
          return box(types.stbl, stsd(track), box(types.stts, STTS), box(types.stsc, STSC), box(types.stsz, STSZ), box(types.stco, STCO));
        };
        (function() {
          var videoSample, audioSample;
          stsd = function stsd2(track) {
            return box(types.stsd, new Uint8Array([
              0,
0,
              0,
              0,
0,
              0,
              0,
              1
            ]), track.type === "video" ? videoSample(track) : audioSample(track));
          };
          videoSample = function videoSample2(track) {
            var sps = track.sps || [], pps = track.pps || [], sequenceParameterSets = [], pictureParameterSets = [], i, avc1Box;
            for (i = 0; i < sps.length; i++) {
              sequenceParameterSets.push((sps[i].byteLength & 65280) >>> 8);
              sequenceParameterSets.push(sps[i].byteLength & 255);
              sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i]));
            }
            for (i = 0; i < pps.length; i++) {
              pictureParameterSets.push((pps[i].byteLength & 65280) >>> 8);
              pictureParameterSets.push(pps[i].byteLength & 255);
              pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
            }
            avc1Box = [types.avc1, new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
0,
              1,
0,
              0,
0,
              0,
0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
(track.width & 65280) >> 8,
              track.width & 255,
(track.height & 65280) >> 8,
              track.height & 255,
0,
              72,
              0,
              0,
0,
              72,
              0,
              0,
0,
              0,
              0,
              0,
0,
              1,
19,
              118,
              105,
              100,
              101,
              111,
              106,
              115,
              45,
              99,
              111,
              110,
              116,
              114,
              105,
              98,
              45,
              104,
              108,
              115,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
0,
              24,
17,
              17
]), box(types.avcC, new Uint8Array([
              1,
track.profileIdc,
track.profileCompatibility,
track.levelIdc,
255
].concat(
              [sps.length],
sequenceParameterSets,
[pps.length],
pictureParameterSets
))), box(types.btrt, new Uint8Array([
              0,
              28,
              156,
              128,
0,
              45,
              198,
              192,
0,
              45,
              198,
              192
]))];
            if (track.sarRatio) {
              var hSpacing = track.sarRatio[0], vSpacing = track.sarRatio[1];
              avc1Box.push(box(types.pasp, new Uint8Array([(hSpacing & 4278190080) >> 24, (hSpacing & 16711680) >> 16, (hSpacing & 65280) >> 8, hSpacing & 255, (vSpacing & 4278190080) >> 24, (vSpacing & 16711680) >> 16, (vSpacing & 65280) >> 8, vSpacing & 255])));
            }
            return box.apply(null, avc1Box);
          };
          audioSample = function audioSample2(track) {
            return box(types.mp4a, new Uint8Array([
0,
              0,
              0,
              0,
              0,
              0,
0,
              1,

0,
              0,
              0,
              0,
0,
              0,
              0,
              0,
(track.channelcount & 65280) >> 8,
              track.channelcount & 255,
(track.samplesize & 65280) >> 8,
              track.samplesize & 255,
0,
              0,
0,
              0,
(track.samplerate & 65280) >> 8,
              track.samplerate & 255,
              0,
              0

]), esds(track));
          };
        })();
        tkhd = function tkhd2(track) {
          var result = new Uint8Array([
            0,
0,
            0,
            7,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
(track.id & 4278190080) >> 24,
            (track.id & 16711680) >> 16,
            (track.id & 65280) >> 8,
            track.id & 255,
0,
            0,
            0,
            0,
(track.duration & 4278190080) >> 24,
            (track.duration & 16711680) >> 16,
            (track.duration & 65280) >> 8,
            track.duration & 255,
0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
0,
            0,
0,
            0,
1,
            0,
0,
            0,
0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            64,
            0,
            0,
            0,
(track.width & 65280) >> 8,
            track.width & 255,
            0,
            0,
(track.height & 65280) >> 8,
            track.height & 255,
            0,
            0
]);
          return box(types.tkhd, result);
        };
        traf = function traf2(track) {
          var trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable, dataOffset, upperWordBaseMediaDecodeTime, lowerWordBaseMediaDecodeTime;
          trackFragmentHeader = box(types.tfhd, new Uint8Array([
            0,
0,
            0,
            58,
(track.id & 4278190080) >> 24,
            (track.id & 16711680) >> 16,
            (track.id & 65280) >> 8,
            track.id & 255,
0,
            0,
            0,
            1,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0
]));
          upperWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime / MAX_UINT32);
          lowerWordBaseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime % MAX_UINT32);
          trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([
            1,
0,
            0,
            0,

upperWordBaseMediaDecodeTime >>> 24 & 255,
            upperWordBaseMediaDecodeTime >>> 16 & 255,
            upperWordBaseMediaDecodeTime >>> 8 & 255,
            upperWordBaseMediaDecodeTime & 255,
            lowerWordBaseMediaDecodeTime >>> 24 & 255,
            lowerWordBaseMediaDecodeTime >>> 16 & 255,
            lowerWordBaseMediaDecodeTime >>> 8 & 255,
            lowerWordBaseMediaDecodeTime & 255
          ]));
          dataOffset = 32 +
20 +
8 +
16 +
8 +
8;
          if (track.type === "audio") {
            trackFragmentRun = trun$1(track, dataOffset);
            return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun);
          }
          sampleDependencyTable = sdtp(track);
          trackFragmentRun = trun$1(track, sampleDependencyTable.length + dataOffset);
          return box(types.traf, trackFragmentHeader, trackFragmentDecodeTime, trackFragmentRun, sampleDependencyTable);
        };
        trak = function trak2(track) {
          track.duration = track.duration || 4294967295;
          return box(types.trak, tkhd(track), mdia(track));
        };
        trex = function trex2(track) {
          var result = new Uint8Array([
            0,
0,
            0,
            0,
(track.id & 4278190080) >> 24,
            (track.id & 16711680) >> 16,
            (track.id & 65280) >> 8,
            track.id & 255,
0,
            0,
            0,
            1,
0,
            0,
            0,
            0,
0,
            0,
            0,
            0,
0,
            1,
            0,
            1
]);
          if (track.type !== "video") {
            result[result.length - 1] = 0;
          }
          return box(types.trex, result);
        };
        (function() {
          var audioTrun, videoTrun, trunHeader;
          trunHeader = function trunHeader2(samples2, offset) {
            var durationPresent = 0, sizePresent = 0, flagsPresent = 0, compositionTimeOffset = 0;
            if (samples2.length) {
              if (samples2[0].duration !== void 0) {
                durationPresent = 1;
              }
              if (samples2[0].size !== void 0) {
                sizePresent = 2;
              }
              if (samples2[0].flags !== void 0) {
                flagsPresent = 4;
              }
              if (samples2[0].compositionTimeOffset !== void 0) {
                compositionTimeOffset = 8;
              }
            }
            return [
              0,
0,
              durationPresent | sizePresent | flagsPresent | compositionTimeOffset,
              1,
(samples2.length & 4278190080) >>> 24,
              (samples2.length & 16711680) >>> 16,
              (samples2.length & 65280) >>> 8,
              samples2.length & 255,
(offset & 4278190080) >>> 24,
              (offset & 16711680) >>> 16,
              (offset & 65280) >>> 8,
              offset & 255
];
          };
          videoTrun = function videoTrun2(track, offset) {
            var bytesOffest, bytes, header, samples2, sample, i;
            samples2 = track.samples || [];
            offset += 8 + 12 + 16 * samples2.length;
            header = trunHeader(samples2, offset);
            bytes = new Uint8Array(header.length + samples2.length * 16);
            bytes.set(header);
            bytesOffest = header.length;
            for (i = 0; i < samples2.length; i++) {
              sample = samples2[i];
              bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;
              bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;
              bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;
              bytes[bytesOffest++] = sample.duration & 255;
              bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;
              bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;
              bytes[bytesOffest++] = (sample.size & 65280) >>> 8;
              bytes[bytesOffest++] = sample.size & 255;
              bytes[bytesOffest++] = sample.flags.isLeading << 2 | sample.flags.dependsOn;
              bytes[bytesOffest++] = sample.flags.isDependedOn << 6 | sample.flags.hasRedundancy << 4 | sample.flags.paddingValue << 1 | sample.flags.isNonSyncSample;
              bytes[bytesOffest++] = sample.flags.degradationPriority & 240 << 8;
              bytes[bytesOffest++] = sample.flags.degradationPriority & 15;
              bytes[bytesOffest++] = (sample.compositionTimeOffset & 4278190080) >>> 24;
              bytes[bytesOffest++] = (sample.compositionTimeOffset & 16711680) >>> 16;
              bytes[bytesOffest++] = (sample.compositionTimeOffset & 65280) >>> 8;
              bytes[bytesOffest++] = sample.compositionTimeOffset & 255;
            }
            return box(types.trun, bytes);
          };
          audioTrun = function audioTrun2(track, offset) {
            var bytes, bytesOffest, header, samples2, sample, i;
            samples2 = track.samples || [];
            offset += 8 + 12 + 8 * samples2.length;
            header = trunHeader(samples2, offset);
            bytes = new Uint8Array(header.length + samples2.length * 8);
            bytes.set(header);
            bytesOffest = header.length;
            for (i = 0; i < samples2.length; i++) {
              sample = samples2[i];
              bytes[bytesOffest++] = (sample.duration & 4278190080) >>> 24;
              bytes[bytesOffest++] = (sample.duration & 16711680) >>> 16;
              bytes[bytesOffest++] = (sample.duration & 65280) >>> 8;
              bytes[bytesOffest++] = sample.duration & 255;
              bytes[bytesOffest++] = (sample.size & 4278190080) >>> 24;
              bytes[bytesOffest++] = (sample.size & 16711680) >>> 16;
              bytes[bytesOffest++] = (sample.size & 65280) >>> 8;
              bytes[bytesOffest++] = sample.size & 255;
            }
            return box(types.trun, bytes);
          };
          trun$1 = function trun2(track, offset) {
            if (track.type === "audio") {
              return audioTrun(track, offset);
            }
            return videoTrun(track, offset);
          };
        })();
        var mp4Generator = {
          ftyp,
          mdat,
          moof,
          moov,
          initSegment: function initSegment(tracks) {
            var fileType = ftyp(), movie = moov(tracks), result;
            result = new Uint8Array(fileType.byteLength + movie.byteLength);
            result.set(fileType);
            result.set(movie, fileType.byteLength);
            return result;
          }
        };
        var toUnsigned$3 = function toUnsigned2(value) {
          return value >>> 0;
        };
        var toHexString$1 = function toHexString2(value) {
          return ("00" + value.toString(16)).slice(-2);
        };
        var bin = {
          toUnsigned: toUnsigned$3,
          toHexString: toHexString$1
        };
        var parseType$2 = function parseType2(buffer) {
          var result = "";
          result += String.fromCharCode(buffer[0]);
          result += String.fromCharCode(buffer[1]);
          result += String.fromCharCode(buffer[2]);
          result += String.fromCharCode(buffer[3]);
          return result;
        };
        var parseType_1 = parseType$2;
        var toUnsigned$2 = bin.toUnsigned;
        var findBox$1 = function findBox2(data, path) {
          var results = [], i, size, type2, end, subresults;
          if (!path.length) {
            return null;
          }
          for (i = 0; i < data.byteLength; ) {
            size = toUnsigned$2(data[i] << 24 | data[i + 1] << 16 | data[i + 2] << 8 | data[i + 3]);
            type2 = parseType_1(data.subarray(i + 4, i + 8));
            end = size > 1 ? i + size : data.byteLength;
            if (type2 === path[0]) {
              if (path.length === 1) {
                results.push(data.subarray(i + 8, end));
              } else {
                subresults = findBox2(data.subarray(i + 8, end), path.slice(1));
                if (subresults.length) {
                  results = results.concat(subresults);
                }
              }
            }
            i = end;
          }
          return results;
        };
        var findBox_1 = findBox$1;
        var uint8ToCString$1 = function uint8ToCString2(data) {
          var index = 0;
          var curChar = String.fromCharCode(data[index]);
          var retString = "";
          while (curChar !== "\0") {
            retString += curChar;
            index++;
            curChar = String.fromCharCode(data[index]);
          }
          retString += curChar;
          return retString;
        };
        var string = {
          uint8ToCString: uint8ToCString$1
        };
        var uint8ToCString = string.uint8ToCString;
        var getUint64$4 = numbers.getUint64;
        var parseEmsgBox = function parseEmsgBox2(boxData) {
          var offset = 4;
          var version = boxData[0];
          var scheme_id_uri, value, timescale2, presentation_time, presentation_time_delta, event_duration, id, message_data;
          if (version === 0) {
            scheme_id_uri = uint8ToCString(boxData.subarray(offset));
            offset += scheme_id_uri.length;
            value = uint8ToCString(boxData.subarray(offset));
            offset += value.length;
            var dv = new DataView(boxData.buffer);
            timescale2 = dv.getUint32(offset);
            offset += 4;
            presentation_time_delta = dv.getUint32(offset);
            offset += 4;
            event_duration = dv.getUint32(offset);
            offset += 4;
            id = dv.getUint32(offset);
            offset += 4;
          } else if (version === 1) {
            var dv = new DataView(boxData.buffer);
            timescale2 = dv.getUint32(offset);
            offset += 4;
            presentation_time = getUint64$4(boxData.subarray(offset));
            offset += 8;
            event_duration = dv.getUint32(offset);
            offset += 4;
            id = dv.getUint32(offset);
            offset += 4;
            scheme_id_uri = uint8ToCString(boxData.subarray(offset));
            offset += scheme_id_uri.length;
            value = uint8ToCString(boxData.subarray(offset));
            offset += value.length;
          }
          message_data = new Uint8Array(boxData.subarray(offset, boxData.byteLength));
          var emsgBox = {
            scheme_id_uri,
            value,
timescale: timescale2 ? timescale2 : 1,
            presentation_time,
            presentation_time_delta,
            event_duration,
            id,
            message_data
          };
          return isValidEmsgBox(version, emsgBox) ? emsgBox : void 0;
        };
        var scaleTime = function scaleTime2(presentationTime, timescale2, timeDelta, offset) {
          return presentationTime || presentationTime === 0 ? presentationTime / timescale2 : offset + timeDelta / timescale2;
        };
        var isValidEmsgBox = function isValidEmsgBox2(version, emsg2) {
          var hasScheme = emsg2.scheme_id_uri !== "\0";
          var isValidV0Box = version === 0 && isDefined(emsg2.presentation_time_delta) && hasScheme;
          var isValidV1Box = version === 1 && isDefined(emsg2.presentation_time) && hasScheme;
          return !(version > 1) && isValidV0Box || isValidV1Box;
        };
        var isDefined = function isDefined2(data) {
          return data !== void 0 || data !== null;
        };
        var emsg = {
          parseEmsgBox,
          scaleTime
        };
        var tfhd = function tfhd2(data) {
          var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            trackId: view.getUint32(4)
          }, baseDataOffsetPresent = result.flags[2] & 1, sampleDescriptionIndexPresent = result.flags[2] & 2, defaultSampleDurationPresent = result.flags[2] & 8, defaultSampleSizePresent = result.flags[2] & 16, defaultSampleFlagsPresent = result.flags[2] & 32, durationIsEmpty = result.flags[0] & 65536, defaultBaseIsMoof = result.flags[0] & 131072, i;
          i = 8;
          if (baseDataOffsetPresent) {
            i += 4;
            result.baseDataOffset = view.getUint32(12);
            i += 4;
          }
          if (sampleDescriptionIndexPresent) {
            result.sampleDescriptionIndex = view.getUint32(i);
            i += 4;
          }
          if (defaultSampleDurationPresent) {
            result.defaultSampleDuration = view.getUint32(i);
            i += 4;
          }
          if (defaultSampleSizePresent) {
            result.defaultSampleSize = view.getUint32(i);
            i += 4;
          }
          if (defaultSampleFlagsPresent) {
            result.defaultSampleFlags = view.getUint32(i);
          }
          if (durationIsEmpty) {
            result.durationIsEmpty = true;
          }
          if (!baseDataOffsetPresent && defaultBaseIsMoof) {
            result.baseDataOffsetIsMoof = true;
          }
          return result;
        };
        var parseTfhd = tfhd;
        var parseSampleFlags = function parseSampleFlags2(flags) {
          return {
            isLeading: (flags[0] & 12) >>> 2,
            dependsOn: flags[0] & 3,
            isDependedOn: (flags[1] & 192) >>> 6,
            hasRedundancy: (flags[1] & 48) >>> 4,
            paddingValue: (flags[1] & 14) >>> 1,
            isNonSyncSample: flags[1] & 1,
            degradationPriority: flags[2] << 8 | flags[3]
          };
        };
        var parseSampleFlags_1 = parseSampleFlags;
        var trun = function trun2(data) {
          var result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            samples: []
          }, view = new DataView(data.buffer, data.byteOffset, data.byteLength), dataOffsetPresent = result.flags[2] & 1, firstSampleFlagsPresent = result.flags[2] & 4, sampleDurationPresent = result.flags[1] & 1, sampleSizePresent = result.flags[1] & 2, sampleFlagsPresent = result.flags[1] & 4, sampleCompositionTimeOffsetPresent = result.flags[1] & 8, sampleCount = view.getUint32(4), offset = 8, sample;
          if (dataOffsetPresent) {
            result.dataOffset = view.getInt32(offset);
            offset += 4;
          }
          if (firstSampleFlagsPresent && sampleCount) {
            sample = {
              flags: parseSampleFlags_1(data.subarray(offset, offset + 4))
            };
            offset += 4;
            if (sampleDurationPresent) {
              sample.duration = view.getUint32(offset);
              offset += 4;
            }
            if (sampleSizePresent) {
              sample.size = view.getUint32(offset);
              offset += 4;
            }
            if (sampleCompositionTimeOffsetPresent) {
              if (result.version === 1) {
                sample.compositionTimeOffset = view.getInt32(offset);
              } else {
                sample.compositionTimeOffset = view.getUint32(offset);
              }
              offset += 4;
            }
            result.samples.push(sample);
            sampleCount--;
          }
          while (sampleCount--) {
            sample = {};
            if (sampleDurationPresent) {
              sample.duration = view.getUint32(offset);
              offset += 4;
            }
            if (sampleSizePresent) {
              sample.size = view.getUint32(offset);
              offset += 4;
            }
            if (sampleFlagsPresent) {
              sample.flags = parseSampleFlags_1(data.subarray(offset, offset + 4));
              offset += 4;
            }
            if (sampleCompositionTimeOffsetPresent) {
              if (result.version === 1) {
                sample.compositionTimeOffset = view.getInt32(offset);
              } else {
                sample.compositionTimeOffset = view.getUint32(offset);
              }
              offset += 4;
            }
            result.samples.push(sample);
          }
          return result;
        };
        var parseTrun$1 = trun;
        var toUnsigned$1 = bin.toUnsigned;
        var getUint64$3 = numbers.getUint64;
        var tfdt = function tfdt2(data) {
          var result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4))
          };
          if (result.version === 1) {
            result.baseMediaDecodeTime = getUint64$3(data.subarray(4));
          } else {
            result.baseMediaDecodeTime = toUnsigned$1(data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]);
          }
          return result;
        };
        var parseTfdt$1 = tfdt;
        var typedArrayIndexOf$1 = function typedArrayIndexOf2(typedArray2, element, fromIndex) {
          if (!typedArray2) {
            return -1;
          }
          var currentIndex = fromIndex;
          for (; currentIndex < typedArray2.length; currentIndex++) {
            if (typedArray2[currentIndex] === element) {
              return currentIndex;
            }
          }
          return -1;
        };
        var typedArray = {
          typedArrayIndexOf: typedArrayIndexOf$1
        };
        var typedArrayIndexOf = typedArray.typedArrayIndexOf, textEncodingDescriptionByte = {
Utf8: 3
}, percentEncode$1 = function percentEncode2(bytes, start, end) {
          var i, result = "";
          for (i = start; i < end; i++) {
            result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
          }
          return result;
        }, parseUtf8 = function parseUtf82(bytes, start, end) {
          return decodeURIComponent(percentEncode$1(bytes, start, end));
        }, parseIso88591$1 = function parseIso885912(bytes, start, end) {
          return unescape(percentEncode$1(bytes, start, end));
        }, parseSyncSafeInteger$1 = function parseSyncSafeInteger2(data) {
          return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
        }, frameParsers = {
          "APIC": function APIC(frame) {
            var i = 1, mimeTypeEndIndex, descriptionEndIndex, LINK_MIME_TYPE = "-->";
            if (frame.data[0] !== textEncodingDescriptionByte.Utf8) {
              return;
            }
            mimeTypeEndIndex = typedArrayIndexOf(frame.data, 0, i);
            if (mimeTypeEndIndex < 0) {
              return;
            }
            frame.mimeType = parseIso88591$1(frame.data, i, mimeTypeEndIndex);
            i = mimeTypeEndIndex + 1;
            frame.pictureType = frame.data[i];
            i++;
            descriptionEndIndex = typedArrayIndexOf(frame.data, 0, i);
            if (descriptionEndIndex < 0) {
              return;
            }
            frame.description = parseUtf8(frame.data, i, descriptionEndIndex);
            i = descriptionEndIndex + 1;
            if (frame.mimeType === LINK_MIME_TYPE) {
              frame.url = parseIso88591$1(frame.data, i, frame.data.length);
            } else {
              frame.pictureData = frame.data.subarray(i, frame.data.length);
            }
          },
          "T*": function T(frame) {
            if (frame.data[0] !== textEncodingDescriptionByte.Utf8) {
              return;
            }
            frame.value = parseUtf8(frame.data, 1, frame.data.length).replace(/\0*$/, "");
            frame.values = frame.value.split("\0");
          },
          "TXXX": function TXXX(frame) {
            var descriptionEndIndex;
            if (frame.data[0] !== textEncodingDescriptionByte.Utf8) {
              return;
            }
            descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);
            if (descriptionEndIndex === -1) {
              return;
            }
            frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);
            frame.value = parseUtf8(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\0*$/, "");
            frame.data = frame.value;
          },
          "W*": function W(frame) {
            frame.url = parseIso88591$1(frame.data, 0, frame.data.length).replace(/\0.*$/, "");
          },
          "WXXX": function WXXX(frame) {
            var descriptionEndIndex;
            if (frame.data[0] !== textEncodingDescriptionByte.Utf8) {
              return;
            }
            descriptionEndIndex = typedArrayIndexOf(frame.data, 0, 1);
            if (descriptionEndIndex === -1) {
              return;
            }
            frame.description = parseUtf8(frame.data, 1, descriptionEndIndex);
            frame.url = parseIso88591$1(frame.data, descriptionEndIndex + 1, frame.data.length).replace(/\0.*$/, "");
          },
          "PRIV": function PRIV(frame) {
            var i;
            for (i = 0; i < frame.data.length; i++) {
              if (frame.data[i] === 0) {
                frame.owner = parseIso88591$1(frame.data, 0, i);
                break;
              }
            }
            frame.privateData = frame.data.subarray(i + 1);
            frame.data = frame.privateData;
          }
        };
        var parseId3Frames$1 = function parseId3Frames2(data) {
          var frameSize, frameHeader, frameStart = 10, tagSize = 0, frames = [];
          if (data.length < 10 || data[0] !== "I".charCodeAt(0) || data[1] !== "D".charCodeAt(0) || data[2] !== "3".charCodeAt(0)) {
            return;
          }
          tagSize = parseSyncSafeInteger$1(data.subarray(6, 10));
          tagSize += 10;
          var hasExtendedHeader = data[5] & 64;
          if (hasExtendedHeader) {
            frameStart += 4;
            frameStart += parseSyncSafeInteger$1(data.subarray(10, 14));
            tagSize -= parseSyncSafeInteger$1(data.subarray(16, 20));
          }
          do {
            frameSize = parseSyncSafeInteger$1(data.subarray(frameStart + 4, frameStart + 8));
            if (frameSize < 1) {
              break;
            }
            frameHeader = String.fromCharCode(data[frameStart], data[frameStart + 1], data[frameStart + 2], data[frameStart + 3]);
            var frame = {
              id: frameHeader,
              data: data.subarray(frameStart + 10, frameStart + frameSize + 10)
            };
            frame.key = frame.id;
            if (frameParsers[frame.id]) {
              frameParsers[frame.id](frame);
            } else if (frame.id[0] === "T") {
              frameParsers["T*"](frame);
            } else if (frame.id[0] === "W") {
              frameParsers["W*"](frame);
            }
            frames.push(frame);
            frameStart += 10;
            frameStart += frameSize;
          } while (frameStart < tagSize);
          return frames;
        };
        var parseId3 = {
          parseId3Frames: parseId3Frames$1,
          parseSyncSafeInteger: parseSyncSafeInteger$1,
          frameParsers
        };
        var toUnsigned = bin.toUnsigned;
        var toHexString = bin.toHexString;
        var getUint64$2 = numbers.getUint64;
        var timescale, startTime, compositionStartTime, getVideoTrackIds, getTracks, getTimescaleFromMediaHeader$1, getEmsgID3;
        var parseId3Frames = parseId3.parseId3Frames;
        timescale = function timescale2(init) {
          var result = {}, traks = findBox_1(init, ["moov", "trak"]);
          return traks.reduce(function(result2, trak2) {
            var tkhd2, version, index, id, mdhd2;
            tkhd2 = findBox_1(trak2, ["tkhd"])[0];
            if (!tkhd2) {
              return null;
            }
            version = tkhd2[0];
            index = version === 0 ? 12 : 20;
            id = toUnsigned(tkhd2[index] << 24 | tkhd2[index + 1] << 16 | tkhd2[index + 2] << 8 | tkhd2[index + 3]);
            mdhd2 = findBox_1(trak2, ["mdia", "mdhd"])[0];
            if (!mdhd2) {
              return null;
            }
            version = mdhd2[0];
            index = version === 0 ? 12 : 20;
            result2[id] = toUnsigned(mdhd2[index] << 24 | mdhd2[index + 1] << 16 | mdhd2[index + 2] << 8 | mdhd2[index + 3]);
            return result2;
          }, result);
        };
        startTime = function startTime2(timescale2, fragment) {
          var trafs;
          trafs = findBox_1(fragment, ["moof", "traf"]);
          var lowestTime = trafs.reduce(function(acc, traf2) {
            var tfhd2 = findBox_1(traf2, ["tfhd"])[0];
            var id = toUnsigned(tfhd2[4] << 24 | tfhd2[5] << 16 | tfhd2[6] << 8 | tfhd2[7]);
            var scale = timescale2[id] || 9e4;
            var tfdt2 = findBox_1(traf2, ["tfdt"])[0];
            var dv = new DataView(tfdt2.buffer, tfdt2.byteOffset, tfdt2.byteLength);
            var baseTime;
            if (tfdt2[0] === 1) {
              baseTime = getUint64$2(tfdt2.subarray(4, 12));
            } else {
              baseTime = dv.getUint32(4);
            }
            var seconds;
            if (typeof baseTime === "bigint") {
              seconds = baseTime / window__default["default"].BigInt(scale);
            } else if (typeof baseTime === "number" && !isNaN(baseTime)) {
              seconds = baseTime / scale;
            }
            if (seconds < Number.MAX_SAFE_INTEGER) {
              seconds = Number(seconds);
            }
            if (seconds < acc) {
              acc = seconds;
            }
            return acc;
          }, Infinity);
          return typeof lowestTime === "bigint" || isFinite(lowestTime) ? lowestTime : 0;
        };
        compositionStartTime = function compositionStartTime2(timescales, fragment) {
          var trafBoxes = findBox_1(fragment, ["moof", "traf"]);
          var baseMediaDecodeTime = 0;
          var compositionTimeOffset = 0;
          var trackId;
          if (trafBoxes && trafBoxes.length) {
            var tfhd2 = findBox_1(trafBoxes[0], ["tfhd"])[0];
            var trun2 = findBox_1(trafBoxes[0], ["trun"])[0];
            var tfdt2 = findBox_1(trafBoxes[0], ["tfdt"])[0];
            if (tfhd2) {
              var parsedTfhd = parseTfhd(tfhd2);
              trackId = parsedTfhd.trackId;
            }
            if (tfdt2) {
              var parsedTfdt = parseTfdt$1(tfdt2);
              baseMediaDecodeTime = parsedTfdt.baseMediaDecodeTime;
            }
            if (trun2) {
              var parsedTrun = parseTrun$1(trun2);
              if (parsedTrun.samples && parsedTrun.samples.length) {
                compositionTimeOffset = parsedTrun.samples[0].compositionTimeOffset || 0;
              }
            }
          }
          var timescale2 = timescales[trackId] || 9e4;
          if (typeof baseMediaDecodeTime === "bigint") {
            compositionTimeOffset = window__default["default"].BigInt(compositionTimeOffset);
            timescale2 = window__default["default"].BigInt(timescale2);
          }
          var result = (baseMediaDecodeTime + compositionTimeOffset) / timescale2;
          if (typeof result === "bigint" && result < Number.MAX_SAFE_INTEGER) {
            result = Number(result);
          }
          return result;
        };
        getVideoTrackIds = function getVideoTrackIds2(init) {
          var traks = findBox_1(init, ["moov", "trak"]);
          var videoTrackIds = [];
          traks.forEach(function(trak2) {
            var hdlrs = findBox_1(trak2, ["mdia", "hdlr"]);
            var tkhds = findBox_1(trak2, ["tkhd"]);
            hdlrs.forEach(function(hdlr2, index) {
              var handlerType = parseType_1(hdlr2.subarray(8, 12));
              var tkhd2 = tkhds[index];
              var view;
              var version;
              var trackId;
              if (handlerType === "vide") {
                view = new DataView(tkhd2.buffer, tkhd2.byteOffset, tkhd2.byteLength);
                version = view.getUint8(0);
                trackId = version === 0 ? view.getUint32(12) : view.getUint32(20);
                videoTrackIds.push(trackId);
              }
            });
          });
          return videoTrackIds;
        };
        getTimescaleFromMediaHeader$1 = function getTimescaleFromMediaHeader2(mdhd2) {
          var version = mdhd2[0];
          var index = version === 0 ? 12 : 20;
          return toUnsigned(mdhd2[index] << 24 | mdhd2[index + 1] << 16 | mdhd2[index + 2] << 8 | mdhd2[index + 3]);
        };
        getTracks = function getTracks2(init) {
          var traks = findBox_1(init, ["moov", "trak"]);
          var tracks = [];
          traks.forEach(function(trak2) {
            var track = {};
            var tkhd2 = findBox_1(trak2, ["tkhd"])[0];
            var view, tkhdVersion;
            if (tkhd2) {
              view = new DataView(tkhd2.buffer, tkhd2.byteOffset, tkhd2.byteLength);
              tkhdVersion = view.getUint8(0);
              track.id = tkhdVersion === 0 ? view.getUint32(12) : view.getUint32(20);
            }
            var hdlr2 = findBox_1(trak2, ["mdia", "hdlr"])[0];
            if (hdlr2) {
              var type2 = parseType_1(hdlr2.subarray(8, 12));
              if (type2 === "vide") {
                track.type = "video";
              } else if (type2 === "soun") {
                track.type = "audio";
              } else {
                track.type = type2;
              }
            }
            var stsd2 = findBox_1(trak2, ["mdia", "minf", "stbl", "stsd"])[0];
            if (stsd2) {
              var sampleDescriptions = stsd2.subarray(8);
              track.codec = parseType_1(sampleDescriptions.subarray(4, 8));
              var codecBox = findBox_1(sampleDescriptions, [track.codec])[0];
              var codecConfig, codecConfigType;
              if (codecBox) {
                if (/^[asm]vc[1-9]$/i.test(track.codec)) {
                  codecConfig = codecBox.subarray(78);
                  codecConfigType = parseType_1(codecConfig.subarray(4, 8));
                  if (codecConfigType === "avcC" && codecConfig.length > 11) {
                    track.codec += ".";
                    track.codec += toHexString(codecConfig[9]);
                    track.codec += toHexString(codecConfig[10]);
                    track.codec += toHexString(codecConfig[11]);
                  } else {
                    track.codec = "avc1.4d400d";
                  }
                } else if (/^mp4[a,v]$/i.test(track.codec)) {
                  codecConfig = codecBox.subarray(28);
                  codecConfigType = parseType_1(codecConfig.subarray(4, 8));
                  if (codecConfigType === "esds" && codecConfig.length > 20 && codecConfig[19] !== 0) {
                    track.codec += "." + toHexString(codecConfig[19]);
                    track.codec += "." + toHexString(codecConfig[20] >>> 2 & 63).replace(/^0/, "");
                  } else {
                    track.codec = "mp4a.40.2";
                  }
                } else {
                  track.codec = track.codec.toLowerCase();
                }
              }
            }
            var mdhd2 = findBox_1(trak2, ["mdia", "mdhd"])[0];
            if (mdhd2) {
              track.timescale = getTimescaleFromMediaHeader$1(mdhd2);
            }
            tracks.push(track);
          });
          return tracks;
        };
        getEmsgID3 = function getEmsgID32(segmentData, offset) {
          if (offset === void 0) {
            offset = 0;
          }
          var emsgBoxes = findBox_1(segmentData, ["emsg"]);
          return emsgBoxes.map(function(data) {
            var parsedBox = emsg.parseEmsgBox(new Uint8Array(data));
            var parsedId3Frames = parseId3Frames(parsedBox.message_data);
            return {
              cueTime: emsg.scaleTime(parsedBox.presentation_time, parsedBox.timescale, parsedBox.presentation_time_delta, offset),
              duration: emsg.scaleTime(parsedBox.event_duration, parsedBox.timescale),
              frames: parsedId3Frames
            };
          });
        };
        var probe$2 = {
findBox: findBox_1,
          parseType: parseType_1,
          timescale,
          startTime,
          compositionStartTime,
          videoTrackIds: getVideoTrackIds,
          tracks: getTracks,
          getTimescaleFromMediaHeader: getTimescaleFromMediaHeader$1,
          getEmsgID3
        };
        var groupNalsIntoFrames = function groupNalsIntoFrames2(nalUnits) {
          var i, currentNal, currentFrame = [], frames = [];
          frames.byteLength = 0;
          frames.nalCount = 0;
          frames.duration = 0;
          currentFrame.byteLength = 0;
          for (i = 0; i < nalUnits.length; i++) {
            currentNal = nalUnits[i];
            if (currentNal.nalUnitType === "access_unit_delimiter_rbsp") {
              if (currentFrame.length) {
                currentFrame.duration = currentNal.dts - currentFrame.dts;
                frames.byteLength += currentFrame.byteLength;
                frames.nalCount += currentFrame.length;
                frames.duration += currentFrame.duration;
                frames.push(currentFrame);
              }
              currentFrame = [currentNal];
              currentFrame.byteLength = currentNal.data.byteLength;
              currentFrame.pts = currentNal.pts;
              currentFrame.dts = currentNal.dts;
            } else {
              if (currentNal.nalUnitType === "slice_layer_without_partitioning_rbsp_idr") {
                currentFrame.keyFrame = true;
              }
              currentFrame.duration = currentNal.dts - currentFrame.dts;
              currentFrame.byteLength += currentNal.data.byteLength;
              currentFrame.push(currentNal);
            }
          }
          if (frames.length && (!currentFrame.duration || currentFrame.duration <= 0)) {
            currentFrame.duration = frames[frames.length - 1].duration;
          }
          frames.byteLength += currentFrame.byteLength;
          frames.nalCount += currentFrame.length;
          frames.duration += currentFrame.duration;
          frames.push(currentFrame);
          return frames;
        };
        var groupFramesIntoGops = function groupFramesIntoGops2(frames) {
          var i, currentFrame, currentGop = [], gops = [];
          currentGop.byteLength = 0;
          currentGop.nalCount = 0;
          currentGop.duration = 0;
          currentGop.pts = frames[0].pts;
          currentGop.dts = frames[0].dts;
          gops.byteLength = 0;
          gops.nalCount = 0;
          gops.duration = 0;
          gops.pts = frames[0].pts;
          gops.dts = frames[0].dts;
          for (i = 0; i < frames.length; i++) {
            currentFrame = frames[i];
            if (currentFrame.keyFrame) {
              if (currentGop.length) {
                gops.push(currentGop);
                gops.byteLength += currentGop.byteLength;
                gops.nalCount += currentGop.nalCount;
                gops.duration += currentGop.duration;
              }
              currentGop = [currentFrame];
              currentGop.nalCount = currentFrame.length;
              currentGop.byteLength = currentFrame.byteLength;
              currentGop.pts = currentFrame.pts;
              currentGop.dts = currentFrame.dts;
              currentGop.duration = currentFrame.duration;
            } else {
              currentGop.duration += currentFrame.duration;
              currentGop.nalCount += currentFrame.length;
              currentGop.byteLength += currentFrame.byteLength;
              currentGop.push(currentFrame);
            }
          }
          if (gops.length && currentGop.duration <= 0) {
            currentGop.duration = gops[gops.length - 1].duration;
          }
          gops.byteLength += currentGop.byteLength;
          gops.nalCount += currentGop.nalCount;
          gops.duration += currentGop.duration;
          gops.push(currentGop);
          return gops;
        };
        var extendFirstKeyFrame = function extendFirstKeyFrame2(gops) {
          var currentGop;
          if (!gops[0][0].keyFrame && gops.length > 1) {
            currentGop = gops.shift();
            gops.byteLength -= currentGop.byteLength;
            gops.nalCount -= currentGop.nalCount;
            gops[0][0].dts = currentGop.dts;
            gops[0][0].pts = currentGop.pts;
            gops[0][0].duration += currentGop.duration;
          }
          return gops;
        };
        var createDefaultSample = function createDefaultSample2() {
          return {
            size: 0,
            flags: {
              isLeading: 0,
              dependsOn: 1,
              isDependedOn: 0,
              hasRedundancy: 0,
              degradationPriority: 0,
              isNonSyncSample: 1
            }
          };
        };
        var sampleForFrame = function sampleForFrame2(frame, dataOffset) {
          var sample = createDefaultSample();
          sample.dataOffset = dataOffset;
          sample.compositionTimeOffset = frame.pts - frame.dts;
          sample.duration = frame.duration;
          sample.size = 4 * frame.length;
          sample.size += frame.byteLength;
          if (frame.keyFrame) {
            sample.flags.dependsOn = 2;
            sample.flags.isNonSyncSample = 0;
          }
          return sample;
        };
        var generateSampleTable$1 = function generateSampleTable2(gops, baseDataOffset) {
          var h, i, sample, currentGop, currentFrame, dataOffset = baseDataOffset || 0, samples2 = [];
          for (h = 0; h < gops.length; h++) {
            currentGop = gops[h];
            for (i = 0; i < currentGop.length; i++) {
              currentFrame = currentGop[i];
              sample = sampleForFrame(currentFrame, dataOffset);
              dataOffset += sample.size;
              samples2.push(sample);
            }
          }
          return samples2;
        };
        var concatenateNalData = function concatenateNalData2(gops) {
          var h, i, j, currentGop, currentFrame, currentNal, dataOffset = 0, nalsByteLength = gops.byteLength, numberOfNals = gops.nalCount, totalByteLength = nalsByteLength + 4 * numberOfNals, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);
          for (h = 0; h < gops.length; h++) {
            currentGop = gops[h];
            for (i = 0; i < currentGop.length; i++) {
              currentFrame = currentGop[i];
              for (j = 0; j < currentFrame.length; j++) {
                currentNal = currentFrame[j];
                view.setUint32(dataOffset, currentNal.data.byteLength);
                dataOffset += 4;
                data.set(currentNal.data, dataOffset);
                dataOffset += currentNal.data.byteLength;
              }
            }
          }
          return data;
        };
        var generateSampleTableForFrame = function generateSampleTableForFrame2(frame, baseDataOffset) {
          var sample, dataOffset = baseDataOffset || 0, samples2 = [];
          sample = sampleForFrame(frame, dataOffset);
          samples2.push(sample);
          return samples2;
        };
        var concatenateNalDataForFrame = function concatenateNalDataForFrame2(frame) {
          var i, currentNal, dataOffset = 0, nalsByteLength = frame.byteLength, numberOfNals = frame.length, totalByteLength = nalsByteLength + 4 * numberOfNals, data = new Uint8Array(totalByteLength), view = new DataView(data.buffer);
          for (i = 0; i < frame.length; i++) {
            currentNal = frame[i];
            view.setUint32(dataOffset, currentNal.data.byteLength);
            dataOffset += 4;
            data.set(currentNal.data, dataOffset);
            dataOffset += currentNal.data.byteLength;
          }
          return data;
        };
        var frameUtils = {
          groupNalsIntoFrames,
          groupFramesIntoGops,
          extendFirstKeyFrame,
          generateSampleTable: generateSampleTable$1,
          concatenateNalData,
          generateSampleTableForFrame,
          concatenateNalDataForFrame
        };
        var highPrefix = [33, 16, 5, 32, 164, 27];
        var lowPrefix = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252];
        var zeroFill = function zeroFill2(count) {
          var a = [];
          while (count--) {
            a.push(0);
          }
          return a;
        };
        var makeTable = function makeTable2(metaTable) {
          return Object.keys(metaTable).reduce(function(obj, key) {
            obj[key] = new Uint8Array(metaTable[key].reduce(function(arr, part) {
              return arr.concat(part);
            }, []));
            return obj;
          }, {});
        };
        var silence;
        var silence_1 = function silence_12() {
          if (!silence) {
            var coneOfSilence = {
              96e3: [highPrefix, [227, 64], zeroFill(154), [56]],
              88200: [highPrefix, [231], zeroFill(170), [56]],
              64e3: [highPrefix, [248, 192], zeroFill(240), [56]],
              48e3: [highPrefix, [255, 192], zeroFill(268), [55, 148, 128], zeroFill(54), [112]],
              44100: [highPrefix, [255, 192], zeroFill(268), [55, 163, 128], zeroFill(84), [112]],
              32e3: [highPrefix, [255, 192], zeroFill(268), [55, 234], zeroFill(226), [112]],
              24e3: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 112], zeroFill(126), [224]],
              16e3: [highPrefix, [255, 192], zeroFill(268), [55, 255, 128], zeroFill(268), [111, 255], zeroFill(269), [223, 108], zeroFill(195), [1, 192]],
              12e3: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 253, 128], zeroFill(259), [56]],
              11025: [lowPrefix, zeroFill(268), [3, 127, 248], zeroFill(268), [6, 255, 240], zeroFill(268), [13, 255, 224], zeroFill(268), [27, 255, 192], zeroFill(268), [55, 175, 128], zeroFill(108), [112]],
              8e3: [lowPrefix, zeroFill(268), [3, 121, 16], zeroFill(47), [7]]
            };
            silence = makeTable(coneOfSilence);
          }
          return silence;
        };
        var sumFrameByteLengths = function sumFrameByteLengths2(array) {
          var i, currentObj, sum = 0;
          for (i = 0; i < array.length; i++) {
            currentObj = array[i];
            sum += currentObj.data.byteLength;
          }
          return sum;
        };
        var prefixWithSilence = function prefixWithSilence2(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime) {
          var baseMediaDecodeTimeTs, frameDuration = 0, audioGapDuration = 0, audioFillFrameCount = 0, audioFillDuration = 0, silentFrame, i, firstFrame;
          if (!frames.length) {
            return;
          }
          baseMediaDecodeTimeTs = clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate);
          frameDuration = Math.ceil(clock.ONE_SECOND_IN_TS / (track.samplerate / 1024));
          if (audioAppendStartTs && videoBaseMediaDecodeTime) {
            audioGapDuration = baseMediaDecodeTimeTs - Math.max(audioAppendStartTs, videoBaseMediaDecodeTime);
            audioFillFrameCount = Math.floor(audioGapDuration / frameDuration);
            audioFillDuration = audioFillFrameCount * frameDuration;
          }
          if (audioFillFrameCount < 1 || audioFillDuration > clock.ONE_SECOND_IN_TS / 2) {
            return;
          }
          silentFrame = silence_1()[track.samplerate];
          if (!silentFrame) {
            silentFrame = frames[0].data;
          }
          for (i = 0; i < audioFillFrameCount; i++) {
            firstFrame = frames[0];
            frames.splice(0, 0, {
              data: silentFrame,
              dts: firstFrame.dts - frameDuration,
              pts: firstFrame.pts - frameDuration
            });
          }
          track.baseMediaDecodeTime -= Math.floor(clock.videoTsToAudioTs(audioFillDuration, track.samplerate));
          return audioFillDuration;
        };
        var trimAdtsFramesByEarliestDts = function trimAdtsFramesByEarliestDts2(adtsFrames, track, earliestAllowedDts) {
          if (track.minSegmentDts >= earliestAllowedDts) {
            return adtsFrames;
          }
          track.minSegmentDts = Infinity;
          return adtsFrames.filter(function(currentFrame) {
            if (currentFrame.dts >= earliestAllowedDts) {
              track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
              track.minSegmentPts = track.minSegmentDts;
              return true;
            }
            return false;
          });
        };
        var generateSampleTable = function generateSampleTable2(frames) {
          var i, currentFrame, samples2 = [];
          for (i = 0; i < frames.length; i++) {
            currentFrame = frames[i];
            samples2.push({
              size: currentFrame.data.byteLength,
              duration: 1024
});
          }
          return samples2;
        };
        var concatenateFrameData = function concatenateFrameData2(frames) {
          var i, currentFrame, dataOffset = 0, data = new Uint8Array(sumFrameByteLengths(frames));
          for (i = 0; i < frames.length; i++) {
            currentFrame = frames[i];
            data.set(currentFrame.data, dataOffset);
            dataOffset += currentFrame.data.byteLength;
          }
          return data;
        };
        var audioFrameUtils = {
          prefixWithSilence,
          trimAdtsFramesByEarliestDts,
          generateSampleTable,
          concatenateFrameData
        };
        var ONE_SECOND_IN_TS$3 = clock.ONE_SECOND_IN_TS;
        var collectDtsInfo = function collectDtsInfo2(track, data) {
          if (typeof data.pts === "number") {
            if (track.timelineStartInfo.pts === void 0) {
              track.timelineStartInfo.pts = data.pts;
            }
            if (track.minSegmentPts === void 0) {
              track.minSegmentPts = data.pts;
            } else {
              track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
            }
            if (track.maxSegmentPts === void 0) {
              track.maxSegmentPts = data.pts;
            } else {
              track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
            }
          }
          if (typeof data.dts === "number") {
            if (track.timelineStartInfo.dts === void 0) {
              track.timelineStartInfo.dts = data.dts;
            }
            if (track.minSegmentDts === void 0) {
              track.minSegmentDts = data.dts;
            } else {
              track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
            }
            if (track.maxSegmentDts === void 0) {
              track.maxSegmentDts = data.dts;
            } else {
              track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
            }
          }
        };
        var clearDtsInfo = function clearDtsInfo2(track) {
          delete track.minSegmentDts;
          delete track.maxSegmentDts;
          delete track.minSegmentPts;
          delete track.maxSegmentPts;
        };
        var calculateTrackBaseMediaDecodeTime = function calculateTrackBaseMediaDecodeTime2(track, keepOriginalTimestamps) {
          var baseMediaDecodeTime, scale, minSegmentDts = track.minSegmentDts;
          if (!keepOriginalTimestamps) {
            minSegmentDts -= track.timelineStartInfo.dts;
          }
          baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;
          baseMediaDecodeTime += minSegmentDts;
          baseMediaDecodeTime = Math.max(0, baseMediaDecodeTime);
          if (track.type === "audio") {
            scale = track.samplerate / ONE_SECOND_IN_TS$3;
            baseMediaDecodeTime *= scale;
            baseMediaDecodeTime = Math.floor(baseMediaDecodeTime);
          }
          return baseMediaDecodeTime;
        };
        var trackDecodeInfo = {
          clearDtsInfo,
          calculateTrackBaseMediaDecodeTime,
          collectDtsInfo
        };
        var USER_DATA_REGISTERED_ITU_T_T35 = 4, RBSP_TRAILING_BITS = 128;
        var parseSei = function parseSei2(bytes) {
          var i = 0, result = {
            payloadType: -1,
            payloadSize: 0
          }, payloadType = 0, payloadSize = 0;
          while (i < bytes.byteLength) {
            if (bytes[i] === RBSP_TRAILING_BITS) {
              break;
            }
            while (bytes[i] === 255) {
              payloadType += 255;
              i++;
            }
            payloadType += bytes[i++];
            while (bytes[i] === 255) {
              payloadSize += 255;
              i++;
            }
            payloadSize += bytes[i++];
            if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) {
              var userIdentifier = String.fromCharCode(bytes[i + 3], bytes[i + 4], bytes[i + 5], bytes[i + 6]);
              if (userIdentifier === "GA94") {
                result.payloadType = payloadType;
                result.payloadSize = payloadSize;
                result.payload = bytes.subarray(i, i + payloadSize);
                break;
              } else {
                result.payload = void 0;
              }
            }
            i += payloadSize;
            payloadType = 0;
            payloadSize = 0;
          }
          return result;
        };
        var parseUserData = function parseUserData2(sei) {
          if (sei.payload[0] !== 181) {
            return null;
          }
          if ((sei.payload[1] << 8 | sei.payload[2]) !== 49) {
            return null;
          }
          if (String.fromCharCode(sei.payload[3], sei.payload[4], sei.payload[5], sei.payload[6]) !== "GA94") {
            return null;
          }
          if (sei.payload[7] !== 3) {
            return null;
          }
          return sei.payload.subarray(8, sei.payload.length - 1);
        };
        var parseCaptionPackets = function parseCaptionPackets2(pts, userData) {
          var results = [], i, count, offset, data;
          if (!(userData[0] & 64)) {
            return results;
          }
          count = userData[0] & 31;
          for (i = 0; i < count; i++) {
            offset = i * 3;
            data = {
              type: userData[offset + 2] & 3,
              pts
            };
            if (userData[offset + 2] & 4) {
              data.ccData = userData[offset + 3] << 8 | userData[offset + 4];
              results.push(data);
            }
          }
          return results;
        };
        var discardEmulationPreventionBytes$1 = function discardEmulationPreventionBytes2(data) {
          var length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData;
          while (i < length - 2) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
              emulationPreventionBytesPositions.push(i + 2);
              i += 2;
            } else {
              i++;
            }
          }
          if (emulationPreventionBytesPositions.length === 0) {
            return data;
          }
          newLength = length - emulationPreventionBytesPositions.length;
          newData = new Uint8Array(newLength);
          var sourceIndex = 0;
          for (i = 0; i < newLength; sourceIndex++, i++) {
            if (sourceIndex === emulationPreventionBytesPositions[0]) {
              sourceIndex++;
              emulationPreventionBytesPositions.shift();
            }
            newData[i] = data[sourceIndex];
          }
          return newData;
        };
        var captionPacketParser = {
          parseSei,
          parseUserData,
          parseCaptionPackets,
          discardEmulationPreventionBytes: discardEmulationPreventionBytes$1,
          USER_DATA_REGISTERED_ITU_T_T35
        };
        var CaptionStream$1 = function CaptionStream2(options) {
          options = options || {};
          CaptionStream2.prototype.init.call(this);
          this.parse708captions_ = typeof options.parse708captions === "boolean" ? options.parse708captions : true;
          this.captionPackets_ = [];
          this.ccStreams_ = [
            new Cea608Stream(0, 0),
new Cea608Stream(0, 1),
new Cea608Stream(1, 0),
new Cea608Stream(1, 1)
];
          if (this.parse708captions_) {
            this.cc708Stream_ = new Cea708Stream({
              captionServices: options.captionServices
            });
          }
          this.reset();
          this.ccStreams_.forEach(function(cc) {
            cc.on("data", this.trigger.bind(this, "data"));
            cc.on("partialdone", this.trigger.bind(this, "partialdone"));
            cc.on("done", this.trigger.bind(this, "done"));
          }, this);
          if (this.parse708captions_) {
            this.cc708Stream_.on("data", this.trigger.bind(this, "data"));
            this.cc708Stream_.on("partialdone", this.trigger.bind(this, "partialdone"));
            this.cc708Stream_.on("done", this.trigger.bind(this, "done"));
          }
        };
        CaptionStream$1.prototype = new stream();
        CaptionStream$1.prototype.push = function(event) {
          var sei, userData, newCaptionPackets;
          if (event.nalUnitType !== "sei_rbsp") {
            return;
          }
          sei = captionPacketParser.parseSei(event.escapedRBSP);
          if (!sei.payload) {
            return;
          }
          if (sei.payloadType !== captionPacketParser.USER_DATA_REGISTERED_ITU_T_T35) {
            return;
          }
          userData = captionPacketParser.parseUserData(sei);
          if (!userData) {
            return;
          }
          if (event.dts < this.latestDts_) {
            this.ignoreNextEqualDts_ = true;
            return;
          } else if (event.dts === this.latestDts_ && this.ignoreNextEqualDts_) {
            this.numSameDts_--;
            if (!this.numSameDts_) {
              this.ignoreNextEqualDts_ = false;
            }
            return;
          }
          newCaptionPackets = captionPacketParser.parseCaptionPackets(event.pts, userData);
          this.captionPackets_ = this.captionPackets_.concat(newCaptionPackets);
          if (this.latestDts_ !== event.dts) {
            this.numSameDts_ = 0;
          }
          this.numSameDts_++;
          this.latestDts_ = event.dts;
        };
        CaptionStream$1.prototype.flushCCStreams = function(flushType) {
          this.ccStreams_.forEach(function(cc) {
            return flushType === "flush" ? cc.flush() : cc.partialFlush();
          }, this);
        };
        CaptionStream$1.prototype.flushStream = function(flushType) {
          if (!this.captionPackets_.length) {
            this.flushCCStreams(flushType);
            return;
          }
          this.captionPackets_.forEach(function(elem, idx) {
            elem.presortIndex = idx;
          });
          this.captionPackets_.sort(function(a, b) {
            if (a.pts === b.pts) {
              return a.presortIndex - b.presortIndex;
            }
            return a.pts - b.pts;
          });
          this.captionPackets_.forEach(function(packet) {
            if (packet.type < 2) {
              this.dispatchCea608Packet(packet);
            } else {
              this.dispatchCea708Packet(packet);
            }
          }, this);
          this.captionPackets_.length = 0;
          this.flushCCStreams(flushType);
        };
        CaptionStream$1.prototype.flush = function() {
          return this.flushStream("flush");
        };
        CaptionStream$1.prototype.partialFlush = function() {
          return this.flushStream("partialFlush");
        };
        CaptionStream$1.prototype.reset = function() {
          this.latestDts_ = null;
          this.ignoreNextEqualDts_ = false;
          this.numSameDts_ = 0;
          this.activeCea608Channel_ = [null, null];
          this.ccStreams_.forEach(function(ccStream) {
            ccStream.reset();
          });
        };
        CaptionStream$1.prototype.dispatchCea608Packet = function(packet) {
          if (this.setsTextOrXDSActive(packet)) {
            this.activeCea608Channel_[packet.type] = null;
          } else if (this.setsChannel1Active(packet)) {
            this.activeCea608Channel_[packet.type] = 0;
          } else if (this.setsChannel2Active(packet)) {
            this.activeCea608Channel_[packet.type] = 1;
          }
          if (this.activeCea608Channel_[packet.type] === null) {
            return;
          }
          this.ccStreams_[(packet.type << 1) + this.activeCea608Channel_[packet.type]].push(packet);
        };
        CaptionStream$1.prototype.setsChannel1Active = function(packet) {
          return (packet.ccData & 30720) === 4096;
        };
        CaptionStream$1.prototype.setsChannel2Active = function(packet) {
          return (packet.ccData & 30720) === 6144;
        };
        CaptionStream$1.prototype.setsTextOrXDSActive = function(packet) {
          return (packet.ccData & 28928) === 256 || (packet.ccData & 30974) === 4138 || (packet.ccData & 30974) === 6186;
        };
        CaptionStream$1.prototype.dispatchCea708Packet = function(packet) {
          if (this.parse708captions_) {
            this.cc708Stream_.push(packet);
          }
        };
        var CHARACTER_TRANSLATION_708 = {
          127: 9834,
4128: 32,
4129: 160,
4133: 8230,
4138: 352,
4140: 338,
4144: 9608,
4145: 8216,
4146: 8217,
4147: 8220,
4148: 8221,
4149: 8226,
4153: 8482,
4154: 353,
4156: 339,
4157: 8480,
4159: 376,
4214: 8539,
4215: 8540,
4216: 8541,
4217: 8542,
4218: 9168,
4219: 9124,
4220: 9123,
4221: 9135,
4222: 9126,
4223: 9121,
4256: 12600
};
        var get708CharFromCode = function get708CharFromCode2(code) {
          var newCode = CHARACTER_TRANSLATION_708[code] || code;
          if (code & 4096 && code === newCode) {
            return "";
          }
          return String.fromCharCode(newCode);
        };
        var within708TextBlock = function within708TextBlock2(b) {
          return 32 <= b && b <= 127 || 160 <= b && b <= 255;
        };
        var Cea708Window = function Cea708Window2(windowNum) {
          this.windowNum = windowNum;
          this.reset();
        };
        Cea708Window.prototype.reset = function() {
          this.clearText();
          this.pendingNewLine = false;
          this.winAttr = {};
          this.penAttr = {};
          this.penLoc = {};
          this.penColor = {};
          this.visible = 0;
          this.rowLock = 0;
          this.columnLock = 0;
          this.priority = 0;
          this.relativePositioning = 0;
          this.anchorVertical = 0;
          this.anchorHorizontal = 0;
          this.anchorPoint = 0;
          this.rowCount = 1;
          this.virtualRowCount = this.rowCount + 1;
          this.columnCount = 41;
          this.windowStyle = 0;
          this.penStyle = 0;
        };
        Cea708Window.prototype.getText = function() {
          return this.rows.join("\n");
        };
        Cea708Window.prototype.clearText = function() {
          this.rows = [""];
          this.rowIdx = 0;
        };
        Cea708Window.prototype.newLine = function(pts) {
          if (this.rows.length >= this.virtualRowCount && typeof this.beforeRowOverflow === "function") {
            this.beforeRowOverflow(pts);
          }
          if (this.rows.length > 0) {
            this.rows.push("");
            this.rowIdx++;
          }
          while (this.rows.length > this.virtualRowCount) {
            this.rows.shift();
            this.rowIdx--;
          }
        };
        Cea708Window.prototype.isEmpty = function() {
          if (this.rows.length === 0) {
            return true;
          } else if (this.rows.length === 1) {
            return this.rows[0] === "";
          }
          return false;
        };
        Cea708Window.prototype.addText = function(text) {
          this.rows[this.rowIdx] += text;
        };
        Cea708Window.prototype.backspace = function() {
          if (!this.isEmpty()) {
            var row = this.rows[this.rowIdx];
            this.rows[this.rowIdx] = row.substr(0, row.length - 1);
          }
        };
        var Cea708Service = function Cea708Service2(serviceNum, encoding, stream2) {
          this.serviceNum = serviceNum;
          this.text = "";
          this.currentWindow = new Cea708Window(-1);
          this.windows = [];
          this.stream = stream2;
          if (typeof encoding === "string") {
            this.createTextDecoder(encoding);
          }
        };
        Cea708Service.prototype.init = function(pts, beforeRowOverflow) {
          this.startPts = pts;
          for (var win = 0; win < 8; win++) {
            this.windows[win] = new Cea708Window(win);
            if (typeof beforeRowOverflow === "function") {
              this.windows[win].beforeRowOverflow = beforeRowOverflow;
            }
          }
        };
        Cea708Service.prototype.setCurrentWindow = function(windowNum) {
          this.currentWindow = this.windows[windowNum];
        };
        Cea708Service.prototype.createTextDecoder = function(encoding) {
          if (typeof TextDecoder === "undefined") {
            this.stream.trigger("log", {
              level: "warn",
              message: "The `encoding` option is unsupported without TextDecoder support"
            });
          } else {
            try {
              this.textDecoder_ = new TextDecoder(encoding);
            } catch (error) {
              this.stream.trigger("log", {
                level: "warn",
                message: "TextDecoder could not be created with " + encoding + " encoding. " + error
              });
            }
          }
        };
        var Cea708Stream = function Cea708Stream2(options) {
          options = options || {};
          Cea708Stream2.prototype.init.call(this);
          var self2 = this;
          var captionServices = options.captionServices || {};
          var captionServiceEncodings = {};
          var serviceProps;
          Object.keys(captionServices).forEach(function(serviceName) {
            serviceProps = captionServices[serviceName];
            if (/^SERVICE/.test(serviceName)) {
              captionServiceEncodings[serviceName] = serviceProps.encoding;
            }
          });
          this.serviceEncodings = captionServiceEncodings;
          this.current708Packet = null;
          this.services = {};
          this.push = function(packet) {
            if (packet.type === 3) {
              self2.new708Packet();
              self2.add708Bytes(packet);
            } else {
              if (self2.current708Packet === null) {
                self2.new708Packet();
              }
              self2.add708Bytes(packet);
            }
          };
        };
        Cea708Stream.prototype = new stream();
        Cea708Stream.prototype.new708Packet = function() {
          if (this.current708Packet !== null) {
            this.push708Packet();
          }
          this.current708Packet = {
            data: [],
            ptsVals: []
          };
        };
        Cea708Stream.prototype.add708Bytes = function(packet) {
          var data = packet.ccData;
          var byte0 = data >>> 8;
          var byte1 = data & 255;
          this.current708Packet.ptsVals.push(packet.pts);
          this.current708Packet.data.push(byte0);
          this.current708Packet.data.push(byte1);
        };
        Cea708Stream.prototype.push708Packet = function() {
          var packet708 = this.current708Packet;
          var packetData = packet708.data;
          var serviceNum = null;
          var blockSize = null;
          var i = 0;
          var b = packetData[i++];
          packet708.seq = b >> 6;
          packet708.sizeCode = b & 63;
          for (; i < packetData.length; i++) {
            b = packetData[i++];
            serviceNum = b >> 5;
            blockSize = b & 31;
            if (serviceNum === 7 && blockSize > 0) {
              b = packetData[i++];
              serviceNum = b;
            }
            this.pushServiceBlock(serviceNum, i, blockSize);
            if (blockSize > 0) {
              i += blockSize - 1;
            }
          }
        };
        Cea708Stream.prototype.pushServiceBlock = function(serviceNum, start, size) {
          var b;
          var i = start;
          var packetData = this.current708Packet.data;
          var service = this.services[serviceNum];
          if (!service) {
            service = this.initService(serviceNum, i);
          }
          for (; i < start + size && i < packetData.length; i++) {
            b = packetData[i];
            if (within708TextBlock(b)) {
              i = this.handleText(i, service);
            } else if (b === 24) {
              i = this.multiByteCharacter(i, service);
            } else if (b === 16) {
              i = this.extendedCommands(i, service);
            } else if (128 <= b && b <= 135) {
              i = this.setCurrentWindow(i, service);
            } else if (152 <= b && b <= 159) {
              i = this.defineWindow(i, service);
            } else if (b === 136) {
              i = this.clearWindows(i, service);
            } else if (b === 140) {
              i = this.deleteWindows(i, service);
            } else if (b === 137) {
              i = this.displayWindows(i, service);
            } else if (b === 138) {
              i = this.hideWindows(i, service);
            } else if (b === 139) {
              i = this.toggleWindows(i, service);
            } else if (b === 151) {
              i = this.setWindowAttributes(i, service);
            } else if (b === 144) {
              i = this.setPenAttributes(i, service);
            } else if (b === 145) {
              i = this.setPenColor(i, service);
            } else if (b === 146) {
              i = this.setPenLocation(i, service);
            } else if (b === 143) {
              service = this.reset(i, service);
            } else if (b === 8) {
              service.currentWindow.backspace();
            } else if (b === 12) {
              service.currentWindow.clearText();
            } else if (b === 13) {
              service.currentWindow.pendingNewLine = true;
            } else if (b === 14) {
              service.currentWindow.clearText();
            } else if (b === 141) {
              i++;
            } else ;
          }
        };
        Cea708Stream.prototype.extendedCommands = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          if (within708TextBlock(b)) {
            i = this.handleText(i, service, {
              isExtended: true
            });
          }
          return i;
        };
        Cea708Stream.prototype.getPts = function(byteIndex) {
          return this.current708Packet.ptsVals[Math.floor(byteIndex / 2)];
        };
        Cea708Stream.prototype.initService = function(serviceNum, i) {
          var serviceName = "SERVICE" + serviceNum;
          var self2 = this;
          var serviceName;
          var encoding;
          if (serviceName in this.serviceEncodings) {
            encoding = this.serviceEncodings[serviceName];
          }
          this.services[serviceNum] = new Cea708Service(serviceNum, encoding, self2);
          this.services[serviceNum].init(this.getPts(i), function(pts) {
            self2.flushDisplayed(pts, self2.services[serviceNum]);
          });
          return this.services[serviceNum];
        };
        Cea708Stream.prototype.handleText = function(i, service, options) {
          var isExtended = options && options.isExtended;
          var isMultiByte = options && options.isMultiByte;
          var packetData = this.current708Packet.data;
          var extended = isExtended ? 4096 : 0;
          var currentByte = packetData[i];
          var nextByte = packetData[i + 1];
          var win = service.currentWindow;
          var char;
          var charCodeArray;
          function toHexString2(byteArray) {
            return byteArray.map(function(byte) {
              return ("0" + (byte & 255).toString(16)).slice(-2);
            }).join("");
          }
          if (isMultiByte) {
            charCodeArray = [currentByte, nextByte];
            i++;
          } else {
            charCodeArray = [currentByte];
          }
          if (service.textDecoder_ && !isExtended) {
            char = service.textDecoder_.decode(new Uint8Array(charCodeArray));
          } else {
            if (isMultiByte) {
              var unicode = toHexString2(charCodeArray);
              char = String.fromCharCode(parseInt(unicode, 16));
            } else {
              char = get708CharFromCode(extended | currentByte);
            }
          }
          if (win.pendingNewLine && !win.isEmpty()) {
            win.newLine(this.getPts(i));
          }
          win.pendingNewLine = false;
          win.addText(char);
          return i;
        };
        Cea708Stream.prototype.multiByteCharacter = function(i, service) {
          var packetData = this.current708Packet.data;
          var firstByte = packetData[i + 1];
          var secondByte = packetData[i + 2];
          if (within708TextBlock(firstByte) && within708TextBlock(secondByte)) {
            i = this.handleText(++i, service, {
              isMultiByte: true
            });
          }
          return i;
        };
        Cea708Stream.prototype.setCurrentWindow = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var windowNum = b & 7;
          service.setCurrentWindow(windowNum);
          return i;
        };
        Cea708Stream.prototype.defineWindow = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var windowNum = b & 7;
          service.setCurrentWindow(windowNum);
          var win = service.currentWindow;
          b = packetData[++i];
          win.visible = (b & 32) >> 5;
          win.rowLock = (b & 16) >> 4;
          win.columnLock = (b & 8) >> 3;
          win.priority = b & 7;
          b = packetData[++i];
          win.relativePositioning = (b & 128) >> 7;
          win.anchorVertical = b & 127;
          b = packetData[++i];
          win.anchorHorizontal = b;
          b = packetData[++i];
          win.anchorPoint = (b & 240) >> 4;
          win.rowCount = b & 15;
          b = packetData[++i];
          win.columnCount = b & 63;
          b = packetData[++i];
          win.windowStyle = (b & 56) >> 3;
          win.penStyle = b & 7;
          win.virtualRowCount = win.rowCount + 1;
          return i;
        };
        Cea708Stream.prototype.setWindowAttributes = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var winAttr = service.currentWindow.winAttr;
          b = packetData[++i];
          winAttr.fillOpacity = (b & 192) >> 6;
          winAttr.fillRed = (b & 48) >> 4;
          winAttr.fillGreen = (b & 12) >> 2;
          winAttr.fillBlue = b & 3;
          b = packetData[++i];
          winAttr.borderType = (b & 192) >> 6;
          winAttr.borderRed = (b & 48) >> 4;
          winAttr.borderGreen = (b & 12) >> 2;
          winAttr.borderBlue = b & 3;
          b = packetData[++i];
          winAttr.borderType += (b & 128) >> 5;
          winAttr.wordWrap = (b & 64) >> 6;
          winAttr.printDirection = (b & 48) >> 4;
          winAttr.scrollDirection = (b & 12) >> 2;
          winAttr.justify = b & 3;
          b = packetData[++i];
          winAttr.effectSpeed = (b & 240) >> 4;
          winAttr.effectDirection = (b & 12) >> 2;
          winAttr.displayEffect = b & 3;
          return i;
        };
        Cea708Stream.prototype.flushDisplayed = function(pts, service) {
          var displayedText = [];
          for (var winId = 0; winId < 8; winId++) {
            if (service.windows[winId].visible && !service.windows[winId].isEmpty()) {
              displayedText.push(service.windows[winId].getText());
            }
          }
          service.endPts = pts;
          service.text = displayedText.join("\n\n");
          this.pushCaption(service);
          service.startPts = pts;
        };
        Cea708Stream.prototype.pushCaption = function(service) {
          if (service.text !== "") {
            this.trigger("data", {
              startPts: service.startPts,
              endPts: service.endPts,
              text: service.text,
              stream: "cc708_" + service.serviceNum
            });
            service.text = "";
            service.startPts = service.endPts;
          }
        };
        Cea708Stream.prototype.displayWindows = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          for (var winId = 0; winId < 8; winId++) {
            if (b & 1 << winId) {
              service.windows[winId].visible = 1;
            }
          }
          return i;
        };
        Cea708Stream.prototype.hideWindows = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          for (var winId = 0; winId < 8; winId++) {
            if (b & 1 << winId) {
              service.windows[winId].visible = 0;
            }
          }
          return i;
        };
        Cea708Stream.prototype.toggleWindows = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          for (var winId = 0; winId < 8; winId++) {
            if (b & 1 << winId) {
              service.windows[winId].visible ^= 1;
            }
          }
          return i;
        };
        Cea708Stream.prototype.clearWindows = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          for (var winId = 0; winId < 8; winId++) {
            if (b & 1 << winId) {
              service.windows[winId].clearText();
            }
          }
          return i;
        };
        Cea708Stream.prototype.deleteWindows = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[++i];
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          for (var winId = 0; winId < 8; winId++) {
            if (b & 1 << winId) {
              service.windows[winId].reset();
            }
          }
          return i;
        };
        Cea708Stream.prototype.setPenAttributes = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var penAttr = service.currentWindow.penAttr;
          b = packetData[++i];
          penAttr.textTag = (b & 240) >> 4;
          penAttr.offset = (b & 12) >> 2;
          penAttr.penSize = b & 3;
          b = packetData[++i];
          penAttr.italics = (b & 128) >> 7;
          penAttr.underline = (b & 64) >> 6;
          penAttr.edgeType = (b & 56) >> 3;
          penAttr.fontStyle = b & 7;
          return i;
        };
        Cea708Stream.prototype.setPenColor = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var penColor = service.currentWindow.penColor;
          b = packetData[++i];
          penColor.fgOpacity = (b & 192) >> 6;
          penColor.fgRed = (b & 48) >> 4;
          penColor.fgGreen = (b & 12) >> 2;
          penColor.fgBlue = b & 3;
          b = packetData[++i];
          penColor.bgOpacity = (b & 192) >> 6;
          penColor.bgRed = (b & 48) >> 4;
          penColor.bgGreen = (b & 12) >> 2;
          penColor.bgBlue = b & 3;
          b = packetData[++i];
          penColor.edgeRed = (b & 48) >> 4;
          penColor.edgeGreen = (b & 12) >> 2;
          penColor.edgeBlue = b & 3;
          return i;
        };
        Cea708Stream.prototype.setPenLocation = function(i, service) {
          var packetData = this.current708Packet.data;
          var b = packetData[i];
          var penLoc = service.currentWindow.penLoc;
          service.currentWindow.pendingNewLine = true;
          b = packetData[++i];
          penLoc.row = b & 15;
          b = packetData[++i];
          penLoc.column = b & 63;
          return i;
        };
        Cea708Stream.prototype.reset = function(i, service) {
          var pts = this.getPts(i);
          this.flushDisplayed(pts, service);
          return this.initService(service.serviceNum, i);
        };
        var CHARACTER_TRANSLATION = {
          42: 225,
92: 233,
94: 237,
95: 243,
96: 250,
123: 231,
124: 247,
125: 209,
126: 241,
127: 9608,
304: 174,
305: 176,
306: 189,
307: 191,
308: 8482,
309: 162,
310: 163,
311: 9834,
312: 224,
313: 160,
314: 232,
315: 226,
316: 234,
317: 238,
318: 244,
319: 251,
544: 193,
545: 201,
546: 211,
547: 218,
548: 220,
549: 252,
550: 8216,
551: 161,
552: 42,
553: 39,
554: 8212,
555: 169,
556: 8480,
557: 8226,
558: 8220,
559: 8221,
560: 192,
561: 194,
562: 199,
563: 200,
564: 202,
565: 203,
566: 235,
567: 206,
568: 207,
569: 239,
570: 212,
571: 217,
572: 249,
573: 219,
574: 171,
575: 187,
800: 195,
801: 227,
802: 205,
803: 204,
804: 236,
805: 210,
806: 242,
807: 213,
808: 245,
809: 123,
810: 125,
811: 92,
812: 94,
813: 95,
814: 124,
815: 126,
816: 196,
817: 228,
818: 214,
819: 246,
820: 223,
821: 165,
822: 164,
823: 9474,
824: 197,
825: 229,
826: 216,
827: 248,
828: 9484,
829: 9488,
830: 9492,
831: 9496
};
        var getCharFromCode = function getCharFromCode2(code) {
          if (code === null) {
            return "";
          }
          code = CHARACTER_TRANSLATION[code] || code;
          return String.fromCharCode(code);
        };
        var BOTTOM_ROW = 14;
        var ROWS = [4352, 4384, 4608, 4640, 5376, 5408, 5632, 5664, 5888, 5920, 4096, 4864, 4896, 5120, 5152];
        var createDisplayBuffer = function createDisplayBuffer2() {
          var result = [], i = BOTTOM_ROW + 1;
          while (i--) {
            result.push({
              text: "",
              indent: 0,
              offset: 0
            });
          }
          return result;
        };
        var Cea608Stream = function Cea608Stream2(field, dataChannel) {
          Cea608Stream2.prototype.init.call(this);
          this.field_ = field || 0;
          this.dataChannel_ = dataChannel || 0;
          this.name_ = "CC" + ((this.field_ << 1 | this.dataChannel_) + 1);
          this.setConstants();
          this.reset();
          this.push = function(packet) {
            var data, swap, char0, char1, text;
            data = packet.ccData & 32639;
            if (data === this.lastControlCode_) {
              this.lastControlCode_ = null;
              return;
            }
            if ((data & 61440) === 4096) {
              this.lastControlCode_ = data;
            } else if (data !== this.PADDING_) {
              this.lastControlCode_ = null;
            }
            char0 = data >>> 8;
            char1 = data & 255;
            if (data === this.PADDING_) {
              return;
            } else if (data === this.RESUME_CAPTION_LOADING_) {
              this.mode_ = "popOn";
            } else if (data === this.END_OF_CAPTION_) {
              this.mode_ = "popOn";
              this.clearFormatting(packet.pts);
              this.flushDisplayed(packet.pts);
              swap = this.displayed_;
              this.displayed_ = this.nonDisplayed_;
              this.nonDisplayed_ = swap;
              this.startPts_ = packet.pts;
            } else if (data === this.ROLL_UP_2_ROWS_) {
              this.rollUpRows_ = 2;
              this.setRollUp(packet.pts);
            } else if (data === this.ROLL_UP_3_ROWS_) {
              this.rollUpRows_ = 3;
              this.setRollUp(packet.pts);
            } else if (data === this.ROLL_UP_4_ROWS_) {
              this.rollUpRows_ = 4;
              this.setRollUp(packet.pts);
            } else if (data === this.CARRIAGE_RETURN_) {
              this.clearFormatting(packet.pts);
              this.flushDisplayed(packet.pts);
              this.shiftRowsUp_();
              this.startPts_ = packet.pts;
            } else if (data === this.BACKSPACE_) {
              if (this.mode_ === "popOn") {
                this.nonDisplayed_[this.row_].text = this.nonDisplayed_[this.row_].text.slice(0, -1);
              } else {
                this.displayed_[this.row_].text = this.displayed_[this.row_].text.slice(0, -1);
              }
            } else if (data === this.ERASE_DISPLAYED_MEMORY_) {
              this.flushDisplayed(packet.pts);
              this.displayed_ = createDisplayBuffer();
            } else if (data === this.ERASE_NON_DISPLAYED_MEMORY_) {
              this.nonDisplayed_ = createDisplayBuffer();
            } else if (data === this.RESUME_DIRECT_CAPTIONING_) {
              if (this.mode_ !== "paintOn") {
                this.flushDisplayed(packet.pts);
                this.displayed_ = createDisplayBuffer();
              }
              this.mode_ = "paintOn";
              this.startPts_ = packet.pts;
            } else if (this.isSpecialCharacter(char0, char1)) {
              char0 = (char0 & 3) << 8;
              text = getCharFromCode(char0 | char1);
              this[this.mode_](packet.pts, text);
              this.column_++;
            } else if (this.isExtCharacter(char0, char1)) {
              if (this.mode_ === "popOn") {
                this.nonDisplayed_[this.row_].text = this.nonDisplayed_[this.row_].text.slice(0, -1);
              } else {
                this.displayed_[this.row_].text = this.displayed_[this.row_].text.slice(0, -1);
              }
              char0 = (char0 & 3) << 8;
              text = getCharFromCode(char0 | char1);
              this[this.mode_](packet.pts, text);
              this.column_++;
            } else if (this.isMidRowCode(char0, char1)) {
              this.clearFormatting(packet.pts);
              this[this.mode_](packet.pts, " ");
              this.column_++;
              if ((char1 & 14) === 14) {
                this.addFormatting(packet.pts, ["i"]);
              }
              if ((char1 & 1) === 1) {
                this.addFormatting(packet.pts, ["u"]);
              }
            } else if (this.isOffsetControlCode(char0, char1)) {
              var offset = char1 & 3;
              this.nonDisplayed_[this.row_].offset = offset;
              this.column_ += offset;
            } else if (this.isPAC(char0, char1)) {
              var row = ROWS.indexOf(data & 7968);
              if (this.mode_ === "rollUp") {
                if (row - this.rollUpRows_ + 1 < 0) {
                  row = this.rollUpRows_ - 1;
                }
                this.setRollUp(packet.pts, row);
              }
              if (row !== this.row_ && row >= 0 && row <= 14) {
                this.clearFormatting(packet.pts);
                this.row_ = row;
              }
              if (char1 & 1 && this.formatting_.indexOf("u") === -1) {
                this.addFormatting(packet.pts, ["u"]);
              }
              if ((data & 16) === 16) {
                var indentations = (data & 14) >> 1;
                this.column_ = indentations * 4;
                this.nonDisplayed_[this.row_].indent += indentations;
              }
              if (this.isColorPAC(char1)) {
                if ((char1 & 14) === 14) {
                  this.addFormatting(packet.pts, ["i"]);
                }
              }
            } else if (this.isNormalChar(char0)) {
              if (char1 === 0) {
                char1 = null;
              }
              text = getCharFromCode(char0);
              text += getCharFromCode(char1);
              this[this.mode_](packet.pts, text);
              this.column_ += text.length;
            }
          };
        };
        Cea608Stream.prototype = new stream();
        Cea608Stream.prototype.flushDisplayed = function(pts) {
          var _this = this;
          var logWarning = function logWarning2(index) {
            _this.trigger("log", {
              level: "warn",
              message: "Skipping a malformed 608 caption at index " + index + "."
            });
          };
          var content = [];
          this.displayed_.forEach(function(row, i) {
            if (row && row.text && row.text.length) {
              try {
                row.text = row.text.trim();
              } catch (e) {
                logWarning(i);
              }
              if (row.text.length) {
                content.push({
text: row.text,
line: i + 1,


position: 10 + Math.min(70, row.indent * 10) + row.offset * 2.5
                });
              }
            } else if (row === void 0 || row === null) {
              logWarning(i);
            }
          });
          if (content.length) {
            this.trigger("data", {
              startPts: this.startPts_,
              endPts: pts,
              content,
              stream: this.name_
            });
          }
        };
        Cea608Stream.prototype.reset = function() {
          this.mode_ = "popOn";
          this.topRow_ = 0;
          this.startPts_ = 0;
          this.displayed_ = createDisplayBuffer();
          this.nonDisplayed_ = createDisplayBuffer();
          this.lastControlCode_ = null;
          this.column_ = 0;
          this.row_ = BOTTOM_ROW;
          this.rollUpRows_ = 2;
          this.formatting_ = [];
        };
        Cea608Stream.prototype.setConstants = function() {
          if (this.dataChannel_ === 0) {
            this.BASE_ = 16;
            this.EXT_ = 17;
            this.CONTROL_ = (20 | this.field_) << 8;
            this.OFFSET_ = 23;
          } else if (this.dataChannel_ === 1) {
            this.BASE_ = 24;
            this.EXT_ = 25;
            this.CONTROL_ = (28 | this.field_) << 8;
            this.OFFSET_ = 31;
          }
          this.PADDING_ = 0;
          this.RESUME_CAPTION_LOADING_ = this.CONTROL_ | 32;
          this.END_OF_CAPTION_ = this.CONTROL_ | 47;
          this.ROLL_UP_2_ROWS_ = this.CONTROL_ | 37;
          this.ROLL_UP_3_ROWS_ = this.CONTROL_ | 38;
          this.ROLL_UP_4_ROWS_ = this.CONTROL_ | 39;
          this.CARRIAGE_RETURN_ = this.CONTROL_ | 45;
          this.RESUME_DIRECT_CAPTIONING_ = this.CONTROL_ | 41;
          this.BACKSPACE_ = this.CONTROL_ | 33;
          this.ERASE_DISPLAYED_MEMORY_ = this.CONTROL_ | 44;
          this.ERASE_NON_DISPLAYED_MEMORY_ = this.CONTROL_ | 46;
        };
        Cea608Stream.prototype.isSpecialCharacter = function(char0, char1) {
          return char0 === this.EXT_ && char1 >= 48 && char1 <= 63;
        };
        Cea608Stream.prototype.isExtCharacter = function(char0, char1) {
          return (char0 === this.EXT_ + 1 || char0 === this.EXT_ + 2) && char1 >= 32 && char1 <= 63;
        };
        Cea608Stream.prototype.isMidRowCode = function(char0, char1) {
          return char0 === this.EXT_ && char1 >= 32 && char1 <= 47;
        };
        Cea608Stream.prototype.isOffsetControlCode = function(char0, char1) {
          return char0 === this.OFFSET_ && char1 >= 33 && char1 <= 35;
        };
        Cea608Stream.prototype.isPAC = function(char0, char1) {
          return char0 >= this.BASE_ && char0 < this.BASE_ + 8 && char1 >= 64 && char1 <= 127;
        };
        Cea608Stream.prototype.isColorPAC = function(char1) {
          return char1 >= 64 && char1 <= 79 || char1 >= 96 && char1 <= 127;
        };
        Cea608Stream.prototype.isNormalChar = function(char) {
          return char >= 32 && char <= 127;
        };
        Cea608Stream.prototype.setRollUp = function(pts, newBaseRow) {
          if (this.mode_ !== "rollUp") {
            this.row_ = BOTTOM_ROW;
            this.mode_ = "rollUp";
            this.flushDisplayed(pts);
            this.nonDisplayed_ = createDisplayBuffer();
            this.displayed_ = createDisplayBuffer();
          }
          if (newBaseRow !== void 0 && newBaseRow !== this.row_) {
            for (var i = 0; i < this.rollUpRows_; i++) {
              this.displayed_[newBaseRow - i] = this.displayed_[this.row_ - i];
              this.displayed_[this.row_ - i] = {
                text: "",
                indent: 0,
                offset: 0
              };
            }
          }
          if (newBaseRow === void 0) {
            newBaseRow = this.row_;
          }
          this.topRow_ = newBaseRow - this.rollUpRows_ + 1;
        };
        Cea608Stream.prototype.addFormatting = function(pts, format) {
          this.formatting_ = this.formatting_.concat(format);
          var text = format.reduce(function(text2, format2) {
            return text2 + "<" + format2 + ">";
          }, "");
          this[this.mode_](pts, text);
        };
        Cea608Stream.prototype.clearFormatting = function(pts) {
          if (!this.formatting_.length) {
            return;
          }
          var text = this.formatting_.reverse().reduce(function(text2, format) {
            return text2 + "</" + format + ">";
          }, "");
          this.formatting_ = [];
          this[this.mode_](pts, text);
        };
        Cea608Stream.prototype.popOn = function(pts, text) {
          var baseRow = this.nonDisplayed_[this.row_].text;
          baseRow += text;
          this.nonDisplayed_[this.row_].text = baseRow;
        };
        Cea608Stream.prototype.rollUp = function(pts, text) {
          var baseRow = this.displayed_[this.row_].text;
          baseRow += text;
          this.displayed_[this.row_].text = baseRow;
        };
        Cea608Stream.prototype.shiftRowsUp_ = function() {
          var i;
          for (i = 0; i < this.topRow_; i++) {
            this.displayed_[i] = {
              text: "",
              indent: 0,
              offset: 0
            };
          }
          for (i = this.row_ + 1; i < BOTTOM_ROW + 1; i++) {
            this.displayed_[i] = {
              text: "",
              indent: 0,
              offset: 0
            };
          }
          for (i = this.topRow_; i < this.row_; i++) {
            this.displayed_[i] = this.displayed_[i + 1];
          }
          this.displayed_[this.row_] = {
            text: "",
            indent: 0,
            offset: 0
          };
        };
        Cea608Stream.prototype.paintOn = function(pts, text) {
          var baseRow = this.displayed_[this.row_].text;
          baseRow += text;
          this.displayed_[this.row_].text = baseRow;
        };
        var captionStream = {
          CaptionStream: CaptionStream$1,
          Cea608Stream,
          Cea708Stream
        };
        var streamTypes = {
          H264_STREAM_TYPE: 27,
          ADTS_STREAM_TYPE: 15,
          METADATA_STREAM_TYPE: 21
        };
        var MAX_TS = 8589934592;
        var RO_THRESH = 4294967296;
        var TYPE_SHARED = "shared";
        var handleRollover$1 = function handleRollover2(value, reference) {
          var direction = 1;
          if (value > reference) {
            direction = -1;
          }
          while (Math.abs(reference - value) > RO_THRESH) {
            value += direction * MAX_TS;
          }
          return value;
        };
        var TimestampRolloverStream$1 = function TimestampRolloverStream2(type2) {
          var lastDTS, referenceDTS;
          TimestampRolloverStream2.prototype.init.call(this);
          this.type_ = type2 || TYPE_SHARED;
          this.push = function(data) {
            if (data.type === "metadata") {
              this.trigger("data", data);
              return;
            }
            if (this.type_ !== TYPE_SHARED && data.type !== this.type_) {
              return;
            }
            if (referenceDTS === void 0) {
              referenceDTS = data.dts;
            }
            data.dts = handleRollover$1(data.dts, referenceDTS);
            data.pts = handleRollover$1(data.pts, referenceDTS);
            lastDTS = data.dts;
            this.trigger("data", data);
          };
          this.flush = function() {
            referenceDTS = lastDTS;
            this.trigger("done");
          };
          this.endTimeline = function() {
            this.flush();
            this.trigger("endedtimeline");
          };
          this.discontinuity = function() {
            referenceDTS = void 0;
            lastDTS = void 0;
          };
          this.reset = function() {
            this.discontinuity();
            this.trigger("reset");
          };
        };
        TimestampRolloverStream$1.prototype = new stream();
        var timestampRolloverStream = {
          TimestampRolloverStream: TimestampRolloverStream$1,
          handleRollover: handleRollover$1
        };
        var _MetadataStream;
        _MetadataStream = function MetadataStream(options) {
          var settings = {


descriptor: options && options.descriptor
          }, tagSize = 0, buffer = [], bufferSize = 0, i;
          _MetadataStream.prototype.init.call(this);
          this.dispatchType = streamTypes.METADATA_STREAM_TYPE.toString(16);
          if (settings.descriptor) {
            for (i = 0; i < settings.descriptor.length; i++) {
              this.dispatchType += ("00" + settings.descriptor[i].toString(16)).slice(-2);
            }
          }
          this.push = function(chunk) {
            var tag, frameStart, frameSize, frame, i2, frameHeader;
            if (chunk.type !== "timed-metadata") {
              return;
            }
            if (chunk.dataAlignmentIndicator) {
              bufferSize = 0;
              buffer.length = 0;
            }
            if (buffer.length === 0 && (chunk.data.length < 10 || chunk.data[0] !== "I".charCodeAt(0) || chunk.data[1] !== "D".charCodeAt(0) || chunk.data[2] !== "3".charCodeAt(0))) {
              this.trigger("log", {
                level: "warn",
                message: "Skipping unrecognized metadata packet"
              });
              return;
            }
            buffer.push(chunk);
            bufferSize += chunk.data.byteLength;
            if (buffer.length === 1) {
              tagSize = parseId3.parseSyncSafeInteger(chunk.data.subarray(6, 10));
              tagSize += 10;
            }
            if (bufferSize < tagSize) {
              return;
            }
            tag = {
              data: new Uint8Array(tagSize),
              frames: [],
              pts: buffer[0].pts,
              dts: buffer[0].dts
            };
            for (i2 = 0; i2 < tagSize; ) {
              tag.data.set(buffer[0].data.subarray(0, tagSize - i2), i2);
              i2 += buffer[0].data.byteLength;
              bufferSize -= buffer[0].data.byteLength;
              buffer.shift();
            }
            frameStart = 10;
            if (tag.data[5] & 64) {
              frameStart += 4;
              frameStart += parseId3.parseSyncSafeInteger(tag.data.subarray(10, 14));
              tagSize -= parseId3.parseSyncSafeInteger(tag.data.subarray(16, 20));
            }
            do {
              frameSize = parseId3.parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));
              if (frameSize < 1) {
                this.trigger("log", {
                  level: "warn",
                  message: "Malformed ID3 frame encountered. Skipping remaining metadata parsing."
                });
                break;
              }
              frameHeader = String.fromCharCode(tag.data[frameStart], tag.data[frameStart + 1], tag.data[frameStart + 2], tag.data[frameStart + 3]);
              frame = {
                id: frameHeader,
                data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)
              };
              frame.key = frame.id;
              if (parseId3.frameParsers[frame.id]) {
                parseId3.frameParsers[frame.id](frame);
              } else if (frame.id[0] === "T") {
                parseId3.frameParsers["T*"](frame);
              } else if (frame.id[0] === "W") {
                parseId3.frameParsers["W*"](frame);
              }
              if (frame.owner === "com.apple.streaming.transportStreamTimestamp") {
                var d = frame.data, size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
                size *= 4;
                size += d[7] & 3;
                frame.timeStamp = size;
                if (tag.pts === void 0 && tag.dts === void 0) {
                  tag.pts = frame.timeStamp;
                  tag.dts = frame.timeStamp;
                }
                this.trigger("timestamp", frame);
              }
              tag.frames.push(frame);
              frameStart += 10;
              frameStart += frameSize;
            } while (frameStart < tagSize);
            this.trigger("data", tag);
          };
        };
        _MetadataStream.prototype = new stream();
        var metadataStream = _MetadataStream;
        var TimestampRolloverStream = timestampRolloverStream.TimestampRolloverStream;
        var _TransportPacketStream, _TransportParseStream, _ElementaryStream;
        var MP2T_PACKET_LENGTH$1 = 188, SYNC_BYTE$1 = 71;
        _TransportPacketStream = function TransportPacketStream() {
          var buffer = new Uint8Array(MP2T_PACKET_LENGTH$1), bytesInBuffer = 0;
          _TransportPacketStream.prototype.init.call(this);
          this.push = function(bytes) {
            var startIndex = 0, endIndex = MP2T_PACKET_LENGTH$1, everything;
            if (bytesInBuffer) {
              everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
              everything.set(buffer.subarray(0, bytesInBuffer));
              everything.set(bytes, bytesInBuffer);
              bytesInBuffer = 0;
            } else {
              everything = bytes;
            }
            while (endIndex < everything.byteLength) {
              if (everything[startIndex] === SYNC_BYTE$1 && everything[endIndex] === SYNC_BYTE$1) {
                this.trigger("data", everything.subarray(startIndex, endIndex));
                startIndex += MP2T_PACKET_LENGTH$1;
                endIndex += MP2T_PACKET_LENGTH$1;
                continue;
              }
              startIndex++;
              endIndex++;
            }
            if (startIndex < everything.byteLength) {
              buffer.set(everything.subarray(startIndex), 0);
              bytesInBuffer = everything.byteLength - startIndex;
            }
          };
          this.flush = function() {
            if (bytesInBuffer === MP2T_PACKET_LENGTH$1 && buffer[0] === SYNC_BYTE$1) {
              this.trigger("data", buffer);
              bytesInBuffer = 0;
            }
            this.trigger("done");
          };
          this.endTimeline = function() {
            this.flush();
            this.trigger("endedtimeline");
          };
          this.reset = function() {
            bytesInBuffer = 0;
            this.trigger("reset");
          };
        };
        _TransportPacketStream.prototype = new stream();
        _TransportParseStream = function TransportParseStream() {
          var parsePsi, parsePat2, parsePmt2, self2;
          _TransportParseStream.prototype.init.call(this);
          self2 = this;
          this.packetsWaitingForPmt = [];
          this.programMapTable = void 0;
          parsePsi = function parsePsi2(payload, psi) {
            var offset = 0;
            if (psi.payloadUnitStartIndicator) {
              offset += payload[offset] + 1;
            }
            if (psi.type === "pat") {
              parsePat2(payload.subarray(offset), psi);
            } else {
              parsePmt2(payload.subarray(offset), psi);
            }
          };
          parsePat2 = function parsePat3(payload, pat) {
            pat.section_number = payload[7];
            pat.last_section_number = payload[8];
            self2.pmtPid = (payload[10] & 31) << 8 | payload[11];
            pat.pmtPid = self2.pmtPid;
          };
          parsePmt2 = function parsePmt3(payload, pmt) {
            var sectionLength, tableEnd, programInfoLength, offset;
            if (!(payload[5] & 1)) {
              return;
            }
            self2.programMapTable = {
              video: null,
              audio: null,
              "timed-metadata": {}
            };
            sectionLength = (payload[1] & 15) << 8 | payload[2];
            tableEnd = 3 + sectionLength - 4;
            programInfoLength = (payload[10] & 15) << 8 | payload[11];
            offset = 12 + programInfoLength;
            while (offset < tableEnd) {
              var streamType = payload[offset];
              var pid = (payload[offset + 1] & 31) << 8 | payload[offset + 2];
              if (streamType === streamTypes.H264_STREAM_TYPE && self2.programMapTable.video === null) {
                self2.programMapTable.video = pid;
              } else if (streamType === streamTypes.ADTS_STREAM_TYPE && self2.programMapTable.audio === null) {
                self2.programMapTable.audio = pid;
              } else if (streamType === streamTypes.METADATA_STREAM_TYPE) {
                self2.programMapTable["timed-metadata"][pid] = streamType;
              }
              offset += ((payload[offset + 3] & 15) << 8 | payload[offset + 4]) + 5;
            }
            pmt.programMapTable = self2.programMapTable;
          };
          this.push = function(packet) {
            var result = {}, offset = 4;
            result.payloadUnitStartIndicator = !!(packet[1] & 64);
            result.pid = packet[1] & 31;
            result.pid <<= 8;
            result.pid |= packet[2];
            if ((packet[3] & 48) >>> 4 > 1) {
              offset += packet[offset] + 1;
            }
            if (result.pid === 0) {
              result.type = "pat";
              parsePsi(packet.subarray(offset), result);
              this.trigger("data", result);
            } else if (result.pid === this.pmtPid) {
              result.type = "pmt";
              parsePsi(packet.subarray(offset), result);
              this.trigger("data", result);
              while (this.packetsWaitingForPmt.length) {
                this.processPes_.apply(this, this.packetsWaitingForPmt.shift());
              }
            } else if (this.programMapTable === void 0) {
              this.packetsWaitingForPmt.push([packet, offset, result]);
            } else {
              this.processPes_(packet, offset, result);
            }
          };
          this.processPes_ = function(packet, offset, result) {
            if (result.pid === this.programMapTable.video) {
              result.streamType = streamTypes.H264_STREAM_TYPE;
            } else if (result.pid === this.programMapTable.audio) {
              result.streamType = streamTypes.ADTS_STREAM_TYPE;
            } else {
              result.streamType = this.programMapTable["timed-metadata"][result.pid];
            }
            result.type = "pes";
            result.data = packet.subarray(offset);
            this.trigger("data", result);
          };
        };
        _TransportParseStream.prototype = new stream();
        _TransportParseStream.STREAM_TYPES = {
          h264: 27,
          adts: 15
        };
        _ElementaryStream = function ElementaryStream() {
          var self2 = this, segmentHadPmt = false, video = {
            data: [],
            size: 0
          }, audio = {
            data: [],
            size: 0
          }, timedMetadata = {
            data: [],
            size: 0
          }, programMapTable, parsePes = function parsePes2(payload, pes) {
            var ptsDtsFlags;
            var startPrefix = payload[0] << 16 | payload[1] << 8 | payload[2];
            pes.data = new Uint8Array();
            if (startPrefix !== 1) {
              return;
            }
            pes.packetLength = 6 + (payload[4] << 8 | payload[5]);
            pes.dataAlignmentIndicator = (payload[6] & 4) !== 0;
            ptsDtsFlags = payload[7];
            if (ptsDtsFlags & 192) {
              pes.pts = (payload[9] & 14) << 27 | (payload[10] & 255) << 20 | (payload[11] & 254) << 12 | (payload[12] & 255) << 5 | (payload[13] & 254) >>> 3;
              pes.pts *= 4;
              pes.pts += (payload[13] & 6) >>> 1;
              pes.dts = pes.pts;
              if (ptsDtsFlags & 64) {
                pes.dts = (payload[14] & 14) << 27 | (payload[15] & 255) << 20 | (payload[16] & 254) << 12 | (payload[17] & 255) << 5 | (payload[18] & 254) >>> 3;
                pes.dts *= 4;
                pes.dts += (payload[18] & 6) >>> 1;
              }
            }
            pes.data = payload.subarray(9 + payload[8]);
          }, flushStream = function flushStream2(stream2, type2, forceFlush) {
            var packetData = new Uint8Array(stream2.size), event = {
              type: type2
            }, i = 0, offset = 0, packetFlushable = false, fragment;
            if (!stream2.data.length || stream2.size < 9) {
              return;
            }
            event.trackId = stream2.data[0].pid;
            for (i = 0; i < stream2.data.length; i++) {
              fragment = stream2.data[i];
              packetData.set(fragment.data, offset);
              offset += fragment.data.byteLength;
            }
            parsePes(packetData, event);
            packetFlushable = type2 === "video" || event.packetLength <= stream2.size;
            if (forceFlush || packetFlushable) {
              stream2.size = 0;
              stream2.data.length = 0;
            }
            if (packetFlushable) {
              self2.trigger("data", event);
            }
          };
          _ElementaryStream.prototype.init.call(this);
          this.push = function(data) {
            ({
              pat: function pat() {
              },
              pes: function pes() {
                var stream2, streamType;
                switch (data.streamType) {
                  case streamTypes.H264_STREAM_TYPE:
                    stream2 = video;
                    streamType = "video";
                    break;
                  case streamTypes.ADTS_STREAM_TYPE:
                    stream2 = audio;
                    streamType = "audio";
                    break;
                  case streamTypes.METADATA_STREAM_TYPE:
                    stream2 = timedMetadata;
                    streamType = "timed-metadata";
                    break;
                  default:
                    return;
                }
                if (data.payloadUnitStartIndicator) {
                  flushStream(stream2, streamType, true);
                }
                stream2.data.push(data);
                stream2.size += data.data.byteLength;
              },
              pmt: function pmt() {
                var event = {
                  type: "metadata",
                  tracks: []
                };
                programMapTable = data.programMapTable;
                if (programMapTable.video !== null) {
                  event.tracks.push({
                    timelineStartInfo: {
                      baseMediaDecodeTime: 0
                    },
                    id: +programMapTable.video,
                    codec: "avc",
                    type: "video"
                  });
                }
                if (programMapTable.audio !== null) {
                  event.tracks.push({
                    timelineStartInfo: {
                      baseMediaDecodeTime: 0
                    },
                    id: +programMapTable.audio,
                    codec: "adts",
                    type: "audio"
                  });
                }
                segmentHadPmt = true;
                self2.trigger("data", event);
              }
            })[data.type]();
          };
          this.reset = function() {
            video.size = 0;
            video.data.length = 0;
            audio.size = 0;
            audio.data.length = 0;
            this.trigger("reset");
          };
          this.flushStreams_ = function() {
            flushStream(video, "video");
            flushStream(audio, "audio");
            flushStream(timedMetadata, "timed-metadata");
          };
          this.flush = function() {
            if (!segmentHadPmt && programMapTable) {
              var pmt = {
                type: "metadata",
                tracks: []
              };
              if (programMapTable.video !== null) {
                pmt.tracks.push({
                  timelineStartInfo: {
                    baseMediaDecodeTime: 0
                  },
                  id: +programMapTable.video,
                  codec: "avc",
                  type: "video"
                });
              }
              if (programMapTable.audio !== null) {
                pmt.tracks.push({
                  timelineStartInfo: {
                    baseMediaDecodeTime: 0
                  },
                  id: +programMapTable.audio,
                  codec: "adts",
                  type: "audio"
                });
              }
              self2.trigger("data", pmt);
            }
            segmentHadPmt = false;
            this.flushStreams_();
            this.trigger("done");
          };
        };
        _ElementaryStream.prototype = new stream();
        var m2ts$1 = {
          PAT_PID: 0,
          MP2T_PACKET_LENGTH: MP2T_PACKET_LENGTH$1,
          TransportPacketStream: _TransportPacketStream,
          TransportParseStream: _TransportParseStream,
          ElementaryStream: _ElementaryStream,
          TimestampRolloverStream,
          CaptionStream: captionStream.CaptionStream,
          Cea608Stream: captionStream.Cea608Stream,
          Cea708Stream: captionStream.Cea708Stream,
          MetadataStream: metadataStream
        };
        for (var type in streamTypes) {
          if (streamTypes.hasOwnProperty(type)) {
            m2ts$1[type] = streamTypes[type];
          }
        }
        var m2ts_1 = m2ts$1;
        var ADTS_SAMPLING_FREQUENCIES = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
        var parseId3TagSize = function parseId3TagSize2(header, byteIndex) {
          var returnSize = header[byteIndex + 6] << 21 | header[byteIndex + 7] << 14 | header[byteIndex + 8] << 7 | header[byteIndex + 9], flags = header[byteIndex + 5], footerPresent = (flags & 16) >> 4;
          returnSize = returnSize >= 0 ? returnSize : 0;
          if (footerPresent) {
            return returnSize + 20;
          }
          return returnSize + 10;
        };
        var getId3Offset = function getId3Offset2(data, offset) {
          if (data.length - offset < 10 || data[offset] !== "I".charCodeAt(0) || data[offset + 1] !== "D".charCodeAt(0) || data[offset + 2] !== "3".charCodeAt(0)) {
            return offset;
          }
          offset += parseId3TagSize(data, offset);
          return getId3Offset2(data, offset);
        };
        var isLikelyAacData$2 = function isLikelyAacData2(data) {
          var offset = getId3Offset(data, 0);
          return data.length >= offset + 2 && (data[offset] & 255) === 255 && (data[offset + 1] & 240) === 240 &&

(data[offset + 1] & 22) === 16;
        };
        var parseSyncSafeInteger = function parseSyncSafeInteger2(data) {
          return data[0] << 21 | data[1] << 14 | data[2] << 7 | data[3];
        };
        var percentEncode = function percentEncode2(bytes, start, end) {
          var i, result = "";
          for (i = start; i < end; i++) {
            result += "%" + ("00" + bytes[i].toString(16)).slice(-2);
          }
          return result;
        };
        var parseIso88591 = function parseIso885912(bytes, start, end) {
          return unescape(percentEncode(bytes, start, end));
        };
        var parseAdtsSize = function parseAdtsSize2(header, byteIndex) {
          var lowThree = (header[byteIndex + 5] & 224) >> 5, middle = header[byteIndex + 4] << 3, highTwo = header[byteIndex + 3] & 3 << 11;
          return highTwo | middle | lowThree;
        };
        var parseType$1 = function parseType2(header, byteIndex) {
          if (header[byteIndex] === "I".charCodeAt(0) && header[byteIndex + 1] === "D".charCodeAt(0) && header[byteIndex + 2] === "3".charCodeAt(0)) {
            return "timed-metadata";
          } else if (header[byteIndex] & true && (header[byteIndex + 1] & 240) === 240) {
            return "audio";
          }
          return null;
        };
        var parseSampleRate = function parseSampleRate2(packet) {
          var i = 0;
          while (i + 5 < packet.length) {
            if (packet[i] !== 255 || (packet[i + 1] & 246) !== 240) {
              i++;
              continue;
            }
            return ADTS_SAMPLING_FREQUENCIES[(packet[i + 2] & 60) >>> 2];
          }
          return null;
        };
        var parseAacTimestamp = function parseAacTimestamp2(packet) {
          var frameStart, frameSize, frame, frameHeader;
          frameStart = 10;
          if (packet[5] & 64) {
            frameStart += 4;
            frameStart += parseSyncSafeInteger(packet.subarray(10, 14));
          }
          do {
            frameSize = parseSyncSafeInteger(packet.subarray(frameStart + 4, frameStart + 8));
            if (frameSize < 1) {
              return null;
            }
            frameHeader = String.fromCharCode(packet[frameStart], packet[frameStart + 1], packet[frameStart + 2], packet[frameStart + 3]);
            if (frameHeader === "PRIV") {
              frame = packet.subarray(frameStart + 10, frameStart + frameSize + 10);
              for (var i = 0; i < frame.byteLength; i++) {
                if (frame[i] === 0) {
                  var owner = parseIso88591(frame, 0, i);
                  if (owner === "com.apple.streaming.transportStreamTimestamp") {
                    var d = frame.subarray(i + 1);
                    var size = (d[3] & 1) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
                    size *= 4;
                    size += d[7] & 3;
                    return size;
                  }
                  break;
                }
              }
            }
            frameStart += 10;
            frameStart += frameSize;
          } while (frameStart < packet.byteLength);
          return null;
        };
        var utils = {
          isLikelyAacData: isLikelyAacData$2,
          parseId3TagSize,
          parseAdtsSize,
          parseType: parseType$1,
          parseSampleRate,
          parseAacTimestamp
        };
        var _AacStream;
        _AacStream = function AacStream() {
          var everything = new Uint8Array(), timeStamp = 0;
          _AacStream.prototype.init.call(this);
          this.setTimestamp = function(timestamp) {
            timeStamp = timestamp;
          };
          this.push = function(bytes) {
            var frameSize = 0, byteIndex = 0, bytesLeft, chunk, packet, tempLength;
            if (everything.length) {
              tempLength = everything.length;
              everything = new Uint8Array(bytes.byteLength + tempLength);
              everything.set(everything.subarray(0, tempLength));
              everything.set(bytes, tempLength);
            } else {
              everything = bytes;
            }
            while (everything.length - byteIndex >= 3) {
              if (everything[byteIndex] === "I".charCodeAt(0) && everything[byteIndex + 1] === "D".charCodeAt(0) && everything[byteIndex + 2] === "3".charCodeAt(0)) {
                if (everything.length - byteIndex < 10) {
                  break;
                }
                frameSize = utils.parseId3TagSize(everything, byteIndex);
                if (byteIndex + frameSize > everything.length) {
                  break;
                }
                chunk = {
                  type: "timed-metadata",
                  data: everything.subarray(byteIndex, byteIndex + frameSize)
                };
                this.trigger("data", chunk);
                byteIndex += frameSize;
                continue;
              } else if ((everything[byteIndex] & 255) === 255 && (everything[byteIndex + 1] & 240) === 240) {
                if (everything.length - byteIndex < 7) {
                  break;
                }
                frameSize = utils.parseAdtsSize(everything, byteIndex);
                if (byteIndex + frameSize > everything.length) {
                  break;
                }
                packet = {
                  type: "audio",
                  data: everything.subarray(byteIndex, byteIndex + frameSize),
                  pts: timeStamp,
                  dts: timeStamp
                };
                this.trigger("data", packet);
                byteIndex += frameSize;
                continue;
              }
              byteIndex++;
            }
            bytesLeft = everything.length - byteIndex;
            if (bytesLeft > 0) {
              everything = everything.subarray(byteIndex);
            } else {
              everything = new Uint8Array();
            }
          };
          this.reset = function() {
            everything = new Uint8Array();
            this.trigger("reset");
          };
          this.endTimeline = function() {
            everything = new Uint8Array();
            this.trigger("endedtimeline");
          };
        };
        _AacStream.prototype = new stream();
        var aac = _AacStream;
        var AUDIO_PROPERTIES = ["audioobjecttype", "channelcount", "samplerate", "samplingfrequencyindex", "samplesize"];
        var audioProperties = AUDIO_PROPERTIES;
        var VIDEO_PROPERTIES = ["width", "height", "profileIdc", "levelIdc", "profileCompatibility", "sarRatio"];
        var videoProperties = VIDEO_PROPERTIES;
        var H264Stream$1 = h264.H264Stream;
        var isLikelyAacData$1 = utils.isLikelyAacData;
        var ONE_SECOND_IN_TS$2 = clock.ONE_SECOND_IN_TS;
        var _VideoSegmentStream$1, _AudioSegmentStream$1, _Transmuxer$1, _CoalesceStream;
        var retriggerForStream = function retriggerForStream2(key, event) {
          event.stream = key;
          this.trigger("log", event);
        };
        var addPipelineLogRetriggers = function addPipelineLogRetriggers2(transmuxer2, pipeline) {
          var keys = Object.keys(pipeline);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key === "headOfPipeline" || !pipeline[key].on) {
              continue;
            }
            pipeline[key].on("log", retriggerForStream.bind(transmuxer2, key));
          }
        };
        var arrayEquals = function arrayEquals2(a, b) {
          var i;
          if (a.length !== b.length) {
            return false;
          }
          for (i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
          return true;
        };
        var generateSegmentTimingInfo = function generateSegmentTimingInfo2(baseMediaDecodeTime, startDts, startPts, endDts, endPts, prependedContentDuration) {
          var ptsOffsetFromDts = startPts - startDts, decodeDuration = endDts - startDts, presentationDuration = endPts - startPts;
          return {
            start: {
              dts: baseMediaDecodeTime,
              pts: baseMediaDecodeTime + ptsOffsetFromDts
            },
            end: {
              dts: baseMediaDecodeTime + decodeDuration,
              pts: baseMediaDecodeTime + presentationDuration
            },
            prependedContentDuration,
            baseMediaDecodeTime
          };
        };
        _AudioSegmentStream$1 = function AudioSegmentStream2(track, options) {
          var adtsFrames = [], sequenceNumber, earliestAllowedDts = 0, audioAppendStartTs = 0, videoBaseMediaDecodeTime = Infinity;
          options = options || {};
          sequenceNumber = options.firstSequenceNumber || 0;
          _AudioSegmentStream$1.prototype.init.call(this);
          this.push = function(data) {
            trackDecodeInfo.collectDtsInfo(track, data);
            if (track) {
              audioProperties.forEach(function(prop) {
                track[prop] = data[prop];
              });
            }
            adtsFrames.push(data);
          };
          this.setEarliestDts = function(earliestDts) {
            earliestAllowedDts = earliestDts;
          };
          this.setVideoBaseMediaDecodeTime = function(baseMediaDecodeTime) {
            videoBaseMediaDecodeTime = baseMediaDecodeTime;
          };
          this.setAudioAppendStart = function(timestamp) {
            audioAppendStartTs = timestamp;
          };
          this.flush = function() {
            var frames, moof2, mdat2, boxes, frameDuration, segmentDuration, videoClockCyclesOfSilencePrefixed;
            if (adtsFrames.length === 0) {
              this.trigger("done", "AudioSegmentStream");
              return;
            }
            frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);
            track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
            videoClockCyclesOfSilencePrefixed = audioFrameUtils.prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime);
            track.samples = audioFrameUtils.generateSampleTable(frames);
            mdat2 = mp4Generator.mdat(audioFrameUtils.concatenateFrameData(frames));
            adtsFrames = [];
            moof2 = mp4Generator.moof(sequenceNumber, [track]);
            boxes = new Uint8Array(moof2.byteLength + mdat2.byteLength);
            sequenceNumber++;
            boxes.set(moof2);
            boxes.set(mdat2, moof2.byteLength);
            trackDecodeInfo.clearDtsInfo(track);
            frameDuration = Math.ceil(ONE_SECOND_IN_TS$2 * 1024 / track.samplerate);
            if (frames.length) {
              segmentDuration = frames.length * frameDuration;
              this.trigger("segmentTimingInfo", generateSegmentTimingInfo(


clock.audioTsToVideoTs(track.baseMediaDecodeTime, track.samplerate),
frames[0].dts,
                frames[0].pts,
                frames[0].dts + segmentDuration,
                frames[0].pts + segmentDuration,
                videoClockCyclesOfSilencePrefixed || 0
              ));
              this.trigger("timingInfo", {
                start: frames[0].pts,
                end: frames[0].pts + segmentDuration
              });
            }
            this.trigger("data", {
              track,
              boxes
            });
            this.trigger("done", "AudioSegmentStream");
          };
          this.reset = function() {
            trackDecodeInfo.clearDtsInfo(track);
            adtsFrames = [];
            this.trigger("reset");
          };
        };
        _AudioSegmentStream$1.prototype = new stream();
        _VideoSegmentStream$1 = function VideoSegmentStream2(track, options) {
          var sequenceNumber, nalUnits = [], gopsToAlignWith = [], config, pps;
          options = options || {};
          sequenceNumber = options.firstSequenceNumber || 0;
          _VideoSegmentStream$1.prototype.init.call(this);
          delete track.minPTS;
          this.gopCache_ = [];
          this.push = function(nalUnit) {
            trackDecodeInfo.collectDtsInfo(track, nalUnit);
            if (nalUnit.nalUnitType === "seq_parameter_set_rbsp" && !config) {
              config = nalUnit.config;
              track.sps = [nalUnit.data];
              videoProperties.forEach(function(prop) {
                track[prop] = config[prop];
              }, this);
            }
            if (nalUnit.nalUnitType === "pic_parameter_set_rbsp" && !pps) {
              pps = nalUnit.data;
              track.pps = [nalUnit.data];
            }
            nalUnits.push(nalUnit);
          };
          this.flush = function() {
            var frames, gopForFusion, gops, moof2, mdat2, boxes, prependedContentDuration = 0, firstGop, lastGop;
            while (nalUnits.length) {
              if (nalUnits[0].nalUnitType === "access_unit_delimiter_rbsp") {
                break;
              }
              nalUnits.shift();
            }
            if (nalUnits.length === 0) {
              this.resetStream_();
              this.trigger("done", "VideoSegmentStream");
              return;
            }
            frames = frameUtils.groupNalsIntoFrames(nalUnits);
            gops = frameUtils.groupFramesIntoGops(frames);
            if (!gops[0][0].keyFrame) {
              gopForFusion = this.getGopForFusion_(nalUnits[0], track);
              if (gopForFusion) {
                prependedContentDuration = gopForFusion.duration;
                gops.unshift(gopForFusion);
                gops.byteLength += gopForFusion.byteLength;
                gops.nalCount += gopForFusion.nalCount;
                gops.pts = gopForFusion.pts;
                gops.dts = gopForFusion.dts;
                gops.duration += gopForFusion.duration;
              } else {
                gops = frameUtils.extendFirstKeyFrame(gops);
              }
            }
            if (gopsToAlignWith.length) {
              var alignedGops;
              if (options.alignGopsAtEnd) {
                alignedGops = this.alignGopsAtEnd_(gops);
              } else {
                alignedGops = this.alignGopsAtStart_(gops);
              }
              if (!alignedGops) {
                this.gopCache_.unshift({
                  gop: gops.pop(),
                  pps: track.pps,
                  sps: track.sps
                });
                this.gopCache_.length = Math.min(6, this.gopCache_.length);
                nalUnits = [];
                this.resetStream_();
                this.trigger("done", "VideoSegmentStream");
                return;
              }
              trackDecodeInfo.clearDtsInfo(track);
              gops = alignedGops;
            }
            trackDecodeInfo.collectDtsInfo(track, gops);
            track.samples = frameUtils.generateSampleTable(gops);
            mdat2 = mp4Generator.mdat(frameUtils.concatenateNalData(gops));
            track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
            this.trigger("processedGopsInfo", gops.map(function(gop) {
              return {
                pts: gop.pts,
                dts: gop.dts,
                byteLength: gop.byteLength
              };
            }));
            firstGop = gops[0];
            lastGop = gops[gops.length - 1];
            this.trigger("segmentTimingInfo", generateSegmentTimingInfo(track.baseMediaDecodeTime, firstGop.dts, firstGop.pts, lastGop.dts + lastGop.duration, lastGop.pts + lastGop.duration, prependedContentDuration));
            this.trigger("timingInfo", {
              start: gops[0].pts,
              end: gops[gops.length - 1].pts + gops[gops.length - 1].duration
            });
            this.gopCache_.unshift({
              gop: gops.pop(),
              pps: track.pps,
              sps: track.sps
            });
            this.gopCache_.length = Math.min(6, this.gopCache_.length);
            nalUnits = [];
            this.trigger("baseMediaDecodeTime", track.baseMediaDecodeTime);
            this.trigger("timelineStartInfo", track.timelineStartInfo);
            moof2 = mp4Generator.moof(sequenceNumber, [track]);
            boxes = new Uint8Array(moof2.byteLength + mdat2.byteLength);
            sequenceNumber++;
            boxes.set(moof2);
            boxes.set(mdat2, moof2.byteLength);
            this.trigger("data", {
              track,
              boxes
            });
            this.resetStream_();
            this.trigger("done", "VideoSegmentStream");
          };
          this.reset = function() {
            this.resetStream_();
            nalUnits = [];
            this.gopCache_.length = 0;
            gopsToAlignWith.length = 0;
            this.trigger("reset");
          };
          this.resetStream_ = function() {
            trackDecodeInfo.clearDtsInfo(track);
            config = void 0;
            pps = void 0;
          };
          this.getGopForFusion_ = function(nalUnit) {
            var halfSecond = 45e3, nearestDistance = Infinity, dtsDistance, nearestGopObj, currentGop, currentGopObj, i;
            for (i = 0; i < this.gopCache_.length; i++) {
              currentGopObj = this.gopCache_[i];
              currentGop = currentGopObj.gop;
              if (!(track.pps && arrayEquals(track.pps[0], currentGopObj.pps[0])) || !(track.sps && arrayEquals(track.sps[0], currentGopObj.sps[0]))) {
                continue;
              }
              if (currentGop.dts < track.timelineStartInfo.dts) {
                continue;
              }
              dtsDistance = nalUnit.dts - currentGop.dts - currentGop.duration;
              if (dtsDistance >= -1e4 && dtsDistance <= halfSecond) {
                if (!nearestGopObj || nearestDistance > dtsDistance) {
                  nearestGopObj = currentGopObj;
                  nearestDistance = dtsDistance;
                }
              }
            }
            if (nearestGopObj) {
              return nearestGopObj.gop;
            }
            return null;
          };
          this.alignGopsAtStart_ = function(gops) {
            var alignIndex, gopIndex, align, gop, byteLength, nalCount, duration, alignedGops;
            byteLength = gops.byteLength;
            nalCount = gops.nalCount;
            duration = gops.duration;
            alignIndex = gopIndex = 0;
            while (alignIndex < gopsToAlignWith.length && gopIndex < gops.length) {
              align = gopsToAlignWith[alignIndex];
              gop = gops[gopIndex];
              if (align.pts === gop.pts) {
                break;
              }
              if (gop.pts > align.pts) {
                alignIndex++;
                continue;
              }
              gopIndex++;
              byteLength -= gop.byteLength;
              nalCount -= gop.nalCount;
              duration -= gop.duration;
            }
            if (gopIndex === 0) {
              return gops;
            }
            if (gopIndex === gops.length) {
              return null;
            }
            alignedGops = gops.slice(gopIndex);
            alignedGops.byteLength = byteLength;
            alignedGops.duration = duration;
            alignedGops.nalCount = nalCount;
            alignedGops.pts = alignedGops[0].pts;
            alignedGops.dts = alignedGops[0].dts;
            return alignedGops;
          };
          this.alignGopsAtEnd_ = function(gops) {
            var alignIndex, gopIndex, align, gop, alignEndIndex, matchFound;
            alignIndex = gopsToAlignWith.length - 1;
            gopIndex = gops.length - 1;
            alignEndIndex = null;
            matchFound = false;
            while (alignIndex >= 0 && gopIndex >= 0) {
              align = gopsToAlignWith[alignIndex];
              gop = gops[gopIndex];
              if (align.pts === gop.pts) {
                matchFound = true;
                break;
              }
              if (align.pts > gop.pts) {
                alignIndex--;
                continue;
              }
              if (alignIndex === gopsToAlignWith.length - 1) {
                alignEndIndex = gopIndex;
              }
              gopIndex--;
            }
            if (!matchFound && alignEndIndex === null) {
              return null;
            }
            var trimIndex;
            if (matchFound) {
              trimIndex = gopIndex;
            } else {
              trimIndex = alignEndIndex;
            }
            if (trimIndex === 0) {
              return gops;
            }
            var alignedGops = gops.slice(trimIndex);
            var metadata = alignedGops.reduce(function(total, gop2) {
              total.byteLength += gop2.byteLength;
              total.duration += gop2.duration;
              total.nalCount += gop2.nalCount;
              return total;
            }, {
              byteLength: 0,
              duration: 0,
              nalCount: 0
            });
            alignedGops.byteLength = metadata.byteLength;
            alignedGops.duration = metadata.duration;
            alignedGops.nalCount = metadata.nalCount;
            alignedGops.pts = alignedGops[0].pts;
            alignedGops.dts = alignedGops[0].dts;
            return alignedGops;
          };
          this.alignGopsWith = function(newGopsToAlignWith) {
            gopsToAlignWith = newGopsToAlignWith;
          };
        };
        _VideoSegmentStream$1.prototype = new stream();
        _CoalesceStream = function CoalesceStream2(options, metadataStream2) {
          this.numberOfTracks = 0;
          this.metadataStream = metadataStream2;
          options = options || {};
          if (typeof options.remux !== "undefined") {
            this.remuxTracks = !!options.remux;
          } else {
            this.remuxTracks = true;
          }
          if (typeof options.keepOriginalTimestamps === "boolean") {
            this.keepOriginalTimestamps = options.keepOriginalTimestamps;
          } else {
            this.keepOriginalTimestamps = false;
          }
          this.pendingTracks = [];
          this.videoTrack = null;
          this.pendingBoxes = [];
          this.pendingCaptions = [];
          this.pendingMetadata = [];
          this.pendingBytes = 0;
          this.emittedTracks = 0;
          _CoalesceStream.prototype.init.call(this);
          this.push = function(output) {
            if (output.content || output.text) {
              return this.pendingCaptions.push(output);
            }
            if (output.frames) {
              return this.pendingMetadata.push(output);
            }
            this.pendingTracks.push(output.track);
            this.pendingBytes += output.boxes.byteLength;
            if (output.track.type === "video") {
              this.videoTrack = output.track;
              this.pendingBoxes.push(output.boxes);
            }
            if (output.track.type === "audio") {
              this.audioTrack = output.track;
              this.pendingBoxes.unshift(output.boxes);
            }
          };
        };
        _CoalesceStream.prototype = new stream();
        _CoalesceStream.prototype.flush = function(flushSource) {
          var offset = 0, event = {
            captions: [],
            captionStreams: {},
            metadata: [],
            info: {}
          }, caption, id3, initSegment, timelineStartPts = 0, i;
          if (this.pendingTracks.length < this.numberOfTracks) {
            if (flushSource !== "VideoSegmentStream" && flushSource !== "AudioSegmentStream") {
              return;
            } else if (this.remuxTracks) {
              return;
            } else if (this.pendingTracks.length === 0) {
              this.emittedTracks++;
              if (this.emittedTracks >= this.numberOfTracks) {
                this.trigger("done");
                this.emittedTracks = 0;
              }
              return;
            }
          }
          if (this.videoTrack) {
            timelineStartPts = this.videoTrack.timelineStartInfo.pts;
            videoProperties.forEach(function(prop) {
              event.info[prop] = this.videoTrack[prop];
            }, this);
          } else if (this.audioTrack) {
            timelineStartPts = this.audioTrack.timelineStartInfo.pts;
            audioProperties.forEach(function(prop) {
              event.info[prop] = this.audioTrack[prop];
            }, this);
          }
          if (this.videoTrack || this.audioTrack) {
            if (this.pendingTracks.length === 1) {
              event.type = this.pendingTracks[0].type;
            } else {
              event.type = "combined";
            }
            this.emittedTracks += this.pendingTracks.length;
            initSegment = mp4Generator.initSegment(this.pendingTracks);
            event.initSegment = new Uint8Array(initSegment.byteLength);
            event.initSegment.set(initSegment);
            event.data = new Uint8Array(this.pendingBytes);
            for (i = 0; i < this.pendingBoxes.length; i++) {
              event.data.set(this.pendingBoxes[i], offset);
              offset += this.pendingBoxes[i].byteLength;
            }
            for (i = 0; i < this.pendingCaptions.length; i++) {
              caption = this.pendingCaptions[i];
              caption.startTime = clock.metadataTsToSeconds(caption.startPts, timelineStartPts, this.keepOriginalTimestamps);
              caption.endTime = clock.metadataTsToSeconds(caption.endPts, timelineStartPts, this.keepOriginalTimestamps);
              event.captionStreams[caption.stream] = true;
              event.captions.push(caption);
            }
            for (i = 0; i < this.pendingMetadata.length; i++) {
              id3 = this.pendingMetadata[i];
              id3.cueTime = clock.metadataTsToSeconds(id3.pts, timelineStartPts, this.keepOriginalTimestamps);
              event.metadata.push(id3);
            }
            event.metadata.dispatchType = this.metadataStream.dispatchType;
            this.pendingTracks.length = 0;
            this.videoTrack = null;
            this.pendingBoxes.length = 0;
            this.pendingCaptions.length = 0;
            this.pendingBytes = 0;
            this.pendingMetadata.length = 0;
            this.trigger("data", event);
            for (i = 0; i < event.captions.length; i++) {
              caption = event.captions[i];
              this.trigger("caption", caption);
            }
            for (i = 0; i < event.metadata.length; i++) {
              id3 = event.metadata[i];
              this.trigger("id3Frame", id3);
            }
          }
          if (this.emittedTracks >= this.numberOfTracks) {
            this.trigger("done");
            this.emittedTracks = 0;
          }
        };
        _CoalesceStream.prototype.setRemux = function(val) {
          this.remuxTracks = val;
        };
        _Transmuxer$1 = function Transmuxer2(options) {
          var self2 = this, hasFlushed = true, videoTrack, audioTrack;
          _Transmuxer$1.prototype.init.call(this);
          options = options || {};
          this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
          this.transmuxPipeline_ = {};
          this.setupAacPipeline = function() {
            var pipeline = {};
            this.transmuxPipeline_ = pipeline;
            pipeline.type = "aac";
            pipeline.metadataStream = new m2ts_1.MetadataStream();
            pipeline.aacStream = new aac();
            pipeline.audioTimestampRolloverStream = new m2ts_1.TimestampRolloverStream("audio");
            pipeline.timedMetadataTimestampRolloverStream = new m2ts_1.TimestampRolloverStream("timed-metadata");
            pipeline.adtsStream = new adts();
            pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
            pipeline.headOfPipeline = pipeline.aacStream;
            pipeline.aacStream.pipe(pipeline.audioTimestampRolloverStream).pipe(pipeline.adtsStream);
            pipeline.aacStream.pipe(pipeline.timedMetadataTimestampRolloverStream).pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
            pipeline.metadataStream.on("timestamp", function(frame) {
              pipeline.aacStream.setTimestamp(frame.timeStamp);
            });
            pipeline.aacStream.on("data", function(data) {
              if (data.type !== "timed-metadata" && data.type !== "audio" || pipeline.audioSegmentStream) {
                return;
              }
              audioTrack = audioTrack || {
                timelineStartInfo: {
                  baseMediaDecodeTime: self2.baseMediaDecodeTime
                },
                codec: "adts",
                type: "audio"
              };
              pipeline.coalesceStream.numberOfTracks++;
              pipeline.audioSegmentStream = new _AudioSegmentStream$1(audioTrack, options);
              pipeline.audioSegmentStream.on("log", self2.getLogTrigger_("audioSegmentStream"));
              pipeline.audioSegmentStream.on("timingInfo", self2.trigger.bind(self2, "audioTimingInfo"));
              pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
              self2.trigger("trackinfo", {
                hasAudio: !!audioTrack,
                hasVideo: !!videoTrack
              });
            });
            pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
            pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
            addPipelineLogRetriggers(this, pipeline);
          };
          this.setupTsPipeline = function() {
            var pipeline = {};
            this.transmuxPipeline_ = pipeline;
            pipeline.type = "ts";
            pipeline.metadataStream = new m2ts_1.MetadataStream();
            pipeline.packetStream = new m2ts_1.TransportPacketStream();
            pipeline.parseStream = new m2ts_1.TransportParseStream();
            pipeline.elementaryStream = new m2ts_1.ElementaryStream();
            pipeline.timestampRolloverStream = new m2ts_1.TimestampRolloverStream();
            pipeline.adtsStream = new adts();
            pipeline.h264Stream = new H264Stream$1();
            pipeline.captionStream = new m2ts_1.CaptionStream(options);
            pipeline.coalesceStream = new _CoalesceStream(options, pipeline.metadataStream);
            pipeline.headOfPipeline = pipeline.packetStream;
            pipeline.packetStream.pipe(pipeline.parseStream).pipe(pipeline.elementaryStream).pipe(pipeline.timestampRolloverStream);
            pipeline.timestampRolloverStream.pipe(pipeline.h264Stream);
            pipeline.timestampRolloverStream.pipe(pipeline.adtsStream);
            pipeline.timestampRolloverStream.pipe(pipeline.metadataStream).pipe(pipeline.coalesceStream);
            pipeline.h264Stream.pipe(pipeline.captionStream).pipe(pipeline.coalesceStream);
            pipeline.elementaryStream.on("data", function(data) {
              var i;
              if (data.type === "metadata") {
                i = data.tracks.length;
                while (i--) {
                  if (!videoTrack && data.tracks[i].type === "video") {
                    videoTrack = data.tracks[i];
                    videoTrack.timelineStartInfo.baseMediaDecodeTime = self2.baseMediaDecodeTime;
                  } else if (!audioTrack && data.tracks[i].type === "audio") {
                    audioTrack = data.tracks[i];
                    audioTrack.timelineStartInfo.baseMediaDecodeTime = self2.baseMediaDecodeTime;
                  }
                }
                if (videoTrack && !pipeline.videoSegmentStream) {
                  pipeline.coalesceStream.numberOfTracks++;
                  pipeline.videoSegmentStream = new _VideoSegmentStream$1(videoTrack, options);
                  pipeline.videoSegmentStream.on("log", self2.getLogTrigger_("videoSegmentStream"));
                  pipeline.videoSegmentStream.on("timelineStartInfo", function(timelineStartInfo) {
                    if (audioTrack && !options.keepOriginalTimestamps) {
                      audioTrack.timelineStartInfo = timelineStartInfo;
                      pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts - self2.baseMediaDecodeTime);
                    }
                  });
                  pipeline.videoSegmentStream.on("processedGopsInfo", self2.trigger.bind(self2, "gopInfo"));
                  pipeline.videoSegmentStream.on("segmentTimingInfo", self2.trigger.bind(self2, "videoSegmentTimingInfo"));
                  pipeline.videoSegmentStream.on("baseMediaDecodeTime", function(baseMediaDecodeTime) {
                    if (audioTrack) {
                      pipeline.audioSegmentStream.setVideoBaseMediaDecodeTime(baseMediaDecodeTime);
                    }
                  });
                  pipeline.videoSegmentStream.on("timingInfo", self2.trigger.bind(self2, "videoTimingInfo"));
                  pipeline.h264Stream.pipe(pipeline.videoSegmentStream).pipe(pipeline.coalesceStream);
                }
                if (audioTrack && !pipeline.audioSegmentStream) {
                  pipeline.coalesceStream.numberOfTracks++;
                  pipeline.audioSegmentStream = new _AudioSegmentStream$1(audioTrack, options);
                  pipeline.audioSegmentStream.on("log", self2.getLogTrigger_("audioSegmentStream"));
                  pipeline.audioSegmentStream.on("timingInfo", self2.trigger.bind(self2, "audioTimingInfo"));
                  pipeline.audioSegmentStream.on("segmentTimingInfo", self2.trigger.bind(self2, "audioSegmentTimingInfo"));
                  pipeline.adtsStream.pipe(pipeline.audioSegmentStream).pipe(pipeline.coalesceStream);
                }
                self2.trigger("trackinfo", {
                  hasAudio: !!audioTrack,
                  hasVideo: !!videoTrack
                });
              }
            });
            pipeline.coalesceStream.on("data", this.trigger.bind(this, "data"));
            pipeline.coalesceStream.on("id3Frame", function(id3Frame) {
              id3Frame.dispatchType = pipeline.metadataStream.dispatchType;
              self2.trigger("id3Frame", id3Frame);
            });
            pipeline.coalesceStream.on("caption", this.trigger.bind(this, "caption"));
            pipeline.coalesceStream.on("done", this.trigger.bind(this, "done"));
            addPipelineLogRetriggers(this, pipeline);
          };
          this.setBaseMediaDecodeTime = function(baseMediaDecodeTime) {
            var pipeline = this.transmuxPipeline_;
            if (!options.keepOriginalTimestamps) {
              this.baseMediaDecodeTime = baseMediaDecodeTime;
            }
            if (audioTrack) {
              audioTrack.timelineStartInfo.dts = void 0;
              audioTrack.timelineStartInfo.pts = void 0;
              trackDecodeInfo.clearDtsInfo(audioTrack);
              if (pipeline.audioTimestampRolloverStream) {
                pipeline.audioTimestampRolloverStream.discontinuity();
              }
            }
            if (videoTrack) {
              if (pipeline.videoSegmentStream) {
                pipeline.videoSegmentStream.gopCache_ = [];
              }
              videoTrack.timelineStartInfo.dts = void 0;
              videoTrack.timelineStartInfo.pts = void 0;
              trackDecodeInfo.clearDtsInfo(videoTrack);
              pipeline.captionStream.reset();
            }
            if (pipeline.timestampRolloverStream) {
              pipeline.timestampRolloverStream.discontinuity();
            }
          };
          this.setAudioAppendStart = function(timestamp) {
            if (audioTrack) {
              this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(timestamp);
            }
          };
          this.setRemux = function(val) {
            var pipeline = this.transmuxPipeline_;
            options.remux = val;
            if (pipeline && pipeline.coalesceStream) {
              pipeline.coalesceStream.setRemux(val);
            }
          };
          this.alignGopsWith = function(gopsToAlignWith) {
            if (videoTrack && this.transmuxPipeline_.videoSegmentStream) {
              this.transmuxPipeline_.videoSegmentStream.alignGopsWith(gopsToAlignWith);
            }
          };
          this.getLogTrigger_ = function(key) {
            var self3 = this;
            return function(event) {
              event.stream = key;
              self3.trigger("log", event);
            };
          };
          this.push = function(data) {
            if (hasFlushed) {
              var isAac = isLikelyAacData$1(data);
              if (isAac && this.transmuxPipeline_.type !== "aac") {
                this.setupAacPipeline();
              } else if (!isAac && this.transmuxPipeline_.type !== "ts") {
                this.setupTsPipeline();
              }
              hasFlushed = false;
            }
            this.transmuxPipeline_.headOfPipeline.push(data);
          };
          this.flush = function() {
            hasFlushed = true;
            this.transmuxPipeline_.headOfPipeline.flush();
          };
          this.endTimeline = function() {
            this.transmuxPipeline_.headOfPipeline.endTimeline();
          };
          this.reset = function() {
            if (this.transmuxPipeline_.headOfPipeline) {
              this.transmuxPipeline_.headOfPipeline.reset();
            }
          };
          this.resetCaptions = function() {
            if (this.transmuxPipeline_.captionStream) {
              this.transmuxPipeline_.captionStream.reset();
            }
          };
        };
        _Transmuxer$1.prototype = new stream();
        var transmuxer$2 = {
          Transmuxer: _Transmuxer$1,
          VideoSegmentStream: _VideoSegmentStream$1,
          AudioSegmentStream: _AudioSegmentStream$1
        };
        var getUint64$1 = numbers.getUint64;
        var parseSidx = function parseSidx2(data) {
          var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            references: [],
            referenceId: view.getUint32(4),
            timescale: view.getUint32(8)
          }, i = 12;
          if (result.version === 0) {
            result.earliestPresentationTime = view.getUint32(i);
            result.firstOffset = view.getUint32(i + 4);
            i += 8;
          } else {
            result.earliestPresentationTime = getUint64$1(data.subarray(i));
            result.firstOffset = getUint64$1(data.subarray(i + 8));
            i += 16;
          }
          i += 2;
          var referenceCount = view.getUint16(i);
          i += 2;
          for (; referenceCount > 0; i += 12, referenceCount--) {
            result.references.push({
              referenceType: (data[i] & 128) >>> 7,
              referencedSize: view.getUint32(i) & 2147483647,
              subsegmentDuration: view.getUint32(i + 4),
              startsWithSap: !!(data[i + 8] & 128),
              sapType: (data[i + 8] & 112) >>> 4,
              sapDeltaTime: view.getUint32(i + 8) & 268435455
            });
          }
          return result;
        };
        var parseSidx_1 = parseSidx;
        var getUint64 = numbers.getUint64;
        var inspectMp4, _textifyMp, parseMp4Date = function parseMp4Date2(seconds) {
          return new Date(seconds * 1e3 - 20828448e5);
        }, nalParse = function nalParse2(avcStream) {
          var avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength), result = [], i, length;
          for (i = 0; i + 4 < avcStream.length; i += length) {
            length = avcView.getUint32(i);
            i += 4;
            if (length <= 0) {
              result.push("<span style='color:red;'>MALFORMED DATA</span>");
              continue;
            }
            switch (avcStream[i] & 31) {
              case 1:
                result.push("slice_layer_without_partitioning_rbsp");
                break;
              case 5:
                result.push("slice_layer_without_partitioning_rbsp_idr");
                break;
              case 6:
                result.push("sei_rbsp");
                break;
              case 7:
                result.push("seq_parameter_set_rbsp");
                break;
              case 8:
                result.push("pic_parameter_set_rbsp");
                break;
              case 9:
                result.push("access_unit_delimiter_rbsp");
                break;
              default:
                result.push("UNKNOWN NAL - " + avcStream[i] & 31);
                break;
            }
          }
          return result;
        }, parse = {


avc1: function avc1(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
              dataReferenceIndex: view.getUint16(6),
              width: view.getUint16(24),
              height: view.getUint16(26),
              horizresolution: view.getUint16(28) + view.getUint16(30) / 16,
              vertresolution: view.getUint16(32) + view.getUint16(34) / 16,
              frameCount: view.getUint16(40),
              depth: view.getUint16(74),
              config: inspectMp4(data.subarray(78, data.byteLength))
            };
          },
          avcC: function avcC(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              configurationVersion: data[0],
              avcProfileIndication: data[1],
              profileCompatibility: data[2],
              avcLevelIndication: data[3],
              lengthSizeMinusOne: data[4] & 3,
              sps: [],
              pps: []
            }, numOfSequenceParameterSets = data[5] & 31, numOfPictureParameterSets, nalSize, offset, i;
            offset = 6;
            for (i = 0; i < numOfSequenceParameterSets; i++) {
              nalSize = view.getUint16(offset);
              offset += 2;
              result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
              offset += nalSize;
            }
            numOfPictureParameterSets = data[offset];
            offset++;
            for (i = 0; i < numOfPictureParameterSets; i++) {
              nalSize = view.getUint16(offset);
              offset += 2;
              result.pps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
              offset += nalSize;
            }
            return result;
          },
          btrt: function btrt(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
              bufferSizeDB: view.getUint32(0),
              maxBitrate: view.getUint32(4),
              avgBitrate: view.getUint32(8)
            };
          },
          edts: function edts(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          elst: function elst(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              edits: []
            }, entryCount = view.getUint32(4), i;
            for (i = 8; entryCount; entryCount--) {
              if (result.version === 0) {
                result.edits.push({
                  segmentDuration: view.getUint32(i),
                  mediaTime: view.getInt32(i + 4),
                  mediaRate: view.getUint16(i + 8) + view.getUint16(i + 10) / (256 * 256)
                });
                i += 12;
              } else {
                result.edits.push({
                  segmentDuration: getUint64(data.subarray(i)),
                  mediaTime: getUint64(data.subarray(i + 8)),
                  mediaRate: view.getUint16(i + 16) + view.getUint16(i + 18) / (256 * 256)
                });
                i += 20;
              }
            }
            return result;
          },
          esds: function esds2(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              esId: data[6] << 8 | data[7],
              streamPriority: data[8] & 31,
              decoderConfig: {
                objectProfileIndication: data[11],
                streamType: data[12] >>> 2 & 63,
                bufferSize: data[13] << 16 | data[14] << 8 | data[15],
                maxBitrate: data[16] << 24 | data[17] << 16 | data[18] << 8 | data[19],
                avgBitrate: data[20] << 24 | data[21] << 16 | data[22] << 8 | data[23],
                decoderConfigDescriptor: {
                  tag: data[24],
                  length: data[25],
                  audioObjectType: data[26] >>> 3 & 31,
                  samplingFrequencyIndex: (data[26] & 7) << 1 | data[27] >>> 7 & 1,
                  channelConfiguration: data[27] >>> 3 & 15
                }
              }
            };
          },
          ftyp: function ftyp2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              majorBrand: parseType_1(data.subarray(0, 4)),
              minorVersion: view.getUint32(4),
              compatibleBrands: []
            }, i = 8;
            while (i < data.byteLength) {
              result.compatibleBrands.push(parseType_1(data.subarray(i, i + 4)));
              i += 4;
            }
            return result;
          },
          dinf: function dinf2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          dref: function dref(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              dataReferences: inspectMp4(data.subarray(8))
            };
          },
          hdlr: function hdlr2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              handlerType: parseType_1(data.subarray(8, 12)),
              name: ""
            }, i = 8;
            for (i = 24; i < data.byteLength; i++) {
              if (data[i] === 0) {
                i++;
                break;
              }
              result.name += String.fromCharCode(data[i]);
            }
            result.name = decodeURIComponent(escape(result.name));
            return result;
          },
          mdat: function mdat2(data) {
            return {
              byteLength: data.byteLength,
              nals: nalParse(data)
            };
          },
          mdhd: function mdhd2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, language, result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              language: ""
            };
            if (result.version === 1) {
              i += 4;
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 8;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.timescale = view.getUint32(i);
              i += 8;
              result.duration = view.getUint32(i);
            } else {
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.timescale = view.getUint32(i);
              i += 4;
              result.duration = view.getUint32(i);
            }
            i += 4;
            language = view.getUint16(i);
            result.language += String.fromCharCode((language >> 10) + 96);
            result.language += String.fromCharCode(((language & 992) >> 5) + 96);
            result.language += String.fromCharCode((language & 31) + 96);
            return result;
          },
          mdia: function mdia2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          mfhd: function mfhd2(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              sequenceNumber: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
            };
          },
          minf: function minf2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },


mp4a: function mp4a(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
dataReferenceIndex: view.getUint16(6),
channelcount: view.getUint16(16),
              samplesize: view.getUint16(18),

samplerate: view.getUint16(24) + view.getUint16(26) / 65536
            };
            if (data.byteLength > 28) {
              result.streamDescriptor = inspectMp4(data.subarray(28))[0];
            }
            return result;
          },
          moof: function moof2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          moov: function moov2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          mvex: function mvex2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          mvhd: function mvhd2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4))
            };
            if (result.version === 1) {
              i += 4;
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 8;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.timescale = view.getUint32(i);
              i += 8;
              result.duration = view.getUint32(i);
            } else {
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.timescale = view.getUint32(i);
              i += 4;
              result.duration = view.getUint32(i);
            }
            i += 4;
            result.rate = view.getUint16(i) + view.getUint16(i + 2) / 16;
            i += 4;
            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
            i += 2;
            i += 2;
            i += 2 * 4;
            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
            i += 9 * 4;
            i += 6 * 4;
            result.nextTrackId = view.getUint32(i);
            return result;
          },
          pdin: function pdin(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              rate: view.getUint32(4),
              initialDelay: view.getUint32(8)
            };
          },
          sdtp: function sdtp2(data) {
            var result = {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              samples: []
            }, i;
            for (i = 4; i < data.byteLength; i++) {
              result.samples.push({
                dependsOn: (data[i] & 48) >> 4,
                isDependedOn: (data[i] & 12) >> 2,
                hasRedundancy: data[i] & 3
              });
            }
            return result;
          },
          sidx: parseSidx_1,
          smhd: function smhd(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              balance: data[4] + data[5] / 256
            };
          },
          stbl: function stbl2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          ctts: function ctts(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              compositionOffsets: []
            }, entryCount = view.getUint32(4), i;
            for (i = 8; entryCount; i += 8, entryCount--) {
              result.compositionOffsets.push({
                sampleCount: view.getUint32(i),
                sampleOffset: view[result.version === 0 ? "getUint32" : "getInt32"](i + 4)
              });
            }
            return result;
          },
          stss: function stss(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4)),
              syncSamples: []
            }, entryCount = view.getUint32(4), i;
            for (i = 8; entryCount; i += 4, entryCount--) {
              result.syncSamples.push(view.getUint32(i));
            }
            return result;
          },
          stco: function stco(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              chunkOffsets: []
            }, entryCount = view.getUint32(4), i;
            for (i = 8; entryCount; i += 4, entryCount--) {
              result.chunkOffsets.push(view.getUint32(i));
            }
            return result;
          },
          stsc: function stsc(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), entryCount = view.getUint32(4), result = {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              sampleToChunks: []
            }, i;
            for (i = 8; entryCount; i += 12, entryCount--) {
              result.sampleToChunks.push({
                firstChunk: view.getUint32(i),
                samplesPerChunk: view.getUint32(i + 4),
                sampleDescriptionIndex: view.getUint32(i + 8)
              });
            }
            return result;
          },
          stsd: function stsd2(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              sampleDescriptions: inspectMp4(data.subarray(8))
            };
          },
          stsz: function stsz(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              sampleSize: view.getUint32(4),
              entries: []
            }, i;
            for (i = 12; i < data.byteLength; i += 4) {
              result.entries.push(view.getUint32(i));
            }
            return result;
          },
          stts: function stts(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              timeToSamples: []
            }, entryCount = view.getUint32(4), i;
            for (i = 8; entryCount; i += 8, entryCount--) {
              result.timeToSamples.push({
                sampleCount: view.getUint32(i),
                sampleDelta: view.getUint32(i + 4)
              });
            }
            return result;
          },
          styp: function styp(data) {
            return parse.ftyp(data);
          },
          tfdt: parseTfdt$1,
          tfhd: parseTfhd,
          tkhd: function tkhd2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, result = {
              version: view.getUint8(0),
              flags: new Uint8Array(data.subarray(1, 4))
            };
            if (result.version === 1) {
              i += 4;
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 8;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.trackId = view.getUint32(i);
              i += 4;
              i += 8;
              result.duration = view.getUint32(i);
            } else {
              result.creationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.modificationTime = parseMp4Date(view.getUint32(i));
              i += 4;
              result.trackId = view.getUint32(i);
              i += 4;
              i += 4;
              result.duration = view.getUint32(i);
            }
            i += 4;
            i += 2 * 4;
            result.layer = view.getUint16(i);
            i += 2;
            result.alternateGroup = view.getUint16(i);
            i += 2;
            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
            i += 2;
            i += 2;
            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
            i += 9 * 4;
            result.width = view.getUint16(i) + view.getUint16(i + 2) / 65536;
            i += 4;
            result.height = view.getUint16(i) + view.getUint16(i + 2) / 65536;
            return result;
          },
          traf: function traf2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          trak: function trak2(data) {
            return {
              boxes: inspectMp4(data)
            };
          },
          trex: function trex2(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              trackId: view.getUint32(4),
              defaultSampleDescriptionIndex: view.getUint32(8),
              defaultSampleDuration: view.getUint32(12),
              defaultSampleSize: view.getUint32(16),
              sampleDependsOn: data[20] & 3,
              sampleIsDependedOn: (data[21] & 192) >> 6,
              sampleHasRedundancy: (data[21] & 48) >> 4,
              samplePaddingValue: (data[21] & 14) >> 1,
              sampleIsDifferenceSample: !!(data[21] & 1),
              sampleDegradationPriority: view.getUint16(22)
            };
          },
          trun: parseTrun$1,
          "url ": function url(data) {
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4))
            };
          },
          vmhd: function vmhd(data) {
            var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
              version: data[0],
              flags: new Uint8Array(data.subarray(1, 4)),
              graphicsmode: view.getUint16(4),
              opcolor: new Uint16Array([view.getUint16(6), view.getUint16(8), view.getUint16(10)])
            };
          }
        };
        inspectMp4 = function inspectMp42(data) {
          var i = 0, result = [], view, size, type2, end, box2;
          var ab = new ArrayBuffer(data.length);
          var v = new Uint8Array(ab);
          for (var z = 0; z < data.length; ++z) {
            v[z] = data[z];
          }
          view = new DataView(ab);
          while (i < data.byteLength) {
            size = view.getUint32(i);
            type2 = parseType_1(data.subarray(i + 4, i + 8));
            end = size > 1 ? i + size : data.byteLength;
            box2 = (parse[type2] || function(data2) {
              return {
                data: data2
              };
            })(data.subarray(i + 8, end));
            box2.size = size;
            box2.type = type2;
            result.push(box2);
            i = end;
          }
          return result;
        };
        _textifyMp = function textifyMp4(inspectedMp4, depth) {
          var indent;
          depth = depth || 0;
          indent = new Array(depth * 2 + 1).join(" ");
          return inspectedMp4.map(function(box2, index) {
            return indent + box2.type + "\n" +
Object.keys(box2).filter(function(key) {
              return key !== "type" && key !== "boxes";
            }).map(function(key) {
              var prefix = indent + "  " + key + ": ", value = box2[key];
              if (value instanceof Uint8Array || value instanceof Uint32Array) {
                var bytes = Array.prototype.slice.call(new Uint8Array(value.buffer, value.byteOffset, value.byteLength)).map(function(byte) {
                  return " " + ("00" + byte.toString(16)).slice(-2);
                }).join("").match(/.{1,24}/g);
                if (!bytes) {
                  return prefix + "<>";
                }
                if (bytes.length === 1) {
                  return prefix + "<" + bytes.join("").slice(1) + ">";
                }
                return prefix + "<\n" + bytes.map(function(line) {
                  return indent + "  " + line;
                }).join("\n") + "\n" + indent + "  >";
              }
              return prefix + JSON.stringify(value, null, 2).split("\n").map(function(line, index2) {
                if (index2 === 0) {
                  return line;
                }
                return indent + "  " + line;
              }).join("\n");
            }).join("\n") +
(box2.boxes ? "\n" + _textifyMp(box2.boxes, depth + 1) : "");
          }).join("\n");
        };
        var mp4Inspector = {
          inspect: inspectMp4,
          textify: _textifyMp,
          parseType: parseType_1,
          findBox: findBox_1,
          parseTraf: parse.traf,
          parseTfdt: parse.tfdt,
          parseHdlr: parse.hdlr,
          parseTfhd: parse.tfhd,
          parseTrun: parse.trun,
          parseSidx: parse.sidx
        };
        var parseTrun = mp4Inspector.parseTrun;
        var findBox = probe$2.findBox;
        var getMdatTrafPairs$2 = function getMdatTrafPairs2(segment) {
          var trafs = findBox(segment, ["moof", "traf"]);
          var mdats = findBox(segment, ["mdat"]);
          var mdatTrafPairs = [];
          mdats.forEach(function(mdat2, index) {
            var matchingTraf = trafs[index];
            mdatTrafPairs.push({
              mdat: mdat2,
              traf: matchingTraf
            });
          });
          return mdatTrafPairs;
        };
        var parseSamples$2 = function parseSamples2(truns, baseMediaDecodeTime, tfhd2) {
          var currentDts = baseMediaDecodeTime;
          var defaultSampleDuration = tfhd2.defaultSampleDuration || 0;
          var defaultSampleSize = tfhd2.defaultSampleSize || 0;
          var trackId = tfhd2.trackId;
          var allSamples = [];
          truns.forEach(function(trun2) {
            var trackRun = parseTrun(trun2);
            var samples2 = trackRun.samples;
            samples2.forEach(function(sample) {
              if (sample.duration === void 0) {
                sample.duration = defaultSampleDuration;
              }
              if (sample.size === void 0) {
                sample.size = defaultSampleSize;
              }
              sample.trackId = trackId;
              sample.dts = currentDts;
              if (sample.compositionTimeOffset === void 0) {
                sample.compositionTimeOffset = 0;
              }
              if (typeof currentDts === "bigint") {
                sample.pts = currentDts + window__default["default"].BigInt(sample.compositionTimeOffset);
                currentDts += window__default["default"].BigInt(sample.duration);
              } else {
                sample.pts = currentDts + sample.compositionTimeOffset;
                currentDts += sample.duration;
              }
            });
            allSamples = allSamples.concat(samples2);
          });
          return allSamples;
        };
        var samples = {
          getMdatTrafPairs: getMdatTrafPairs$2,
          parseSamples: parseSamples$2
        };
        var discardEmulationPreventionBytes = captionPacketParser.discardEmulationPreventionBytes;
        var CaptionStream = captionStream.CaptionStream;
        var getMdatTrafPairs$1 = samples.getMdatTrafPairs, parseSamples$1 = samples.parseSamples;
        var mapToSample = function mapToSample2(offset, samples2) {
          var approximateOffset = offset;
          for (var i = 0; i < samples2.length; i++) {
            var sample = samples2[i];
            if (approximateOffset < sample.size) {
              return sample;
            }
            approximateOffset -= sample.size;
          }
          return null;
        };
        var findSeiNals = function findSeiNals2(avcStream, samples2, trackId) {
          var avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength), result = {
            logs: [],
            seiNals: []
          }, seiNal, i, length, lastMatchedSample;
          for (i = 0; i + 4 < avcStream.length; i += length) {
            length = avcView.getUint32(i);
            i += 4;
            if (length <= 0) {
              continue;
            }
            switch (avcStream[i] & 31) {
              case 6:
                var data = avcStream.subarray(i + 1, i + 1 + length);
                var matchingSample = mapToSample(i, samples2);
                seiNal = {
                  nalUnitType: "sei_rbsp",
                  size: length,
                  data,
                  escapedRBSP: discardEmulationPreventionBytes(data),
                  trackId
                };
                if (matchingSample) {
                  seiNal.pts = matchingSample.pts;
                  seiNal.dts = matchingSample.dts;
                  lastMatchedSample = matchingSample;
                } else if (lastMatchedSample) {
                  seiNal.pts = lastMatchedSample.pts;
                  seiNal.dts = lastMatchedSample.dts;
                } else {
                  result.logs.push({
                    level: "warn",
                    message: "We've encountered a nal unit without data at " + i + " for trackId " + trackId + ". See mux.js#223."
                  });
                  break;
                }
                result.seiNals.push(seiNal);
                break;
            }
          }
          return result;
        };
        var parseCaptionNals = function parseCaptionNals2(segment, videoTrackId) {
          var captionNals = {};
          var mdatTrafPairs = getMdatTrafPairs$1(segment);
          mdatTrafPairs.forEach(function(pair) {
            var mdat2 = pair.mdat;
            var traf2 = pair.traf;
            var tfhd2 = findBox_1(traf2, ["tfhd"]);
            var headerInfo = parseTfhd(tfhd2[0]);
            var trackId = headerInfo.trackId;
            var tfdt2 = findBox_1(traf2, ["tfdt"]);
            var baseMediaDecodeTime = tfdt2.length > 0 ? parseTfdt$1(tfdt2[0]).baseMediaDecodeTime : 0;
            var truns = findBox_1(traf2, ["trun"]);
            var samples2;
            var result;
            if (videoTrackId === trackId && truns.length > 0) {
              samples2 = parseSamples$1(truns, baseMediaDecodeTime, headerInfo);
              result = findSeiNals(mdat2, samples2, trackId);
              if (!captionNals[trackId]) {
                captionNals[trackId] = {
                  seiNals: [],
                  logs: []
                };
              }
              captionNals[trackId].seiNals = captionNals[trackId].seiNals.concat(result.seiNals);
              captionNals[trackId].logs = captionNals[trackId].logs.concat(result.logs);
            }
          });
          return captionNals;
        };
        var parseEmbeddedCaptions = function parseEmbeddedCaptions2(segment, trackId, timescale2) {
          var captionNals;
          if (trackId === null) {
            return null;
          }
          captionNals = parseCaptionNals(segment, trackId);
          var trackNals = captionNals[trackId] || {};
          return {
            seiNals: trackNals.seiNals,
            logs: trackNals.logs,
            timescale: timescale2
          };
        };
        var CaptionParser = function CaptionParser2() {
          var isInitialized = false;
          var captionStream2;
          var segmentCache;
          var trackId;
          var timescale2;
          var parsedCaptions;
          var parsingPartial;
          this.isInitialized = function() {
            return isInitialized;
          };
          this.init = function(options) {
            captionStream2 = new CaptionStream();
            isInitialized = true;
            parsingPartial = options ? options.isPartial : false;
            captionStream2.on("data", function(event) {
              event.startTime = event.startPts / timescale2;
              event.endTime = event.endPts / timescale2;
              parsedCaptions.captions.push(event);
              parsedCaptions.captionStreams[event.stream] = true;
            });
            captionStream2.on("log", function(log) {
              parsedCaptions.logs.push(log);
            });
          };
          this.isNewInit = function(videoTrackIds, timescales) {
            if (videoTrackIds && videoTrackIds.length === 0 || timescales && typeof timescales === "object" && Object.keys(timescales).length === 0) {
              return false;
            }
            return trackId !== videoTrackIds[0] || timescale2 !== timescales[trackId];
          };
          this.parse = function(segment, videoTrackIds, timescales) {
            var parsedData;
            if (!this.isInitialized()) {
              return null;
            } else if (!videoTrackIds || !timescales) {
              return null;
            } else if (this.isNewInit(videoTrackIds, timescales)) {
              trackId = videoTrackIds[0];
              timescale2 = timescales[trackId];
            } else if (trackId === null || !timescale2) {
              segmentCache.push(segment);
              return null;
            }
            while (segmentCache.length > 0) {
              var cachedSegment = segmentCache.shift();
              this.parse(cachedSegment, videoTrackIds, timescales);
            }
            parsedData = parseEmbeddedCaptions(segment, trackId, timescale2);
            if (parsedData && parsedData.logs) {
              parsedCaptions.logs = parsedCaptions.logs.concat(parsedData.logs);
            }
            if (parsedData === null || !parsedData.seiNals) {
              if (parsedCaptions.logs.length) {
                return {
                  logs: parsedCaptions.logs,
                  captions: [],
                  captionStreams: []
                };
              }
              return null;
            }
            this.pushNals(parsedData.seiNals);
            this.flushStream();
            return parsedCaptions;
          };
          this.pushNals = function(nals) {
            if (!this.isInitialized() || !nals || nals.length === 0) {
              return null;
            }
            nals.forEach(function(nal) {
              captionStream2.push(nal);
            });
          };
          this.flushStream = function() {
            if (!this.isInitialized()) {
              return null;
            }
            if (!parsingPartial) {
              captionStream2.flush();
            } else {
              captionStream2.partialFlush();
            }
          };
          this.clearParsedCaptions = function() {
            parsedCaptions.captions = [];
            parsedCaptions.captionStreams = {};
            parsedCaptions.logs = [];
          };
          this.resetCaptionStream = function() {
            if (!this.isInitialized()) {
              return null;
            }
            captionStream2.reset();
          };
          this.clearAllCaptions = function() {
            this.clearParsedCaptions();
            this.resetCaptionStream();
          };
          this.reset = function() {
            segmentCache = [];
            trackId = null;
            timescale2 = null;
            if (!parsedCaptions) {
              parsedCaptions = {
                captions: [],
captionStreams: {},
                logs: []
              };
            } else {
              this.clearParsedCaptions();
            }
            this.resetCaptionStream();
          };
          this.reset();
        };
        var captionParser = CaptionParser;
        var parseTfdt = mp4Inspector.parseTfdt;
        var getTimescaleFromMediaHeader = probe$2.getTimescaleFromMediaHeader;
        var parseSamples = samples.parseSamples, getMdatTrafPairs = samples.getMdatTrafPairs;
        var WebVttParser = function WebVttParser2() {
          var timescale2 = 9e4;
          this.init = function(segment) {
            var mdhd2 = findBox_1(segment, ["moov", "trak", "mdia", "mdhd"])[0];
            if (mdhd2) {
              timescale2 = getTimescaleFromMediaHeader(mdhd2);
            }
          };
          this.parseSegment = function(segment) {
            var vttCues = [];
            var mdatTrafPairs = getMdatTrafPairs(segment);
            var baseMediaDecodeTime = 0;
            mdatTrafPairs.forEach(function(pair) {
              var mdatBox = pair.mdat;
              var trafBox = pair.traf;
              var tfdtBox = findBox_1(trafBox, ["tfdt"])[0];
              var tfhdBox = findBox_1(trafBox, ["tfhd"])[0];
              var trunBoxes = findBox_1(trafBox, ["trun"]);
              if (tfdtBox) {
                var tfdt2 = parseTfdt(tfdtBox);
                baseMediaDecodeTime = tfdt2.baseMediaDecodeTime;
              }
              if (trunBoxes.length && tfhdBox) {
                var samples2 = parseSamples(trunBoxes, baseMediaDecodeTime, tfhdBox);
                var mdatOffset = 0;
                samples2.forEach(function(sample) {
                  var UTF_8 = "utf-8";
                  var textDecoder = new TextDecoder(UTF_8);
                  var sampleData = mdatBox.slice(mdatOffset, mdatOffset + sample.size);
                  var vtteBox = findBox_1(sampleData, ["vtte"])[0];
                  if (vtteBox) {
                    mdatOffset += sample.size;
                    return;
                  }
                  var vttcBoxes = findBox_1(sampleData, ["vttc"]);
                  vttcBoxes.forEach(function(vttcBox) {
                    var paylBox = findBox_1(vttcBox, ["payl"])[0];
                    var sttgBox = findBox_1(vttcBox, ["sttg"])[0];
                    var start = sample.pts / timescale2;
                    var end = (sample.pts + sample.duration) / timescale2;
                    var cueText, settings;
                    if (paylBox) {
                      try {
                        cueText = textDecoder.decode(paylBox);
                      } catch (e) {
                        console.error(e);
                      }
                    }
                    if (sttgBox) {
                      try {
                        settings = textDecoder.decode(sttgBox);
                      } catch (e) {
                        console.error(e);
                      }
                    }
                    if (sample.duration && cueText) {
                      vttCues.push({
                        cueText,
                        start,
                        end,
                        settings
                      });
                    }
                  });
                  mdatOffset += sample.size;
                });
              }
            });
            return vttCues;
          };
        };
        var webvttParser = WebVttParser;
        var mp4 = {
          generator: mp4Generator,
          probe: probe$2,
          Transmuxer: transmuxer$2.Transmuxer,
          AudioSegmentStream: transmuxer$2.AudioSegmentStream,
          VideoSegmentStream: transmuxer$2.VideoSegmentStream,
          CaptionParser: captionParser,
          WebVttParser: webvttParser
        };
        var _FlvTag;
        _FlvTag = function FlvTag(type2, extraData) {
          var adHoc = 0, bufferStartSize = 16384, prepareWrite = function prepareWrite2(flv2, count) {
            var bytes, minLength = flv2.position + count;
            if (minLength < flv2.bytes.byteLength) {
              return;
            }
            bytes = new Uint8Array(minLength * 2);
            bytes.set(flv2.bytes.subarray(0, flv2.position), 0);
            flv2.bytes = bytes;
            flv2.view = new DataView(flv2.bytes.buffer);
          }, widthBytes = _FlvTag.widthBytes || new Uint8Array("width".length), heightBytes = _FlvTag.heightBytes || new Uint8Array("height".length), videocodecidBytes = _FlvTag.videocodecidBytes || new Uint8Array("videocodecid".length), i;
          if (!_FlvTag.widthBytes) {
            for (i = 0; i < "width".length; i++) {
              widthBytes[i] = "width".charCodeAt(i);
            }
            for (i = 0; i < "height".length; i++) {
              heightBytes[i] = "height".charCodeAt(i);
            }
            for (i = 0; i < "videocodecid".length; i++) {
              videocodecidBytes[i] = "videocodecid".charCodeAt(i);
            }
            _FlvTag.widthBytes = widthBytes;
            _FlvTag.heightBytes = heightBytes;
            _FlvTag.videocodecidBytes = videocodecidBytes;
          }
          this.keyFrame = false;
          switch (type2) {
            case _FlvTag.VIDEO_TAG:
              this.length = 16;
              bufferStartSize *= 6;
              break;
            case _FlvTag.AUDIO_TAG:
              this.length = 13;
              this.keyFrame = true;
              break;
            case _FlvTag.METADATA_TAG:
              this.length = 29;
              this.keyFrame = true;
              break;
            default:
              throw new Error("Unknown FLV tag type");
          }
          this.bytes = new Uint8Array(bufferStartSize);
          this.view = new DataView(this.bytes.buffer);
          this.bytes[0] = type2;
          this.position = this.length;
          this.keyFrame = extraData;
          this.pts = 0;
          this.dts = 0;
          this.writeBytes = function(bytes, offset, length) {
            var start = offset || 0, end;
            length = length || bytes.byteLength;
            end = start + length;
            prepareWrite(this, length);
            this.bytes.set(bytes.subarray(start, end), this.position);
            this.position += length;
            this.length = Math.max(this.length, this.position);
          };
          this.writeByte = function(byte) {
            prepareWrite(this, 1);
            this.bytes[this.position] = byte;
            this.position++;
            this.length = Math.max(this.length, this.position);
          };
          this.writeShort = function(short) {
            prepareWrite(this, 2);
            this.view.setUint16(this.position, short);
            this.position += 2;
            this.length = Math.max(this.length, this.position);
          };
          this.negIndex = function(pos) {
            return this.bytes[this.length - pos];
          };
          this.nalUnitSize = function() {
            if (adHoc === 0) {
              return 0;
            }
            return this.length - (adHoc + 4);
          };
          this.startNalUnit = function() {
            if (adHoc > 0) {
              throw new Error("Attempted to create new NAL wihout closing the old one");
            }
            adHoc = this.length;
            this.length += 4;
            this.position = this.length;
          };
          this.endNalUnit = function(nalContainer) {
            var nalStart, nalLength;
            if (this.length === adHoc + 4) {
              this.length -= 4;
            } else if (adHoc > 0) {
              nalStart = adHoc + 4;
              nalLength = this.length - nalStart;
              this.position = adHoc;
              this.view.setUint32(this.position, nalLength);
              this.position = this.length;
              if (nalContainer) {
                nalContainer.push(this.bytes.subarray(nalStart, nalStart + nalLength));
              }
            }
            adHoc = 0;
          };
          this.writeMetaDataDouble = function(key, val) {
            var i2;
            prepareWrite(this, 2 + key.length + 9);
            this.view.setUint16(this.position, key.length);
            this.position += 2;
            if (key === "width") {
              this.bytes.set(widthBytes, this.position);
              this.position += 5;
            } else if (key === "height") {
              this.bytes.set(heightBytes, this.position);
              this.position += 6;
            } else if (key === "videocodecid") {
              this.bytes.set(videocodecidBytes, this.position);
              this.position += 12;
            } else {
              for (i2 = 0; i2 < key.length; i2++) {
                this.bytes[this.position] = key.charCodeAt(i2);
                this.position++;
              }
            }
            this.position++;
            this.view.setFloat64(this.position, val);
            this.position += 8;
            this.length = Math.max(this.length, this.position);
            ++adHoc;
          };
          this.writeMetaDataBoolean = function(key, val) {
            var i2;
            prepareWrite(this, 2);
            this.view.setUint16(this.position, key.length);
            this.position += 2;
            for (i2 = 0; i2 < key.length; i2++) {
              prepareWrite(this, 1);
              this.bytes[this.position] = key.charCodeAt(i2);
              this.position++;
            }
            prepareWrite(this, 2);
            this.view.setUint8(this.position, 1);
            this.position++;
            this.view.setUint8(this.position, val ? 1 : 0);
            this.position++;
            this.length = Math.max(this.length, this.position);
            ++adHoc;
          };
          this.finalize = function() {
            var dtsDelta, len;
            switch (this.bytes[0]) {
case _FlvTag.VIDEO_TAG:
                this.bytes[11] = (this.keyFrame || extraData ? 16 : 32) | 7;
                this.bytes[12] = extraData ? 0 : 1;
                dtsDelta = this.pts - this.dts;
                this.bytes[13] = (dtsDelta & 16711680) >>> 16;
                this.bytes[14] = (dtsDelta & 65280) >>> 8;
                this.bytes[15] = (dtsDelta & 255) >>> 0;
                break;
              case _FlvTag.AUDIO_TAG:
                this.bytes[11] = 175;
                this.bytes[12] = extraData ? 0 : 1;
                break;
              case _FlvTag.METADATA_TAG:
                this.position = 11;
                this.view.setUint8(this.position, 2);
                this.position++;
                this.view.setUint16(this.position, 10);
                this.position += 2;
                this.bytes.set([111, 110, 77, 101, 116, 97, 68, 97, 116, 97], this.position);
                this.position += 10;
                this.bytes[this.position] = 8;
                this.position++;
                this.view.setUint32(this.position, adHoc);
                this.position = this.length;
                this.bytes.set([0, 0, 9], this.position);
                this.position += 3;
                this.length = this.position;
                break;
            }
            len = this.length - 11;
            this.bytes[1] = (len & 16711680) >>> 16;
            this.bytes[2] = (len & 65280) >>> 8;
            this.bytes[3] = (len & 255) >>> 0;
            this.bytes[4] = (this.dts & 16711680) >>> 16;
            this.bytes[5] = (this.dts & 65280) >>> 8;
            this.bytes[6] = (this.dts & 255) >>> 0;
            this.bytes[7] = (this.dts & 4278190080) >>> 24;
            this.bytes[8] = 0;
            this.bytes[9] = 0;
            this.bytes[10] = 0;
            prepareWrite(this, 4);
            this.view.setUint32(this.length, this.length);
            this.length += 4;
            this.position += 4;
            this.bytes = this.bytes.subarray(0, this.length);
            this.frameTime = _FlvTag.frameTime(this.bytes);
            return this;
          };
        };
        _FlvTag.AUDIO_TAG = 8;
        _FlvTag.VIDEO_TAG = 9;
        _FlvTag.METADATA_TAG = 18;
        _FlvTag.isAudioFrame = function(tag) {
          return _FlvTag.AUDIO_TAG === tag[0];
        };
        _FlvTag.isVideoFrame = function(tag) {
          return _FlvTag.VIDEO_TAG === tag[0];
        };
        _FlvTag.isMetaData = function(tag) {
          return _FlvTag.METADATA_TAG === tag[0];
        };
        _FlvTag.isKeyFrame = function(tag) {
          if (_FlvTag.isVideoFrame(tag)) {
            return tag[11] === 23;
          }
          if (_FlvTag.isAudioFrame(tag)) {
            return true;
          }
          if (_FlvTag.isMetaData(tag)) {
            return true;
          }
          return false;
        };
        _FlvTag.frameTime = function(tag) {
          var pts = tag[4] << 16;
          pts |= tag[5] << 8;
          pts |= tag[6] << 0;
          pts |= tag[7] << 24;
          return pts;
        };
        var flvTag = _FlvTag;
        var CoalesceStream = function CoalesceStream2(options) {
          this.numberOfTracks = 0;
          this.metadataStream = options.metadataStream;
          this.videoTags = [];
          this.audioTags = [];
          this.videoTrack = null;
          this.audioTrack = null;
          this.pendingCaptions = [];
          this.pendingMetadata = [];
          this.pendingTracks = 0;
          this.processedTracks = 0;
          CoalesceStream2.prototype.init.call(this);
          this.push = function(output) {
            if (output.content || output.text) {
              return this.pendingCaptions.push(output);
            }
            if (output.frames) {
              return this.pendingMetadata.push(output);
            }
            if (output.track.type === "video") {
              this.videoTrack = output.track;
              this.videoTags = output.tags;
              this.pendingTracks++;
            }
            if (output.track.type === "audio") {
              this.audioTrack = output.track;
              this.audioTags = output.tags;
              this.pendingTracks++;
            }
          };
        };
        CoalesceStream.prototype = new stream();
        CoalesceStream.prototype.flush = function(flushSource) {
          var id3, caption, i, timelineStartPts, event = {
            tags: {},
            captions: [],
            captionStreams: {},
            metadata: []
          };
          if (this.pendingTracks < this.numberOfTracks) {
            if (flushSource !== "VideoSegmentStream" && flushSource !== "AudioSegmentStream") {
              return;
            } else if (this.pendingTracks === 0) {
              this.processedTracks++;
              if (this.processedTracks < this.numberOfTracks) {
                return;
              }
            }
          }
          this.processedTracks += this.pendingTracks;
          this.pendingTracks = 0;
          if (this.processedTracks < this.numberOfTracks) {
            return;
          }
          if (this.videoTrack) {
            timelineStartPts = this.videoTrack.timelineStartInfo.pts;
          } else if (this.audioTrack) {
            timelineStartPts = this.audioTrack.timelineStartInfo.pts;
          }
          event.tags.videoTags = this.videoTags;
          event.tags.audioTags = this.audioTags;
          for (i = 0; i < this.pendingCaptions.length; i++) {
            caption = this.pendingCaptions[i];
            caption.startTime = caption.startPts - timelineStartPts;
            caption.startTime /= 9e4;
            caption.endTime = caption.endPts - timelineStartPts;
            caption.endTime /= 9e4;
            event.captionStreams[caption.stream] = true;
            event.captions.push(caption);
          }
          for (i = 0; i < this.pendingMetadata.length; i++) {
            id3 = this.pendingMetadata[i];
            id3.cueTime = id3.pts - timelineStartPts;
            id3.cueTime /= 9e4;
            event.metadata.push(id3);
          }
          event.metadata.dispatchType = this.metadataStream.dispatchType;
          this.videoTrack = null;
          this.audioTrack = null;
          this.videoTags = [];
          this.audioTags = [];
          this.pendingCaptions.length = 0;
          this.pendingMetadata.length = 0;
          this.pendingTracks = 0;
          this.processedTracks = 0;
          this.trigger("data", event);
          this.trigger("done");
        };
        var coalesceStream = CoalesceStream;
        var TagList = function TagList2() {
          var self2 = this;
          this.list = [];
          this.push = function(tag) {
            this.list.push({
              bytes: tag.bytes,
              dts: tag.dts,
              pts: tag.pts,
              keyFrame: tag.keyFrame,
              metaDataTag: tag.metaDataTag
            });
          };
          Object.defineProperty(this, "length", {
            get: function get() {
              return self2.list.length;
            }
          });
        };
        var tagList = TagList;
        var H264Stream = h264.H264Stream;
        var _Transmuxer, _VideoSegmentStream, _AudioSegmentStream, collectTimelineInfo, metaDataTag, extraDataTag;
        collectTimelineInfo = function collectTimelineInfo2(track, data) {
          if (typeof data.pts === "number") {
            if (track.timelineStartInfo.pts === void 0) {
              track.timelineStartInfo.pts = data.pts;
            } else {
              track.timelineStartInfo.pts = Math.min(track.timelineStartInfo.pts, data.pts);
            }
          }
          if (typeof data.dts === "number") {
            if (track.timelineStartInfo.dts === void 0) {
              track.timelineStartInfo.dts = data.dts;
            } else {
              track.timelineStartInfo.dts = Math.min(track.timelineStartInfo.dts, data.dts);
            }
          }
        };
        metaDataTag = function metaDataTag2(track, pts) {
          var tag = new flvTag(flvTag.METADATA_TAG);
          tag.dts = pts;
          tag.pts = pts;
          tag.writeMetaDataDouble("videocodecid", 7);
          tag.writeMetaDataDouble("width", track.width);
          tag.writeMetaDataDouble("height", track.height);
          return tag;
        };
        extraDataTag = function extraDataTag2(track, pts) {
          var i, tag = new flvTag(flvTag.VIDEO_TAG, true);
          tag.dts = pts;
          tag.pts = pts;
          tag.writeByte(1);
          tag.writeByte(track.profileIdc);
          tag.writeByte(track.profileCompatibility);
          tag.writeByte(track.levelIdc);
          tag.writeByte(252 | 3);
          tag.writeByte(224 | 1);
          tag.writeShort(track.sps[0].length);
          tag.writeBytes(track.sps[0]);
          tag.writeByte(track.pps.length);
          for (i = 0; i < track.pps.length; ++i) {
            tag.writeShort(track.pps[i].length);
            tag.writeBytes(track.pps[i]);
          }
          return tag;
        };
        _AudioSegmentStream = function AudioSegmentStream2(track) {
          var adtsFrames = [], videoKeyFrames = [], oldExtraData;
          _AudioSegmentStream.prototype.init.call(this);
          this.push = function(data) {
            collectTimelineInfo(track, data);
            if (track) {
              track.audioobjecttype = data.audioobjecttype;
              track.channelcount = data.channelcount;
              track.samplerate = data.samplerate;
              track.samplingfrequencyindex = data.samplingfrequencyindex;
              track.samplesize = data.samplesize;
              track.extraData = track.audioobjecttype << 11 | track.samplingfrequencyindex << 7 | track.channelcount << 3;
            }
            data.pts = Math.round(data.pts / 90);
            data.dts = Math.round(data.dts / 90);
            adtsFrames.push(data);
          };
          this.flush = function() {
            var currentFrame, adtsFrame, lastMetaPts, tags = new tagList();
            if (adtsFrames.length === 0) {
              this.trigger("done", "AudioSegmentStream");
              return;
            }
            lastMetaPts = -Infinity;
            while (adtsFrames.length) {
              currentFrame = adtsFrames.shift();
              if (videoKeyFrames.length && currentFrame.pts >= videoKeyFrames[0]) {
                lastMetaPts = videoKeyFrames.shift();
                this.writeMetaDataTags(tags, lastMetaPts);
              }
              if (track.extraData !== oldExtraData || currentFrame.pts - lastMetaPts >= 1e3) {
                this.writeMetaDataTags(tags, currentFrame.pts);
                oldExtraData = track.extraData;
                lastMetaPts = currentFrame.pts;
              }
              adtsFrame = new flvTag(flvTag.AUDIO_TAG);
              adtsFrame.pts = currentFrame.pts;
              adtsFrame.dts = currentFrame.dts;
              adtsFrame.writeBytes(currentFrame.data);
              tags.push(adtsFrame.finalize());
            }
            videoKeyFrames.length = 0;
            oldExtraData = null;
            this.trigger("data", {
              track,
              tags: tags.list
            });
            this.trigger("done", "AudioSegmentStream");
          };
          this.writeMetaDataTags = function(tags, pts) {
            var adtsFrame;
            adtsFrame = new flvTag(flvTag.METADATA_TAG);
            adtsFrame.pts = pts;
            adtsFrame.dts = pts;
            adtsFrame.writeMetaDataDouble("audiocodecid", 10);
            adtsFrame.writeMetaDataBoolean("stereo", track.channelcount === 2);
            adtsFrame.writeMetaDataDouble("audiosamplerate", track.samplerate);
            adtsFrame.writeMetaDataDouble("audiosamplesize", 16);
            tags.push(adtsFrame.finalize());
            adtsFrame = new flvTag(flvTag.AUDIO_TAG, true);
            adtsFrame.pts = pts;
            adtsFrame.dts = pts;
            adtsFrame.view.setUint16(adtsFrame.position, track.extraData);
            adtsFrame.position += 2;
            adtsFrame.length = Math.max(adtsFrame.length, adtsFrame.position);
            tags.push(adtsFrame.finalize());
          };
          this.onVideoKeyFrame = function(pts) {
            videoKeyFrames.push(pts);
          };
        };
        _AudioSegmentStream.prototype = new stream();
        _VideoSegmentStream = function VideoSegmentStream2(track) {
          var nalUnits = [], config, h264Frame;
          _VideoSegmentStream.prototype.init.call(this);
          this.finishFrame = function(tags, frame) {
            if (!frame) {
              return;
            }
            if (config && track && track.newMetadata && (frame.keyFrame || tags.length === 0)) {
              var metaTag = metaDataTag(config, frame.dts).finalize();
              var extraTag = extraDataTag(track, frame.dts).finalize();
              metaTag.metaDataTag = extraTag.metaDataTag = true;
              tags.push(metaTag);
              tags.push(extraTag);
              track.newMetadata = false;
              this.trigger("keyframe", frame.dts);
            }
            frame.endNalUnit();
            tags.push(frame.finalize());
            h264Frame = null;
          };
          this.push = function(data) {
            collectTimelineInfo(track, data);
            data.pts = Math.round(data.pts / 90);
            data.dts = Math.round(data.dts / 90);
            nalUnits.push(data);
          };
          this.flush = function() {
            var currentNal, tags = new tagList();
            while (nalUnits.length) {
              if (nalUnits[0].nalUnitType === "access_unit_delimiter_rbsp") {
                break;
              }
              nalUnits.shift();
            }
            if (nalUnits.length === 0) {
              this.trigger("done", "VideoSegmentStream");
              return;
            }
            while (nalUnits.length) {
              currentNal = nalUnits.shift();
              if (currentNal.nalUnitType === "seq_parameter_set_rbsp") {
                track.newMetadata = true;
                config = currentNal.config;
                track.width = config.width;
                track.height = config.height;
                track.sps = [currentNal.data];
                track.profileIdc = config.profileIdc;
                track.levelIdc = config.levelIdc;
                track.profileCompatibility = config.profileCompatibility;
                h264Frame.endNalUnit();
              } else if (currentNal.nalUnitType === "pic_parameter_set_rbsp") {
                track.newMetadata = true;
                track.pps = [currentNal.data];
                h264Frame.endNalUnit();
              } else if (currentNal.nalUnitType === "access_unit_delimiter_rbsp") {
                if (h264Frame) {
                  this.finishFrame(tags, h264Frame);
                }
                h264Frame = new flvTag(flvTag.VIDEO_TAG);
                h264Frame.pts = currentNal.pts;
                h264Frame.dts = currentNal.dts;
              } else {
                if (currentNal.nalUnitType === "slice_layer_without_partitioning_rbsp_idr") {
                  h264Frame.keyFrame = true;
                }
                h264Frame.endNalUnit();
              }
              h264Frame.startNalUnit();
              h264Frame.writeBytes(currentNal.data);
            }
            if (h264Frame) {
              this.finishFrame(tags, h264Frame);
            }
            this.trigger("data", {
              track,
              tags: tags.list
            });
            this.trigger("done", "VideoSegmentStream");
          };
        };
        _VideoSegmentStream.prototype = new stream();
        _Transmuxer = function Transmuxer2(options) {
          var self2 = this, packetStream, parseStream, elementaryStream, videoTimestampRolloverStream, audioTimestampRolloverStream, timedMetadataTimestampRolloverStream, adtsStream, h264Stream, videoSegmentStream2, audioSegmentStream2, captionStream2, coalesceStream$1;
          _Transmuxer.prototype.init.call(this);
          options = options || {};
          this.metadataStream = new m2ts_1.MetadataStream();
          options.metadataStream = this.metadataStream;
          packetStream = new m2ts_1.TransportPacketStream();
          parseStream = new m2ts_1.TransportParseStream();
          elementaryStream = new m2ts_1.ElementaryStream();
          videoTimestampRolloverStream = new m2ts_1.TimestampRolloverStream("video");
          audioTimestampRolloverStream = new m2ts_1.TimestampRolloverStream("audio");
          timedMetadataTimestampRolloverStream = new m2ts_1.TimestampRolloverStream("timed-metadata");
          adtsStream = new adts();
          h264Stream = new H264Stream();
          coalesceStream$1 = new coalesceStream(options);
          packetStream.pipe(parseStream).pipe(elementaryStream);
          elementaryStream.pipe(videoTimestampRolloverStream).pipe(h264Stream);
          elementaryStream.pipe(audioTimestampRolloverStream).pipe(adtsStream);
          elementaryStream.pipe(timedMetadataTimestampRolloverStream).pipe(this.metadataStream).pipe(coalesceStream$1);
          captionStream2 = new m2ts_1.CaptionStream(options);
          h264Stream.pipe(captionStream2).pipe(coalesceStream$1);
          elementaryStream.on("data", function(data) {
            var i, videoTrack, audioTrack;
            if (data.type === "metadata") {
              i = data.tracks.length;
              while (i--) {
                if (data.tracks[i].type === "video") {
                  videoTrack = data.tracks[i];
                } else if (data.tracks[i].type === "audio") {
                  audioTrack = data.tracks[i];
                }
              }
              if (videoTrack && !videoSegmentStream2) {
                coalesceStream$1.numberOfTracks++;
                videoSegmentStream2 = new _VideoSegmentStream(videoTrack);
                h264Stream.pipe(videoSegmentStream2).pipe(coalesceStream$1);
              }
              if (audioTrack && !audioSegmentStream2) {
                coalesceStream$1.numberOfTracks++;
                audioSegmentStream2 = new _AudioSegmentStream(audioTrack);
                adtsStream.pipe(audioSegmentStream2).pipe(coalesceStream$1);
                if (videoSegmentStream2) {
                  videoSegmentStream2.on("keyframe", audioSegmentStream2.onVideoKeyFrame);
                }
              }
            }
          });
          this.push = function(data) {
            packetStream.push(data);
          };
          this.flush = function() {
            packetStream.flush();
          };
          this.resetCaptions = function() {
            captionStream2.reset();
          };
          coalesceStream$1.on("data", function(event) {
            self2.trigger("data", event);
          });
          coalesceStream$1.on("done", function() {
            self2.trigger("done");
          });
        };
        _Transmuxer.prototype = new stream();
        var transmuxer$1 = _Transmuxer;
        var getFlvHeader = function getFlvHeader2(duration, audio, video) {
          var headBytes = new Uint8Array(3 + 1 + 1 + 4), head = new DataView(headBytes.buffer), metadata, result, metadataLength;
          duration = duration || 0;
          audio = audio === void 0 ? true : audio;
          video = video === void 0 ? true : video;
          head.setUint8(0, 70);
          head.setUint8(1, 76);
          head.setUint8(2, 86);
          head.setUint8(3, 1);
          head.setUint8(4, (audio ? 4 : 0) | (video ? 1 : 0));
          head.setUint32(5, headBytes.byteLength);
          if (duration <= 0) {
            result = new Uint8Array(headBytes.byteLength + 4);
            result.set(headBytes);
            result.set([0, 0, 0, 0], headBytes.byteLength);
            return result;
          }
          metadata = new flvTag(flvTag.METADATA_TAG);
          metadata.pts = metadata.dts = 0;
          metadata.writeMetaDataDouble("duration", duration);
          metadataLength = metadata.finalize().length;
          result = new Uint8Array(headBytes.byteLength + metadataLength);
          result.set(headBytes);
          result.set(head.byteLength, metadataLength);
          return result;
        };
        var flvHeader = getFlvHeader;
        var flv = {
          tag: flvTag,
          Transmuxer: transmuxer$1,
          getFlvHeader: flvHeader
        };
        var m2ts = m2ts_1;
        var ONE_SECOND_IN_TS$1 = clock.ONE_SECOND_IN_TS;
        var AudioSegmentStream = function AudioSegmentStream2(track, options) {
          var adtsFrames = [], sequenceNumber = 0, earliestAllowedDts = 0, audioAppendStartTs = 0, videoBaseMediaDecodeTime = Infinity, segmentStartPts = null, segmentEndPts = null;
          options = options || {};
          AudioSegmentStream2.prototype.init.call(this);
          this.push = function(data) {
            trackDecodeInfo.collectDtsInfo(track, data);
            if (track) {
              audioProperties.forEach(function(prop) {
                track[prop] = data[prop];
              });
            }
            adtsFrames.push(data);
          };
          this.setEarliestDts = function(earliestDts) {
            earliestAllowedDts = earliestDts;
          };
          this.setVideoBaseMediaDecodeTime = function(baseMediaDecodeTime) {
            videoBaseMediaDecodeTime = baseMediaDecodeTime;
          };
          this.setAudioAppendStart = function(timestamp) {
            audioAppendStartTs = timestamp;
          };
          this.processFrames_ = function() {
            var frames, moof2, mdat2, boxes, timingInfo;
            if (adtsFrames.length === 0) {
              return;
            }
            frames = audioFrameUtils.trimAdtsFramesByEarliestDts(adtsFrames, track, earliestAllowedDts);
            if (frames.length === 0) {
              return;
            }
            track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
            audioFrameUtils.prefixWithSilence(track, frames, audioAppendStartTs, videoBaseMediaDecodeTime);
            track.samples = audioFrameUtils.generateSampleTable(frames);
            mdat2 = mp4Generator.mdat(audioFrameUtils.concatenateFrameData(frames));
            adtsFrames = [];
            moof2 = mp4Generator.moof(sequenceNumber, [track]);
            sequenceNumber++;
            track.initSegment = mp4Generator.initSegment([track]);
            boxes = new Uint8Array(moof2.byteLength + mdat2.byteLength);
            boxes.set(moof2);
            boxes.set(mdat2, moof2.byteLength);
            trackDecodeInfo.clearDtsInfo(track);
            if (segmentStartPts === null) {
              segmentEndPts = segmentStartPts = frames[0].pts;
            }
            segmentEndPts += frames.length * (ONE_SECOND_IN_TS$1 * 1024 / track.samplerate);
            timingInfo = {
              start: segmentStartPts
            };
            this.trigger("timingInfo", timingInfo);
            this.trigger("data", {
              track,
              boxes
            });
          };
          this.flush = function() {
            this.processFrames_();
            this.trigger("timingInfo", {
              start: segmentStartPts,
              end: segmentEndPts
            });
            this.resetTiming_();
            this.trigger("done", "AudioSegmentStream");
          };
          this.partialFlush = function() {
            this.processFrames_();
            this.trigger("partialdone", "AudioSegmentStream");
          };
          this.endTimeline = function() {
            this.flush();
            this.trigger("endedtimeline", "AudioSegmentStream");
          };
          this.resetTiming_ = function() {
            trackDecodeInfo.clearDtsInfo(track);
            segmentStartPts = null;
            segmentEndPts = null;
          };
          this.reset = function() {
            this.resetTiming_();
            adtsFrames = [];
            this.trigger("reset");
          };
        };
        AudioSegmentStream.prototype = new stream();
        var audioSegmentStream = AudioSegmentStream;
        var VideoSegmentStream = function VideoSegmentStream2(track, options) {
          var sequenceNumber = 0, nalUnits = [], frameCache = [], config, pps, segmentStartPts = null, segmentEndPts = null, gops, ensureNextFrameIsKeyFrame = true;
          options = options || {};
          VideoSegmentStream2.prototype.init.call(this);
          this.push = function(nalUnit) {
            trackDecodeInfo.collectDtsInfo(track, nalUnit);
            if (typeof track.timelineStartInfo.dts === "undefined") {
              track.timelineStartInfo.dts = nalUnit.dts;
            }
            if (nalUnit.nalUnitType === "seq_parameter_set_rbsp" && !config) {
              config = nalUnit.config;
              track.sps = [nalUnit.data];
              videoProperties.forEach(function(prop) {
                track[prop] = config[prop];
              }, this);
            }
            if (nalUnit.nalUnitType === "pic_parameter_set_rbsp" && !pps) {
              pps = nalUnit.data;
              track.pps = [nalUnit.data];
            }
            nalUnits.push(nalUnit);
          };
          this.processNals_ = function(cacheLastFrame) {
            var i;
            nalUnits = frameCache.concat(nalUnits);
            while (nalUnits.length) {
              if (nalUnits[0].nalUnitType === "access_unit_delimiter_rbsp") {
                break;
              }
              nalUnits.shift();
            }
            if (nalUnits.length === 0) {
              return;
            }
            var frames = frameUtils.groupNalsIntoFrames(nalUnits);
            if (!frames.length) {
              return;
            }
            frameCache = frames[frames.length - 1];
            if (cacheLastFrame) {
              frames.pop();
              frames.duration -= frameCache.duration;
              frames.nalCount -= frameCache.length;
              frames.byteLength -= frameCache.byteLength;
            }
            if (!frames.length) {
              nalUnits = [];
              return;
            }
            this.trigger("timelineStartInfo", track.timelineStartInfo);
            if (ensureNextFrameIsKeyFrame) {
              gops = frameUtils.groupFramesIntoGops(frames);
              if (!gops[0][0].keyFrame) {
                gops = frameUtils.extendFirstKeyFrame(gops);
                if (!gops[0][0].keyFrame) {
                  nalUnits = [].concat.apply([], frames).concat(frameCache);
                  frameCache = [];
                  return;
                }
                frames = [].concat.apply([], gops);
                frames.duration = gops.duration;
              }
              ensureNextFrameIsKeyFrame = false;
            }
            if (segmentStartPts === null) {
              segmentStartPts = frames[0].pts;
              segmentEndPts = segmentStartPts;
            }
            segmentEndPts += frames.duration;
            this.trigger("timingInfo", {
              start: segmentStartPts,
              end: segmentEndPts
            });
            for (i = 0; i < frames.length; i++) {
              var frame = frames[i];
              track.samples = frameUtils.generateSampleTableForFrame(frame);
              var mdat2 = mp4Generator.mdat(frameUtils.concatenateNalDataForFrame(frame));
              trackDecodeInfo.clearDtsInfo(track);
              trackDecodeInfo.collectDtsInfo(track, frame);
              track.baseMediaDecodeTime = trackDecodeInfo.calculateTrackBaseMediaDecodeTime(track, options.keepOriginalTimestamps);
              var moof2 = mp4Generator.moof(sequenceNumber, [track]);
              sequenceNumber++;
              track.initSegment = mp4Generator.initSegment([track]);
              var boxes = new Uint8Array(moof2.byteLength + mdat2.byteLength);
              boxes.set(moof2);
              boxes.set(mdat2, moof2.byteLength);
              this.trigger("data", {
                track,
                boxes,
                sequence: sequenceNumber,
                videoFrameDts: frame.dts,
                videoFramePts: frame.pts
              });
            }
            nalUnits = [];
          };
          this.resetTimingAndConfig_ = function() {
            config = void 0;
            pps = void 0;
            segmentStartPts = null;
            segmentEndPts = null;
          };
          this.partialFlush = function() {
            this.processNals_(true);
            this.trigger("partialdone", "VideoSegmentStream");
          };
          this.flush = function() {
            this.processNals_(false);
            this.resetTimingAndConfig_();
            this.trigger("done", "VideoSegmentStream");
          };
          this.endTimeline = function() {
            this.flush();
            this.trigger("endedtimeline", "VideoSegmentStream");
          };
          this.reset = function() {
            this.resetTimingAndConfig_();
            frameCache = [];
            nalUnits = [];
            ensureNextFrameIsKeyFrame = true;
            this.trigger("reset");
          };
        };
        VideoSegmentStream.prototype = new stream();
        var videoSegmentStream = VideoSegmentStream;
        var isLikelyAacData = utils.isLikelyAacData;
        var createPipeline = function createPipeline2(object) {
          object.prototype = new stream();
          object.prototype.init.call(object);
          return object;
        };
        var tsPipeline = function tsPipeline2(options) {
          var pipeline = {
            type: "ts",
            tracks: {
              audio: null,
              video: null
            },
            packet: new m2ts_1.TransportPacketStream(),
            parse: new m2ts_1.TransportParseStream(),
            elementary: new m2ts_1.ElementaryStream(),
            timestampRollover: new m2ts_1.TimestampRolloverStream(),
            adts: new codecs.Adts(),
            h264: new codecs.h264.H264Stream(),
            captionStream: new m2ts_1.CaptionStream(options),
            metadataStream: new m2ts_1.MetadataStream()
          };
          pipeline.headOfPipeline = pipeline.packet;
          pipeline.packet.pipe(pipeline.parse).pipe(pipeline.elementary).pipe(pipeline.timestampRollover);
          pipeline.timestampRollover.pipe(pipeline.h264);
          pipeline.h264.pipe(pipeline.captionStream);
          pipeline.timestampRollover.pipe(pipeline.metadataStream);
          pipeline.timestampRollover.pipe(pipeline.adts);
          pipeline.elementary.on("data", function(data) {
            if (data.type !== "metadata") {
              return;
            }
            for (var i = 0; i < data.tracks.length; i++) {
              if (!pipeline.tracks[data.tracks[i].type]) {
                pipeline.tracks[data.tracks[i].type] = data.tracks[i];
                pipeline.tracks[data.tracks[i].type].timelineStartInfo.baseMediaDecodeTime = options.baseMediaDecodeTime;
              }
            }
            if (pipeline.tracks.video && !pipeline.videoSegmentStream) {
              pipeline.videoSegmentStream = new videoSegmentStream(pipeline.tracks.video, options);
              pipeline.videoSegmentStream.on("timelineStartInfo", function(timelineStartInfo) {
                if (pipeline.tracks.audio && !options.keepOriginalTimestamps) {
                  pipeline.audioSegmentStream.setEarliestDts(timelineStartInfo.dts - options.baseMediaDecodeTime);
                }
              });
              pipeline.videoSegmentStream.on("timingInfo", pipeline.trigger.bind(pipeline, "videoTimingInfo"));
              pipeline.videoSegmentStream.on("data", function(data2) {
                pipeline.trigger("data", {
                  type: "video",
                  data: data2
                });
              });
              pipeline.videoSegmentStream.on("done", pipeline.trigger.bind(pipeline, "done"));
              pipeline.videoSegmentStream.on("partialdone", pipeline.trigger.bind(pipeline, "partialdone"));
              pipeline.videoSegmentStream.on("endedtimeline", pipeline.trigger.bind(pipeline, "endedtimeline"));
              pipeline.h264.pipe(pipeline.videoSegmentStream);
            }
            if (pipeline.tracks.audio && !pipeline.audioSegmentStream) {
              pipeline.audioSegmentStream = new audioSegmentStream(pipeline.tracks.audio, options);
              pipeline.audioSegmentStream.on("data", function(data2) {
                pipeline.trigger("data", {
                  type: "audio",
                  data: data2
                });
              });
              pipeline.audioSegmentStream.on("done", pipeline.trigger.bind(pipeline, "done"));
              pipeline.audioSegmentStream.on("partialdone", pipeline.trigger.bind(pipeline, "partialdone"));
              pipeline.audioSegmentStream.on("endedtimeline", pipeline.trigger.bind(pipeline, "endedtimeline"));
              pipeline.audioSegmentStream.on("timingInfo", pipeline.trigger.bind(pipeline, "audioTimingInfo"));
              pipeline.adts.pipe(pipeline.audioSegmentStream);
            }
            pipeline.trigger("trackinfo", {
              hasAudio: !!pipeline.tracks.audio,
              hasVideo: !!pipeline.tracks.video
            });
          });
          pipeline.captionStream.on("data", function(caption) {
            var timelineStartPts;
            if (pipeline.tracks.video) {
              timelineStartPts = pipeline.tracks.video.timelineStartInfo.pts || 0;
            } else {
              timelineStartPts = 0;
            }
            caption.startTime = clock.metadataTsToSeconds(caption.startPts, timelineStartPts, options.keepOriginalTimestamps);
            caption.endTime = clock.metadataTsToSeconds(caption.endPts, timelineStartPts, options.keepOriginalTimestamps);
            pipeline.trigger("caption", caption);
          });
          pipeline = createPipeline(pipeline);
          pipeline.metadataStream.on("data", pipeline.trigger.bind(pipeline, "id3Frame"));
          return pipeline;
        };
        var aacPipeline = function aacPipeline2(options) {
          var pipeline = {
            type: "aac",
            tracks: {
              audio: null
            },
            metadataStream: new m2ts_1.MetadataStream(),
            aacStream: new aac(),
            audioRollover: new m2ts_1.TimestampRolloverStream("audio"),
            timedMetadataRollover: new m2ts_1.TimestampRolloverStream("timed-metadata"),
            adtsStream: new adts(true)
          };
          pipeline.headOfPipeline = pipeline.aacStream;
          pipeline.aacStream.pipe(pipeline.audioRollover).pipe(pipeline.adtsStream);
          pipeline.aacStream.pipe(pipeline.timedMetadataRollover).pipe(pipeline.metadataStream);
          pipeline.metadataStream.on("timestamp", function(frame) {
            pipeline.aacStream.setTimestamp(frame.timeStamp);
          });
          pipeline.aacStream.on("data", function(data) {
            if (data.type !== "timed-metadata" && data.type !== "audio" || pipeline.audioSegmentStream) {
              return;
            }
            pipeline.tracks.audio = pipeline.tracks.audio || {
              timelineStartInfo: {
                baseMediaDecodeTime: options.baseMediaDecodeTime
              },
              codec: "adts",
              type: "audio"
            };
            pipeline.audioSegmentStream = new audioSegmentStream(pipeline.tracks.audio, options);
            pipeline.audioSegmentStream.on("data", function(data2) {
              pipeline.trigger("data", {
                type: "audio",
                data: data2
              });
            });
            pipeline.audioSegmentStream.on("partialdone", pipeline.trigger.bind(pipeline, "partialdone"));
            pipeline.audioSegmentStream.on("done", pipeline.trigger.bind(pipeline, "done"));
            pipeline.audioSegmentStream.on("endedtimeline", pipeline.trigger.bind(pipeline, "endedtimeline"));
            pipeline.audioSegmentStream.on("timingInfo", pipeline.trigger.bind(pipeline, "audioTimingInfo"));
            pipeline.adtsStream.pipe(pipeline.audioSegmentStream);
            pipeline.trigger("trackinfo", {
              hasAudio: !!pipeline.tracks.audio,
              hasVideo: !!pipeline.tracks.video
            });
          });
          pipeline = createPipeline(pipeline);
          pipeline.metadataStream.on("data", pipeline.trigger.bind(pipeline, "id3Frame"));
          return pipeline;
        };
        var setupPipelineListeners = function setupPipelineListeners2(pipeline, transmuxer2) {
          pipeline.on("data", transmuxer2.trigger.bind(transmuxer2, "data"));
          pipeline.on("done", transmuxer2.trigger.bind(transmuxer2, "done"));
          pipeline.on("partialdone", transmuxer2.trigger.bind(transmuxer2, "partialdone"));
          pipeline.on("endedtimeline", transmuxer2.trigger.bind(transmuxer2, "endedtimeline"));
          pipeline.on("audioTimingInfo", transmuxer2.trigger.bind(transmuxer2, "audioTimingInfo"));
          pipeline.on("videoTimingInfo", transmuxer2.trigger.bind(transmuxer2, "videoTimingInfo"));
          pipeline.on("trackinfo", transmuxer2.trigger.bind(transmuxer2, "trackinfo"));
          pipeline.on("id3Frame", function(event) {
            event.dispatchType = pipeline.metadataStream.dispatchType;
            event.cueTime = clock.videoTsToSeconds(event.pts);
            transmuxer2.trigger("id3Frame", event);
          });
          pipeline.on("caption", function(event) {
            transmuxer2.trigger("caption", event);
          });
        };
        var Transmuxer = function Transmuxer2(options) {
          var pipeline = null, hasFlushed = true;
          options = options || {};
          Transmuxer2.prototype.init.call(this);
          options.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;
          this.push = function(bytes) {
            if (hasFlushed) {
              var isAac = isLikelyAacData(bytes);
              if (isAac && (!pipeline || pipeline.type !== "aac")) {
                pipeline = aacPipeline(options);
                setupPipelineListeners(pipeline, this);
              } else if (!isAac && (!pipeline || pipeline.type !== "ts")) {
                pipeline = tsPipeline(options);
                setupPipelineListeners(pipeline, this);
              }
              hasFlushed = false;
            }
            pipeline.headOfPipeline.push(bytes);
          };
          this.flush = function() {
            if (!pipeline) {
              return;
            }
            hasFlushed = true;
            pipeline.headOfPipeline.flush();
          };
          this.partialFlush = function() {
            if (!pipeline) {
              return;
            }
            pipeline.headOfPipeline.partialFlush();
          };
          this.endTimeline = function() {
            if (!pipeline) {
              return;
            }
            pipeline.headOfPipeline.endTimeline();
          };
          this.reset = function() {
            if (!pipeline) {
              return;
            }
            pipeline.headOfPipeline.reset();
          };
          this.setBaseMediaDecodeTime = function(baseMediaDecodeTime) {
            if (!options.keepOriginalTimestamps) {
              options.baseMediaDecodeTime = baseMediaDecodeTime;
            }
            if (!pipeline) {
              return;
            }
            if (pipeline.tracks.audio) {
              pipeline.tracks.audio.timelineStartInfo.dts = void 0;
              pipeline.tracks.audio.timelineStartInfo.pts = void 0;
              trackDecodeInfo.clearDtsInfo(pipeline.tracks.audio);
              if (pipeline.audioRollover) {
                pipeline.audioRollover.discontinuity();
              }
            }
            if (pipeline.tracks.video) {
              if (pipeline.videoSegmentStream) {
                pipeline.videoSegmentStream.gopCache_ = [];
              }
              pipeline.tracks.video.timelineStartInfo.dts = void 0;
              pipeline.tracks.video.timelineStartInfo.pts = void 0;
              trackDecodeInfo.clearDtsInfo(pipeline.tracks.video);
            }
            if (pipeline.timestampRollover) {
              pipeline.timestampRollover.discontinuity();
            }
          };
          this.setRemux = function(val) {
            options.remux = val;
            if (pipeline && pipeline.coalesceStream) {
              pipeline.coalesceStream.setRemux(val);
            }
          };
          this.setAudioAppendStart = function(audioAppendStart) {
            if (!pipeline || !pipeline.tracks.audio || !pipeline.audioSegmentStream) {
              return;
            }
            pipeline.audioSegmentStream.setAudioAppendStart(audioAppendStart);
          };
          this.alignGopsWith = function(gopsToAlignWith) {
            return;
          };
        };
        Transmuxer.prototype = new stream();
        var transmuxer = Transmuxer;
        var partial = {
          Transmuxer: transmuxer
        };
        var tagTypes = {
          8: "audio",
          9: "video",
          18: "metadata"
        }, hex = function hex2(val) {
          return "0x" + ("00" + val.toString(16)).slice(-2).toUpperCase();
        }, hexStringList = function hexStringList2(data) {
          var arr = [], i;
          while (data.byteLength > 0) {
            i = 0;
            arr.push(hex(data[i++]));
            data = data.subarray(i);
          }
          return arr.join(" ");
        }, parseAVCTag = function parseAVCTag2(tag, obj) {
          var avcPacketTypes = ["AVC Sequence Header", "AVC NALU", "AVC End-of-Sequence"], compositionTime = tag[1] & parseInt("01111111", 2) << 16 | tag[2] << 8 | tag[3];
          obj = obj || {};
          obj.avcPacketType = avcPacketTypes[tag[0]];
          obj.CompositionTime = tag[1] & parseInt("10000000", 2) ? -compositionTime : compositionTime;
          if (tag[0] === 1) {
            obj.nalUnitTypeRaw = hexStringList(tag.subarray(4, 100));
          } else {
            obj.data = hexStringList(tag.subarray(4));
          }
          return obj;
        }, parseVideoTag = function parseVideoTag2(tag, obj) {
          var frameTypes = ["Unknown", "Keyframe (for AVC, a seekable frame)", "Inter frame (for AVC, a nonseekable frame)", "Disposable inter frame (H.263 only)", "Generated keyframe (reserved for server use only)", "Video info/command frame"], codecID = tag[0] & parseInt("00001111", 2);
          obj = obj || {};
          obj.frameType = frameTypes[(tag[0] & parseInt("11110000", 2)) >>> 4];
          obj.codecID = codecID;
          if (codecID === 7) {
            return parseAVCTag(tag.subarray(1), obj);
          }
          return obj;
        }, parseAACTag = function parseAACTag2(tag, obj) {
          var packetTypes = ["AAC Sequence Header", "AAC Raw"];
          obj = obj || {};
          obj.aacPacketType = packetTypes[tag[0]];
          obj.data = hexStringList(tag.subarray(1));
          return obj;
        }, parseAudioTag = function parseAudioTag2(tag, obj) {
          var formatTable = ["Linear PCM, platform endian", "ADPCM", "MP3", "Linear PCM, little endian", "Nellymoser 16-kHz mono", "Nellymoser 8-kHz mono", "Nellymoser", "G.711 A-law logarithmic PCM", "G.711 mu-law logarithmic PCM", "reserved", "AAC", "Speex", "MP3 8-Khz", "Device-specific sound"], samplingRateTable = ["5.5-kHz", "11-kHz", "22-kHz", "44-kHz"], soundFormat = (tag[0] & parseInt("11110000", 2)) >>> 4;
          obj = obj || {};
          obj.soundFormat = formatTable[soundFormat];
          obj.soundRate = samplingRateTable[(tag[0] & parseInt("00001100", 2)) >>> 2];
          obj.soundSize = (tag[0] & parseInt("00000010", 2)) >>> 1 ? "16-bit" : "8-bit";
          obj.soundType = tag[0] & parseInt("00000001", 2) ? "Stereo" : "Mono";
          if (soundFormat === 10) {
            return parseAACTag(tag.subarray(1), obj);
          }
          return obj;
        }, parseGenericTag = function parseGenericTag2(tag) {
          return {
            tagType: tagTypes[tag[0]],
            dataSize: tag[1] << 16 | tag[2] << 8 | tag[3],
            timestamp: tag[7] << 24 | tag[4] << 16 | tag[5] << 8 | tag[6],
            streamID: tag[8] << 16 | tag[9] << 8 | tag[10]
          };
        }, inspectFlvTag = function inspectFlvTag2(tag) {
          var header = parseGenericTag(tag);
          switch (tag[0]) {
            case 8:
              parseAudioTag(tag.subarray(11), header);
              break;
            case 9:
              parseVideoTag(tag.subarray(11), header);
              break;
          }
          return header;
        }, inspectFlv = function inspectFlv2(bytes) {
          var i = 9, dataSize, parsedResults = [], tag;
          i += 4;
          while (i < bytes.byteLength) {
            dataSize = bytes[i + 1] << 16;
            dataSize |= bytes[i + 2] << 8;
            dataSize |= bytes[i + 3];
            dataSize += 11;
            tag = bytes.subarray(i, i + dataSize);
            parsedResults.push(inspectFlvTag(tag));
            i += dataSize + 4;
          }
          return parsedResults;
        }, textifyFlv = function textifyFlv2(flvTagArray) {
          return JSON.stringify(flvTagArray, null, 2);
        };
        var flvInspector = {
          inspectTag: inspectFlvTag,
          inspect: inspectFlv,
          textify: textifyFlv
        };
        var parsePid = function parsePid2(packet) {
          var pid = packet[1] & 31;
          pid <<= 8;
          pid |= packet[2];
          return pid;
        };
        var parsePayloadUnitStartIndicator = function parsePayloadUnitStartIndicator2(packet) {
          return !!(packet[1] & 64);
        };
        var parseAdaptionField = function parseAdaptionField2(packet) {
          var offset = 0;
          if ((packet[3] & 48) >>> 4 > 1) {
            offset += packet[4] + 1;
          }
          return offset;
        };
        var parseType = function parseType2(packet, pmtPid) {
          var pid = parsePid(packet);
          if (pid === 0) {
            return "pat";
          } else if (pid === pmtPid) {
            return "pmt";
          } else if (pmtPid) {
            return "pes";
          }
          return null;
        };
        var parsePat = function parsePat2(packet) {
          var pusi = parsePayloadUnitStartIndicator(packet);
          var offset = 4 + parseAdaptionField(packet);
          if (pusi) {
            offset += packet[offset] + 1;
          }
          return (packet[offset + 10] & 31) << 8 | packet[offset + 11];
        };
        var parsePmt = function parsePmt2(packet) {
          var programMapTable = {};
          var pusi = parsePayloadUnitStartIndicator(packet);
          var payloadOffset = 4 + parseAdaptionField(packet);
          if (pusi) {
            payloadOffset += packet[payloadOffset] + 1;
          }
          if (!(packet[payloadOffset + 5] & 1)) {
            return;
          }
          var sectionLength, tableEnd, programInfoLength;
          sectionLength = (packet[payloadOffset + 1] & 15) << 8 | packet[payloadOffset + 2];
          tableEnd = 3 + sectionLength - 4;
          programInfoLength = (packet[payloadOffset + 10] & 15) << 8 | packet[payloadOffset + 11];
          var offset = 12 + programInfoLength;
          while (offset < tableEnd) {
            var i = payloadOffset + offset;
            programMapTable[(packet[i + 1] & 31) << 8 | packet[i + 2]] = packet[i];
            offset += ((packet[i + 3] & 15) << 8 | packet[i + 4]) + 5;
          }
          return programMapTable;
        };
        var parsePesType = function parsePesType2(packet, programMapTable) {
          var pid = parsePid(packet);
          var type2 = programMapTable[pid];
          switch (type2) {
            case streamTypes.H264_STREAM_TYPE:
              return "video";
            case streamTypes.ADTS_STREAM_TYPE:
              return "audio";
            case streamTypes.METADATA_STREAM_TYPE:
              return "timed-metadata";
            default:
              return null;
          }
        };
        var parsePesTime = function parsePesTime2(packet) {
          var pusi = parsePayloadUnitStartIndicator(packet);
          if (!pusi) {
            return null;
          }
          var offset = 4 + parseAdaptionField(packet);
          if (offset >= packet.byteLength) {
            return null;
          }
          var pes = null;
          var ptsDtsFlags;
          ptsDtsFlags = packet[offset + 7];
          if (ptsDtsFlags & 192) {
            pes = {};
            pes.pts = (packet[offset + 9] & 14) << 27 | (packet[offset + 10] & 255) << 20 | (packet[offset + 11] & 254) << 12 | (packet[offset + 12] & 255) << 5 | (packet[offset + 13] & 254) >>> 3;
            pes.pts *= 4;
            pes.pts += (packet[offset + 13] & 6) >>> 1;
            pes.dts = pes.pts;
            if (ptsDtsFlags & 64) {
              pes.dts = (packet[offset + 14] & 14) << 27 | (packet[offset + 15] & 255) << 20 | (packet[offset + 16] & 254) << 12 | (packet[offset + 17] & 255) << 5 | (packet[offset + 18] & 254) >>> 3;
              pes.dts *= 4;
              pes.dts += (packet[offset + 18] & 6) >>> 1;
            }
          }
          return pes;
        };
        var parseNalUnitType = function parseNalUnitType2(type2) {
          switch (type2) {
            case 5:
              return "slice_layer_without_partitioning_rbsp_idr";
            case 6:
              return "sei_rbsp";
            case 7:
              return "seq_parameter_set_rbsp";
            case 8:
              return "pic_parameter_set_rbsp";
            case 9:
              return "access_unit_delimiter_rbsp";
            default:
              return null;
          }
        };
        var videoPacketContainsKeyFrame = function videoPacketContainsKeyFrame2(packet) {
          var offset = 4 + parseAdaptionField(packet);
          var frameBuffer = packet.subarray(offset);
          var frameI = 0;
          var frameSyncPoint = 0;
          var foundKeyFrame = false;
          var nalType;
          for (; frameSyncPoint < frameBuffer.byteLength - 3; frameSyncPoint++) {
            if (frameBuffer[frameSyncPoint + 2] === 1) {
              frameI = frameSyncPoint + 5;
              break;
            }
          }
          while (frameI < frameBuffer.byteLength) {
            switch (frameBuffer[frameI]) {
              case 0:
                if (frameBuffer[frameI - 1] !== 0) {
                  frameI += 2;
                  break;
                } else if (frameBuffer[frameI - 2] !== 0) {
                  frameI++;
                  break;
                }
                if (frameSyncPoint + 3 !== frameI - 2) {
                  nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 31);
                  if (nalType === "slice_layer_without_partitioning_rbsp_idr") {
                    foundKeyFrame = true;
                  }
                }
                do {
                  frameI++;
                } while (frameBuffer[frameI] !== 1 && frameI < frameBuffer.length);
                frameSyncPoint = frameI - 2;
                frameI += 3;
                break;
              case 1:
                if (frameBuffer[frameI - 1] !== 0 || frameBuffer[frameI - 2] !== 0) {
                  frameI += 3;
                  break;
                }
                nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 31);
                if (nalType === "slice_layer_without_partitioning_rbsp_idr") {
                  foundKeyFrame = true;
                }
                frameSyncPoint = frameI - 2;
                frameI += 3;
                break;
              default:
                frameI += 3;
                break;
            }
          }
          frameBuffer = frameBuffer.subarray(frameSyncPoint);
          frameI -= frameSyncPoint;
          frameSyncPoint = 0;
          if (frameBuffer && frameBuffer.byteLength > 3) {
            nalType = parseNalUnitType(frameBuffer[frameSyncPoint + 3] & 31);
            if (nalType === "slice_layer_without_partitioning_rbsp_idr") {
              foundKeyFrame = true;
            }
          }
          return foundKeyFrame;
        };
        var probe$1 = {
          parseType,
          parsePat,
          parsePmt,
          parsePayloadUnitStartIndicator,
          parsePesType,
          parsePesTime,
          videoPacketContainsKeyFrame
        };
        var handleRollover = timestampRolloverStream.handleRollover;
        var probe = {};
        probe.ts = probe$1;
        probe.aac = utils;
        var ONE_SECOND_IN_TS = clock.ONE_SECOND_IN_TS;
        var MP2T_PACKET_LENGTH = 188, SYNC_BYTE = 71;
        var parsePsi_ = function parsePsi_2(bytes, pmt) {
          var startIndex = 0, endIndex = MP2T_PACKET_LENGTH, packet, type2;
          while (endIndex < bytes.byteLength) {
            if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
              packet = bytes.subarray(startIndex, endIndex);
              type2 = probe.ts.parseType(packet, pmt.pid);
              switch (type2) {
                case "pat":
                  pmt.pid = probe.ts.parsePat(packet);
                  break;
                case "pmt":
                  var table = probe.ts.parsePmt(packet);
                  pmt.table = pmt.table || {};
                  Object.keys(table).forEach(function(key) {
                    pmt.table[key] = table[key];
                  });
                  break;
              }
              startIndex += MP2T_PACKET_LENGTH;
              endIndex += MP2T_PACKET_LENGTH;
              continue;
            }
            startIndex++;
            endIndex++;
          }
        };
        var parseAudioPes_ = function parseAudioPes_2(bytes, pmt, result) {
          var startIndex = 0, endIndex = MP2T_PACKET_LENGTH, packet, type2, pesType, pusi, parsed;
          var endLoop = false;
          while (endIndex <= bytes.byteLength) {
            if (bytes[startIndex] === SYNC_BYTE && (bytes[endIndex] === SYNC_BYTE || endIndex === bytes.byteLength)) {
              packet = bytes.subarray(startIndex, endIndex);
              type2 = probe.ts.parseType(packet, pmt.pid);
              switch (type2) {
                case "pes":
                  pesType = probe.ts.parsePesType(packet, pmt.table);
                  pusi = probe.ts.parsePayloadUnitStartIndicator(packet);
                  if (pesType === "audio" && pusi) {
                    parsed = probe.ts.parsePesTime(packet);
                    if (parsed) {
                      parsed.type = "audio";
                      result.audio.push(parsed);
                      endLoop = true;
                    }
                  }
                  break;
              }
              if (endLoop) {
                break;
              }
              startIndex += MP2T_PACKET_LENGTH;
              endIndex += MP2T_PACKET_LENGTH;
              continue;
            }
            startIndex++;
            endIndex++;
          }
          endIndex = bytes.byteLength;
          startIndex = endIndex - MP2T_PACKET_LENGTH;
          endLoop = false;
          while (startIndex >= 0) {
            if (bytes[startIndex] === SYNC_BYTE && (bytes[endIndex] === SYNC_BYTE || endIndex === bytes.byteLength)) {
              packet = bytes.subarray(startIndex, endIndex);
              type2 = probe.ts.parseType(packet, pmt.pid);
              switch (type2) {
                case "pes":
                  pesType = probe.ts.parsePesType(packet, pmt.table);
                  pusi = probe.ts.parsePayloadUnitStartIndicator(packet);
                  if (pesType === "audio" && pusi) {
                    parsed = probe.ts.parsePesTime(packet);
                    if (parsed) {
                      parsed.type = "audio";
                      result.audio.push(parsed);
                      endLoop = true;
                    }
                  }
                  break;
              }
              if (endLoop) {
                break;
              }
              startIndex -= MP2T_PACKET_LENGTH;
              endIndex -= MP2T_PACKET_LENGTH;
              continue;
            }
            startIndex--;
            endIndex--;
          }
        };
        var parseVideoPes_ = function parseVideoPes_2(bytes, pmt, result) {
          var startIndex = 0, endIndex = MP2T_PACKET_LENGTH, packet, type2, pesType, pusi, parsed, frame, i, pes;
          var endLoop = false;
          var currentFrame = {
            data: [],
            size: 0
          };
          while (endIndex < bytes.byteLength) {
            if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
              packet = bytes.subarray(startIndex, endIndex);
              type2 = probe.ts.parseType(packet, pmt.pid);
              switch (type2) {
                case "pes":
                  pesType = probe.ts.parsePesType(packet, pmt.table);
                  pusi = probe.ts.parsePayloadUnitStartIndicator(packet);
                  if (pesType === "video") {
                    if (pusi && !endLoop) {
                      parsed = probe.ts.parsePesTime(packet);
                      if (parsed) {
                        parsed.type = "video";
                        result.video.push(parsed);
                        endLoop = true;
                      }
                    }
                    if (!result.firstKeyFrame) {
                      if (pusi) {
                        if (currentFrame.size !== 0) {
                          frame = new Uint8Array(currentFrame.size);
                          i = 0;
                          while (currentFrame.data.length) {
                            pes = currentFrame.data.shift();
                            frame.set(pes, i);
                            i += pes.byteLength;
                          }
                          if (probe.ts.videoPacketContainsKeyFrame(frame)) {
                            var firstKeyFrame = probe.ts.parsePesTime(frame);
                            if (firstKeyFrame) {
                              result.firstKeyFrame = firstKeyFrame;
                              result.firstKeyFrame.type = "video";
                            } else {
                              console.warn("Failed to extract PTS/DTS from PES at first keyframe. This could be an unusual TS segment, or else mux.js did not parse your TS segment correctly. If you know your TS segments do contain PTS/DTS on keyframes please file a bug report! You can try ffprobe to double check for yourself.");
                            }
                          }
                          currentFrame.size = 0;
                        }
                      }
                      currentFrame.data.push(packet);
                      currentFrame.size += packet.byteLength;
                    }
                  }
                  break;
              }
              if (endLoop && result.firstKeyFrame) {
                break;
              }
              startIndex += MP2T_PACKET_LENGTH;
              endIndex += MP2T_PACKET_LENGTH;
              continue;
            }
            startIndex++;
            endIndex++;
          }
          endIndex = bytes.byteLength;
          startIndex = endIndex - MP2T_PACKET_LENGTH;
          endLoop = false;
          while (startIndex >= 0) {
            if (bytes[startIndex] === SYNC_BYTE && bytes[endIndex] === SYNC_BYTE) {
              packet = bytes.subarray(startIndex, endIndex);
              type2 = probe.ts.parseType(packet, pmt.pid);
              switch (type2) {
                case "pes":
                  pesType = probe.ts.parsePesType(packet, pmt.table);
                  pusi = probe.ts.parsePayloadUnitStartIndicator(packet);
                  if (pesType === "video" && pusi) {
                    parsed = probe.ts.parsePesTime(packet);
                    if (parsed) {
                      parsed.type = "video";
                      result.video.push(parsed);
                      endLoop = true;
                    }
                  }
                  break;
              }
              if (endLoop) {
                break;
              }
              startIndex -= MP2T_PACKET_LENGTH;
              endIndex -= MP2T_PACKET_LENGTH;
              continue;
            }
            startIndex--;
            endIndex--;
          }
        };
        var adjustTimestamp_ = function adjustTimestamp_2(segmentInfo, baseTimestamp) {
          if (segmentInfo.audio && segmentInfo.audio.length) {
            var audioBaseTimestamp = baseTimestamp;
            if (typeof audioBaseTimestamp === "undefined" || isNaN(audioBaseTimestamp)) {
              audioBaseTimestamp = segmentInfo.audio[0].dts;
            }
            segmentInfo.audio.forEach(function(info) {
              info.dts = handleRollover(info.dts, audioBaseTimestamp);
              info.pts = handleRollover(info.pts, audioBaseTimestamp);
              info.dtsTime = info.dts / ONE_SECOND_IN_TS;
              info.ptsTime = info.pts / ONE_SECOND_IN_TS;
            });
          }
          if (segmentInfo.video && segmentInfo.video.length) {
            var videoBaseTimestamp = baseTimestamp;
            if (typeof videoBaseTimestamp === "undefined" || isNaN(videoBaseTimestamp)) {
              videoBaseTimestamp = segmentInfo.video[0].dts;
            }
            segmentInfo.video.forEach(function(info) {
              info.dts = handleRollover(info.dts, videoBaseTimestamp);
              info.pts = handleRollover(info.pts, videoBaseTimestamp);
              info.dtsTime = info.dts / ONE_SECOND_IN_TS;
              info.ptsTime = info.pts / ONE_SECOND_IN_TS;
            });
            if (segmentInfo.firstKeyFrame) {
              var frame = segmentInfo.firstKeyFrame;
              frame.dts = handleRollover(frame.dts, videoBaseTimestamp);
              frame.pts = handleRollover(frame.pts, videoBaseTimestamp);
              frame.dtsTime = frame.dts / ONE_SECOND_IN_TS;
              frame.ptsTime = frame.pts / ONE_SECOND_IN_TS;
            }
          }
        };
        var inspectAac_ = function inspectAac_2(bytes) {
          var endLoop = false, audioCount = 0, sampleRate = null, timestamp = null, frameSize = 0, byteIndex = 0, packet;
          while (bytes.length - byteIndex >= 3) {
            var type2 = probe.aac.parseType(bytes, byteIndex);
            switch (type2) {
              case "timed-metadata":
                if (bytes.length - byteIndex < 10) {
                  endLoop = true;
                  break;
                }
                frameSize = probe.aac.parseId3TagSize(bytes, byteIndex);
                if (frameSize > bytes.length) {
                  endLoop = true;
                  break;
                }
                if (timestamp === null) {
                  packet = bytes.subarray(byteIndex, byteIndex + frameSize);
                  timestamp = probe.aac.parseAacTimestamp(packet);
                }
                byteIndex += frameSize;
                break;
              case "audio":
                if (bytes.length - byteIndex < 7) {
                  endLoop = true;
                  break;
                }
                frameSize = probe.aac.parseAdtsSize(bytes, byteIndex);
                if (frameSize > bytes.length) {
                  endLoop = true;
                  break;
                }
                if (sampleRate === null) {
                  packet = bytes.subarray(byteIndex, byteIndex + frameSize);
                  sampleRate = probe.aac.parseSampleRate(packet);
                }
                audioCount++;
                byteIndex += frameSize;
                break;
              default:
                byteIndex++;
                break;
            }
            if (endLoop) {
              return null;
            }
          }
          if (sampleRate === null || timestamp === null) {
            return null;
          }
          var audioTimescale = ONE_SECOND_IN_TS / sampleRate;
          var result = {
            audio: [{
              type: "audio",
              dts: timestamp,
              pts: timestamp
            }, {
              type: "audio",
              dts: timestamp + audioCount * 1024 * audioTimescale,
              pts: timestamp + audioCount * 1024 * audioTimescale
            }]
          };
          return result;
        };
        var inspectTs_ = function inspectTs_2(bytes) {
          var pmt = {
            pid: null,
            table: null
          };
          var result = {};
          parsePsi_(bytes, pmt);
          for (var pid in pmt.table) {
            if (pmt.table.hasOwnProperty(pid)) {
              var type2 = pmt.table[pid];
              switch (type2) {
                case streamTypes.H264_STREAM_TYPE:
                  result.video = [];
                  parseVideoPes_(bytes, pmt, result);
                  if (result.video.length === 0) {
                    delete result.video;
                  }
                  break;
                case streamTypes.ADTS_STREAM_TYPE:
                  result.audio = [];
                  parseAudioPes_(bytes, pmt, result);
                  if (result.audio.length === 0) {
                    delete result.audio;
                  }
                  break;
              }
            }
          }
          return result;
        };
        var inspect = function inspect2(bytes, baseTimestamp) {
          var isAacData = probe.aac.isLikelyAacData(bytes);
          var result;
          if (isAacData) {
            result = inspectAac_(bytes);
          } else {
            result = inspectTs_(bytes);
          }
          if (!result || !result.audio && !result.video) {
            return null;
          }
          adjustTimestamp_(result, baseTimestamp);
          return result;
        };
        var tsInspector = {
          inspect,
          parseAudioPes_
        };
        var muxjs2 = {
          codecs,
          mp4,
          flv,
          mp2t: m2ts,
          partial
        };
        muxjs2.mp4.tools = mp4Inspector;
        muxjs2.flv.tools = flvInspector;
        muxjs2.mp2t.tools = tsInspector;
        var lib = muxjs2;
        return lib;
      }));
    })(mux$1);
    return mux$1.exports;
  }
  var muxExports = requireMux();
  const muxjs = getDefaultExportFromCjs(muxExports);
  function createMp4Writer(output) {
    let initialization = null;
    let pendingChunks = [];
    let segmentCount = 0;
    const onData = ({ initSegment, data }) => {
      if (initialization === null) {
        initialization = initSegment;
        pendingChunks.push(initSegment);
      } else if (initialization.length !== initSegment.length || initialization.some((byte, index) => byte !== initSegment[index])) {
        throw new Error("录播中的音视频编码参数发生变化，无法合并为单个 MP4 文件");
      }
      pendingChunks.push(data);
    };
    const createTransmuxer = (startTime = 0) => {
      const instance = new muxjs.mp4.Transmuxer({
        remux: true,
        keepOriginalTimestamps: false,
        baseMediaDecodeTime: Math.round(startTime * 9e4)
      });
      instance.on("data", onData);
      return instance;
    };
    let transmuxer = createTransmuxer();
    return {
      async write(chunk, { discontinuity = false, startTime = 0 } = {}) {
        if (discontinuity) {
          transmuxer.dispose();
          transmuxer = createTransmuxer(startTime);
        }
        transmuxer.push(new Uint8Array(chunk));
        transmuxer.flush();
        if (pendingChunks.length === 0) {
          throw new Error("无法将录播分片封装为 MP4，目前支持 H.264 视频和 AAC 音频");
        }
        const chunks = pendingChunks;
        pendingChunks = [];
        for (const data of chunks) {
          await output.write(data);
        }
        segmentCount += 1;
      },
      async close() {
        if (segmentCount === 0) {
          throw new Error("没有可保存的 MP4 音视频数据");
        }
        await output.close();
      },
      dispose() {
        pendingChunks = [];
        transmuxer.dispose();
      }
    };
  }
  const HLS_TEMP_FILE_PREFIX = "pku-art-hls-";
  function parseHlsAttributes(line) {
    const attributes = {};
    const content = line.slice(line.indexOf(":") + 1);
    const pattern = /([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;
    let match;
    while (match = pattern.exec(content)) {
      const value = match[2];
      attributes[match[1]] = value.startsWith('"') ? value.slice(1, -1) : value;
    }
    return attributes;
  }
  function parseHlsIv(value) {
    const normalized = value.replace(/^0x/i, "").padStart(32, "0");
    if (!/^[0-9a-f]{32}$/i.test(normalized)) {
      throw new Error(`不支持的 HLS IV：${value}`);
    }
    return new Uint8Array(normalized.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));
  }
  function createHlsSequenceIv(sequence) {
    const iv = new Uint8Array(16);
    let value = BigInt(sequence);
    for (let index = iv.length - 1; index >= 0; index -= 1) {
      iv[index] = Number(value & 0xffn);
      value >>= 8n;
    }
    return iv;
  }
  function waitWithAbort(delay, signal) {
    return new Promise((resolve, reject) => {
      if (signal == null ? void 0 : signal.aborted) {
        reject(signal.reason || new DOMException("下载已取消", "AbortError"));
        return;
      }
      const onAbort = () => {
        clearTimeout(timer);
        reject(signal.reason || new DOMException("下载已取消", "AbortError"));
      };
      const timer = setTimeout(() => {
        signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
        resolve();
      }, delay);
      signal == null ? void 0 : signal.addEventListener("abort", onAbort, { once: true });
    });
  }
  async function fetchHlsResource(url, signal, responseType = "arrayBuffer", options = {}) {
    const {
      maxAttempts = 8,
      omitCredentialsAfterFailure = false,
      maxRetryDelay = 3e4,
      requestTimeout = 45e3,
      onRetry = null
    } = options;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      if (signal == null ? void 0 : signal.aborted) {
        throw signal.reason || new DOMException("下载已取消", "AbortError");
      }
      const attemptController = new AbortController();
      const forwardAbort = () => attemptController.abort(signal.reason);
      signal == null ? void 0 : signal.addEventListener("abort", forwardAbort, { once: true });
      const timeout = setTimeout(
        () => attemptController.abort(new DOMException("HLS 请求超时", "TimeoutError")),
        requestTimeout
      );
      try {
        const credentials = omitCredentialsAfterFailure && attempt > 1 ? "omit" : "include";
        const response = await fetch(url, {
          credentials,
          signal: attemptController.signal
        });
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status} ${response.statusText}`);
          error.httpStatus = response.status;
          throw error;
        }
        return responseType === "text" ? await response.text() : await response.arrayBuffer();
      } catch (error) {
        if (error.name === "AbortError" || (signal == null ? void 0 : signal.aborted)) {
          throw error;
        }
        lastError = error;
        if ([400, 401, 403, 404].includes(error.httpStatus) && attempt >= 3) {
          break;
        }
        if (attempt < maxAttempts) {
          const retryDelay = Math.min(1e3 * 2 ** Math.min(attempt - 1, 6), maxRetryDelay) + Math.floor(Math.random() * 1e3);
          onRetry == null ? void 0 : onRetry({ attempt, retryDelay, error });
          await waitWithAbort(retryDelay, signal);
        }
      } finally {
        clearTimeout(timeout);
        signal == null ? void 0 : signal.removeEventListener("abort", forwardAbort);
      }
    }
    throw new Error(`获取 HLS 资源失败：${url}
${(lastError == null ? void 0 : lastError.message) || lastError}`);
  }
  async function resolveHlsMediaPlaylist(playlistUrl, signal, depth = 0) {
    if (depth > 3) {
      throw new Error("HLS 播放列表嵌套过深");
    }
    const text = await fetchHlsResource(playlistUrl, signal, "text", {
      omitCredentialsAfterFailure: true
    });
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const variants = [];
    for (let index = 0; index < lines.length; index += 1) {
      if (!lines[index].startsWith("#EXT-X-STREAM-INF:")) continue;
      const attributes = parseHlsAttributes(lines[index]);
      const variantPath = lines.slice(index + 1).find((line) => !line.startsWith("#"));
      if (variantPath) {
        variants.push({
          bandwidth: Number(attributes.BANDWIDTH || 0),
          url: new URL(variantPath, playlistUrl).href
        });
      }
    }
    if (variants.length > 0) {
      variants.sort((left, right) => right.bandwidth - left.bandwidth);
      return resolveHlsMediaPlaylist(variants[0].url, signal, depth + 1);
    }
    let mediaSequence = 0;
    let currentKey = null;
    let pendingDuration = 0;
    let discontinuity = false;
    let startTime = 0;
    const segments = [];
    for (const line of lines) {
      if (line.startsWith("#EXT-X-MEDIA-SEQUENCE:")) {
        mediaSequence = Number.parseInt(line.split(":")[1], 10) || 0;
      } else if (line.startsWith("#EXT-X-KEY:")) {
        const attributes = parseHlsAttributes(line);
        if (attributes.METHOD === "NONE") {
          currentKey = null;
        } else if (attributes.METHOD === "AES-128" && attributes.URI) {
          currentKey = {
            method: attributes.METHOD,
            url: new URL(attributes.URI, playlistUrl).href,
            iv: attributes.IV ? parseHlsIv(attributes.IV) : null
          };
        } else {
          throw new Error(`不支持的 HLS 加密方式：${attributes.METHOD || "未知"}`);
        }
      } else if (line.startsWith("#EXTINF:")) {
        pendingDuration = Number.parseFloat(line.slice("#EXTINF:".length)) || 0;
      } else if (line === "#EXT-X-DISCONTINUITY") {
        discontinuity = true;
      } else if (line.startsWith("#EXT-X-BYTERANGE:") || line.startsWith("#EXT-X-MAP:")) {
        throw new Error("暂不支持 Byte Range 或 fMP4 格式的 HLS 录播");
      } else if (!line.startsWith("#")) {
        segments.push({
          url: new URL(line, playlistUrl).href,
          sequence: mediaSequence + segments.length,
          duration: pendingDuration,
          startTime,
          discontinuity,
          key: currentKey ? { ...currentKey } : null
        });
        startTime += pendingDuration;
        pendingDuration = 0;
        discontinuity = false;
      }
    }
    if (segments.length === 0) {
      throw new Error("HLS 播放列表中没有视频分片");
    }
    return { playlistUrl, segments };
  }
  async function cleanStaleHlsFiles(root) {
    try {
      const staleBefore = Date.now() - 24 * 60 * 60 * 1e3;
      for await (const [name, handle] of root.entries()) {
        if (!name.startsWith(HLS_TEMP_FILE_PREFIX) || handle.kind !== "file") continue;
        const file = await handle.getFile();
        if (file.lastModified < staleBefore) {
          await root.removeEntry(name);
        }
      }
    } catch (error) {
      console.warn("[PKU Art] 清理 HLS 临时文件失败", error);
    }
  }
  async function createHlsOutput(fileName) {
    var _a, _b;
    if (window.top === window.self && typeof window.showSaveFilePicker === "function") {
      const fileHandle2 = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "MP4 视频",
            accept: { "video/mp4": [".mp4"] }
          }
        ]
      });
      const writable2 = await fileHandle2.createWritable();
      return {
        type: "file-picker",
        write: (chunk) => writable2.write(chunk),
        close: () => writable2.close(),
        abort: () => writable2.abort()
      };
    }
    if (!((_a = navigator.storage) == null ? void 0 : _a.getDirectory)) {
      throw new Error("当前浏览器不支持大文件流式写入，请使用最新版 Chrome/Edge/Safari");
    }
    const root = await navigator.storage.getDirectory();
    void cleanStaleHlsFiles(root);
    const tempName = `${HLS_TEMP_FILE_PREFIX}${Date.now()}-${((_b = crypto.randomUUID) == null ? void 0 : _b.call(crypto)) || Math.random()}.mp4`;
    const fileHandle = await root.getFileHandle(tempName, { create: true });
    const writable = await fileHandle.createWritable();
    let isClosed = false;
    return {
      type: "browser-download",
      async write(chunk) {
        await writable.write(chunk);
      },
      async close() {
        await writable.close();
        isClosed = true;
        const file = await fileHandle.getFile();
        const objectUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(async () => {
          URL.revokeObjectURL(objectUrl);
          try {
            await root.removeEntry(tempName);
          } catch (error) {
            console.warn("[PKU Art] 清理 HLS 临时文件失败", error);
          }
        }, 5 * 60 * 1e3);
      },
      async abort() {
        if (!isClosed) {
          await writable.abort().catch(() => {
          });
        }
        await root.removeEntry(tempName).catch(() => {
        });
      }
    };
  }
  async function downloadHlsVideo({ playlistUrl, fileName, signal, onProgress }) {
    const output = await createHlsOutput(fileName);
    const mp4 = createMp4Writer(output);
    let outputClosed = false;
    const requestController = new AbortController();
    const forwardAbort = () => requestController.abort(signal.reason);
    if (signal.aborted) {
      forwardAbort();
    } else {
      signal.addEventListener("abort", forwardAbort, { once: true });
    }
    const requestSignal = requestController.signal;
    try {
      onProgress({ stage: "正在读取视频信息…" });
      const { segments } = await resolveHlsMediaPlaylist(playlistUrl, requestSignal);
      const keyPromises = new Map();
      let downloadedBytes = 0;
      let completedSegments = 0;
      const startedAt = Date.now();
      const concurrency = 8;
      const prefetchWindow = concurrency * 3;
      const reportProgress = (stage, status = "active") => {
        const elapsedSeconds = Math.max((Date.now() - startedAt) / 1e3, 0.1);
        const speed = downloadedBytes / elapsedSeconds;
        const remainingSeconds = speed && completedSegments > 0 ? Math.round((segments.length - completedSegments) / completedSegments * elapsedSeconds) : null;
        onProgress({
          stage,
          completedSegments,
          totalSegments: segments.length,
          downloadedBytes,
          bytesPerSecond: speed,
          remainingSeconds,
          status
        });
      };
      const getCryptoKey = (keyUrl) => {
        if (!keyPromises.has(keyUrl)) {
          keyPromises.set(
            keyUrl,
            fetchHlsResource(keyUrl, requestSignal).then((rawKey) => {
              if (rawKey.byteLength !== 16) {
                throw new Error(`HLS 密钥长度异常：${rawKey.byteLength} 字节`);
              }
              return crypto.subtle.importKey("raw", rawKey, { name: "AES-CBC" }, false, ["decrypt"]);
            })
          );
        }
        return keyPromises.get(keyUrl);
      };
      const downloadSegment = async (segment, index) => {
        const encrypted = await fetchHlsResource(segment.url, requestSignal, "arrayBuffer", {
          maxAttempts: Number.POSITIVE_INFINITY,
          omitCredentialsAfterFailure: true,
          requestTimeout: 3e4,
          onRetry({ attempt, retryDelay }) {
            reportProgress(
              `分片 ${index + 1} 响应较慢，${Math.ceil(retryDelay / 1e3)} 秒后切换节点（第 ${attempt} 次重试）…`,
              "warning"
            );
          }
        });
        if (!segment.key) {
          return encrypted;
        }
        const key = await getCryptoKey(segment.key.url);
        const iv = segment.key.iv || createHlsSequenceIv(segment.sequence);
        return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, encrypted);
      };
      const waitingTasks = [];
      let activeTasks = 0;
      const pumpTasks = () => {
        while (activeTasks < concurrency && waitingTasks.length > 0) {
          const task = waitingTasks.shift();
          activeTasks += 1;
          Promise.resolve().then(task.run).then(
            (chunk) => task.resolve({ chunk }),
            (error) => task.resolve({ error })
          ).finally(() => {
            activeTasks -= 1;
            pumpTasks();
          });
        }
      };
      const scheduleSegment = (segment, index) => new Promise((resolve) => {
        waitingTasks.push({ run: () => downloadSegment(segment, index), resolve });
        pumpTasks();
      });
      const segmentDownloads = new Array(segments.length);
      const initialWindowSize = Math.min(prefetchWindow, segments.length);
      for (let index = 0; index < initialWindowSize; index += 1) {
        segmentDownloads[index] = scheduleSegment(segments[index], index);
      }
      for (let index = 0; index < segments.length; index += 1) {
        if (signal.aborted) {
          throw new DOMException("下载已取消", "AbortError");
        }
        const result = await segmentDownloads[index];
        if (result.error) {
          throw result.error;
        }
        const { chunk } = result;
        const nextIndex = index + prefetchWindow;
        if (nextIndex < segments.length) {
          segmentDownloads[nextIndex] = scheduleSegment(segments[nextIndex], nextIndex);
        }
        segmentDownloads[index] = null;
        if (signal.aborted) {
          throw new DOMException("下载已取消", "AbortError");
        }
        await mp4.write(chunk, segments[index]);
        downloadedBytes += chunk.byteLength;
        completedSegments += 1;
        reportProgress("正在下载并封装 MP4…");
      }
      if (signal.aborted) {
        throw new DOMException("下载已取消", "AbortError");
      }
      onProgress({ stage: "正在保存 MP4 文件…" });
      await mp4.close();
      outputClosed = true;
      return { outputType: output.type, downloadedBytes, segmentCount: segments.length };
    } catch (error) {
      requestController.abort(error);
      if (!outputClosed) {
        await output.abort().catch(() => {
        });
      }
      throw error;
    } finally {
      mp4.dispose();
      signal.removeEventListener("abort", forwardAbort);
    }
  }
  function initializeLogoNavigation() {
    if (!/^https:\/\/course\.pku\.edu\.cn\/|^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const isElectivePage = /^https:\/\/elective\.pku\.edu\.cn\//.test(window.location.href);
    const isGoNestedPage = /goNested\.do/.test(window.location.href);
    const isWorkPage = /(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)/.test(
      window.location.href
    );
    const homeURL = isElectivePage ? "https://elective.pku.edu.cn/elective2008/edu/pku/stu/elective/controller/help/HelpController.jpf" : "https://course.pku.edu.cn";
    const getElement = () => {
      if (isGoNestedPage) {
        return document.body;
      }
      if (isWorkPage) {
        return document.querySelector("body > #scopeOneSpan > table:first-of-type td");
      }
      if (isElectivePage) {
        return document.querySelector("body > table:first-of-type td");
      }
      return document.getElementById("globalNavPageNavArea");
    };
    console.log(
      "[PKU Art] initializeLogoNavigation() has been used at " + ( new Date()).toLocaleString() + ", isElectivePage: " + isElectivePage + ", isGoNestedPage: " + isGoNestedPage + ", isWorkPage: " + isWorkPage
    );
    const handleLogoClick = (event) => {
      const navArea = event.currentTarget;
      const clickOffsetX = event.clientX - navArea.getBoundingClientRect().left;
      const clickOffsetY = event.clientY - navArea.getBoundingClientRect().top;
      if (clickOffsetX <= 150 && clickOffsetY <= 60) {
        window.location.href = homeURL;
      }
    };
    const bindLogoNavigation = () => {
      const element = getElement();
      if (element && !element.dataset.pkuArtLogoBound) {
        element.addEventListener("click", handleLogoClick);
        element.dataset.pkuArtLogoBound = "true";
      }
    };
    bindLogoNavigation();
    document.addEventListener("DOMContentLoaded", bindLogoNavigation);
  }
  function ensureSidebarVisible() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const resetNavigationPane = () => {
      const navigationPane = document.getElementById("navigationPane");
      if (navigationPane && navigationPane.classList.contains("navcollapsed")) {
        const puller = document.getElementById("menuPuller");
        if (puller) {
          puller.click();
          console.log("[PKU Art] sidebar reseted by auto click at " + ( new Date()).toLocaleString());
        }
      }
    };
    resetNavigationPane();
    window.addEventListener("resize", resetNavigationPane);
  }
  function overrideSiteIcons() {
    if (!/^https:\/\/(course|autolab|disk|elective)\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    console.log("[PKU Art] overrideSiteIcons() has been used at " + ( new Date()).toLocaleString());
    const replaceIcons = () => {
      const all_icons = document.querySelectorAll('link[rel="icon" i], link[rel="shortcut icon" i]');
      const not_custom_icons = document.querySelectorAll(
        'link[rel="icon" i]:not([href^="https://cdn.arthals.ink/"]), link[rel="shortcut icon" i]:not([href^="https://cdn.arthals.ink/"])'
      );
      if (all_icons.length == 0 || not_custom_icons.length > 0) {
        not_custom_icons.forEach((icon) => {
          icon.parentNode.removeChild(icon);
        });
        const newIcon = document.createElement("link");
        newIcon.rel = "SHORTCUT ICON";
        newIcon.href = "https://cdn.arthals.ink/css/src/PKU.svg";
        document.head.appendChild(newIcon);
        const appleIcon16 = document.createElement("link");
        appleIcon16.rel = "icon";
        appleIcon16.type = "image/png";
        appleIcon16.sizes = "16x16";
        appleIcon16.href = "https://cdn.arthals.ink/css/src/pku_16x16.png";
        document.head.appendChild(appleIcon16);
        const appleIcon32 = document.createElement("link");
        appleIcon32.rel = "icon";
        appleIcon32.type = "image/png";
        appleIcon32.sizes = "32x32";
        appleIcon32.href = "https://cdn.arthals.ink/css/src/pku_32x32.png";
        document.head.appendChild(appleIcon32);
        const appleIconTouch = document.createElement("link");
        appleIconTouch.rel = "apple-touch-icon";
        appleIconTouch.sizes = "180x180";
        appleIconTouch.href = "https://cdn.arthals.ink/css/src/pku_180x180.png";
        document.head.appendChild(appleIconTouch);
      }
    };
    replaceIcons();
    document.addEventListener("DOMContentLoaded", replaceIcons);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          replaceIcons();
        }
      });
    });
    const observeHead = () => {
      if (document.head) {
        observer.observe(document.head, { childList: true, subtree: true });
      }
    };
    observeHead();
    document.addEventListener("DOMContentLoaded", observeHead);
  }
  function removeCourseSerialNumbers() {
    const url = window.location.href;
    const isPortalPage = /^https:\/\/course\.pku\.edu\.cn\/webapps\/?$|^https:\/\/course\.pku\.edu\.cn\/webapps\/portal\/\S*$/.test(url);
    const isAlertsStreamPage = /^https:\/\/course\.pku\.edu\.cn\/webapps\/streamViewer\/streamViewer\S*streamName=alerts\S*$/.test(url);
    if (isPortalPage) {
      const stripPortalSerials = () => {
        const courseLinks = document.querySelectorAll(
          ".containerPortal > div:not(:first-child) .portlet .portletList-img > li > a"
        );
        courseLinks.forEach((courseLink) => {
          courseLink.innerHTML = courseLink.innerHTML.replace(/^.*?: /, "").replace(/\(\d+-\d+学年第\d学期.*?\)/, "");
        });
        console.log("[PKU Art] course serial deleted: " + courseLinks.length + " courses");
      };
      stripPortalSerials();
      document.addEventListener("DOMContentLoaded", stripPortalSerials);
    }
    if (isAlertsStreamPage) {
      let alertCleanupTimer;
      const stripAlertSerials = () => {
        const courseLinks = document.querySelectorAll("#streamHeader_alerts a");
        courseLinks.forEach((courseLink) => {
          courseLink.innerHTML = courseLink.innerHTML.replace(/\(\d+-\d+学年第\d学期\)/, "");
        });
        if (courseLinks.length !== 0 && alertCleanupTimer) {
          clearInterval(alertCleanupTimer);
        }
      };
      stripAlertSerials();
      alertCleanupTimer = setInterval(() => {
        const courseLinks = document.querySelectorAll("#streamHeader_alerts a");
        if (courseLinks.length !== 0) {
          stripAlertSerials();
        }
      }, 50);
    }
    const removeContextMenuSerials = () => {
      const contextMenuOpenLink = document.querySelector("#breadcrumbs .coursePath .courseArrow a");
      const doRemoveContextMenuSerials = () => {
        contextMenuOpenLink.removeEventListener("mouseover", doRemoveContextMenuSerials);
        contextMenuOpenLink.removeEventListener("click", doRemoveContextMenuSerials);
        const waitForContextMenuReadyInterval = setInterval(() => {
          console.log("[PKU Art] Waiting for context menu ready...");
          if (contextMenuOpenLink.savedDiv.querySelector('li[id^="最近访问"]')) {
            clearInterval(waitForContextMenuReadyInterval);
            contextMenuOpenLink.savedDiv.innerHTML = contextMenuOpenLink.savedDiv.innerHTML.replace(
              /\(\d+-\d+学年第\d学期\)/g,
              ""
            );
            const emptyMenu = contextMenuOpenLink.savedDiv.querySelector(
              'ul[role="presentation"]:has(.contextmenu_empty)'
            );
            if (emptyMenu) {
              contextMenuOpenLink.savedDiv.removeChild(emptyMenu);
              console.log("[PKU Art] Removed empty context menu");
            }
          }
        }, 100);
      };
      if (contextMenuOpenLink) {
        contextMenuOpenLink.addEventListener("mouseover", doRemoveContextMenuSerials);
        contextMenuOpenLink.addEventListener("click", doRemoveContextMenuSerials);
        contextMenuOpenLink.addEventListener("click", registerCloseContextMenuOnPage);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", removeContextMenuSerials);
    } else {
      removeContextMenuSerials();
    }
  }
  function sanitizeFileName(fileName) {
    return fileName.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();
  }
  async function initializeDirectDownload() {
    const url = window.location.href;
    if (!/^https:\/\/onlineroomse\.pku\.edu\.cn\/player\?course_id\S*$/.test(url)) return;
    console.log("[PKU Art] Injected directDownload() at " + ( new Date()).toLocaleString());
    let downloadUrl = "";
    let downloadJson = "";
    let courseName = "";
    let subTitle = "";
    let lecturerName = "";
    let fileName = "";
    let isHls = false;
    const JWT_STORAGE_KEY = "PKU_ART_DIRECT_DOWNLOAD_JWT";
    const RELOAD_ATTEMPTS_KEY = "PKU_ART_DIRECT_DOWNLOAD_RELOAD_ATTEMPTS";
    const MAX_RELOAD_ATTEMPTS = 3;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    const requestHeaders = new WeakMap();
    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
      let headers = requestHeaders.get(this);
      if (!headers) {
        headers = new Map();
        requestHeaders.set(this, headers);
      }
      headers.set(String(header).toLowerCase(), String(value));
      return originalSetRequestHeader.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      this.addEventListener("load", function() {
        var _a, _b, _c, _d;
        if (this.responseURL.includes("get-sub-info-by-auth-data")) {
          const authorization = ((_a = requestHeaders.get(this)) == null ? void 0 : _a.get("authorization")) || "";
          const jwt = authorization.replace(/^Bearer\s+/i, "").trim();
          if (jwt) {
            try {
              sessionStorage.setItem(JWT_STORAGE_KEY, jwt);
              console.log("[PKU Art] JWT 已保存到 sessionStorage");
            } catch (error) {
              console.warn("[PKU Art] 无法保存 JWT", error);
            }
          } else {
            console.warn("[PKU Art] 视频信息请求中未找到 Authorization 请求头");
          }
          try {
            downloadJson = JSON.parse(this.response);
          } catch (error) {
            console.error("[PKU Art] 录播信息解析失败", error);
            return;
          }
          if (!((_c = (_b = downloadJson == null ? void 0 : downloadJson.list) == null ? void 0 : _b[0]) == null ? void 0 : _c.sub_content)) {
            console.warn("[PKU Art] 录播信息中缺少可下载资源", downloadJson);
            downloadJson = "";
            return;
          }
          try {
            sessionStorage.removeItem(RELOAD_ATTEMPTS_KEY);
          } catch (error) {
            console.warn("[PKU Art] 无法清除重载计数", error);
          }
          console.log("[PKU Art] XHR 响应结果：\n", downloadJson);
          courseName = downloadJson.list[0].title;
          subTitle = downloadJson.list[0].sub_title;
          lecturerName = downloadJson.list[0].lecturer_name;
          try {
            const filmContent = JSON.parse(downloadJson.list[0].sub_content);
            const playback = filmContent.save_playback;
            const contents = playback == null ? void 0 : playback.contents;
            const firstSource = Array.isArray(contents) ? ((_d = contents[0]) == null ? void 0 : _d.preview) || contents[0] : contents;
            downloadUrl = typeof firstSource === "string" ? firstSource : "";
            if (!downloadUrl) {
              throw new Error("录播资源地址为空");
            }
            isHls = (playback == null ? void 0 : playback.is_m3u8) === "yes" || /\.m3u8(?:$|\?)/i.test(downloadUrl);
            fileName = sanitizeFileName(
              `${courseName} - ${subTitle} - ${lecturerName}.mp4`
            );
            console.log("[PKU Art] 下载链接解析成功：\n", downloadUrl);
          } catch (error) {
            console.error("[PKU Art] 录播资源地址解析失败", error);
            downloadJson = "";
          }
        }
      });
      originalSend.apply(this, arguments);
    };
    const INJECTION_OBSERVATION_MS = 3e3;
    const didCaptureDownloadInfo = await new Promise((resolve) => {
      const injectionStartTime = Date.now();
      const checkExist = setInterval(() => {
        const footer = document.querySelector(".course-info__wrap .course-info__footer");
        if (downloadJson && footer) {
          console.log("[PKU Art] 页面加载完成，下载链接解析成功\n", downloadJson);
          clearInterval(checkExist);
          resolve(true);
          return;
        }
        if (footer && !downloadJson && Date.now() - injectionStartTime >= INJECTION_OBSERVATION_MS) {
          clearInterval(checkExist);
          let shouldContinue = true;
          try {
            let currentAttempts = Number(sessionStorage.getItem(RELOAD_ATTEMPTS_KEY) || "0");
            if (Number.isNaN(currentAttempts) || currentAttempts < 0) {
              currentAttempts = 0;
            }
            if (currentAttempts >= MAX_RELOAD_ATTEMPTS) {
              console.warn(`[PKU Art] 已尝试强制重载 ${currentAttempts} 次，停止自动重载`);
            } else {
              sessionStorage.setItem(RELOAD_ATTEMPTS_KEY, String(currentAttempts + 1));
              console.warn("[PKU Art] 未能及时截获课程数据，即将刷新页面重试");
              shouldContinue = false;
              window.location.reload();
            }
          } catch (error) {
            console.warn("[PKU Art] 记录重载次数失败，尝试通过刷新页面恢复", error);
            shouldContinue = false;
            window.location.reload();
          }
          resolve(shouldContinue);
        }
      }, 500);
    });
    XMLHttpRequest.prototype.send = originalSend;
    XMLHttpRequest.prototype.setRequestHeader = originalSetRequestHeader;
    if (!didCaptureDownloadInfo || !downloadJson) {
      return;
    }
    const downloadAreaFooter = document.querySelector(".course-info__wrap .course-info__footer");
    if (!downloadAreaFooter) {
      console.warn("[PKU Art] 未找到 course-info__footer，无法注入下载功能");
      return;
    }
    const replayTitle = document.querySelector(".course-info__wrap .course-info__header > span");
    if (replayTitle) {
      replayTitle.innerText = `${courseName} - ${subTitle} - ${lecturerName}`;
    }
    while (downloadAreaFooter.firstChild) {
      downloadAreaFooter.removeChild(downloadAreaFooter.firstChild);
    }
    const createFooterButton = (id, label, icon) => {
      const button = document.createElement("button");
      button.id = id;
      button.type = "button";
      button.className = "PKU-Art";
      button.innerHTML = `<span class="PKU-Art">${icon}</span><span class="PKU-Art">${label}</span>`;
      return button;
    };
    const downloadButton = createFooterButton("injectDownloadButton", "下载视频", downloadIcon);
    const copyDownloadUrlButton = isHls ? null : createFooterButton("injectCopyDownloadUrlButton", "复制链接地址", linkIcon);
    let downloadSwitchArea = null;
    let switchInput = null;
    if (isHls) {
      downloadAreaFooter.classList.add("hls-download");
    } else {
      downloadSwitchArea = document.createElement("div");
      downloadSwitchArea.id = "injectDownloadSwitchArea";
      downloadSwitchArea.className = "PKU-Art";
      downloadSwitchArea.innerHTML = `
<input type="checkbox" id="injectDownloadSwitch" class="PKU-Art" checked>
<label for="injectDownloadSwitch"></label>
<span id="injectDownloadSwitchDesc" class="PKU-Art">自动重命名</span>
`;
      downloadSwitchArea.addEventListener("click", (event) => {
        const isCheckboxOrLabel = event.target.id === "injectDownloadSwitch" || event.target.htmlFor === "injectDownloadSwitch";
        if (!isCheckboxOrLabel) {
          switchInput.checked = !switchInput.checked;
        }
      });
      switchInput = downloadSwitchArea.querySelector("#injectDownloadSwitch");
    }
    downloadAreaFooter.appendChild(downloadButton);
    if (copyDownloadUrlButton) {
      downloadAreaFooter.appendChild(copyDownloadUrlButton);
    }
    if (downloadSwitchArea) {
      downloadAreaFooter.appendChild(downloadSwitchArea);
    }
    const isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
    const renameSupported = isHls || typeof _GM_download === "function";
    if (!renameSupported) {
      downloadSwitchArea.remove();
      downloadAreaFooter.classList.add("rename-unsupported");
      const renameUnsupportedTip = document.createElement("div");
      renameUnsupportedTip.id = "injectDownloadRenameUnsupported";
      renameUnsupportedTip.className = "PKU-Art";
      const warningIcon = isSafari ? '<span class="PKU-Art i-warning"></span>' : "";
      const tipText = isSafari ? "Safari + UserScripts 不支持重命名文件" : "当前环境不支持自动重命名文件";
      renameUnsupportedTip.innerHTML = `${warningIcon}<span class="PKU-Art">${tipText}</span>`;
      downloadAreaFooter.appendChild(renameUnsupportedTip);
    }
    const copySupported = typeof _GM_setClipboard === "function" || navigator.clipboard && navigator.clipboard.writeText;
    if (copyDownloadUrlButton && !copySupported) {
      copyDownloadUrlButton.disabled = true;
      copyDownloadUrlButton.querySelector("span:last-child").textContent = "复制链接不可用";
    }
    let currentDownload = null;
    let isDownloading = false;
    const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    const formatRemainingTime = (seconds) => {
      if (!Number.isFinite(seconds)) return "";
      if (seconds < 60) return `预计还需 ${Math.max(1, seconds)} 秒`;
      if (seconds < 3600) return `预计还需 ${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      return `预计还需 ${hours} 小时${minutes ? ` ${minutes} 分` : ""}`;
    };
    const getDownloadInfoMarkup = (renameEnabled) => {
      const fileLabel = renameEnabled ? "文件" : "建议文件名";
      const sourceLabel = isHls ? "HLS 源地址" : "文件源地址";
      return `
<div class="PKU-Art inject-download-info">
    <div class="PKU-Art inject-download-info-row">
        <span class="PKU-Art inject-download-info-label">${fileLabel}</span>
        <span class="PKU-Art inject-download-file-name" title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span>
    </div>
    <div class="PKU-Art inject-download-info-row">
        <span class="PKU-Art inject-download-info-label">来源</span>
        <a class="PKU-Art" target="_blank" rel="noopener noreferrer" href="${escapeHtml(downloadUrl)}">${sourceLabel}</a>
    </div>
</div>`;
    };
    const renderDownloadStatus = ({
      title,
      detail = "",
      state = "active",
      progress = null,
      renameEnabled = true
    }) => {
      const downloadTip = document.getElementById("injectDownloadTip");
      const downloadTipText = document.getElementById("injectDownloadTipText");
      if (!downloadTip || !downloadTipText) return;
      downloadTip.dataset.state = state;
      const progressMarkup = progress ? `
<div class="PKU-Art inject-download-progress" role="progressbar" aria-label="下载进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent.toFixed(2)}">
    <span class="PKU-Art" style="width: ${Math.min(100, Math.max(0, progress.percent))}%"></span>
</div>
<div class="PKU-Art inject-download-metrics">${progress.items.filter(Boolean).map((item) => `<span class="PKU-Art">${escapeHtml(item)}</span>`).join("")}</div>` : "";
      const noticeMarkup = isHls ? '<div class="PKU-Art inject-download-notice">录播将逐段下载、解密并无损封装为 MP4，下载过程中请保持本页面打开。</div>' : "";
      downloadTipText.innerHTML = `
<div class="PKU-Art inject-download-status-title">${escapeHtml(title)}</div>
${detail ? `<div class="PKU-Art inject-download-status-detail">${escapeHtml(detail)}</div>` : ""}
${progressMarkup}
${getDownloadInfoMarkup(renameEnabled)}
${noticeMarkup}`;
    };
    const formatDownloadError = (error) => {
      const message = String((error == null ? void 0 : error.message) || error || "未知错误");
      return message.replace(/^获取 HLS 资源失败：[^\n]+\n?/, "获取视频资源失败：");
    };
    const shouldUseManagedDownload = () => isHls || Boolean(renameSupported && (switchInput == null ? void 0 : switchInput.checked));
    const startDownload = async (renameEnabled) => {
      const cancelBtn = document.getElementById("injectCancelDownload");
      const restartBtn = document.getElementById("injectRestartDownload");
      if (!renameEnabled) {
        window.open(downloadUrl, "_blank");
        renderDownloadStatus({
          title: "已在新窗口打开源文件",
          detail: "浏览器将接管后续下载。",
          state: "success",
          renameEnabled
        });
        cancelBtn.disabled = true;
        restartBtn.disabled = false;
        isDownloading = false;
        return;
      }
      isDownloading = true;
      cancelBtn.disabled = false;
      restartBtn.disabled = true;
      renderDownloadStatus({
        title: "正在准备下载…",
        detail: isHls ? "将保存为 MP4 文件；下载过程中请保持本页面打开。" : "下载过程中请保持本页面打开。",
        renameEnabled
      });
      if (isHls) {
        const abortController = new AbortController();
        currentDownload = { abort: () => abortController.abort() };
        window.addEventListener(
          "beforeunload",
          () => {
            if (currentDownload) {
              currentDownload.abort();
            }
          },
          { once: true }
        );
        try {
          const result = await downloadHlsVideo({
            playlistUrl: downloadUrl,
            fileName,
            signal: abortController.signal,
            onProgress(progress) {
              if (!progress.totalSegments) {
                renderDownloadStatus({
                  title: progress.stage,
                  detail: "将保存为 MP4 文件；下载过程中请保持本页面打开。",
                  state: progress.status || "active",
                  renameEnabled
                });
                return;
              }
              const percent = progress.completedSegments / progress.totalSegments * 100;
              const downloadedMiB = (progress.downloadedBytes / 1024 / 1024).toFixed(1);
              const speedMiB = (progress.bytesPerSecond / 1024 / 1024).toFixed(1);
              renderDownloadStatus({
                title: progress.stage,
                detail: "下载过程中请保持本页面打开。网络波动时会自动切换节点重试。",
                state: progress.status || "active",
                progress: {
                  percent,
                  items: [
                    `${percent.toFixed(1)}%`,
                    `${progress.completedSegments}/${progress.totalSegments} 个分片`,
                    `已写入 ${downloadedMiB} MiB`,
                    progress.bytesPerSecond > 0 ? `${speedMiB} MiB/s` : "正在计算速度",
                    formatRemainingTime(progress.remainingSeconds)
                  ]
                },
                renameEnabled
              });
            }
          });
          renderDownloadStatus({
            title: result.outputType === "browser-download" ? "视频处理完成" : "下载完成",
            detail: result.outputType === "browser-download" ? "浏览器正在保存 MP4 文件，请留意下载列表。" : "MP4 文件已保存到所选位置。",
            state: "success",
            renameEnabled
          });
        } catch (error) {
          if (error.name === "AbortError") {
            renderDownloadStatus({
              title: "下载已取消",
              detail: "本次下载产生的临时文件已清理。",
              state: "neutral",
              renameEnabled
            });
          } else {
            console.error("[PKU Art] HLS 下载失败", error);
            renderDownloadStatus({
              title: "下载失败",
              detail: formatDownloadError(error),
              state: "error",
              renameEnabled
            });
          }
        } finally {
          currentDownload = null;
          isDownloading = false;
          cancelBtn.disabled = true;
          restartBtn.disabled = false;
        }
        return;
      }
      try {
        let lastPrintTime = 0;
        let lastBytesLoaded = 0;
        let averageSpeed = 0;
        const SMOOTHING_FACTOR = 0.02;
        currentDownload = _GM_download({
          url: downloadUrl,
          name: fileName,
          saveAs: true,
          onerror(event) {
            console.error("[PKU Art] 下载失败：", event);
            isDownloading = false;
            currentDownload = null;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            renderDownloadStatus({
              title: "下载失败",
              detail: event.error || "浏览器未能完成下载。",
              state: "error",
              renameEnabled
            });
          },
          onprogress(event) {
            const currentTime = Date.now();
            if (event.total && currentTime - lastPrintTime >= 100) {
              const percentComplete = event.loaded / event.total * 100;
              const currentProgress = percentComplete.toFixed(2);
              const bytesDownloadedInLast100ms = event.loaded - lastBytesLoaded;
              const lastSpeed = bytesDownloadedInLast100ms / (currentTime - lastPrintTime);
              averageSpeed = SMOOTHING_FACTOR * lastSpeed + (1 - SMOOTHING_FACTOR) * averageSpeed;
              const bytesRemaining = event.total - event.loaded;
              const estimatedTimeRemaining = bytesRemaining / averageSpeed;
              let estimatedTimeRemainingSeconds = Math.round(estimatedTimeRemaining / 1e3);
              if (Number.isNaN(estimatedTimeRemainingSeconds) || estimatedTimeRemainingSeconds > 9999) {
                estimatedTimeRemainingSeconds = "inf";
              }
              renderDownloadStatus({
                title: "正在下载视频…",
                detail: "下载过程中请保持本页面打开。",
                progress: {
                  percent: percentComplete,
                  items: [
                    `${currentProgress}%`,
                    estimatedTimeRemainingSeconds === "inf" ? "正在估算剩余时间" : formatRemainingTime(estimatedTimeRemainingSeconds)
                  ]
                },
                renameEnabled
              });
              lastPrintTime = currentTime;
              lastBytesLoaded = event.loaded;
            }
          },
          onload() {
            isDownloading = false;
            currentDownload = null;
            cancelBtn.disabled = true;
            restartBtn.disabled = false;
            renderDownloadStatus({ title: "下载完成", state: "success", renameEnabled });
          }
        });
        window.addEventListener(
          "beforeunload",
          () => {
            if (currentDownload) {
              currentDownload.abort();
            }
          },
          { once: true }
        );
      } catch (error) {
        console.warn("[PKU Art] GM_download 调用失败，回退到新窗口下载", error);
        window.open(downloadUrl, "_blank");
        isDownloading = false;
        currentDownload = null;
        cancelBtn.disabled = true;
        restartBtn.disabled = false;
        renderDownloadStatus({
          title: "已在新窗口打开源文件",
          detail: "当前环境不支持自动重命名，浏览器将接管后续下载。",
          state: "neutral",
          renameEnabled: false
        });
        alert("看上去当前环境不支持自动重命名功能，已尝试使用新标签页下载");
      }
    };
    downloadButton.addEventListener("click", async () => {
      console.log(`[PKU Art] 已启动下载：
文件名：${fileName}
源地址：${downloadUrl}`);
      const renameEnabled = shouldUseManagedDownload();
      const existingTip = document.getElementById("injectDownloadTip");
      if (existingTip) {
        if (isDownloading) {
          alert("正在下载中，请先取消当前下载");
          return;
        }
        startDownload(renameEnabled);
        return;
      }
      const downloadTip = document.createElement("div");
      downloadTip.id = "injectDownloadTip";
      downloadTip.className = "PKU-Art";
      const downloadTipText = document.createElement("div");
      downloadTipText.id = "injectDownloadTipText";
      downloadTipText.className = "PKU-Art";
      const downloadTipActions = document.createElement("div");
      downloadTipActions.id = "injectDownloadTipActions";
      downloadTipActions.className = "PKU-Art";
      const cancelBtn = document.createElement("button");
      cancelBtn.id = "injectCancelDownload";
      cancelBtn.className = "PKU-Art";
      cancelBtn.innerHTML = `${closeIcon}<span>取消下载</span>`;
      cancelBtn.disabled = true;
      const restartBtn = document.createElement("button");
      restartBtn.id = "injectRestartDownload";
      restartBtn.className = "PKU-Art";
      restartBtn.innerHTML = `${refreshIcon}<span>重新下载</span>`;
      restartBtn.disabled = true;
      cancelBtn.addEventListener("click", () => {
        if (currentDownload && isDownloading) {
          currentDownload.abort();
          if (isHls) {
            cancelBtn.disabled = true;
            renderDownloadStatus({
              title: "正在取消下载…",
              detail: "正在停止网络请求并清理临时文件。",
              state: "neutral"
            });
            return;
          }
          currentDownload = null;
          isDownloading = false;
          cancelBtn.disabled = true;
          restartBtn.disabled = false;
          renderDownloadStatus({ title: "下载已取消", state: "neutral", renameEnabled });
        }
      });
      restartBtn.addEventListener("click", () => {
        const renameEnabled2 = shouldUseManagedDownload();
        startDownload(renameEnabled2);
      });
      downloadTipActions.appendChild(cancelBtn);
      downloadTipActions.appendChild(restartBtn);
      downloadTip.appendChild(downloadTipText);
      downloadTip.appendChild(downloadTipActions);
      downloadAreaFooter.insertBefore(downloadTip, downloadAreaFooter.firstElementChild);
      startDownload(renameEnabled);
    });
    copyDownloadUrlButton == null ? void 0 : copyDownloadUrlButton.addEventListener("click", async () => {
      if (copyDownloadUrlButton.disabled) {
        return;
      }
      console.log(`[PKU Art] 已复制下载链接：
${downloadUrl}`);
      try {
        if (typeof _GM_setClipboard === "function") {
          _GM_setClipboard(downloadUrl);
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(downloadUrl);
        } else {
          throw new Error("clipboard unsupported");
        }
        alert("下载链接已复制到剪贴板，但是因为存在鉴权，仍可能无法直接使用外部工具下载");
      } catch (error) {
        console.warn("[PKU Art] 复制下载链接失败，将提供备用方案", error);
        const manualCopy = prompt("复制下载链接失败，请手动复制下面的链接", downloadUrl);
        if (manualCopy === null) {
          alert("未能复制下载链接，请尝试手动选中复制");
        }
      }
    });
  }
  function redirectGlobalMoreLink() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    let intervalId;
    const updateMoreLink = () => {
      const moreLink = document.querySelector("#global-more-link > a");
      if (moreLink) {
        console.log("[PKU Art] replaceMore() has been used at " + ( new Date()).toLocaleString());
        moreLink.href = "/webapps/bb-social-learning-BBLEARN/execute/mybb?cmd=display&toolId=MyGradesOnMyBb_____MyGradesTool";
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };
    intervalId = setInterval(updateMoreLink, 50);
    document.addEventListener("DOMContentLoaded", updateMoreLink);
  }
  function enableDirectOpenLinks() {
    if (!/^https:\/\/course\.pku\.edu\.cn\//.test(window.location.href)) {
      return;
    }
    const stripOnclickHandlers = () => {
      const links = document.querySelectorAll("a[onclick][href]");
      links.forEach((link) => {
        if (link.dataset.pkuArtProcessed) return;
        const href = link.getAttribute("href");
        if (href && !href.startsWith("/") && !href.startsWith("#")) {
          link.removeAttribute("onclick");
          console.log("[PKU Art] 直接打开链接:", href);
        }
        link.dataset.pkuArtProcessed = "true";
      });
    };
    stripOnclickHandlers();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          stripOnclickHandlers();
        }
      });
    });
    const observeBody = () => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };
    observeBody();
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", observeBody);
    }
    document.addEventListener("DOMContentLoaded", stripOnclickHandlers);
  }
  function manageElectiveCourseQueryForm() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/\S*$/.test(
      window.location.href
    )) {
      return;
    }
    console.log("[PKU Art] manageElectiveCourseQueryForm() has been used at " + ( new Date()).toLocaleString());
    const STORAGE_KEY = "pku_elective_form_values";
    const form = document.getElementById("qyForm");
    function getTargetInputs() {
      if (!form) return [];
      const allInputs = form.querySelectorAll("input");
      return Array.from(allInputs).filter((input) => input.id !== "b_cancel" && input.id !== "b_query");
    }
    function saveFormValues() {
      const inputs = getTargetInputs();
      const formData = {};
      inputs.forEach((input) => {
        const key = input.id || input.name || input.getAttribute("data-key");
        if (key) {
          if (input.type === "checkbox" || input.type === "radio") {
            formData[key] = input.checked;
          } else {
            formData[key] = input.value;
          }
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    function restoreFormValues() {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) {
        return;
      }
      try {
        const formData = JSON.parse(savedData);
        const inputs = getTargetInputs();
        inputs.forEach((input) => {
          const key = input.id || input.name || input.getAttribute("data-key");
          if (key && formData.hasOwnProperty(key)) {
            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = formData[key];
            } else {
              input.value = formData[key];
            }
          }
        });
      } catch (e) {
        console.error("还原表单值失败:", e);
      }
    }
    function clearFormValues() {
      localStorage.removeItem(STORAGE_KEY);
    }
    function setupRadioSwitchPreservation() {
      var _a;
      const courseID = document.querySelector("#courseID");
      const courseName = document.querySelector("#courseName");
      if (!courseID || !courseName) return;
      let savedID = courseID.value;
      let savedName = courseName.value;
      (_a = document.querySelector("#kcfl")) == null ? void 0 : _a.addEventListener(
        "click",
        function(e) {
          if (e.target.matches("input[type=radio]")) {
            savedID = courseID.value;
            savedName = courseName.value;
            requestAnimationFrame(() => {
              if (courseID.value === "") courseID.value = savedID;
              if (courseName.value === "") courseName.value = savedName;
            });
          }
        },
        true
      );
      const observer = new MutationObserver(() => {
        if (courseID.value === "" && savedID) courseID.value = savedID;
        if (courseName.value === "" && savedName) courseName.value = savedName;
      });
      observer.observe(courseID, { attributes: true, attributeFilter: ["value"] });
      observer.observe(courseName, { attributes: true, attributeFilter: ["value"] });
    }
    function setupLocalStoragePersistence() {
      if (!form) {
        console.warn('未找到 id="qyForm" 的表单，localStorage 存储功能不可用');
        return;
      }
      restoreFormValues();
      const inputs = getTargetInputs();
      inputs.forEach((input) => {
        input.addEventListener("input", saveFormValues);
        input.addEventListener("change", saveFormValues);
      });
      const cancelBtn = document.getElementById("b_cancel");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", function() {
          clearFormValues();
          const inputs2 = getTargetInputs();
          inputs2.forEach((input) => {
            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = false;
            } else {
              input.value = "";
            }
          });
        });
      }
    }
    setupRadioSwitchPreservation();
    setupLocalStoragePersistence();
  }
  function refactorElectiveDatagrid() {
    const refactorPagination = () => {
      const tables = document.querySelectorAll("table.datagrid");
      tables.forEach((table) => {
        if (table.dataset.pkuArtPaginationRefactored) {
          return;
        }
        let paginationRow = table.querySelector('tr:has(> td > form[name="pageForm"])');
        if (!paginationRow) {
          const lastRow = table.querySelector("tbody > tr:last-child, tr:last-child");
          if (lastRow) {
            const hasPagination = [...lastRow.querySelectorAll("td")].some(
              (td) => /Page\s+\d+\s+of\s+\d+/.test(td.textContent)
            );
            if (hasPagination) {
              paginationRow = lastRow;
            }
          }
        }
        if (!paginationRow) {
          return;
        }
        const paginationTds = [...paginationRow.querySelectorAll('td:not([align="left"])')];
        if (paginationTds.length === 0) {
          return;
        }
        const isSinglePage = paginationTds.some((td) => td.textContent.trim().startsWith("Page 1 of 1"));
        if (isSinglePage) {
          console.log(
            "[PKU Art] refactorPagination() removing single page navigation at " + ( new Date()).toLocaleString()
          );
          paginationTds.forEach((td) => td.remove());
          table.dataset.pkuArtPaginationRefactored = "true";
          return;
        }
        console.log("[PKU Art] refactorPagination() has been used at " + ( new Date()).toLocaleString());
        const navDiv = document.createElement("div");
        navDiv.classList.add("PKU-Art", "pku-art-navigation-area");
        paginationTds.forEach((td) => {
          navDiv.innerHTML += td.innerHTML;
          td.remove();
        });
        table.insertAdjacentElement("afterend", navDiv);
        table.dataset.pkuArtPaginationRefactored = "true";
      });
    };
    const refactorTableColumns = () => {
      const headerRow = document.querySelector("tr.datagrid-header");
      if (!headerRow) {
        return;
      }
      const headers = headerRow.querySelectorAll("th.datagrid");
      let pnpColumnIndex = -1;
      let limitColumnIndex = -1;
      headers.forEach((th, index) => {
        const text = th.textContent.trim();
        if (text === "自选P/NP") {
          pnpColumnIndex = index;
        } else if (text === "限数/已选") {
          limitColumnIndex = index;
        }
      });
      if (pnpColumnIndex === -1 && limitColumnIndex === -1) {
        return;
      }
      console.log(
        "[PKU Art] refactorTableColumns() found columns: P/NP=" + pnpColumnIndex + ", limit=" + limitColumnIndex
      );
      const dataRows = document.querySelectorAll("table.datagrid tr:not(.datagrid-header):not(.datagrid-footer)");
      dataRows.forEach((row) => {
        if (row.dataset.pkuArtTableRefactored) {
          return;
        }
        const cells = row.querySelectorAll("td.datagrid");
        if (pnpColumnIndex !== -1 && cells[pnpColumnIndex]) {
          const cell = cells[pnpColumnIndex];
          const text = cell.textContent.trim();
          if (text === "可申请") {
            cell.innerHTML = validIcon;
            cell.classList.add("PKU-Art", "pku-art-pnp-valid");
          } else if (text === "不可申请") {
            cell.innerHTML = invalidIcon;
            cell.classList.add("PKU-Art", "pku-art-pnp-invalid");
          }
        }
        if (limitColumnIndex !== -1 && cells[limitColumnIndex]) {
          const cell = cells[limitColumnIndex];
          const text = cell.textContent.trim();
          const match = text.match(/(\d+)\s*\/\s*(\d+)/);
          if (match) {
            const limit = parseInt(match[1], 10);
            const selected = parseInt(match[2], 10);
            if (selected >= limit) {
              cell.style.color = "var(--red-6)";
            } else {
              cell.style.color = "var(--blue-6)";
            }
            cell.classList.add("PKU-Art", "pku-art-limit-cell");
          }
        }
        row.dataset.pkuArtTableRefactored = "true";
      });
    };
    refactorPagination();
    refactorTableColumns();
  }
  function refactorElectiveCourseQueryPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/courseQuery\/(getCurriculmByForm\.do|queryCurriculum\.jsp)/.test(
      window.location.href
    )) {
      return;
    }
    refactorElectiveDatagrid();
    document.addEventListener("DOMContentLoaded", refactorElectiveDatagrid);
  }
  function refactorElectivePlanPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electivePlan\/ElectivePlanController\.jpf/.test(
      window.location.href
    )) {
      return;
    }
    refactorElectiveDatagrid();
    document.addEventListener("DOMContentLoaded", refactorElectiveDatagrid);
  }
  function refactorElectiveFaqPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/help\/faqForUnderGrad\.jsp\S*$/.test(
      window.location.href
    )) {
      return;
    }
    const removeFunc = () => {
      const rows = document.querySelectorAll("table.datagrid tr");
      rows.forEach(function(tr) {
        if (tr.children.length === 1 && tr.firstElementChild.tagName === "TD") {
          const text = tr.firstElementChild.textContent.replace(/\u00A0/g, "").trim();
          if (text === "") {
            tr.remove();
          }
        }
      });
    };
    removeFunc();
    document.addEventListener("DOMContentLoaded", removeFunc);
  }
  function refactorElectiveSupplementPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/supplement\/\S*$/.test(
      window.location.href
    )) {
      return;
    }
    refactorElectiveDatagrid();
    document.addEventListener("DOMContentLoaded", refactorElectiveDatagrid);
  }
  function refactorIaaaPage() {
    if (!/^https:\/\/iaaa\.pku\.edu\.cn\/iaaa\/oauth\.jsp/.test(window.location.href)) {
      return;
    }
    const checkboxSelectors = [
      "#remember",
      "#remember_checkbox",
      "#rememberMe",
      'input[type="checkbox"][name="remember"]',
      'input[type="checkbox"][name="rememberMe"]'
    ];
    const findCheckbox = () => checkboxSelectors.map((selector) => document.querySelector(selector)).find(Boolean);
    const setupRememberToggle = () => {
      const rememberText = document.getElementById("remember_text");
      if (!rememberText) {
        return false;
      }
      const getNativeIcon = () => rememberText.querySelector("i");
      const ensureCustomIcon = () => {
        if (!rememberText.querySelector(".pku-art-remember-icon")) {
          const customIcon = document.createElement("span");
          customIcon.className = "PKU-Art pku-art-remember-icon";
          customIcon.setAttribute("aria-hidden", "true");
          rememberText.insertBefore(customIcon, rememberText.firstChild);
        }
      };
      const getCheckedState = () => {
        const checkbox = findCheckbox();
        if (checkbox) {
          return !!checkbox.checked;
        }
        const nativeIcon = getNativeIcon();
        if (nativeIcon) {
          return nativeIcon.classList.contains("fa-check-square-o");
        }
        return rememberText.classList.contains("is-checked");
      };
      const updateAppearance = () => {
        const checked = getCheckedState();
        rememberText.classList.toggle("is-checked", checked);
        rememberText.setAttribute("aria-checked", checked ? "true" : "false");
      };
      if (rememberText.dataset.pkuArtRememberBound !== "true") {
        rememberText.dataset.pkuArtRememberBound = "true";
        rememberText.classList.add("PKU-Art", "pku-art-remember-toggle");
        rememberText.setAttribute("role", "checkbox");
        rememberText.setAttribute("tabindex", "0");
        ensureCustomIcon();
        rememberText.addEventListener("click", () => {
          requestAnimationFrame(updateAppearance);
        });
        rememberText.addEventListener("keydown", (event) => {
          const isActivateKey = event.key === " " || event.key === "Spacebar" || event.key === "Enter";
          if (!isActivateKey) return;
          event.preventDefault();
          const checkbox = findCheckbox();
          if (checkbox) {
            checkbox.click();
          } else {
            rememberText.click();
          }
        });
      } else {
        ensureCustomIcon();
      }
      const rememberCheckbox = findCheckbox();
      if (rememberCheckbox) {
        rememberCheckbox.classList.add("PKU-Art", "pku-art-remember-checkbox");
        if (rememberCheckbox.dataset.pkuArtRememberChangeBound !== "true") {
          rememberCheckbox.addEventListener("change", updateAppearance);
          rememberCheckbox.dataset.pkuArtRememberChangeBound = "true";
        }
        if (!rememberCheckbox._pkuArtRememberObserver) {
          const attributeObserver = new MutationObserver(updateAppearance);
          attributeObserver.observe(rememberCheckbox, {
            attributes: true,
            attributeFilter: ["checked"]
          });
          rememberCheckbox._pkuArtRememberObserver = attributeObserver;
        }
      } else {
        const nativeIcon = getNativeIcon();
        if (nativeIcon && !nativeIcon._pkuArtRememberObserver) {
          const iconObserver = new MutationObserver(updateAppearance);
          iconObserver.observe(nativeIcon, {
            attributes: true,
            attributeFilter: ["class"]
          });
          nativeIcon._pkuArtRememberObserver = iconObserver;
        }
      }
      updateAppearance();
      return true;
    };
    const ensureToggle = () => setupRememberToggle();
    if (!ensureToggle()) {
      const observer = new MutationObserver(() => {
        if (ensureToggle()) {
          observer.disconnect();
        }
      });
      const startObserver = () => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          if (!ensureToggle()) {
            startObserver();
          } else {
            observer.disconnect();
          }
        });
      } else {
        startObserver();
      }
    }
  }
  function refactorElectiveWorkPage() {
    if (!/^https:\/\/elective\.pku\.edu\.cn\/elective2008\/edu\/pku\/stu\/elective\/controller\/electiveWork\/(ElectiveWorkController\.jpf|election\.jsp|electCourse\.do|cancelCourse\.do)\S*$/.test(
      window.location.href
    )) {
      return;
    }
    const refactorNotice = () => {
      const allTargetTds = document.querySelectorAll("td:has(> span.errmsg)");
      allTargetTds.forEach((targetTd) => {
        if (targetTd.dataset.pkuArtRefactored) {
          return;
        }
        const hasDirectTextNode = Array.from(targetTd.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (!hasDirectTextNode) {
          return;
        }
        const errmsgSpan = targetTd.querySelector(":scope > span.errmsg");
        if (!errmsgSpan) {
          return;
        }
        console.log("[PKU Art] refactorNotice() processing td at " + ( new Date()).toLocaleString());
        const errmsgText = errmsgSpan.textContent.trim();
        errmsgSpan.remove();
        const rawText = targetTd.textContent.trim();
        const parts = rawText.split(/(?=（\d+）)/).map((p) => p.trim()).filter(Boolean);
        targetTd.innerHTML = "";
        parts.forEach((part) => {
          const trimmedPart = part.trim();
          if (!trimmedPart) {
            return;
          }
          const span = document.createElement("span");
          span.className = "PKU-Art pku-art-elective-notice-item";
          span.textContent = trimmedPart.replace(/[，。]+$/, "");
          targetTd.appendChild(span);
        });
        errmsgSpan.textContent = errmsgText.replace(/[，。]+$/, "");
        targetTd.appendChild(errmsgSpan);
        targetTd.dataset.pkuArtRefactored = "true";
        targetTd.classList.add("PKU-Art", "pku-art-elective-notice");
      });
    };
    const refactor = () => {
      refactorNotice();
      refactorElectiveDatagrid();
    };
    refactor();
    document.addEventListener("DOMContentLoaded", refactor);
  }
  function registerCloseContextMenuOnPage() {
    const closeContextMenu = () => {
      page.ContextMenu.closeAllContextMenus();
      document.removeEventListener("click", closeContextMenu);
    };
    document.addEventListener("click", closeContextMenu);
  }
  function initializeBatchDownload() {
    const url = window.location.href;
    if (!/^https:\/\/course\.pku\.edu\.cn\/webapps\/blackboard\/content\/listContent\.jsp/.test(url)) {
      return;
    }
    console.log("[PKU Art] initializeBatchDownload() initialized at " + ( new Date()).toLocaleString());
    function extractFileLinks(container) {
      const links = [];
      const anchors = container.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (href && href.includes("/bbcswebdav/")) {
          let fileName = decodeURIComponent(href.split("/").pop());
          if (fileName.includes("?")) {
            fileName = fileName.split("?")[0];
          }
          const linkText = anchor.textContent.trim();
          if (linkText && !linkText.includes("http") && linkText.length < 100) {
            const extMatch = fileName.match(/\.[a-zA-Z0-9]+$/);
            if (extMatch && !linkText.match(/\.[a-zA-Z0-9]+$/)) {
              fileName = linkText + extMatch[0];
            } else if (linkText.match(/\.[a-zA-Z0-9]+$/)) {
              fileName = linkText;
            }
          }
          links.push({
            url: href.startsWith("http") ? href : `https://course.pku.edu.cn${href}`,
            name: fileName
          });
        }
      });
      return links;
    }
    function downloadSingleFile(fileUrl, fileName) {
      return new Promise((resolve, reject) => {
        if (typeof _GM_download === "function") {
          _GM_download({
            url: fileUrl,
            name: fileName,
            onerror: (err) => {
              console.error(`[PKU Art] GM_download 失败: ${fileName}`, err);
              reject(err);
            },
            onload: () => {
              resolve();
            },
            ontimeout: () => {
              reject(new Error("下载超时"));
            }
          });
        } else {
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = fileName;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve();
        }
      });
    }
    async function downloadFiles(files, statusElement) {
      if (files.length === 0) {
        alert("没有找到可下载的文件");
        return;
      }
      const total = files.length;
      let completed = 0;
      let errors = 0;
      const fileNameCount = {};
      statusElement.textContent = `下载中: 0/${total}`;
      for (const file of files) {
        let fileName = file.name;
        if (fileNameCount[fileName]) {
          const ext = fileName.lastIndexOf(".");
          if (ext > 0) {
            fileName = `${fileName.substring(0, ext)}_${fileNameCount[fileName]}${fileName.substring(ext)}`;
          } else {
            fileName = `${fileName}_${fileNameCount[fileName]}`;
          }
          fileNameCount[file.name]++;
        } else {
          fileNameCount[file.name] = 1;
        }
        try {
          await downloadSingleFile(file.url, fileName);
          completed++;
        } catch (error) {
          console.error(`[PKU Art] 下载失败: ${fileName}`, error);
          errors++;
          completed++;
        }
        statusElement.textContent = `下载中: ${completed}/${total}`;
        if (completed < total) {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      if (errors > 0) {
        statusElement.textContent = `完成 (${errors}个失败)`;
      } else {
        statusElement.textContent = "下载完成";
      }
      setTimeout(() => {
        statusElement.textContent = "批量下载";
      }, 3e3);
    }
    function createDownloadButton(text, onClick) {
      const button = document.createElement("button");
      button.className = "PKU-Art pku-art-batch-download-btn";
      button.innerHTML = `${downloadIcon}<span class="pku-art-batch-download-text">${text}</span>`;
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const textSpan = button.querySelector(".pku-art-batch-download-text");
        if (textSpan.textContent.includes("下载中") || textSpan.textContent === "下载完成") {
          return;
        }
        onClick(textSpan);
      });
      return button;
    }
    function initButtons() {
      const contentItems = document.querySelectorAll("#content_listContainer > li");
      contentItems.forEach((item) => {
        if (item.querySelector(".pku-art-batch-download-btn")) {
          return;
        }
        const files = extractFileLinks(item);
        if (files.length === 0) {
          return;
        }
        const btn = createDownloadButton("批量下载", (statusEl) => {
          downloadFiles(files, statusEl);
        });
        const itemDiv = item.querySelector(".item");
        if (itemDiv) {
          itemDiv.appendChild(btn);
        }
      });
      const pageTitleDiv = document.querySelector("#pageTitleDiv");
      if (pageTitleDiv && !pageTitleDiv.querySelector(".pku-art-batch-download-btn")) {
        const allFiles = extractFileLinks(document.querySelector("#content_listContainer") || document.body);
        if (allFiles.length > 0) {
          const btn = createDownloadButton("下载全部", (statusEl) => {
            downloadFiles(allFiles, statusEl);
          });
          btn.classList.add("pku-art-download-all-btn");
          pageTitleDiv.appendChild(btn);
        }
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initButtons);
    } else {
      initButtons();
    }
    const observer = new MutationObserver(() => {
      initButtons();
    });
    const startObserver = () => {
      const contentList = document.querySelector("#content_listContainer");
      if (contentList) {
        observer.observe(contentList, { childList: true, subtree: true });
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startObserver);
    } else {
      startObserver();
    }
  }
  applyStylesForCurrentPage();
  initializeThemeManager();
  initializeThemeToggleButton();
  initializeLogoNavigation();
  ensureSidebarVisible();
  overrideSiteIcons();
  removeCourseSerialNumbers();
  initializeDirectDownload();
  redirectGlobalMoreLink();
  enableDirectOpenLinks();
  manageElectiveCourseQueryForm();
  initializeBatchDownload();
  refactorIaaaPage();
  refactorElectiveFaqPage();
  refactorElectivePlanPage();
  refactorElectiveWorkPage();
  refactorElectiveCourseQueryPage();
  refactorElectiveSupplementPage();

})();