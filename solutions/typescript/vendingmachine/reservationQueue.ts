export class ReservationQueue {
  private queue: (() => void)[] = [];
  private isProcessing = false;

  enqueue(fn: () => void) {
    this.queue.push(fn);
    this.process();
  }

  private async process() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length) {
      const task = this.queue.shift();
      if (task)
        await new Promise((res) => {
          task();
          res(null);
        });
    }

    this.isProcessing = false;
  }
}
