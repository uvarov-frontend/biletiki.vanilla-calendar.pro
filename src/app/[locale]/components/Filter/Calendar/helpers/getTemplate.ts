import { ITitles } from '@/types';

const btnTemplate = (isDates: boolean, titleBtn: string | false) => `
  <button type="button" class="vc-info__btn ${isDates ? 'vc-info__btn_active' : '' }" data-vc-custom-btn="close">${titleBtn}</button>
`;

const getTemplate = (isEndDate: boolean, isDates: boolean, titles: ITitles) => `
  <div class="vc-info">
    <b class="vc-info__title">${isEndDate ? titles.end : titles.start}</b>
    ${titles.btn ? btnTemplate(isDates, titles.btn) : ''}
  </div>
  <div class="vc-datepicker">
    <div class="vc-controls" data-vc="controls" role="toolbar" aria-label="Calendar Navigation">
      <#ArrowPrev [month] />
      <#ArrowNext [month] />
    </div>
    <div class="vc-grid" data-vc="grid">
      <#Multiple>
        <div class="vc-column" data-vc="column" role="region">
          <div class="vc-header" data-vc="header">
            <div class="vc-header__content" data-vc-header="content">
              <#Month />
              <#Year />
            </div>
          </div>
          <div class="vc-wrapper" data-vc="wrapper">
            <#WeekNumbers />
            <div class="vc-content" data-vc="content">
              <#Week />
              <#Dates />
            </div>
          </div>
        </div>
      <#/Multiple>
      <#DateRangeTooltip />
    </div>
  </div>
`;

export default getTemplate;
