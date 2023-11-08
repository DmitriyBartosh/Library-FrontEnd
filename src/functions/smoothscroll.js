// Элемент для перемещения, элемент или пиксель из, элемент или пиксель в, время в мс для анимации
export function scrollTo(element, from, to, duration) {
  if (duration <= 0) return;
  scrollToX(element, from, to, 0, 1 / duration, 10, easeOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = xTo;
    return;
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
  t01 += speed * step;

  if (t01 <= 1) {
    requestAnimationFrame(function () {
      scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    });
  }
}

function easeOutCuaic(t) {
  t--;
  return t * t * t + 1;
}
