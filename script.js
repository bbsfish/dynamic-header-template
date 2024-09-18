const CONSTS = {
    /** 
     * ヘッダーの表示・非表示アニメーションにかける時間
     * style.css の HEADER-ANIMATION-DURATION と同じ秒数を指定する
     * @type {Number} 単位: ミリ秒
     */
    HEADER_ANIMATION_DURATION: 1000,
    /**
     * ヘッダーの高さ
     * style.css の HEADER-HEIGHT と同じ高さを指定する
     * @type {Number} 単位: px
     */
    HEADER_HEIGHT: 50,
}

/**
 * スクロールしたら呼び出される
 * @param {Number} scrolled スクロール時のページ上部からの高さ
 * @param {Number} previousScroll 前回の scrolled 値
 */
function onScroll(scrolled, previousScroll) {
    const hd = document.querySelector('header');

    // スクロール量がヘッダーの高さ未満のとき: ヘッダーは画面固定しない
    if (scrolled <= CONSTS.HEADER_HEIGHT) {
        if (hd.style.position !== 'absolute') hd.style.position = 'absolute';
        if (hd.style.top !== '0') hd.style.top = '0';
    }
    // 下にスクロールしたとき: ヘッダーを非表示にする
    else if (scrolled > previousScroll) {
        if (hd.classList.contains('show')) hd.classList.remove('show');
        if (!hd.classList.contains('hide')) hd.classList.add('hide');
    }
    // 上にバックスクロールしたとき: ヘッダーを表示する
    else {
        // 要素に付与されたスタイルはリセット
        hd.style.top = '';
        hd.style.position = '';
        
        if (hd.classList.contains('hide')) hd.classList.remove('hide');
        if (!hd.classList.contains('show')) hd.classList.add('show');
    }
}

// DOM の読み込みが完了したら読み込まれる
document.addEventListener('DOMContentLoaded', () => {
    // スクロール時に onScroll 関数を実行する
    let previousScroll = 0;
    let scrolled = 0;
    window.addEventListener("scroll", async () => {
        previousScroll = scrolled;
        scrolled = window.pageYOffset
        onScroll(scrolled, previousScroll);
    });
});