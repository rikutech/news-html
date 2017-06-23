var windowWidth;
var windowHeight;
var origTooltipWidth;
// ロード時、リサイズ時にウィンドウサイズ取得
$(window).on('load resize', function(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();
});
$('.tip').hover(
  // ツールチップ対象をマウスオーバー時
  function() {
    var scrollX = $(window).scrollLeft();
    var scrollY = $(window).scrollTop();
    var fontSize = 20;
    var offset = $(this).offset();
    var tooltip_id = '#' + $(this).attr('data-tooltip-id');
    var tooltipLeft = offset.left;
    var tooltipTop = offset.top + fontSize + 5;
    var tooltipWidth = $(tooltip_id).outerWidth();
    var tooltipHeight = $(tooltip_id).outerHeight();
 
    // マウスアウト時に戻すため、ツールチップの元の幅を保持
    origTooltipWidth = tooltipWidth;
 
    // ウィンドウ幅よりツールチップの幅が大きい場合
    if(windowWidth < tooltipWidth) {
      // ツールチップの幅を狭めて中央に表示
      tooltipWidth = windowWidth * 0.7;
      tooltipLeft = windowWidth * 0.15;
      // ツールチップの幅を設定
      $(tooltip_id).outerWidth(tooltipWidth);
      // ツールチップの幅が変われば高さも変わるので高さを再取得
      tooltipHeight = $(tooltip_id).outerHeight();
    }
 
    // ツールチップがウィンドウからはみ出る場合
    if(0 < ((tooltipWidth + tooltipLeft) - (windowWidth + scrollX))) {
      // ツールチップの位置をはみ出る分だけ左にずらす
      tooltipLeft = tooltipLeft - ((tooltipWidth + tooltipLeft) - (windowWidth + scrollX)) - 20;
    }
 
    // ツールチップが画面の下にはみ出る場合
    if(0 < ((tooltipHeight + tooltipTop) - (windowHeight + scrollY))) {
      // ツールチップの位置をテキストリンクの上に表示する
      tooltipTop = offset.top - tooltipHeight - 5;
    }
 
    // ツールチップの位置を設定
    $(tooltip_id).css("top", tooltipTop);
    $(tooltip_id).css("left", tooltipLeft);
 
    // ツールチップ表示
    $(tooltip_id).addClass('tooltip-show');
  },
  // ツールチップ対象をマウスアウト時
  function() {
    var tooltip_id = '#' + $(this).attr('data-tooltip-id');
    // ツールチップ非表示
    $(tooltip_id).removeClass('tooltip-show');
    // ツールチップの元の幅に戻す
    $(tooltip_id).outerWidth(origTooltipWidth);
  }
);