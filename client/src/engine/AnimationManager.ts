export type EasingFunction = (t: number) => number;

export const Easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutBounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};

export interface Tween {
  id: string;
  startValue: number;
  endValue: number;
  durationMs: number;
  startTimeMs: number;
  easing: EasingFunction;
  onUpdate: (currentVal: number) => void;
  onComplete?: () => void;
}

export class AnimationManager {
  private tweens: Tween[] = [];

  public addTween(
    startValue: number,
    endValue: number,
    durationMs: number,
    easing: EasingFunction = Easings.easeInOutQuad,
    onUpdate: (val: number) => void,
    onComplete?: () => void
  ): string {
    const id = `tween_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    this.tweens.push({
      id,
      startValue,
      endValue,
      durationMs,
      startTimeMs: performance.now(),
      easing,
      onUpdate,
      onComplete,
    });
    return id;
  }

  public update(): void {
    const now = performance.now();
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tw = this.tweens[i];
      const elapsed = now - tw.startTimeMs;
      const progress = Math.min(1, elapsed / tw.durationMs);
      const easedProgress = tw.easing(progress);
      const currentVal = tw.startValue + (tw.endValue - tw.startValue) * easedProgress;

      tw.onUpdate(currentVal);

      if (progress >= 1) {
        if (tw.onComplete) tw.onComplete();
        this.tweens.splice(i, 1);
      }
    }
  }
}
