// 白屏时间（first Paint Time）——用户从打开页面开始到页面开始有东西呈现为止
export function getFPT() {
	// chrome 高版本 Deprecation
	// if (window.chrome?.loadTimes) {
	// 	const loadTimes = window.chrome.loadTimes();
	// 	return (loadTimes.firstPaintTime - loadTimes.startLoadTime) * 1000;
	// }
	if (window.performance) {
		const { timing } = window.performance;
		//开始解析渲染 DOM 树的时间 - 开始渲染时间
		return timing.domLoading - timing.navigationStart;
	}
}

// 首次有效渲染时间 (First Meaningful Paint)

class FMP {
  /**
   * get first-meaningful-paint
   */
  static getFmp(observeTime = 3000) {
    if (!Promise
      || !window.performance
      || !window.performance.timing
      || !window.requestAnimationFrame
      || !window.MutationObserver) {
      console.log('fmp can not be retrieved');
      Promise.reject(new Error('fmp can not be retrieved'));
    }

    const promise = new Promise((resolve) => {
      const observedPoints = [];
      const observer = new window.MutationObserver(() => {
        const innerHeight = window.innerHeight;
        function getDomMark(dom, level) {
          const length = dom.children ? dom.children.length : 0;
          let sum = 0;
          const tagName = dom.tagName;
          if (tagName !== 'SCRIPT' && tagName !== 'STYLE' && tagName !== 'META' && tagName !== 'HEAD') {
            if (dom.getBoundingClientRect && dom.getBoundingClientRect().top < innerHeight) {
              sum += (level * length);
            }
            if (length > 0) {
              const children = dom.children;
              for (let i = 0; i < length; i++) {
                sum += getDomMark(children[i], level + 1);
              }
            }
          }
          return sum;
        }
        window.requestAnimationFrame(() => {
          const timing = window.performance.timing;
          const startTime = timing.navigationStart || timing.fetchStart;
          const t = new Date().getTime() - startTime;
          const score = getDomMark(document, 1);
          observedPoints.push({
            score,
            t,
          });
        });
      });
      observer.observe(document, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        const rates = [];
        for (let i = 1; i < observedPoints.length; i++) {
          if (observedPoints[i].t !== observedPoints[i - 1].t) {
            rates.push({
              t: observedPoints[i].t,
              rate: observedPoints[i].score - observedPoints[i - 1].score,
            });
          }
        }
        rates.sort((a, b) => b.rate - a.rate);
        if (rates.length > 0) {
          resolve(rates[0].t);
        } else {
          resolve(observeTime);
        }
      }, observeTime);
    });
    return promise;
  }
}

window.$$getFPT = getFPT;
window.$$getFMP = FMP.getFmp;