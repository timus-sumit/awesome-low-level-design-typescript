export class ReservationQueue {
  private queue: (() => void)[] = [];
  private isProcessing = false;

  enqueue(fn: () => void) {
    this.queue.push(fn);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length) {
      const fn = this.queue.shift();
      if (fn) await new Promise((res) => { fn(); res(null); });
    }

    this.isProcessing = false;
  }
}
